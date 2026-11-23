{% assign items = site.data.projects.items %}
{% if items and items.size > 0 %}
<h2 id="projects" class="section-anchor">{{ site.data.projects.heading | default: "Projects" }}</h2>
<ul>
{% for item in items %}
<li>
{% if item.url %}<a href="{{ item.url }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}{% if item.summary %} — {{ item.summary }}{% endif %}
</li>
{% endfor %}
</ul>
{% endif %}
