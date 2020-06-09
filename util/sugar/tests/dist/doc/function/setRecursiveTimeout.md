
# Function


## ```js setRecursiveTimeout ```


This utils function allows you to call a passed function each x time during a certain duration

## Parameters

- **fn**  Function: The function to execute

- **timeout**  Number: The time between each execution

- **duration**  Number: The duration of the timeout

- **spread**  Number: An optional spread time that will be used to randomize the function executions times



## Example (js)

```js
import setRecursiveTimeout from '@coffeekraken/sugar/js/function/setRecursiveTimeout';
setRecursiveTimeout(() => {
		// I will be executed 10 times
}, 1000, 10000);
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



