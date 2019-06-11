---
layout: post
title: 3 Ways to Fix Rainmeter Crashes
subtitle: ''
date: 2019-06-06T10:00:54.783Z
tags: rainmeter
comments: true
---
Sometimes Rainmeter crashes and you have no idea why. Here's a straightforward guide to fix it.

The methods below should be followed sequentially, if the first method doesn’t work, move on to the next method, and so forth.

&nbsp;

### Method 1: Delete bugged skin

Whenever Rainmeter crashes, chances are that a skin you loaded was bugged. If you remembered what skin was last loaded that caused Rainmeter to crash, follow the steps below, otherwise move on to the next method.

Steps:
1. In File Explorer, navigate to **Documents/Rainmeter/Skins** folder. This is where all your skins are kept.

2. Within the folder, delete the folder with the name of the bugged skin.

3. Restart Rainmeter.

&nbsp;

### Method 2: Clear Rainmeter settings cache 

This method will “reset” your skins’ layout but will still keep your downloaded skins intact. This means you have to track down the bugged skin afterwards.

Steps:
1. Press `⊞ Win`+`R`, type "**%APPDATA%**" (without quotes), and press Enter. File Explorer will open.  

2. Navigate to **Roaming/Rainmeter** folder and delete the **Rainmeter.ini** file.

3. Restart Rainmeter. It should load the *illustro* skins by default.

4. Load your desired skins again one at a time and see which causes Rainmeter to crash. When found, delete the skin the same way as Method 1.

&nbsp;

### Method 3: Reinstall Rainmeter 

The last resort. You can backup your skins at **Documents/Rainmeter/Skins** if you wish, but it will very likely bring back the crash again.

Steps:
1. In Windows, search for **Add or remove programs**, search for Rainmeter and click Uninstall.

2. Go to the [Rainmeter website][Rainmeter] and download the latest release.

3. Install Rainmeter.

&nbsp;

## Conclusion

The above solutions should fix the most common crashes. If all of the above doesn’t work, you may have downloaded a different version of Rainmeter from a different website. Make sure you download it from the official [Rainmeter website][Rainmeter]. If this still doesn’t work, leave a comment, I'll lend a hand :)

[Rainmeter]: https://www.rainmeter.net
