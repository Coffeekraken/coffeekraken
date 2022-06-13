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

## SConductor

This `SConductor` class allows you to execute code only when some "events" occurs on a particular HTMLElement or more widely like when stylesheet(s) are loaded, etc...
Here's some of the features available:

-   **direct**: Execute directly the task
-   **inViewport**: Execute when the element **enter the viewport**
-   **nearViewport**: Execute when the element is **near the viewport**
-   **outOfViewport**: Execute when the element go **out of the viewport**
-   **interact**: Execute when the user has interact with the element like **mouseover**, **mouseout**, **click**, **focus**, etc...
-   **domReady**: Execute when the dom is ready
-   **stylesheetsReady**: Execute when all the stylesheets are ready or a stylesheet in particular
-   **idle**: Execute when no other task is running

## Usage

Here's how to use our implementation:

```js
import __SConductor from '@coffeekraken/s-conductor';
// setup the conductor
__SConductor.setup({
    log: true, // log a small analyze of your SConductor execution
});
// using promises
await __SConductor.when($myElement, 'inViewport');
// Global "event"
await __SConductor.when(null, 'domReady');
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-conductor.js.SConductor)

#### Settings

{{> interface namespace='@coffeekraken.s-conductor.js.interface.SConductorSettingsInterface' }}

{{/ layout-readme }}
