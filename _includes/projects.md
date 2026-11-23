<h2 id="projects" class="section-anchor">{{ site.data.projects.heading | default: "Projects" }}</h2>
{% assign items = site.data.projects.items %}
{% if items and items.size > 0 %}
<div class="card-list" data-project-list data-initial="4">
{% for item in items %}
<article class="entry-card" data-project{% if forloop.index > 4 %} hidden{% endif %}>
<h3>{{ item.title }}{% if item.year %} <span class="entry-year">{{ item.year }}</span>{% endif %}</h3>
{% if item.summary %}<p>{{ item.summary }}</p>{% endif %}
{% if item.links %}
<p class="entry-links">
{% for link in item.links %}
{% if link.url and link.label %}<a href="{{ link.url }}">{{ link.label }}</a>{% endif %}
{% endfor %}
</p>
{% endif %}
</article>
{% endfor %}
{% if items.size > 4 %}
<button type="button" data-project-toggle aria-expanded="false">Show {{ items.size | minus: 4 }} more projects</button>
{% endif %}
</div>
{% else %}
<p class="empty-note">To be soon</p>
{% endif %}
