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

## [ViteJS](https://vitejs.dev) without the headeachs.

Our `SVite` implementation purpose is to use the power of ViteJS with a simplified API that is development and production ready.

## Usage

Here's how to use our implementation:

```js
import __SVite from '@coffeekraken/s-vite';
const sVite = new __SVite();

// start server
await sVite.start({
    // accept all the Vite configuration
});

// build for production
await sVite.build({

});
```

## Build parameters interface

{{> interface namespace='@coffeekraken.s-vite.node.interface.sViteBuildParamsInterface' }}

{{/ layout-readme }}