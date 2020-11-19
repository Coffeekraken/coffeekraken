# Classes

Sugar gives you some nice classes that are highly specialized in one purpose only like:

> Stored in `@coffeekraken/sugar/js/class/...`

- **[STimer](../src/js/class/STimer.md)** : Handle times with nice control like start, stop, pause, etc...
- **[SColor](../src/js/class/SColor.md)** : Manipulate colors and access your sass registered colors
- **[SWatcher](../src/js/class/SWatcher.md)** : Add some watchers on native object properties and be notified on updated
- [And more...](../src/js/class)

## Usage

To use the classes, simply import them from into your codebase like this:

```js
import STimer from "@coffeekraken/sugar/js/class/STimer";
// then use it
const myTimer = new STimer(2000);
myTimer.start();
```
