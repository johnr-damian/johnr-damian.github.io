---
#For Simple Document

#Date Created
date: {{ .Date }}
description: null
draft: true
keywords: null
spotlight: null
spotlight_type: canvas
title: {{ replace (title .File.TranslationBaseName) "-" " " }}
---