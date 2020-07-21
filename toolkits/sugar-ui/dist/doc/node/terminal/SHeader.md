


<!-- @namespace    sugar.node.terminal -->
<!-- @name    SHeader -->

# ```js SHeader ```
### Since: 2.0.0

This class define a "header" in the terminal that you can easily configure to have the look and feel that you want
through simple settings described bellow.

## Parameters

- **title**  String: Specify a title for this header.

- **settings** ([object Object]) Object: An object of settings described bellow:
- screen (true) {Boolean}: Specify if you want your header wrapped inside an "blessed"(https://www.npmjs.com/package/blessed) screen object. Useful when you just want to render your header in the terminal. If you have your own screen object



## Example (js)

```js
const SHeader = require('@coffeekraken/sugar/node/terminal/SHeader');
const header = new SHeader('Hello world', {});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _title -->

# ```js _title ```


Store the header title



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _settings -->

# ```js _settings ```


Store the header settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

