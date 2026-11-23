{% capture news_rows %}{% include news-items.md %}{% endcapture %}
{% assign news_rows = news_rows | strip %}
{% if news_rows != "" %}
<h2 id="news" class="section-anchor">{{ site.data.news.heading | default: "News" }}</h2>
<ul class="news-list">
{{ news_rows }}
</ul>
{% endif %}
