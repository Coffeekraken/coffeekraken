


<!-- @namespace    sugar.js.core -->
<!-- @name    env -->

# ```js env ```


This function allows you to access environment variables through the same method in node and javascript

## Parameters

- **dotPath**  String: The dot path (something.else) to tell which variable you want

- **value**  Mixed: The value you want to assign. If null, you will just get the wanted variable back



## Example (js)

```js
import env from '@coffeekraken/sugar/js/dev/env';
console.log(env('node_env')); // => production
env('something.cool', { hello: 'world' });
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



