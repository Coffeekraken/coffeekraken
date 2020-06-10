


<!-- @namespace    sugar.js.url -->

# ```js SUrl ```


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
- schema: The schema property gives you access to an object containing these properties (only if you have provided the settings.schema setting):
- match (true) {Boolean}: Tells you if your current url match the passed schema
- errors (null) {Object}: Gives you access to which param(s) is/are in error
- params (null) {Object}: Gives you access to each params specified in the schema with their values, etc...

This class use internally the `url-parse` npm module that you can find here: https://www.npmjs.com/package/url-parse



## Example (js)

```js
import SUrl from '@coffeekraken/js/url/SUrl';
const url = new SUrl('https://github.com/foo/bar');
console.log(url.hostname); // => github.com
url.hostname = 'youtube.com';

const urlWithSchema = new SUrl('https://github.com/hello/world/2', {
   schema: '{param1:string}/{param2}/{?param3:number}'
});
console.log(urlWithSchema.schema);
// {
//    match: true,
//    errors: {},
// }
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



## Variables


