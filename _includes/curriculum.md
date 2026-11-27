<h2 id="experience" class="section-anchor"><span id="curriculum"></span>{{ site.data.curriculum.heading | default: "Experience" }}</h2>
{% assign items = site.data.curriculum.items %}
{% if items and items.size > 0 %}
<div class="experience-list">
{% for item in items %}
<article class="experience-card">
<div class="experience-info">
<div class="experience-head">
{% if item.organization %}<strong>{{ item.organization }}</strong>{% endif %}
{% if item.period %}<em>{{ item.period }}</em>{% endif %}
</div>
{% if item.parts %}<p>{% for part in item.parts %}{% if part.focus %}<span class="experience-focus">{{ part.text }}</span>{% else %}{{ part.text }}{% endif %}{% endfor %}</p>{% elsif item.detail %}<p>{{ item.detail }}</p>{% endif %}
</div>
</article>
{% endfor %}
</div>
{% else %}
<p class="empty-note">To be soon</p>
{% endif %}
