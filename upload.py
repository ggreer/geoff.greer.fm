#!/usr/bin/env python

from pprint import pprint
import hashlib
import os
import sys

from gevent import monkey
from gevent.pool import Pool
monkey.patch_all()

from libcloud.storage.types import Provider, ContainerDoesNotExistError
from libcloud.storage.providers import get_driver

if len(sys.argv) < 2:
    print('Usage: %s container_name' % sys.argv[0])
    sys.exit(1)

provider_type = Provider.S3
user = os.environ.get('S3_USER')
api_key = os.environ.get('S3_API_KEY')

if not user or not api_key:
    print('No S3_USER or S3_API_KEY')
    sys.exit(1)

container_name = sys.argv[1]

jekyll_site = '_site'
index_page = 'index.html'
error_page = 'error.html'
ttl = 900
delete_files = True         # Delete stuff in cloudfiles that doesn't exist locally.
delete_all_files = False    # Nuke everything in the container before uploading stuff.
dry_run = False             # Don't actually do anything. Just print what would happen.

storage_driver = get_driver(provider_type)
provider = storage_driver(user, api_key)


def md5(path):
    f = open(path)
    data = True
    md5sum = hashlib.md5()
    while data:
        data = f.read(2**20)
        md5sum.update(data)
    f.close()
    return md5sum.hexdigest()


def get_max_age(path):
    DAY = 60 * 60 * 24
    WEEK = 7 * DAY
    YEAR = 365 * DAY
    path = path.lower()
    if path.endswith(('.jpg', '.jpeg', '.png', '.gif', '.mp3', '.mp4', '.avi', '.mpg', '.mpeg', '.gz', '.gz.asc')):
        return YEAR
    if path.endswith(('.css', '.js', '.asc', '.pdf', '.m4r', '.ico')):
        return WEEK
    if path.endswith(('.htm', '.html', '.txt', '.md', '.xml')):
        return DAY
    return DAY


def upload_file(container, file_path, cf_path):
    headers = {
        'Cache-Control': 'max-age=%s' % get_max_age(cf_path),
    }
    print('Uploading %s to %s/%s headers: %s' % (file_path, container.name, cf_path, headers))

    if dry_run:
        return
    driver = None
    try:
        driver = storage_driver(user, api_key)
        driver.upload_object(file_path, container, cf_path, headers=headers)
    except AttributeError as e:
        print('AttributeError uploading file:', e)
        # Probably a stupid mime type thing. Retry
        driver.upload_object(file_path, container, cf_path, extra={'content_type': 'binary/octet-stream'}, headers=headers)
    except Exception as e:
        print('Error uploading file:', e)


def delete_obj(obj, msg=None):
    if msg:
        print(msg)
    else:
        print('Deleting %s' % obj)
    if dry_run:
        return
    try:
        driver = storage_driver(user, api_key)
        driver.delete_object(obj)
    except Exception as e:
        print('Error deleting file:', e)


if dry_run:
    print('(Dry run)')

try:
    container = provider.get_container(container_name)
except ContainerDoesNotExistError:
    container = provider.create_container(container_name)
container_objects = provider.list_container_objects(container)

pprint(container)
# pprint(container_objects)

pool = Pool(20)

if delete_all_files:
    for obj in container_objects:
        pool.spawn(delete_obj, obj)
    pool.join()


object_names = {x.name: x for x in container_objects}

for root, dirs, files in os.walk(jekyll_site):
    cf_root = root[len(jekyll_site) + 1:]
    for file_name in files:
        file_path = '%s/%s' % (root, file_name)
        if len(cf_root) > 0:
            cf_path = '%s/%s' % (cf_root, file_name)
        else:
            cf_path = file_name
        if object_names.get(cf_path):
            file_md5 = md5(file_path)
            if object_names[cf_path].hash != file_md5:
                pool.spawn(upload_file, container, file_path, cf_path)
            del object_names[cf_path]
        else:
            pool.spawn(upload_file, container, file_path, cf_path)

pool.join()

if delete_files:
    for name, obj in object_names.items():
        pool.spawn(delete_obj, obj, '%s no longer exists locally. Deleting remote copy.' % name)
    pool.join()

if provider_type == Provider.CLOUDFILES_US:
    print('Enabling CDN')
    provider.ex_set_cdn_index_page(container, index_page)
    provider.ex_set_cdn_error_page(container, error_page)
    container.enable_cdn(ex_ttl=ttl)
    cdn_url = container.get_cdn_url()
    print('All done! Your site is at %s' % cdn_url)
else:
    print('All done!')
