# ShareWebcomponent

<!-- @namespace: share-webcomponent.ShareWebcomponent -->

Type : **{ Class }**

Extends **native(HTMLAnchorElement)**


Easily create some share buttons to target facebook, twitter, linkedin, google+, etc...


### Example
```html
	<a is="ck-share" href="#" network="facebook" title="Share on facebook">
	Share on facebook
</a>
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Attributes

Here's the list of available attribute(s).

### network

On which network to share the content

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Values : **twitter,facebook,linkedin,googleplus,email,whatsapp,telegram,viber,pinterest,tumblr,hackernews,reddit,vk,buffer,xing,line,instapaper,pocket,digg,stumbleupon,flipboard,weibo,renren,myspace,blogger,baidu,okru**

Default : **null**


### title

Set the title to share

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **document.title**


### url

Set the url to share

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **document.location.href**


### via

Set a username to tweet through without @

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### hashtags

Set some hashtags to add to tweet comma separated without #

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### to

Set an email address to share to

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### subject

Set the email subject

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **document.title**


### image

Set the absolute image url to share through (pinterest,vk,weibo)

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### description

Set the description to share (pinterest,instapaper,myspace,blogger,)

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **meta[description]**


### caption

Set the caption to share (tumblr,vk)

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **document.title**


### tags

Set the tags to share comma separated (tumblr)

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**