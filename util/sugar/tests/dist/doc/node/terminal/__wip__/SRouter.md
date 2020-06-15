


<!-- @namespace    sugar.node.terminal -->
<!-- @name    SRouter -->

# ```js SRouter ```


Provide a simple router class to switch between pages in the terminal




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Construct the router class with settings described bellow




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    setOutput -->

# ```js setOutput ```


Set where you want to output the router results.
Can be something like a "blessed" box object, or simple the console.log function by default.

## Parameters

- **output**  Mixed: The output where you want to print the router results



## Example (js)

```js
myRouter.setOutput(console.log);
const myBox = blessed.box({});
myRouter.setOutput(myBox);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    goto -->

# ```js goto ```


Allows you to cvhange the displayed page by specify the route name wanted or by specify
a url with some params in it that will be analyzed by the router instance

## Parameters

- **path**  String: The path where you want to go. Can be a simple route name or a full url with params



## Example (js)

```js
myRouter.goto('list');
myRouter.goto('something/cool/01');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _routes -->

# ```js _routes ```


Store the routes available in this router instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _settings -->

# ```js _settings ```


Store the settings available in this router instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

