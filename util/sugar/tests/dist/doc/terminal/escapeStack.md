
# Function


## ```js escapeStack ```


This function allows you to register a callback to know when it's time to "close" or do whatever you want on escape click.
The principle is that when you register a callback, the system will save the "index" at which you have registered this callback
and increase this "index" for the next callback registration. When you press escape key, the "index" will decrease and the callback(s)
registered at the new index will be called.

## Parameters

- **callback**  Function: The function you want to call on escape click

- **index**  Number: Optionally the index under which you want to register your callback. If not specified, will be automatically setted



## Example (js)

```js
const escapeStack = require('@coffeekraken/sugar/node/terminal/escapeStack');
escapeStack(() => {
   // do something
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



