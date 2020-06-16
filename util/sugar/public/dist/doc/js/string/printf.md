


<!-- @namespace    sugar.js.string -->
<!-- @name    printf -->

# ```js printf ```


printf php equavalent

## Parameters

- **source**  String: The source in which to replace the tokens

- **values...**  Miyed: Any number of arguments to replace the placeholders in the string



## Example (js)

```js
import printf from '@coffeekraken/sugar/js/string/printf';
printf('Hello %s', 'world'); // => Hello world
printf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
printf('Hello %(first)s, I\'m %(name)s', { first : 'world', name : 'John Doe'}); // Hello world, I'm John Doe
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



