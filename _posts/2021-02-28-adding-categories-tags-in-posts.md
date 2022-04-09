---
layout: post
title:  "Trabajando..."
summary: "Un proyecto de código abierto"
author: sergio
date: '2022-04-16 1:35:23 +0530'
category: ['jekyll','guides', 'sample_category']
tags: jekyll
thumbnail: /assets/img/posts/code.jpg
keywords: devlopr jekyll, how to use devlopr, devlopr, how to use devlopr-jekyll, devlopr-jekyll tutorial,best jekyll themes, multi categories and tags
usemathjax: false
permalink: /blog/adding-categories-tags-in-posts/
---

## Adding Multiple Categories in Posts

To add categories in blog posts all you have to do is add a **category** key with category values in frontmatter of the post :

```yml
---
category: ['jekyll', 'guides', 'sample_category']
---
```



```jsx
---
layout: page
title: Guides
permalink: /blog/categories/your_category_name/
---

<h5> Otros post de la categoría : {{ page.title }} </h5>

<div class="card">
{% for post in site.categories.your_category_name %}
 <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div>
```
