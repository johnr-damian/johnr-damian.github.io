---
#Academic Journal

areas: [procedural animation]
categories: [academic]
#Date Created
date: 2020-03-26T14:33:53+08:00
#Page Description
description: Creating a Slime Academic Journal in Blog Algomorphogenesis
draft: false
languages: [javascript, three.js]
scripts: [scripts/blog/slime.js]
three: true
#Page Title
title: Creating a Slime 01
---

{{% partition class="text-content" %}}
Hello! In today's journal, I wanted to simulate a living slime as seen in video games.  
I got inspired to simulate these creatures after playing LocoRoco, Minecraft, and Terraria again.  
To create a slime, I need to create a model of a slime itself in three.js.  
As someone new in using three.js, I want to create this slime as simple as possible by using built-in  
materials and geometries in the framework. Let's get started!  

Since I wanted it to have a cartoonish look, I used MeshToonMaterial for the SphereGeometry.  
  
```js
class Slime
{
    constructor()
    {
        let geometry = new THREE.SphereGeometry(2, 20, 20, 0, 6.3, 0, 6.3);
        let material = new THREE.MeshBasicMaterial({
            color: 0x80ceeb
        });

        this.Mesh = new THREE.Mesh(geometry, material);
    }
}
```
  
We now have a static sphere with a color of skyblue. The next thing we want  
is a simple physics to simulate it like a ball.

{{% /partition %}}