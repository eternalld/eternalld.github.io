{% assign items = site.data.publications.items %}
{% if items and items.size > 0 %}
<h2 id="publications" class="publications-heading section-anchor">{{ site.data.publications.heading | default: "Publications" }}</h2>
<div class="publications publications-compact">
{% assign show_corresponding = false %}
{% for link in items %}
{% for person in link.authors %}
{% if person.role == "corresponding" %}{% assign show_corresponding = true %}{% endif %}
{% endfor %}
{% endfor %}
{% if show_corresponding %}
<p class="author-note"><abbr title="corresponding author">†</abbr> corresponding author</p>
{% endif %}
<ol class="pub-compact">
{% for link in items %}
<li>
<p class="pub-compact__lead">
{% if link.venue_short %}<abbr class="badge badge-static">{{ link.venue_short }}</abbr>{% endif %}
<span class="pub-compact__title">{% if link.title_url %}<a href="{{ link.title_url }}">{{ link.title }}</a>{% else %}{{ link.title }}{% endif %}</span>
</p>
{% if link.authors %}
<p class="pub-compact__authors">
{% for person in link.authors %}{% if person.highlight %}<strong class="author-self">{{ person.name }}</strong>{% else %}{{ person.name }}{% endif %}{% if person.role == "corresponding" %}<sup><abbr title="corresponding author">†</abbr></sup>{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}
</p>
{% endif %}
{% if link.venue %}<p class="pub-compact__venue"><em>{{ link.venue }}</em></p>{% endif %}
{% if link.links %}
<p class="pub-compact__links">
{% for item in link.links %}
{% if item.url and item.label %}<a class="resource-link" href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.label }}</a>{% endif %}
{% endfor %}
</p>
{% endif %}
</li>
{% endfor %}
</ol>
</div>
{% endif %}
