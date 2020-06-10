


<!-- @namespace    sugar.js.dev -->

# ```js checkArgs ```


Check the arguments of a function by checking his type, his values, etc...
Throw an error if something is not good with the details of why...

## Parameters

- **args**  Object: The arguments object description

- **throwError** (true) Boolean: Specify if you want that the function throw an error if needed or not



## Example (js)

```js
import checkArgs from '@coffeekraken/sugar/js/dev/checkArgs';
function(argument1, plop, hello) {
   checkArgs({
     arguments1: {
       type: 'String',
       value: ['hello','world']
     },
     plop: {
       type: 'Array'
     },
     hello: {
       value: [true, false, null]
     }
   });
   // your function source code...
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



