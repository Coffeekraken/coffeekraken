


<!-- @namespace    sugar.js.url -->
<!-- @name    SUrl -->

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



<!-- @name    constructor -->

# ```js constructor ```


Constructor

## Parameters

- **url** (window.document.location.href) String: The url to parse. If not passed, would take the current browser url as source

- **settings** ([object Object]) Object: On object of settings to configure your SUrl instance. Here's are the available settings:
- schema (null) {String}: Specify a schema to analyze the url and get some info like params back. FOr more info on schema, see the "_parseSchema" method doc...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _parseSchema -->

# ```js _parseSchema ```


Parse the url using the schema passed in the settings. A schema is a simple string that describe the pathname structure that the Url can have.
Here's some examples:
- "{param1}/{param2}/{param3}": This schema describe that your Url must have 3 "values" named param1, param2 and param3
- If my Url is "something.com/hello/world/plop", my schema is respected and I can have access to the values through the "schema.params.param1", "schema.params.param2", etc...
- "{hello:string}/{world:number}/{?idx:number}": This schema describe that the Url can have 3 "values" but the last one is optional
- If my Url is "something.com/plop/3/1", my schema is respected
- If my Url is "something.com/plop/2", my schema is respected
- If my Url is "something.com/plop/hello/2", my schema is not respected due to the fact that the param named "world" has to be a number




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    toString -->

# ```js toString ```


Return the full URL in string format



## Example (js)

```js
console.log(myUrl.toString()); // => https://google.com
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _settings -->

# ```js _settings ```


Store the settings mixed from the default ones and the passed ones



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _originUrl -->

# ```js _originUrl ```


The origin URL



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _parsedSchema -->

# ```js _parsedSchema ```


Store the parsed schema if a settings.schema has been provided.
This object contain these properties:
- params (null) {Object}: Store the path params found like /{client}/{name}
- errors (null) {Object}: Store the parsing errors if has some
- match (true) {Boolean}: Store if the current url match with the provided schema



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    schema -->

# ```js schema ```


Access the schema parsing result if the settings.schema has been provided.
This object contain these properties:
- params ({}) {Object}: Store the path params found like /{client}/{name}
- errors ({}) {Object}: Store the parsing errors if has some
- match (true) {Boolean}: Store if the current url match with the provided schema



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    protocol -->

# ```js protocol ```


Get/set the protocol



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    slashes -->

# ```js slashes ```


A boolean which indicates whether the protocol is followed by two forward slashes (//).



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    auth -->

# ```js auth ```


Authentication information portion (e.g. username:password).



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    username -->

# ```js username ```


Get/set username of basic authentication



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    password -->

# ```js password ```


Get/set password of basic authentication



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    host -->

# ```js host ```


Get/set Host name with port number



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    hostname -->

# ```js hostname ```


Get/set host name without port number



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    port -->

# ```js port ```


Optional port number



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    pathname -->

# ```js pathname ```


URL path



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    pathnameArray -->

# ```js pathnameArray ```


URL path in array format



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    query -->

# ```js query ```


Parsed object containing query string



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    queryString -->

# ```js queryString ```


Origin query string from the URL



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    hash -->

# ```js hash ```


The "fragment" portion of the URL including the pound-sign (#)



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    href -->

# ```js href ```


The full URL



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    origin -->

# ```js origin ```


The origin of the URL



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

