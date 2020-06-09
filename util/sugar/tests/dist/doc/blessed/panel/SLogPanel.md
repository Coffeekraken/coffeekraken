
# Class


## ```js SLogPanel ```
### Since: 2.0.0

This class define a "panel" in the terminal that you can easily configure to have the look and feel that you want
through simple settings described bellow.

## Parameters

- **name**  String: Specify a name for this panel. The name has to stick to this characters only ```[a-zA-Z0-9_-]```

- **settings** ([object Object]) Object: An object of settings described bellow:
- screen (true) {Boolean}: Specify if you want your panel wrapped inside an "blessed"(https://www.npmjs.com/package/blessed) screen object. Useful when you just want to render your panel in the terminal. If you have your own screen object



## Example (js)

```js
const SLogPanel = require('@coffeekraken/sugar/node/terminal/SLogPanel');
const panel = new SLogPanel('my-cool-pannel', {
});
panel.log('Hello world');
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Constructor




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js log ```


Allow to log some content in the panel

## Parameters

- **message**  String: The message to log

- **settings** ([object Object]) Object: Some settings to override for this particular log




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


## ```js _name ```


Store the panel name



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js //                    _input ```






### Author
- **//      Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js //                     input ```






### Author
- **//      Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js //                    summary ```






### Author
- **//      Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

