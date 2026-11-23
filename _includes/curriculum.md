{% assign items = site.data.curriculum.items %}
{% if items and items.size > 0 %}
<h2 id="curriculum">{{ site.data.curriculum.heading | default: "履历表" }}</h2>
<ul>
{% for item in items %}
<li>
{% if item.period %}<strong>{{ item.period }}</strong> {% endif %}{{ item.title }}{% if item.organization %}, {{ item.organization }}{% endif %}{% if item.detail %} — {{ item.detail }}{% endif %}
</li>
{% endfor %}
</ul>
{% endif %}
