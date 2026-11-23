<h2 id="experience" class="section-anchor"><span id="curriculum"></span>{{ site.data.curriculum.heading | default: "Experience" }}</h2>
{% assign items = site.data.curriculum.items %}
{% if items and items.size > 0 %}
<div class="card-list">
{% for item in items %}
<article class="entry-card">
{% if item.period %}<p class="entry-year">{{ item.period }}</p>{% endif %}
{% if item.organization %}<h3>{{ item.organization }}</h3>{% endif %}
{% assign role = item.role | default: item.title %}
{% if role %}<p>{{ role }}</p>{% endif %}
{% if item.detail %}<p>{{ item.detail }}</p>{% endif %}
{% if item.url and item.link_label %}<p><a href="{{ item.url }}">{{ item.link_label }}</a></p>{% endif %}
</article>
{% endfor %}
</div>
{% else %}
<p class="empty-note">To be soon</p>
{% endif %}
