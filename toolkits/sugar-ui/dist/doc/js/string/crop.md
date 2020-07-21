


<!-- @namespace    sugar.js.string -->
<!-- @name    crop -->

# ```js crop ```


Allows you to crop a string at a certain length (this length take care of the croping characters like "...")

## Parameters

- **text**  String: The text to crop

- **length**  Number: The text length to have after the croping process

- **settings** ([object Object]) Object: An object of settings described bellow:
- chars (...) {String}: The characters to use to signal the crop
- splitWords (false) {Boolean}: Specify if you want to split words or not. If not, the function will make sure the final text does not exceeds the wanted length


## Example (js)

```js
import crop from '@coffeekraken/sugar/js/string/crop';
crop('Hello World', 10); // => Hello w...
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



