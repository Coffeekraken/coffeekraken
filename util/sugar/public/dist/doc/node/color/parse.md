


<!-- @namespace    sugar.js.color -->
<!-- @name    parse -->

# ```js parse ```


Parse a string and return you the wanted object format like "rgba", "hsl" or "hsv".

## Parameters

- **color**  Object: The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...))

- **format** (rgba) String: The object format wanted. Can be "rgba", "hsl" or "hsv"



## Example (js)

```js
import parse from '@coffeekraken/sugar/js/color/parse';
parse('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



