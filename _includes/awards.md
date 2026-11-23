<h2 id="awards" class="section-anchor">{{ site.data.awards.heading | default: "Awards & Honors" }}</h2>
{% assign items = site.data.awards.items %}
{% if items and items.size > 0 %}
{% assign years = items | map: "year" | uniq | sort | reverse %}
<div class="award-list">
{% if years.size > 1 %}
<div class="year-filter" role="group" aria-label="Award years">
<button type="button" data-year-button="all" aria-pressed="true">Full</button>
{% for year in years %}
<button type="button" data-year-button="{{ year }}" aria-pressed="false">{{ year }}</button>
{% endfor %}
</div>
{% endif %}
{% for year in years %}
<h3 data-award-year="{{ year }}">{{ year }}</h3>
<ul>
{% for item in items %}
{% if item.year == year and item.title %}
<li data-award data-year="{{ item.year }}">
<strong>{{ item.title }}</strong>
{% if item.source_url and item.source %}<a href="{{ item.source_url }}">{{ item.source }}</a>{% elsif item.source %}{{ item.source }}{% endif %}
{% if item.scope %}<span class="scope">{{ item.scope }}</span>{% endif %}
</li>
{% endif %}
{% endfor %}
</ul>
{% endfor %}
</div>
{% else %}
<p class="empty-note">To be soon</p>
{% endif %}
