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

## Work with `sugar.json` files

This package allows you to access to `sugar.json` file(s) with ease.

## Usage

Here's how to use our implementation:

```js
import __SSugarJson from '@coffeekraken/s-sugar-json';
const sugarJson = new __SSugarJson({});
const filesContents = await sugarJson.read();
const files = await sugarJson.search();
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-sugar-json.node.SSugarJson)

#### Settings

{{> interface namespace='@coffeekraken.s-sugar-json.node.interface.SSugarJsonSettingsInterface' }}

{{/ layout-readme }}