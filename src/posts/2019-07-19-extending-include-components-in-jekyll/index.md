---
title: Extending Include Components in Jekyll
date: "2019-07-19T10:51:00.000Z"
---

This post will highlight some tips and tricks of the `include` tag to build more advanced components in Jekyll. The [`include` docs][include-docs] explains it thoroughly, and this post will summarize it with some of my extra findings.

## Include Tag

Jekyll provides a very convenient Liquid tag to import other codes, known as `include`. A simple `include` tag would look like this:

```html
{{ include somecode.html }}
```

But there's more to it, you can use global Liquid variables in the included code too. Like so:

<!-- prettier-ignore -->
```html:title=index.html
{% assign person = "Darren" %}
{% include somecode.html %} // highlight-line
```

```html:title=somecode.html
<p>Hello, {{ person }}!</p>
```

```html:title=Output
<p>Hello, Darren!</p>
```

Or if you prefer scoping your variables locally:

<!-- prettier-ignore -->
```html:title=index.html
<!-- Either like this -->
{% include somecode.html person="Darren" %}

<!-- Or like this -->
{%- assign name = "Darren" -%}
{% include somecode.html person=name %}
```

```html:title=somecode.html
<p>Hello, {{ include.person }}!</p>
```

```html:title=Output
<!-- Either like this -->
<p>Hello, Darren!</p>

<!-- Or like this -->
<p>Hello, Darren!</p>
```

Notice we're accessing the variables passed by prefixing 'include.', and now we have a simple component functionality.

## My Findings

During the development of my previous website (Now I'm using Gatsby), I needed to embed custom HTML code in my components. Of course I could just write it and pass it directly as an argument, but then I can't use double quotes (") in my code.

That's where the `capture` tag comes in, we can wrap our code in it and the quotes will be automatically escaped! Syntax highlighting would work normally too in your favorite text editor.

```html:title=index.html
<button onclick="hello('Darren')">Say hello</button>
```

```html:title=somecode.html
<p>{{ include.content }}</p>
```

```html:title=Output
<p><button onclick="hello('Darren')">Say hello</button></p>
```

And that's about the basics of Jekyll components.

## Downsides

Do note that it's not recommended to overuse the `include` tag as mentioned in the [docs][include-docs]. Too many includes will slow down build time.

I hope you enjoy reading!

[include-docs]: https://jekyllrb.com/docs/includes/
