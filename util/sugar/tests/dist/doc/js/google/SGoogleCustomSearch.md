


<!-- @namespace    sugar.js.google -->

# ```js SGoogleCustomSearch ```


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


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor

## Parameters

- **apiKey**  String: The google api key to reach the services

- **cx**  String: The google custom search context




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _generateSearchUrl ```


Generate and return the correct search url depending on
parameters like the current page, etc...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js search ```


Launch a search

## Parameters

- **keywords**  String: The keywords to search

- **settings**  Object: The settings object




### Author
- 





# ```js next ```


Load the next page




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js previous ```


Load the previous page




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _apiKey ```


Store the api key used to reach the google services



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _cx ```


Store the context key used to reach the good google search instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _settings ```


Store the actual query object to be able to call
next page etc...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js num ```


How many results by page wanted
Can be between 1 and 10



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js page ```


The page to request



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _searchUrl ```


Store the google search url



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _page ```


Store the current page



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _keywords ```


The keywords searched



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

