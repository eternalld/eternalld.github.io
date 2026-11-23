{% assign items = site.data.news.items %}
{% for item in items %}
{% if item.date and item.text %}
<li class="news-list__item"><time class="news-list__date">{{ item.date }}</time><span class="news-list__text">{% if item.url %}<a href="{{ item.url }}">{{ item.text }}</a>{% else %}{{ item.text }}{% endif %}</span></li>
{% endif %}
{% endfor %}
