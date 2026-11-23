{% assign items = site.data.interests.items %}
{% if items and items.size > 0 %}
<h2>{{ site.data.interests.heading | default: "Interests" }}</h2>
<ul>
{% for item in items %}
<li>
{% if item.title %}<strong>{{ item.title }}</strong>{% endif %}{% if item.detail %} {{ item.detail }}{% endif %}{% if item.url %} <a href="{{ item.url }}">{{ item.link_label | default: item.url }}</a>{% endif %}
</li>
{% endfor %}
</ul>
{% endif %}
