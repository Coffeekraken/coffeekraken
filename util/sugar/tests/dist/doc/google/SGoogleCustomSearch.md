
# Class


## ```js SGoogleCustomSearch ```


This class let you make with ease search requests to the google custom search service
with useful features like:
- Simple pagination system
- Promise support



## Example (js)

```js
// create a google search instance
const googleSearch = new SGoogleCustomSearch('myApiKey', 'myCustomSearchContextKey');

// make a search...
googleSearch.search('hello world').then((response) => {
		// do something with the google response...
});

// get the nexts results
googleSearch.next().then((response) => {
		// do something with the new response...
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods



# Variables


