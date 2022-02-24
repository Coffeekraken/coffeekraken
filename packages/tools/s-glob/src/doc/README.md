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

## Glob under steroids

This `SGlob` class allows you mainly to resolve glob patterns. It uses under the hood the [glob](https://www.npmjs.com/package/glob) package and add some nice features to it like:

- Additional syntax to be more precise in your globs
- Support for array of glob patterns
- Possibility to specify some `regex` to search into the files
- Return an array of [SFile](/@coffeekraken/s-glob/doc/readme)
- Check if a string is a glob or not
- Extract from a string the glob part
- Extract from a string the none glob part
- More to come...

## Usage

Here's how to use our implementation:

```js
import __SGlob from '@coffeekraken/s-glob';

// Using static methods
await __SGlob.resolve('**/*.js');
__SGlob.isGlob('something/**/cool.js', {
    // settings
});

// Using instance
const glob = new __SGlob('**/*.js', {
    // settings
});
await glob.resolve();
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-glob.node.SGlob)

#### Settings

{{> interface namespace='@coffeekraken.s-glob.node.interface.SGlobSettingsInterface' }}

{{/ layout-readme }}