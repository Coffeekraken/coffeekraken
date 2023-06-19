<!--
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## What can Sugar do for me?

The main purpose of this package is to provide some tools to simplify you're developer's life. These tools covers some languages like:

1. **Javascript (browser)**
2. **NodeJS**
3. **PHP** (soon)

> Don't worry, this package it a toolkit and you can pick what you need and let the rest aside.

Each of these languages comes with multiple tools in areas likes:

#### Javascript (browser)

1. **Simplify detections like:**
    - New node matching a special selector using `querySelectorLive``
    - A partiular node enters/leaves the viewport using:
        - `whenInViewport`
        - `whenOutOfViewport`
        - `inViewportStatusChange`
        - etc...
    - Swipes using `onSwipe`
    - Scroll end using `onScrollEnd`
    - Stylesheets loaded and ready using `onStylesheetsReady`
    - When a user interact with an element using `whenInteract`
    - And more...
2. **Status detection like:**
    - Has the focus on a particular element using `isFocus`
    - Same for the _within_ state using `isFocusWithin`
    - Check if an element is visible using `isVisible`
    - And more...
3. **Dom manipulation like**
    - Empty a node from every children using `emptyNode`
    - Transform a string into Dom elements using `toDomNodes`
    - Wrap an element easily using `wrap` or `wrapInner`
    - And more...
4. **Querying elements with ease**:
    - Query elements even when not already in Dom using `querySelectorLive`
    - Check if an element match a css selector using `matches`
    - Query the closest element that match a css selector using `closest`
    - And more...
5. And a lot more to discover on [our website](https://coffeekraken.io)

#### NodeJs

1. **Simple clipboard utilities:**
    - Copy using `copy`
    - Read clipboard using `read`
2. **Some commands sugar:**
    - Check if a command exists on the system using `commandExists`
3. **Managing config files:**
    - Load some config files in diverse formats using `loadConfigFile`
4. **ESM:**
    - Get a `require` equivalent cjs function using `require`
    - Get a package path using `resolvePackagePath`
5. **Filesystem:**
    - Some filesystem wrapper that handle if folder does not exists like:
        - `copy`
        - `emptyDir`
        - `move`
        - `read`
        - `readJson`
        - `writeFile`
        - etc...
    - Generate file hash using `fileHash`
    - Generate folder hash using `folderHash`
    - Find a file upward using `findUp`
    - And more...
6. **Globs:**
    - Resolve globs using `resolveGlob` that use under the hood the `glob` package and allows to specify some patterns you want your files to contains
    - Check if a passed file path match the passed glob using `matchGlob`
    - And more...
7. **Network:**
    - Check if the passed port is free using `isPortFree`
    - Get a free port using `getFreePort`
    - Get your system ip address using `ipAddress`
    - And more...
8. **Process:**
    - Register some tasks to execute when the process exits using `onProcessExit`
    - Kill a particular process using `kill`. This uses the `fkill` package under the hood
    - And more...
9. And a lot more to discover on [our website](https://coffeekraken.io)

## Usage

Sugar toolkit came with a lot of utilities, functions and classes. To use them, simply load them directly like so:

```js
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __isInViewport } from '@coffeekraken/sugar/dom';
// etc...
```

> The best way to discover the available utilities is to check out the API documentation on [our website](https://coffeekraken.io//api/@coffeekraken.coffeekraken-io.js.dom.query.querySelectorLive).

{{/ layout-readme }}
