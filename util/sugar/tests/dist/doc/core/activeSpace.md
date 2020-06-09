

## ```js activeSpace ```
### Since: 2.0.0

This object expose some functions that are usefull to manage the "active" space of your application.
An active space is represented by a string formated like so "something.cool.hello". This mean that your app is
in the "something.cool.hello" space and depending on that, you can enable or disable some features like for example
keypress that have to be active only in certain "space" of your application.
The exposed functions are these ones:
- set: This allows you to set the active space
- get: This allows you to get the current active space
- is: This allows you to check if the passed active space string is in the current active space
- previous: This allows you to go back 1 activeSpace in the stack
- on: This allows you to register callbacks attached to an activeSpace
- append: This allows you to append an activeSpace string to the current one


### Example (js)

```js
const activeSpace = require('@coffeekraken/sugar/core/activeSpace');
activeSpace.set('hello.world');
activeSpace.get(); // => hello.world
activeSpace.is('hello'); // => false
activeSpace.is('hello.world.coco'); // => false
activeSpace.is('hello.*'); // => true
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

