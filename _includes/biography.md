<div class="intro">
  <p class="intro__welcome">{{ site.data.intro.welcome }}</p>
  <h2 class="intro__title">
    {% for line in site.data.intro.title_lines %}
    <span>{{ line }}</span>
    {% endfor %}
  </h2>
  <ul class="intro__tags">
    {% for tag in site.data.intro.tags %}
    <li>{{ tag }}</li>
    {% endfor %}
  </ul>
</div>
{% if site.bio and site.bio != "" %}
<div class="intro__body">
{{ site.bio | markdownify }}
</div>
{% endif %}
