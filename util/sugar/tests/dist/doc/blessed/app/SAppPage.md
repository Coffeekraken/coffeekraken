
# Class


## ```js SAppPage ```


This represent the base class that all the pages of an SApp based application
MUST extends.

## Parameters

- **id**  String: An id for this particular page that can be used to retreive this instance using the static method "SAppPage.getPageById(id)"

- **title**  String: A title for this particular page that can be used to retreive this instance using the static method "SAppPage.getPageByTitle(title)"

- **settings** ([object Object]) Object: A settings object that will be passed to the SComponent class constructor
- persistent (false) {Boolean}: Specify if you want your page to be destroyed when the user go to another one or not...



## Example (js)

```js
const SAppPage = require('@coffeekraken/sugar/node/blessed/app/SAppPage');
const myPage = new SAppPage('my.cool.page', 'My cool page', {});

TODO: Documentation
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Constructor




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js setArgs ```


This method allows you to set some page arguments by passing an object.
Calling this will trigger an "args" and an "arg" SPromise "event".

## Parameters

- **argsObj**  Object: An object of arguments to set




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js destroy ```


This method serve to destroy the page when a user change to another one and that the
value of settings.persistent is to false




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


## ```js _id ```


Store the page id



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _title ```


Store the page title



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _promise ```


Store an SPromise instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _argsObj ```


Store the arguments object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## get ```js app ```


Access the application instance on which you will have access to configs, etc...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## get ```js id ```


Access the page id setted in the constructor



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## get ```js title ```


Access the page title setted in the constructor



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## get ```js persistent ```


Access the value of the settings.persistent property



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

