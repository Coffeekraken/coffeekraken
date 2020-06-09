
# Class


## ```js STerminalScreen ```


Create a screen in which you can render all others items.
This class uses blessed under the hood to work properly.

## Parameters

- **settings** ([object Object]) Object: On object of settings to configure the STerminalScreen like paddings, etc...



## Example (js)

```js
const STerminalScreen = require('@coffeekraken/node/terminal/STerminalScreen');
const myScreen = new STerminalScreen({
   // see settings above...
});
myScreen.render();
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Construct the STerminalScreen instance which inherit from the blessed.screen stack

## Parameters

- **settings** ([object Object]) Object: An object of blessed screen settings and some others described bellow...
- padding (process.env.STDOUT_PADDING || 3) {Number}: The amount of paddings that you want around your screen




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js append ```


Append an element to the screen




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js prepend ```


Prepend an element to the screen




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


