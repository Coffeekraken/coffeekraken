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

## SFiltrableInputComponent

This package expose a simple `SFiltrableInputComponent` custom element that you can define and use in your pages easily.

## Features

-   Framework agnostic. Simply webcomponent.
-   Fully customizable
-   Built-in search
-   And more...

## Usage

First, simply import and define the component in your js/ts file:

```js
import { define } from '@coffeekraken/s-filtrable-input-component';
define();
```

Make use of it in your pages:

```html
<s-filtrable-input
    items="[{title:'Hello',value:'hello'},{title:'world',value:'world'}]"
>
    <input type="text" class="s-input" />
</s-filtrable-input>
```

## More complex example

First, define your filtrable input with a specific tag name like so:

```js
import { define } from '@coffeekraken/s-filtrable-input-component';
define({}, 'my-cool-filtrable-input');
```

Then, specify some settings like an `items` function that will be responsible to provide your list items:

```js
import { define } from '@coffeekraken/s-filtrable-input-component';
define({
    items: async () => {
        const request = await fetch('...');
        const items = await request.json();
        return items;
    },
}, 'my-cool-filtrable-input');
```

You can as well specify the templates you want for each of the component states like so:

```js
import { define } from '@coffeekraken/s-filtrable-input-component';
define({
    templates: ({ type, item, html }) => {
        switch (type) {
            case 'item':
                return html`
                    <li class="__item">
                        ${item.title}
                    </li>
                `;
                break;
            case 'loading':
                return html`
                    <li class="__loading">
                        Loading, please wait...
                    </li>
                `;
                break;
            case 'empty':
                return html`
                    <li class="__empty">
                        No items found...
                    </li>
                `;
                break;
        }
    },
}, 'my-cool-filtrable-input');
```

Use it then in your html:

```html
<my-cool-filtrable-input>
    <input type="text" class="s-input" />
</my-cool-filtrable-input>
```

> Note that the provided `html` function came from the AMAZING [lit-element](https://lit.dev) library used under the hood as template engine.

#### Attributes

{{> interface namespace='@coffeekraken.s-filtrable-input-component.js.interface.SFiltrableInputComponentInterface' }}

#### API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-filtrable-input-component.js.SFiltrableInputComponent)

{{/ layout-readme }}
