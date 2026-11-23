{% capture section_links %}
{% assign research_items = site.data.interests.items %}
{% if research_items and research_items.size > 0 %}
<li><a href="#research-interests">Research Interests</a></li>
{% endif %}
{% assign personal_items = site.data.interests.personal_items %}
{% if personal_items and personal_items.size > 0 %}
<li><a href="#personal-interests">Personal Interests</a></li>
{% endif %}
{% capture news_rows %}{% include news-items.md %}{% endcapture %}
{% assign news_rows = news_rows | strip %}
{% if news_rows != "" %}
<li><a href="#news">News</a></li>
{% endif %}
{% assign publication_items = site.data.publications.items %}
{% if publication_items and publication_items.size > 0 %}
<li><a href="#publications">Publications</a></li>
{% endif %}
{% assign project_items = site.data.projects.items %}
{% if project_items and project_items.size > 0 %}
<li><a href="#projects">Projects</a></li>
{% endif %}
{% assign curriculum_items = site.data.curriculum.items %}
{% if curriculum_items and curriculum_items.size > 0 %}
<li><a href="#curriculum">{{ site.data.curriculum.heading | default: "履历表" }}</a></li>
{% endif %}
{% endcapture %}
{% assign section_links = section_links | strip %}
{% if section_links != "" %}
<nav class="section-nav" aria-label="On this page">
<ul>
{{ section_links }}
</ul>
</nav>
{% endif %}
