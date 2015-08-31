#!/usr/bin/env python

from pprint import pprint
import hashlib
import os
import sys

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
delete_files = True  # Delete stuff in cloudfiles that doesn't exist locally
delete_all_files = False  # Nuke everything in the container before uploading stuff

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


def upload_file(container, file_path, cf_path):
    print('Uploading %s to %s/%s' % (file_path, container.name, cf_path.encode('utf-8')))
    try:
        container.upload_object(file_path, cf_path)
    except AttributeError:
        # Probably a stupid mime type thing. Retry
        container.upload_object(file_path, cf_path, extra={'content_type': 'binary/octet-stream'})
    except Exception as e:
        print('Error uploading file:', e)

try:
    container = provider.get_container(container_name)
except ContainerDoesNotExistError:
    container = provider.create_container(container_name)
container_objects = provider.list_container_objects(container)

if delete_all_files:
    for obj in container_objects:
        try:
            print('Deleting %s' % obj)
            obj.delete()
        except Exception as e:
            print('Error deleting file:', e)

pprint(container)
# pprint(container_objects)

object_names = {x.name: x for x in container_objects}

for root, dirs, files in os.walk(jekyll_site):
    cf_root = root[len(jekyll_site) + 1:]
    for file_name in files:
        file_path = '%s/%s' % (root, file_name)
        if len(cf_root) > 0:
            cf_path = '%s/%s' % (cf_root, file_name)
        else:
            cf_path = file_name
        cf_path = cf_path.decode('utf-8')
        if object_names.get(cf_path):
            file_md5 = md5(file_path)
            if object_names[cf_path].hash != file_md5:
                upload_file(container, file_path, cf_path)
            del object_names[cf_path]
        else:
            upload_file(container, file_path, cf_path)

if delete_files:
    for name, obj in object_names.items():
        try:
            print('%s no longer exists locally. Deleting remote copy.' % name)
            obj.delete()
        except Exception as e:
            print('Error deleting file:', e)

if provider_type == Provider.CLOUDFILES_US:
    print('Enabling CDN')
    provider.ex_set_cdn_index_page(container, index_page)
    provider.ex_set_cdn_error_page(container, error_page)
    container.enable_cdn(ex_ttl=ttl)
    cdn_url = container.get_cdn_url()
    print('All done! Your site is at %s' % cdn_url)
