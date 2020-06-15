


<!-- @namespace    sugar.node.terminal -->
<!-- @name    SLayout -->

# ```js SLayout ```


Create a layout in which you can render all others items.
This class uses blessed under the hood to work properly.

## Parameters

- **settings** ([object Object]) Object: On object of settings to configure the SLayout like paddings, etc...



## Example (js)

```js
const SLayout = require('@coffeekraken/node/terminal/SLayout');
const myLayout = new SLayout({
   // see settings above...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Construct the SLayout instance which inherit from the blessed.box stack

## Parameters

- **content**  String,Array: The content of the layout in string or array format

- **settings** ([object Object]) Object: An object of blessed screen settings and some others described bellow...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    setContent -->

# ```js setContent ```


Set the layout content by passing either a string or an array that will be joined using a "\n" character

## Parameters

- **content**  String,Array: The content to set




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables


