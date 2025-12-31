---
layout: base.html
title: Blog
description: johnr-damian's blog
---
{%- for post in collections.blogposts -%}  
* [{{ post.data.title }}]({{ post.url }})
{%- endfor -%}  