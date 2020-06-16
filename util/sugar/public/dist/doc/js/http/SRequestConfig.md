


<!-- @namespace    sugar.js.http -->
<!-- @name    SRequestConfig -->

# ```js SRequestConfig ```


Class that represent an ajax request that will be passed to an SRequest instance.
All the axios settings are supported by this class



## Example (js)

```js
const request = new SRequestConfig({
 	url : '/api/...',
 	method : 'GET',
 	data : {
 		myVar : 'myVal'
 	}
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    everyResponse -->

# ```js everyResponse ```


Specify a function to call on every response. The parameters passed to the function are:
- response {Object}: The actual request response
- requestIdx {Number}: The request index




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    constructor -->

# ```js constructor ```


Constructor

## Parameters

- **params**  Object: The request params in object format




### Author
- 


## Variables



<!-- @name    url -->

# ```js url ```


The url to call



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    baseURL -->

# ```js baseURL ```


Specify the base url to call like "https://api.github.com/2.0" for example.
If the "url" setting is absolute, this setting will don't have any impact on your request...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    method -->

# ```js method ```


The request method to use like GET, POST, DELETE or PUT



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    headers -->

# ```js headers ```


Specify some headers to add to the request


### Example (js)

```js
{
   'X-Requested-With': 'XMLHttpRequest'
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    params -->

# ```js params ```


Specify some params to be sent through the URL.
Must be a plain object or a URLSearchParams object


### Example (js)

```js
{
   myCoolData: 'Hello world'
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    data -->

# ```js data ```


Specify some data you want to send with the request.
This setting is available only for 'PUT', 'POST', and 'PATCH' requests...


### Example (js)

```js
{
   firstName: 'Fred'
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    timeout -->

# ```js timeout ```


Specify time to wait before aborting the actual request. If setted in number format, this will mean milliseconds.
You can also specify this settings using string format like so: '2s', '1h', '4m', etc...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    sendInterval -->

# ```js sendInterval ```


Set the interval time between each requests if the sendCount setting is specified.
If setted in number format, this is taken as millisenconds. You can also set the interval
in string format like '34s', '1h', '10ms', '2d', etc...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    sendCount -->

# ```js sendCount ```


Set how many times the request has to be sent



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    responseType -->

# ```js responseType ```


Indicates the type of data that the server will respond with



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

