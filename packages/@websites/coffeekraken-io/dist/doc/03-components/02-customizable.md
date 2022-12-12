<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- body -->

<!--
/**
* @name            Fully customizable
* @namespace       doc.components
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Components           /doc/components/customizable
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Fully customizable

As you know, now that you've read the **overview** documentation, components are "splited" in at least **2** styling parts.

Here's a quick resume of these:

1. `bare`: This scope named `bare` represent all the structural CSS of the component.
2. `lnf`: This scope named `lnf` (look and feel) represent all the visual CSS of the component.

## Example of fully styled `button` integration:

To integrate the `button` component inside your stylesheet with all his `scopes`, here's the code

```css
/* Generating classes like `.s-btn`, etc... */
@sugar.ui.button.classes;
/* Applying button style on a custom element */
.my-button {
    @sugar.ui.button;
}
```

```html
<a class="s-btn">Hello world</a>
<br />
<a class="my-button">Hello world</a>

```

## Example of custom styling `button` integration:

To integrate the `button` component inside your stylesheet with only the `bare` scope applied and apply your ownb custom css, here how:

```css
/* Generating classes like `.s-btn`, etc... */
@sugar.ui.button.classes ($scope: bare);
/* Applying button style on a custom element */
.my-button {
    @sugar.ui.button ($scope: bare);
}
.s-btn,
.my-button {
    background: red;
    color: white;
    background: red;
    color: white;
}
```

```html
<a class="s-btn">Hello world</a>
<br />
<a class="my-button">Hello world</a>

```

## Customize `web`components

The same concept applies to `web`components like `s-date-picker`, `s-side-panel`, etc...

They all comes with their `bare` styling so you don't need to worry about that. Regarding the `lnf` scope, each component can either apply some existing classes from the toolkit like `.s-list`, etc... or directly apply some styling packed directly inside him.

If you want to have only the `bare` style and make your own visual display for a particular component, follow this:

```js
// importing our component
import { define } from '@coffeekraken/s-date-picker-component';
// define our component with the `bare` prop
define({
    bare: true,
});
// registering our component with another tag name without the `bare` prop applied by default
define({}, 'my-cool-date-picker');
```

```html
<!-- using our bare component -->
<s-date-picker></s-date-picker>
<!-- using our none bare component and apply it the bare prop -->
<my-cool-date-picker bare></my-cool-date-picker>

```

