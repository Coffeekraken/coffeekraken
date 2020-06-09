
# Class


## ```js SRequest ```


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


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods



# Variables


