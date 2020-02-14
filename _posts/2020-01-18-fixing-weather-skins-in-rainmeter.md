---
layout: post
title: Fixing Weather Skins in Rainmeter?
date: '2020-01-18 20:10:00 +0800'
tags: rainmeter
comments: true
---

Another day, another weather service down. Here's the steps to fix broken weather skins and migrate to different weather service APIs.

Note: this is not a full tutorial on how to fix weather skins, but rather to give you an idea on what needs to be done. I'll only be showing basic regex techniques that needs to be done. There's too much to be done to fit in this blog post.

### Update 14/2/2020

While this post talks about using an API, JSMorley presented [a web scraping alternative](https://forum.rainmeter.net/viewtopic.php?t=34470) which in most cases can be much easier to set up. I **highly recommend** checking it out before continuing on this post.

<br>

> **TL;DR**: While it may seem that you have to just swap the API endpoint and regex, there's a high chance that the API provides different formats of data that causes more work that needs to be done.

> **Alternate TL;DR**: It's tedious to fix a weather skin unless it's a really simple one.

<div class="text-center opacity-70 my-5">•••</div>

### Table of Contents

* [Getting Ready](#getting-ready)
* [In Search of a new Weather API](#in-search-of-a-new-weather-api)
* [Using our new API](#using-our-new-api)
  * [Changing the API Endpoint](#changing-the-api-endpoint)
  * [Changing the RegExp](#changing-the-regexp)
* [And There's More](#and-theres-more)
* [Conclusion](#conclusion)

### Getting Ready

Before we get started, here's what you need to know about what we'll be doing in the next `n` minutes.

We will start by looking for a new weather API. It could be any weather api as long as it provides the information you need and of course, a reasonable request rate.

Next, we will change to the skin's API endpoint and apply a new regex to it. (Don't worry, I'll guide you through it)

And finally, I'll list what else that needs to be done because different skins have different ways of handling and displaying weather.

<br>

### In Search of a new Weather API

There are many weather API services out there with generous free tiers. [OpenWeatherMap](https://openweathermap.org) and [Dark Sky](https://darksky.net) both provide decent timely API calls, with max 60 calls/minute for OpenWeatherMap and 1000 calls/day for Dark Sky. Of course, you can choose any other services as you wish.

Unless you're using a public weather API, most services require sign ups to acquire an API key, which is totally fair to prevent DDOS-ing on their servers.

Once you acquired your API key, hop on to the next step!

> Note: **DO NOT** share your API key. Someone who has your API key may randomly use it and easily hit the API request limit. 

<br>

### Using our new API

The instructions below will be skin agnostic, but since different weather skins may need different data, you may need to do some extra tweaks.

> Note: I'm using the [OpenWeatherMap](https://openweathermap.org) as the API and the [Mond weather skin](https://www.deviantart.com/hiphopium/art/Mond-762455575) as our ~~victim~~ example.

<br>

#### Changing the API Endpoint

For the Mond weather skin, in `Weather.ini`, here's the issue (Most other weather skins has this too):

{%- highlight ini -%}
[MeasureCurrent]
Measure=Plugin
Plugin=WebParser.dll
UpdateRate=900
Url=http://wxdata.weather.com/wxdata/weather/local/#Location#?cc=*&unit=#Unit#
RegExp="(?siU)<head>.*<ut>(.*)</ut>.*<dnam>(.*),.*</dnam>.*<tmp>(.*)</tmp>.*<t>(.*)</t>.*<icon>(.*)</icon>"
{%- endhighlight -%}

Every weather skin will almost always pull data through the [WebParser](https://docs.rainmeter.net/manual/measures/webparser/) measure. The `Url` key is our API endpoint, `RegExp` is our regex to be match on our response data, which may be in the form of JSON or XML (Depends on what the service provides). Learn more about WebParser in the [official tutorial](https://docs.rainmeter.net/tips/webparser-tutorial/).

Looking at the code, the `Url` `wxdata.weather.com` is deprecated, so we need to change that. Let's change it to OpenWeatherMap's API. Here's what it should look like:

{%- highlight ini -%}
[MeasureCurrent]
Measure=Plugin
Plugin=WebParser.dll
UpdateRate=900
Url=https://api.openweathermap.org/data/2.5/weather?appid=<your-api-key>&id=#Location#&units=#Unit#&mode=xml
RegExp="(?siU)<head>.*<ut>(.*)</ut>.*<dnam>(.*),.*</dnam>.*<tmp>(.*)</tmp>.*<t>(.*)</t>.*<icon>(.*)</icon>"
{%- endhighlight -%}

Replace `<your-api-key>` with your API key (Make sure to remove it before sharing your code to others). As you can see, I've reused the variables for the location id and temperature unit as the API parameters. Learn more about Rainmeter's variables [here](https://docs.rainmeter.net/manual/variables/) and OpenWeatherMap's API [here](https://openweathermap.org/current). 

Also note I'm using XML format as denoted at `mode=xml` in the `Url`.

<br>

#### Changing the RegExp

Now we reached the real deal, the almighty Regex battlefield. Again, no worries, I'll explain as much as I can.

Before we start, let's take a look at what data Mond needs. Below are the measure Mond has that retreives data from the WebParser's regex:

{%- highlight ini -%}
[MeasureTempUnit]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
StringIndex=1

[MeasureLocation]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
StringIndex=2

[MeasureWeatherTemp]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
StringIndex=3

[MeasureWeatherCond]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
StringIndex=4
Substitute=#Conditions#

[MeasureWeatherIcons]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
StringIndex=5
{%- endhighlight -%}

Mond has 5 datas: temperature unit, location, temperature, weather condition and icons.

Now let's inspect our XML data and see how we can capture them. Below is an example response:

{%- highlight xml -%}
<current>
  <city id="2643743" name="London">
    <coord lon="-0.13" lat="51.51"/>
    <country>GB</country>
    <sun rise="2017-01-30T07:40:36" set="2017-01-30T16:47:56"/>
  </city>
  <temperature value="7" min="5" max="8" unit="metric"/>
  <humidity value="81" unit="%"/>
  <pressure value="1012" unit="hPa"/>
  <wind>
    <speed value="4.6" name="Gentle Breeze"/>
    <gusts/>
    <direction value="90" code="E" name="East"/>
  </wind>
  <clouds value="90" name="overcast clouds"/>
  <visibility value="10000"/>
  <precipitation mode="no"/>
  <weather number="701" value="mist" icon="50d"/>
  <lastupdate value="2017-01-30T15:50:00"/>
</current>
{%- endhighlight -%}

From the XML, here's the values we need to get:

1. Temperature unit: `metric` from the `<temperature unit="">` tag
2. Location: `London` from the `<city name="">` tag
3. Temperature: `7` fromt the `<temperature value="">` tag
4. Weather condition: `mist` from the `<weather value="">` tag
5. Icon: `50d` from the `<weather icon="">` tag

So our regex will be like this:

{%- highlight ini -%}
RegExp=(?siU)<city.*name="(.*)".*<temperature.*value="(.*)".*unit="(.*)".*<weather .*value="(.*)".*icon="(.*)"
{%- endhighlight -%}

Good lord what is this!

First, we declare `(?siU)`, which is the option modifier for the regex (More info [here](https://docs.rainmeter.net/tips/webparser-tutorial/)).

Next, take a look at `<city.*name="(.*)"`. It kinda looks like the `<city>` tag in the original XML, but whats `.*`? It consists of two characters: `.` and `*`. `.` means "any character", `*` means "of any length", so combined it means "match any character of any length".

We also have the parentheses `(.*)`, and the parentheses is called a capture group that will be captured and return so we can use the data.

So what this whole thing means is that we match from `<city`, and then `.*` for any character of any length, until `name="`, and then match `(.*)` for any character of any length again but this time capturing it too, and finally it'll will match until it reaches `"`. *whoo~*

The rest are also of the same form as `<city.*name="(.*)"`.

If you're still confused, try [https://www.debuggex.com/](https://www.debuggex.com/) to visualize the regex. First, paste the regex into the "My regular expression" text box and paste the XML into the "My test data" text box. And don't forget to change "JavaScript" to "PCRE" (Rainmeter uses PERL compatible regular expressions).

And lastly, remember the 5 measures that Mond uses to get the regex's data, we have to tweak a bit since the capturing order was changed.

`StringIndex` is the parentheses number in the `RegExp`. Notice we have 5 `(.*)`, those are the capturing groups that the 5 measures will have to index, with the first `(.*)` means `StringIndex=1` and so on.

Finally the code should be like this:

{%- highlight ini -%}
[MeasureCurrent]
Measure=Plugin
Plugin=WebParser.dll
UpdateRate=900
Url=https://api.openweathermap.org/data/2.5/weather?appid=<your-api-key>&id=#Location#&units=#Unit#&mode=xml
RegExp=(?siU)<city.*name="(.*)".*<temperature.*value="(.*)".*unit="(.*)".*<weather .*value="(.*)".*icon="(.*)"

[MeasureTempUnit]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
StringIndex=3

[MeasureLocation]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
StringIndex=1

[MeasureWeatherTemp]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
StringIndex=2

[MeasureWeatherCond]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
StringIndex=4
Substitute=#Conditions#

[MeasureWeatherIcons]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
StringIndex=5
{%- endhighlight -%}

<br>

### And There's More

After all the hard work, are we done? Yes and no. We fixed the WebParser, provided correct data, but it's not a perfect skin yet.

Here's what still needs to be done:
1. Change variable `#Unit#` settings to accept `metric` and `imperial` so it fits the APIs format.
2. Change variable `#Location#` to accept OpenWeatherMap's id format.
3. OpenWeatherMap's icon value is different from `wxdata`'s, so since the Mond weather icons are named, 1.png..., you have to rename to [OpenWeatherMap's format](https://openweathermap.org/weather-conditions).
4. And more I couldn't think of...

> Note: I did not actually fix the Mond weather skin. It's still broken at it's current state. RIP DeviantArt comments.

<br>

### Conclusion

Well, I didn't expect it'll take me this long to write a somewhat simple tutorial (2 hours T-T). But heck it should give you an idea on what needs to be done to migrate a skin to a new API.

If you spot any errors or find any false information, feel free to contact me on [Reddit](https://reddit.com/u/IamLUG) or send an issue or PR on [GitHub](https://github.com/BjornLuG/bjorn-lu) if you prefer. I'll fix it as soon as possible.

Happy coding!