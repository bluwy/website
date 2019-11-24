---
layout: post
title: Extending Include Components in Jekyll
date: 2019-07-19 02:51:00 +0800
tags: jekyll
comments: true
---

This post will highlight some tips and tricks of the `include` tag to build more advanced components in Jekyll. The [`include` docs][include-docs] explains it thoroughly, and this post will summarize it with some of my extra findings.

<div class="text-center opacity-70 my-5">•••</div>

Jekyll provides a very convenient Liquid tag to import other codes, known as `include`. A simple `include` tag would look like this:

{% highlight liquid %}
{% raw %}
{{ include somecode.html }}
{% endraw %}
{% endhighlight %}

But there's more to it, you can use global Liquid variables in the included code too. Like so:

{% capture code %}
{% highlight html %}
{% raw %}
{% assign person = "Darren" %}
{% include somecode.html %}
{% endraw %}
{% endhighlight %}
{% endcapture %}
{%- include code-block.html code=code title='index.html' -%}

{% capture code %}
{% highlight html %}
{% raw %}
<p>Hello, {{ person }}!</p>
{% endraw %}
{% endhighlight %}
{% endcapture %}
{%- include code-block.html code=code title='somecode.html' -%}

{% capture code %}
{% highlight html %}
<p>Hello, Darren!</p>
{% endhighlight %}
{% endcapture %}
{%- include code-block.html code=code title='Output' -%}

Or if you prefer scoping your variables locally:

{% capture code %}
{% highlight html %}
{% raw %}
<!-- Either like this  -->
{% include somecode.html person="Darren" %}

<!-- Or like this would work too  -->
{%- assign name = "Darren" -%}
{% include somecode.html person=name %}
{% endraw %}
{% endhighlight %}
{% endcapture %}
{%- include code-block.html code=code title='index.html' -%}

{% capture code %}
{% highlight html %}
{% raw %}
<p>Hello, {{ include.person }}!</p>
{% endraw %}
{% endhighlight %}
{% endcapture %}
{%- include code-block.html code=code title='somecode.html' -%}

{% capture code %}
{% highlight html %}
<!-- Either like this  -->
<p>Hello, Darren!</p>

<!-- Or like this would work too  -->
<p>Hello, Darren!</p>
{% endhighlight %}
{% endcapture %}
{%- include code-block.html code=code title='Output' -%}

Notice we're accessing the variables passed by prefixing 'include.', and now we have a simple component functionality.

### My findings

During the development of my [Store page][store-page], I needed to embed custom HTML code in my components. Of course I could just write it and pass it directly as an argument, but then I can't use double quotes (") in my code. 

That's where the `capture` tag comes in, we can wrap our code in it and the quotes will be automatically escaped! Syntax highlighting would work normally too in your favorite text editor.

{% capture code %}
{% highlight html %}
{% raw %}
{% capture btn_html %}
<button onclick="hello('Darren')">Say hello</button>
{% endcapture %}
{% include somecode.html content=btn_html %}
{% endraw %}
{% endhighlight %}
{% endcapture %}
{%- include code-block.html code=code title='index.html' -%}

{% capture code %}
{% highlight html %}
{% raw %}
<p>{{ include.content }}</p>
{% endraw %}
{% endhighlight %}
{% endcapture %}
{%- include code-block.html code=code title='somecode.html' -%}

{% capture code %}
{% highlight html %}
<p><button onclick="hello('Darren')">Say hello</button></p>
{% endhighlight %}
{% endcapture %}
{%- include code-block.html code=code title='Output' -%}

And that's about the basics of Jekyll components.

### Downsides

Do note that it's not recommended to overuse the `include` tag as mentioned in the [docs][include-docs]. Too many includes will slow down build time. 

&nbsp;

I hope you enjoy reading!

[include-docs]: https://jekyllrb.com/docs/includes/
[store-page]: {% link store/index.html %}
