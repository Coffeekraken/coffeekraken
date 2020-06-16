


<!-- @namespace    sugar.js.string -->
<!-- @name    sprintf -->

# ```js sprintf ```


Javascript implementation of the sprintf php function.
>For more infos, check [this github repository](https://github.com/alexei/sprintf.js)

## Parameters

- **format**  String: The format of the string wanted as output

- **...replacements**  Mixed: The replacement tokens to apply to the string



## Example (js)

```js
import sprintf from '@coffeekraken/sugar/js/string/sprintf'
sprintf('Hello %s', 'world') // Hello World
const user = { name: 'Dolly' }
sprintf('Hello %(name)s', user) // Hello Dolly
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



