{% assign posts = site.data.posts.items | sort: "date" | reverse %}
{% if posts and posts.size > 0 %}
{% assign tag_blob = "" %}
{% for post in posts %}
{% for tag in post.tags %}
{% assign tag_blob = tag_blob | append: "|" | append: tag %}
{% endfor %}
{% endfor %}
{% assign tag_list = tag_blob | split: "|" | uniq | sort %}
{% capture tag_links %}
{% for tag in tag_list %}
{% if tag != "" %}
<a href="/blog.html?tag={{ tag | uri_escape }}">{{ tag }}</a>
{% endif %}
{% endfor %}
{% endcapture %}
{% assign tag_links = tag_links | strip %}
{% if include.show_tags and tag_links != "" %}
<nav class="tag-filter" aria-label="Blog tags">
<a href="/blog.html">All</a>
{{ tag_links }}
</nav>
{% endif %}
<ul class="blog-list">
{% for post in posts %}
{% unless include.limit and forloop.index > include.limit %}
<li data-post data-tags="{% for tag in post.tags %}{{ tag }} {% endfor %}">
{% if post.date %}<time>{{ post.date }}</time>{% endif %}
{% if post.url %}<a href="{{ post.url }}">{{ post.title }}</a>{% else %}{{ post.title }}{% endif %}
{% if post.summary %}<p>{{ post.summary }}</p>{% endif %}
</li>
{% endunless %}
{% endfor %}
</ul>
{% else %}
<p class="empty-note">To be soon</p>
{% endif %}
