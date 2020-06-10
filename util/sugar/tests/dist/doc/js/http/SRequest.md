


<!-- @namespace    sugar.js.http -->

# ```js SRequest ```


Class that allows to simply handle ajax requests with ease.
This class give some useful features like :
- Promise support
- Recursive requests



## Example (js)

```js
const request = new SRequest({
		url : 'api/...',
		method : 'GET',
		data : {
			myVar : 'myVal'
		}
});

// send and listen for data
request.send().then((response) => {
		// do something with response here...
}).catch((error) => {
		// something went wrong...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor

## Parameters

- **request**  SRequestConfig,Object: The request object used to make ajax call




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _onSuccess ```


Callback when the request has been a success

## Parameters

- **response**  Object: The axios response object




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _onError ```


Callback when the request return an error

## Parameters

- **error**  Object: The axios error object




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _send ```


Send the actual request using axios

## Parameters

- **requestSettings** ([object Object]) Object: The request settings for this particular request




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js retry ```


Reset the request settings variables and relaunch the request



## Example (js)

```js
myAjax.retry().then(response => {
   // do something...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js send ```


Send the request and return a promise that will be resolved once all the requests
have been made or rejected if one of the requests has returned an error...



## Example (js)

```js
myAjax.send().then(response => {
   // do something...
}).catch(error => {
   // do something...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _defaultRequestSettings ```


Store the request settings to use



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _currentRequestSettings ```


Store the request settings to use



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _requestsCount ```


Store how many requests have been sent



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

