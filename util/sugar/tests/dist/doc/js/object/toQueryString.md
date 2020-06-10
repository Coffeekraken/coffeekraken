


<!-- @namespace    sugar.js.object -->

# ```js toQueryString ```


Transform an object (key => pairs) to a query string like "?var1=value1&var2"

## Parameters

- **obj**  Object: The object to serialize



## Example (js)

```js
import toQueryString from '@coffeekraken/sugar/js/object/toQueryString'
console.log(toQueryString({
	value1 : 'coco',
	value1 : 'plop'
}));
// => ?value1=coco&value2=plop
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



