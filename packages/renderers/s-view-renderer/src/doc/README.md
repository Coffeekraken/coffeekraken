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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-readme }}

## Render views (blade, twig) with ease

This package allows you to render views using template engines like `blade`, `twig` and more to come.

## Usage

Here's how to use our implementation:

```js
import __SViewRenderer from '@coffeekraken/s-view-renderer';
const renderer = new __SViewRenderer('my.cool.view');
const result = await renderer.render({
    hello: 'world'
});
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-view-renderer.node.SViewRenderer)

#### Settings

{{> interface namespace='@coffeekraken.s-view-renderer.node.interface.SViewRendererSettingsInterface' }}

#### Config

{{> config namespace='@coffeekraken.s-view-renderer.config.viewRenderer'}}

{{/ layout-readme }}