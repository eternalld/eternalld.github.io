<h2 id="news" class="section-anchor">{{ site.data.news.heading | default: "News" }}</h2>
{% capture news_rows %}{% include news-items.md %}{% endcapture %}
{% assign news_rows = news_rows | strip %}
{% if news_rows != "" %}
<div class="news-box" tabindex="0">
<ul class="news-list">
{{ news_rows }}
</ul>
</div>
{% else %}
<p class="empty-note">To be soon</p>
{% endif %}
