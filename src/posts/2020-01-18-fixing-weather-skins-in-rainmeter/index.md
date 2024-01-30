---
title: Fixing Weather Skins in Rainmeter
---

Another day, another weather service down. Here are the steps to fix broken weather skins and migrate to different weather service APIs.

<!-- endexcerpt -->

**Note**: This is not a full tutorial on how to fix weather skins, but rather to give you an idea on what needs to be done. I'll only be showing basic regex techniques to substitute the new data.

> **TL;DR**: It's tedious to fix a weather skin unless it's a really simple one.

**Update 5/6/2020**: Before getting technical below, you might be interested in some of the threads from the Rainmeter forum.

- [Weather Skins](https://forum.rainmeter.net/viewtopic.php?t=34689): List of currently functioning weather skins.
- [Weather.com - Parsing the JSON](https://forum.rainmeter.net/viewtopic.php?f=118&t=34628): Use data from [weather.com](https://weather.com). No sign up required.
- [Weather.com JSON not loading correctly](https://forum.rainmeter.net/viewtopic.php?f=118&t=35342): In case this happens.

## Table of Contents

<!-- toc -->

## Getting Ready

Before we get started, here's what you need to know about what we'll be doing in the next few minutes.

We will start by looking for a new weather API. It could be any weather API as long as it provides the information you need and of course, a reasonable request rate.

Next, we will change to the skin's API endpoint and apply a new regex to it. (Don't worry, I'll guide you through it)

And finally, I'll list what else that needs to be done because different skins have different ways of handling and displaying weather.

## In Search of a Weather API

> **Update 12/6/2020**: [Dark Sky](https://darksky.net) have been acquired by Apple and is shuting down its services by 1 July 2020 :(

There are a few weather API services out there with generous free tiers, such as [OpenWeatherMap](https://openweathermap.org/price), [Weatherbit](https://www.weatherbit.io/pricing), [AccuWeather](https://developer.accuweather.com/packages), and [Meteomatics](https://www.meteomatics.com/en/weather-api/). Of course, you can choose any other services as you wish.

Most weather API services require sign ups to acquire an API key, which is totally fair to prevent DDOS on their servers.

Once you acquired your API key, hop on to the next step!

> **Note**: **DO NOT** share your API key. Someone who has your API key may randomly use it and easily hit the API request limit.

## Using the API

The instructions below will be skin agnostic, but since different weather skins may need different data, you may need to do some extra tweaks.

> **Note**: I'm using the [OpenWeatherMap](https://openweathermap.org) as the API and the [Mond weather skin](https://www.deviantart.com/hiphopium/art/Mond-762455575) as our ~~victim~~ example.

### Changing the API Endpoint

For the Mond weather skin, in `Weather.ini`, here's the issue (Most other weather skins has this too):

```ini
[MeasureCurrent]
Measure=Plugin
Plugin=WebParser.dll
UpdateRate=900
Url=http://wxdata.weather.com/wxdata/weather/local/#Location#?cc=*&unit=#Unit#
RegExp="(?siU)<head>.*<ut>(.*)</ut>.*<dnam>(.*),.*</dnam>.*<tmp>(.*)</tmp>.*<t>(.*)</t>.*<icon>(.*)</icon>"
```

Every weather skin will almost always pull data through the [WebParser](https://docs.rainmeter.net/manual/measures/webparser/) measure. The `Url` key is our API endpoint, `RegExp` is our regex to be match on our response data, which may be in the form of JSON or XML (Depends on what the service provides). Learn more about WebParser in the [official tutorial](https://docs.rainmeter.net/tips/webparser-tutorial/).

Looking at the code, the url `wxdata.weather.com` is deprecated, so we need to change that. Let's change it to OpenWeatherMap's API. Here's what it should look like:

```ini
[MeasureCurrent]
Measure=Plugin
Plugin=WebParser.dll
UpdateRate=900
// highlight-next-line
Url=https://api.openweathermap.org/data/2.5/weather?appid=<your-api-key>&id=#Location#&units=#Unit#&mode=xml
RegExp="(?siU)<head>.*<ut>(.*)</ut>.*<dnam>(.*),.*</dnam>.*<tmp>(.*)</tmp>.*<t>(.*)</t>.*<icon>(.*)</icon>"
```

Replace `<your-api-key>` with your API key (Make sure to remove it before sharing your code to others). As you can see, I've reused the variables for the location id and temperature unit as the API parameters. Learn more about Rainmeter's variables [here](https://docs.rainmeter.net/manual/variables/) and OpenWeatherMap's API [here](https://openweathermap.org/current).

Also note I'm using XML format as denoted at `mode=xml` in the `Url`.

### Changing the RegExp

Now we have reached the real deal, the almighty Regex battlefield. Take a deep breath and let's dive in.

Before we start, let's take a look at what data Mond needs. Below are the measure Mond has that retrieves data from the WebParser's regex:

```ini
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
```

Mond has 5 data: temperature unit, location, temperature, weather condition and icons.

Now let's inspect our XML data and see how we can capture them. Below is an example response:

```xml
<current>
  <city id="2643743" name="London"> // highlight-line
    <coord lon="-0.13" lat="51.51"/>
    <country>GB</country>
    <sun rise="2017-01-30T07:40:36" set="2017-01-30T16:47:56"/>
  </city>
  <temperature value="7" min="5" max="8" unit="metric"/> // highlight-line
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
  <weather number="701" value="mist" icon="50d"/> // highlight-line
  <lastupdate value="2017-01-30T15:50:00"/>
</current>
```

From the XML, here are the values we need to get:

1. Temperature unit: `metric` from the `<temperature unit="">` tag
2. Location: `London` from the `<city name="">` tag
3. Temperature: `7` fromt the `<temperature value="">` tag
4. Weather condition: `mist` from the `<weather value="">` tag
5. Icon: `50d` from the `<weather icon="">` tag

So our regex will be like this:

```ini
RegExp=(?siU)<city.*name="(.*)".*<temperature.*value="(.*)".*unit="(.*)".*<weather .*value="(.*)".*icon="(.*)"
```

Good lord what is this!

First, we declare `(?siU)`, which is the option modifier for the regex (More info [here](https://docs.rainmeter.net/tips/webparser-tutorial/)).

Next, take a look at `<city.*name="(.*)"`. It kinda looks like the `<city>` tag in the original XML, but what's `.*`? It consists of two characters: `.` and `*`. `.` means "any character", `*` means "of any length", so combined it means "match any character of any length".

We also have the parentheses `(.*)`, and the parentheses is called a capture group that will be captured and return so we can use the data.

So what this whole thing means is that we match from `<city`, and then `.*` for any character of any length, until `name="`, and then match `(.*)` for any character of any length again but this time capturing it too, and finally it'll will match until it reaches `"`. _whoo~_

The rest are also of the same form as `<city.*name="(.*)"`.

If you're still confused, try https://www.debuggex.com/ to visualize the regex. First, paste the regex into the "My regular expression" text box and paste the XML into the "My test data" text box. And don't forget to change "JavaScript" to "PCRE" (Rainmeter uses PERL compatible regular expressions). Notice that the data we need are being highlighted.

And lastly, remember the 5 measures that Mond uses to get the regex's data, we have to tweak a bit since the capturing order changed.

`StringIndex` is the parentheses number in the `RegExp`. Notice we have 5 `(.*)`, those are the capturing groups that the 5 measures will have to index, with the first `(.*)` means `StringIndex=1` and so on.

Finally the code should be like this:

```ini
[MeasureCurrent]
Measure=Plugin
Plugin=WebParser.dll
UpdateRate=900
Url=https://api.openweathermap.org/data/2.5/weather?appid=<your-api-key>&id=#Location#&units=#Unit#&mode=xml
// highlight-next-line
RegExp=(?siU)<city.*name="(.*)".*<temperature.*value="(.*)".*unit="(.*)".*<weather .*value="(.*)".*icon="(.*)"

[MeasureTempUnit]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
// highlight-next-line
StringIndex=3

[MeasureLocation]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
// highlight-next-line
StringIndex=1

[MeasureWeatherTemp]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
// highlight-next-line
StringIndex=2

[MeasureWeatherCond]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
// highlight-next-line
StringIndex=4
Substitute=#Conditions#

[MeasureWeatherIcons]
Measure=Plugin
Plugin=WebParser.dll
Url=[MeasureCurrent]
// highlight-next-line
StringIndex=5
```

## But There's More

After all the hard work, are we done? Yes, and no. We fixed the WebParser, provided correct data, but it's not a perfect skin yet.

We still have these TODOs:

1. Change variable `#Unit#` settings to accept `metric` and `imperial` so it fits the APIs format.
2. Change variable `#Location#` to accept OpenWeatherMap's id format.
3. OpenWeatherMap's icon value is different from `wxdata`'s, so since the Mond weather icons are named, 1.png..., we have to rename to [OpenWeatherMap's format](https://openweathermap.org/weather-conditions).

> **Note**: I did not actually fix the Mond weather skin. It's still broken at its current state (last I checked).

## Conclusion

And there's that. A lot of work has to be done depending on how complex the skin is. But this should give you an idea on what needs to be done to migrate a skin to a new API.

If you spot any errors or find any false information, feel free to contact me on [Reddit](https://reddit.com/u/IamLUG) or submit an issue on [GitHub](https://github.com/bluwy/website) if you prefer. I'll fix it as soon as possible.

**Update 24/4/2022**: I've not used Rainmeter for a long time so I'm likely not able to help with any questions you have. The [Rainmeter forum](https://forum.rainmeter.net) or [Discord server](https://discord.gg/rainmeter) would be the best place to start.

Happy coding!
