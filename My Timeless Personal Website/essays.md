---
layout: default
title: "Essays"
description: "Long-form contemplative writing on technology, philosophy, and meaningful living"
---

# Essays

<div class="essays-list">
{% for essay in site.essays reversed %}
  <article class="essay-item">
    <h2><a href="{{ essay.url | relative_url }}">{{ essay.title }}</a></h2>
    {% if essay.subtitle %}
      <p class="essay-subtitle">{{ essay.subtitle }}</p>
    {% endif %}
    <p class="essay-description">{{ essay.description }}</p>
    <div class="essay-meta">
      <time datetime="{{ essay.date | date: '%Y-%m-%d' }}">{{ essay.date | date: '%B %d, %Y' }}</time>
      {% if essay.reading-time %}
        <span class="reading-time">{{ essay.reading-time }} min read</span>
      {% endif %}
    </div>
    {% if essay.tags %}
      <div class="essay-tags">
        {% for tag in essay.tags %}
          <span class="tag">{{ tag }}</span>
        {% endfor %}
      </div>
    {% endif %}
  </article>
{% endfor %}
</div>