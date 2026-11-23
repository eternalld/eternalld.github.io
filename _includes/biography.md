{% if site.bio and site.bio != "" %}
<h2>About Me</h2>
{{ site.bio | markdownify }}
{% endif %}
