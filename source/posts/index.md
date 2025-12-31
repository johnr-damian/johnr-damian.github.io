---
layout: base.html
title: Blog
description: johnr-damian's blog
date: Last Modified
---
{%- for post in collections.blogposts -%}  
<dl>
    <dt>
        <a href="{{ post.url }}"><h5>{{ post.data.title }} • {{ post.date | blogdate }}</h5></a>
    </dt>
    <dd>{{ post.data.summary }}</dd>
</dl>
{%- endfor -%}  