# hotkey

<!-- @namespace: sugar.js.keyboard.hotkey -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Simple function to add a hotkey like "ctrl+a" and an handler function that will be called when the hotkey has been pressed
The following keys are supported:
- shift, option, alt, ctrl, control, command
- backspace, tab, clear, enter, return, esc, escape, space, up, down, left, right, home, end, pageup, pagedown, del, delete
- from f1 to f19
- all the letters keys

You can pass an option object to your hotkey function call. Here's the option object format:
{
   element: {HTMLElement}, // default: null
   keyup: {Boolean}, // default: false
   keydown: {Boolean}, // default: true
   splitKey: {String} // default: '+'
}



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
hotkey  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The hotkey to detect  |  required  |
handler  |  **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**  |  The handler function called when the hotkey is pressed. It take as parameter the 'event' object and the 'handler' one.  |  required  |
options  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  An option object to configure your hotkey  |  optional  |  {}

Return **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }** A function to call when you want to delete the hotkey listener

### Example
```js
	import hotkey from '@coffeekraken/sugar/js/keyboard/hotkey'
const delete = hotkey('ctrl+a', (event, handler) => {
   console.log('ctrl + a has been pressed');
});
// when you want to stop the listener
delete();
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)