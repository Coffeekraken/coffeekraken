# SUrl

<!-- @namespace: sugar.js.class.SUrl -->

Type : **{ Class }**


Simple class that is useful to parse a URL (or the current browser URL) and gives you back
an instance that has all these values availables as well as functions to modify the instancied URL:
- protocol: The protocol scheme of the URL (e.g. http:).
- slashes: A boolean which indicates whether the protocol is followed by two forward slashes (//).
- auth: Authentication information portion (e.g. username:password).
- username: Username of basic authentication.
- password: Password of basic authentication.
- host: Host name with port number.
- hostname: Host name without port number.
- port: Optional port number.
- pathname: URL path.
- query: Parsed object containing query string
- queryString: Origin query string from the URL
- hash: The "fragment" portion of the URL including the pound-sign (#).
- href: The full URL.
- origin: The origin of the URL.

This class use internally the `url-parse` npm module that you can find here: https://www.npmjs.com/package/url-parse


### Example
```js
	import SUrl from '@coffeekraken/js/class/SUrl';
const url = new SUrl('https://github.com/foo/bar');
console.log(url.hostname); // => github.com
url.hostname = 'youtube.com';
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


## Constructor


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
url  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The url to parse. If not passed, would take the current browser url as source  |  optional  |  window.document.location.href

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)





## Properties


### protocol

The protocol

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


### slashes

A boolean which indicates whether the protocol is followed by two forward slashes (//).

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**


### auth

Authentication information portion (e.g. username:password).

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


### username

Username of basic authentication

Type : **{ string }**


### password

Password of basic authentication

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


### host

Host name with port number

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


### hostname

Host name without port number

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


### port

Optional port number

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**


### pathname

URL path

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


### pathnameArray

URL path in array format

Type : **{ [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**


### query

Parsed object containing query string

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**


### queryString

Origin query string from the URL

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


### hash

The "fragment" portion of the URL including the pound-sign (#)

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


### href

The full URL

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


### origin

The origin of the URL

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


### toString

<!-- @namespace: sugar.js.class.toString -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Return the full URL in string format


#### Example
```js
	console.log(myUrl.toString()); // => https://google.com
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)