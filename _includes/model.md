### {{ include.title }}

<div class="row">
  <div class="col w2">
    <a href="{{include.name}}-0.png">
      <img style="max-height:150px;max-width:200px;" alt="{{include.title}}" src="{{include.name}}-0.png" />
    </a>
  </div>
  <div class="col w2">
    <a href="{{include.name}}-1.png">
      <img style="max-height:150px;max-width:200px;" alt="{{include.title}}" src="{{include.name}}-1.png" />
    </a>
  </div>
  <div class="col w2">
    <a href="{{include.name}}-2.png">
      <img style="max-height:150px;max-width:200px;" alt="{{include.title}}" src="{{include.name}}-2.png" />
    </a>
  </div>
</div>
<div class="row">
  <div class="col w2">
    <a href="{{include.name}}-front.png">
      <img style="max-height:150px;max-width:200px;" alt="{{include.title}} Front" src="{{include.name}}-front.png" />
    </a>
  </div>
  <div class="col w2">
    <a href="{{include.name}}-top.png">
      <img style="max-height:150px;max-width:200px;" alt="{{include.title}} Top" src="{{include.name}}-top.png" />
    </a>
  </div>
  <div class="col w2">
    <a href="{{include.name}}-side.png">
      <img style="max-height:150px;max-width:200px;" alt="{{include.title}} Side" src="{{include.name}}-side.png" />
    </a>
  </div>
</div>
<div>
  <!-- I'd love for these to be show_scad and show_stl, but Jekyll doesn't allow Liquid v5 which adds the allow_false arg to default -->
  {% unless include.hide_scad %}OpenSCAD: <a href="{{ include.name }}.scad">{{ include.name }}.scad</a><br />{% endunless %}
  {% unless include.hide_stl %}STL: <a href="{{ include.name }}.stl">{{ include.name }}.stl</a>{% endunless %}
</div>

{{ include.desc }}
