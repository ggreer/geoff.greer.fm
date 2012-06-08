$image_extensions = [".png", ".jpg", ".jpeg", ".gif"]

module Jekyll
  class GalleryIndex < Page
    def initialize(site, base, dir, galleries)
      @site = site
      @base = base
      @dir = dir
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "gallery_index.html")
      self.data["title"] = "Photos"
      self.data["galleries"] = []
      galleries.each {|gallery| self.data["galleries"].push(gallery.data) }
    end
  end

  class GalleryPage < Page
    def initialize(site, base, dir, gallery_name)
      @site = site
      @base = base
      @dir = dir
      @name = "index.html"
      @images = []

      best_image = nil
      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "gallery_page.html")
      self.data["gallery"] = gallery_name
      gallery_title_prefix = site.config["gallery_title_prefix"] || "Photos: "
      gallery_name = gallery_name.gsub("_", " ").capitalize()
      self.data["name"] = gallery_name
      self.data["title"] = "#{gallery_title_prefix}#{gallery_name}"
      Dir.foreach(dir) do |image|
        if image.chars.first != "." and image.downcase().end_with?(*$image_extensions)
          @images.push(image)
          best_image = image
        end
      end
      self.data["images"] = @images
      begin
        best_image = site.config["galleries"][self.data["gallery"]]["best_image"]
      rescue
      end
      self.data["best_image"] = best_image
    end
  end

  class GalleryGenerator < Generator
    safe true

    def generate(site)
      unless site.layouts.key? "gallery_index"
        return
      end
      dir = site.config["gallery_dir"] || "photos"
      galleries = []
      Dir.foreach(dir) do |gallery_dir|
        gallery_path = File.join(dir, gallery_dir)
        if File.directory?(gallery_path) and gallery_dir.chars.first != "."
          gallery = GalleryPage.new(site, site.source, gallery_path, gallery_dir)
          gallery.render(site.layouts, site.site_payload)
          gallery.write(site.dest)
          site.pages << gallery
          galleries.push(gallery)
        end
      end

      gallery_index = GalleryIndex.new(site, site.source, dir, galleries)
      gallery_index.render(site.layouts, site.site_payload)
      gallery_index.write(site.dest)
      site.pages << gallery_index
    end
  end
end
