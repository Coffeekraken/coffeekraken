


<!-- @namespace    sugar.js.keyboard -->

# ```js hotkey ```


Simple function to add a hotkey like "ctrl+a" and an handler function that will be called when the hotkey has been pressed
The following keys are supported:
- shift, option, alt, ctrl, control, command
- backspace, tab, clear, enter, return, esc, escape, space, up, down, left, right, home, end, pageup, pagedown, del, delete
- from f1 to f19
- all the letters keys

You can pass an option object to your hotkey function call.

## Parameters

- **hotkey**  String: The hotkey to detect

- **settings** ([object Object]) Object: An option object to configure your hotkey. Here's the list of available settings:
- element (null) {HTMLElement}: Specify an HTMLElement to detect keyboard events from
- keyup (false) {Boolean}: Detect on keyup
- keydown (true) {Boolean}: Detect on keydown
- once (false) {Boolean}: Specify if you want to detect the keyboard event just once
- splitKey () {String}: Specify the split key to use in the sequences like "ctrl+a"


## Example (js)

```js
import hotkey from '@coffeekraken/sugar/js/keyboard/hotkey'
const promise = hotkey('ctrl+a');
promise.on('ctrl+a', (e) => {
   // do something...
});
promise.cancel();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



