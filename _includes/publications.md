{% assign items = site.data.publications.items %}
{% if items and items.size > 0 %}
<h2 id="publications" class="publications-heading">{{ site.data.publications.heading | default: "Publications" }}</h2>
<div class="publications">
<ol class="bibliography">
{% for link in items %}
<li>
<div class="pub-row">
  <div class="col-sm-3 abbr no-teaser">
    {% if link.venue_short %}
    <abbr class="badge badge-static">{{ link.venue_short }}</abbr>
    {% endif %}
  </div>
  <div class="col-sm-9">
    <div class="title">{% if link.title_url %}<a href="{{ link.title_url }}">{{ link.title }}</a>{% else %}{{ link.title }}{% endif %}</div>
    {% if link.authors %}
    <div class="author">
      {% for person in link.authors %}{% if person.highlight %}<strong>{{ person.name }}</strong>{% else %}{{ person.name }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}
    </div>
    {% endif %}
    {% if link.venue %}<div class="periodical"><em>{{ link.venue }}</em></div>{% endif %}
    {% if link.links %}
    <div class="links">
      {% for item in link.links %}
      <a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.label }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>
</li>
{% endfor %}
</ol>
</div>
{% endif %}
