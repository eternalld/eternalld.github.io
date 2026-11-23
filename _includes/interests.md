{% assign items = site.data.interests.items %}
{% if items and items.size > 0 %}
<h2 id="research-interests" class="section-anchor">{{ site.data.interests.heading | default: "Research Interests" }}</h2>
<ul>
{% for item in items %}
<li>
{% if item.title %}<strong>{{ item.title }}</strong>{% endif %}{% if item.detail %} {{ item.detail }}{% endif %}{% if item.url %} <a href="{{ item.url }}">{{ item.link_label | default: item.url }}</a>{% endif %}
</li>
{% endfor %}
</ul>
{% endif %}
{% assign personal_items = site.data.interests.personal_items %}
{% if personal_items and personal_items.size > 0 %}
<h2 id="personal-interests" class="section-anchor">{{ site.data.interests.personal_heading | default: "Personal Interests" }}</h2>
<ul>
{% for item in personal_items %}
<li>
{% if item.title %}<strong>{{ item.title }}</strong>{% endif %}{% if item.detail %} {{ item.detail }}{% endif %}{% if item.url %} <a href="{{ item.url }}">{{ item.link_label | default: item.url }}</a>{% endif %}
</li>
{% endfor %}
</ul>
{% endif %}
