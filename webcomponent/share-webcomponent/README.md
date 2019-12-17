# Coffeekraken share webcomponent <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/share-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/share-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/share-webcomponent?style=flat-square)

Easily create some share buttons to target facebook, twitter, linkedin, google+, etc...

## Features

- Easily share your page
- Full control over the display.
- Supported networks (and attributes):
	- `twitter`: title, url, hashtags, via
	- `facebook`: url, hashtag
	- `linkedin`: url
	- `googleplus`: url
	- `email`: title, url, to, subject
	- `whatsapp`: title, url, web
	- `telegram`: title, url, to
	- `viber`: title, url
	- `pinterest`: url, image, description
	- `tumblr`: url, title, caption, tags
	- `hackernews`: url, title
	- `reddit`: url
	- `vk`: url, title, image, caption
	- `buffer`: url, title, via, picture
	- `xing`: url, title
	- `line`: url, title
	- `instapaper`: url, title, description
	- `pocket`: url
	- `digg`: url
	- `stumbleupon`: title, url
	- `flipboard`: title, url
	- `weibo`: url, title, image, apikey, relateui
	- `renren`: url
	- `myspace`: url, title, description
	- `blogger`: url, title, description
	- `baidu`: url, title
	- `okru`: url, title
	- `skype`: url, title
	- `trello`: url, title, description

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Javascript API](doc/src/js/ShareWebcomponent.md)
4. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>
## Install

```
npm install @coffeekraken/share-webcomponent --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import ShareWebcomponent from '@coffeekraken/share-webcomponent'
```

Then simply use it inside your html like so:

```html
<a is="ck-share" network="facebook" class="btn">
	Share on Facebook
</a>
<a is="ck-share" network="twitter" title="Override the page title for sharing...">
	Share on Twitter
</a>
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
