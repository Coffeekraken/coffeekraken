
# Class


## ```js SInput ```


Allows you to create some simple inputs.
This class inherits fromt he blessed.input package method

## Parameters

- **settings** ([object Object]) Object: On object of settings to configure the SInput instance



## Example (js)

```js
const SInput = require('@coffeekraken/node/terminal/SInput');
const myInput = new SInput({
});
myForm.append(myInput);
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Construct the STerminalScreen instance which inherit from the blessed.screen stack

## Parameters

- **settings** ([object Object]) Object: An object of blessed screen settings and some others described bellow...




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js setFormStyle ```


Set the form style. Normaly this is called automatically when you append/prepend your SInputContainer node to the SForm instance

## Parameters

- **style**  Object: The style to apply to the form item




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _SInputenKeyPress ```


Listen for keys press like UP, DOWN, etc...




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js get ```


Get the SInput back in String or Array format depending on the passed settings

## Parameters

- **settings** ([object Object]) Object: An object of settings. See bellow...
- width (100%) {Number|String}: The maximum width that will take the SInput
- columns (1) {Number}: On how many columns will be displayed the SInput
- format (string|array) {String}: Can be 'string' or 'array' depending on the format you want back




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


