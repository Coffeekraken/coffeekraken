
# Function


## ```js sugar ```


This function allows you to access easily the configurations stored in the ```sugar.config.js```.
The returned configuration is the result of the default sugar config stored in the toolkit and the
app defined config stored in current application root folder

## Parameters

- **dotPath**  String: The dot path to the config wanted



## Example (js)

```js
const sugar = require('@coffeekraken/sugar/node/config/sugar');
sugar('scss.unit'); // => rem
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



