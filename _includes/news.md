{% assign items = site.data.news.items %}
{% if items and items.size > 0 %}
<h2>{{ site.data.news.heading | default: "News" }}</h2>
<ul>
{% for item in items %}
<li>{% if item.text %}{{ item.text }}{% else %}{{ item }}{% endif %}</li>
{% endfor %}
</ul>
{% endif %}
