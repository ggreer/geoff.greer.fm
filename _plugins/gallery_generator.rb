module Jekyll
  class GalleryPage < Page
    def initialize(site, base, dir, gallery_name)
      @site = site
      @base = base
      @dir = dir
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "gallery_index.html")
      self.data["gallery"] = gallery_name
      gallery_title_prefix = site.config["gallery_title_prefix"] || "Photos: "
      gallery_name = gallery_name.gsub("_", " ").capitalize()
      self.data["title"] = "#{gallery_title_prefix}#{gallery_name}"
      images = []
      Dir.foreach(dir) do |image|
        if image.chars.first != "."
          images.push(image)
        end
      end
      self.data["images"] = images
    end
  end

  class GalleryGenerator < Generator
    safe true

    def generate(site)
      unless site.layouts.key? "gallery_index"
        return
      end
      dir = site.config["gallery_dir"] || "photos"
      Dir.foreach(dir) do |gallery_dir|
        gallery_path = File.join(dir, gallery_dir)
        if File.directory?(gallery_path) and gallery_dir.chars.first != "."
          gallery = GalleryPage.new(site, site.source, gallery_path, gallery_dir)
          gallery.render(site.layouts, site.site_payload)
          gallery.write(site.dest)
          site.pages << gallery
        end
      end
    end
  end
end
