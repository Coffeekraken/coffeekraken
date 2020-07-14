


<!-- @namespace    sugar.node.terminal -->
<!-- @name    SFiltrableList -->

# ```js SFiltrableList ```


Allows you to create a nice filtrable (searchable) list input

## Parameters

- **settings** ([object Object]) Object: On object of settings to configure the SFiltrableList instance



## Example (js)

```js
const SFiltrableList = require('@coffeekraken/node/terminal/SFiltrableList');
const myList = new SFiltrableList({
});
myForm.append(myList);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Construct the STerminalScreen instance which inherit from the blessed.screen stack

## Parameters

- **settings** ([object Object]) Object: An object of blessed screen settings and some others described bellow...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    setFormStyle -->

# ```js setFormStyle ```


Set the form style. Normaly this is called automatically when you append/prepend your SFiltrableListContainer node to the SForm instance

## Parameters

- **style**  Object: The style to apply to the form item




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _listenKeyPress -->

# ```js _listenKeyPress ```


Listen for keys press like UP, DOWN, etc...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    get -->

# ```js get ```


Get the SFiltrableList back in String or Array format depending on the passed settings

## Parameters

- **settings** ([object Object]) Object: An object of settings. See bellow...
- width (100%) {Number|String}: The maximum width that will take the SFiltrableList
- columns (1) {Number}: On how many columns will be displayed the SFiltrableList
- format (string|array) {String}: Can be 'string' or 'array' depending on the format you want back




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    selectedItemObj -->

# ```js selectedItemObj ```


Access the selected item object

@



### Author
- 

