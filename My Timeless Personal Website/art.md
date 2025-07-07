---
layout: default
title: "Art"
description: "Visual art portfolio featuring digital art, photography, and creative explorations"
---

<link rel="stylesheet" href="{{ '/static/css/artwork.css' | relative_url }}">

# Art

<div class="artwork-gallery">
{% for artwork in site.art reversed %}
  <article class="artwork-item">
    {% if artwork.thumbnail %}
      <div class="artwork-image">
        <a href="{{ artwork.url | relative_url }}">
          <img src="{{ artwork.thumbnail | relative_url }}" alt="{{ artwork.title }}" loading="lazy">
        </a>
      </div>
    {% endif %}
    <div class="artwork-info">
      <h2><a href="{{ artwork.url | relative_url }}">{{ artwork.title }}</a></h2>
      {% if artwork.subtitle %}
        <p class="artwork-subtitle">{{ artwork.subtitle }}</p>
      {% endif %}
      <p class="artwork-description">{{ artwork.description }}</p>
      <div class="artwork-meta">
        <time datetime="{{ artwork.date | date: '%Y-%m-%d' }}">{{ artwork.date | date: '%B %d, %Y' }}</time>
        {% if artwork.medium %}
          <span class="medium">{{ artwork.medium }}</span>
        {% endif %}
      </div>
      {% if artwork.tags %}
        <div class="artwork-tags">
          {% for tag in artwork.tags %}
            <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
      {% endif %}
    </div>
  </article>
{% endfor %}
</div>

<script src="{{ '/static/js/gallery.js' | relative_url }}"></script>