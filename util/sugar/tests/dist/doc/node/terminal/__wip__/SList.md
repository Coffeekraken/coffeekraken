


<!-- @namespace    sugar.node.terminal -->
<!-- @name    list -->

# ```js list ```


Allows you to create some lists either selectable or not

## Parameters

- **items**  Array: An array of items in string format or in object format with properties "text" and "value"

- **settings** ([object Object]) Object: On object of settings to configure the list like color, etc...



## Example (js)

```js
const STerminalList = require('@coffeekraken/node/terminal/STerminalList');
const myList = new STerminalList(['Hello','World'], {
  item: text => `<white>${text}</white>`,
  selected: text => `<bgYellow><black> ${text} </black></bgYellow>`
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _listenKeyPress -->

# ```js _listenKeyPress ```


Listen for keys press like UP, DOWN, etc...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    destroy -->

# ```js destroy ```


Destroy the list component gracefully




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    get -->

# ```js get ```


Get the list back in String or Array format depending on the passed settings

## Parameters

- **settings** ([object Object]) Object: An object of settings. See bellow...
- width (100%) {Number|String}: The maximum width that will take the list
- columns (1) {Number}: On how many columns will be displayed the list
- format (string|array) {String}: Can be 'string' or 'array' depending on the format you want back




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    events -->

# ```js events ```


Get the event emitter instance on which will be emitted the list events


### Example (js)

```js
myList.events.on('select', selectedObj => {
     // do something...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

