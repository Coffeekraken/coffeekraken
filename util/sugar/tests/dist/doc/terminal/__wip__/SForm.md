
# Class


## ```js SForm ```


Create a form that can contains some inputs, textarea, etc...
This class inherits from the blessed.form package

## Parameters

- **settings** ([object Object]) Object: On object of settings to configure the SForm like paddings, etc...



## Example (js)

```js
const SForm = require('@coffeekraken/node/terminal/SForm');
const myForm = new SForm({
   // see settings above...
});
myScreen.append(myForm);
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Construct the SForm instance which inherit from the blessed.form stack

## Parameters

- **settings** ([object Object]) Object: An object of blessed form settings and some others described bellow...




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js setStyle ```


Allows you to set the styles used by each elements inside.
This works only with the classes of type SSomething of the terminal scope.

## Parameters

- **style**  Object: The object style to set for the form




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


## ```js style ```


Store the form style object to apply at each form items



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

