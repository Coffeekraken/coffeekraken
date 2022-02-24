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

## Simply refocus elements inside a scrollable one.

This `SRefocusFeature` feature allows you to simple visually refocus an element inside a scrollable one. Here's some of the features available:

- Declarative API like `<div s-refocus on="eventName">...</div>`
- Fully customizable scroll behavior
- Specify triggerers like:
    - `anchor`: Scroll to the element that correspond to the anchor in url
    - `history`: Listen for change in history and scroll to element if needed
    - `event:eventName`: Specify an event to listen to. When an element dispatch this element, scroll to it

## Usage

Here's how to use our implementation:

```js
import { define } from '@coffeekraken/s-refocus-feature';
define({
    // default props
});
```

Consider the url `http://localhost:my-anchor`

```html
<div class="my-scrollable-div" s-refocus trigger="anchor,history,event:actual">
    <ul>
        <!-- some list items... -->
        <li id="my-anchor">...</li>
        <!-- some list items... -->
    </ul>
</div>
```

#### Properties

{{> interface namespace='@coffeekraken.s-refocus-feature.js.interface.SRefocusFeatureInterface' }}

{{/ layout-readme }}