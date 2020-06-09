
# Class


## ```js SApp ```
### Since: 2.0.0

This class define an application in the terminal that you can easily configure to have the look and feel that you want
through simple settings described bellow.

## Parameters

- **name**  String: Specify a name for this application

- **settings** ([object Object]) Object: An object of settings described bellow:



## Example (js)

```js
const SApp = require('@coffeekraken/sugar/node/terminal/SApp');
const app = new SApp('My Cool Application', {
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Constructor




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _getRouteObj ```


Get the route configuration object depending on the current url

## Parameters

- **url**  String: The current url




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js nextMenu ```


This method allows you to pass to the next menu item




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js previousMenu ```


This method allows you to pass to the next menu item




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js goTo ```


This method allows you to change the "page" by passing a simple url like 'build/scss' depending on the registered routes in your app.

## Parameters

- **url**  String: The url to go to




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js isActive ```


This method allows you to check if the passed url is the active one

## Parameters

- **url**  String: The url to check




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _renderLayout ```


Render the layout with the current content defined by the current route object passed

## Parameters

- **routeObj**  Object: The current route object to render with the layout




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


## ```js _name ```


Store the application name



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _settings ```


Store the application settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _currentPanes ```


Store the current panes contents depending on the current url



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

