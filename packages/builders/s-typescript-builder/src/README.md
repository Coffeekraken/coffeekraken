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

## Build your typescript in multiple formats

The main purpose of this package is to transpile your typescript easily with features like multiple formats (esm,cjs), etc...

1. **Multiple formats (cjs,esm)**
2. **Different output folders using the `%format` and `%platform` token in the `outDir`**
3. **Watch capabilities to work live on your codebase**

## Usage

Two different possibilities are offered to make use of this package:

### Using CLI

```sh
# Build your files stored in src/(js|shared|node|config)
sugar ts.build

# Start the watch and build process
sugar ts.build -w

# Display help for this command
sugar ts.build -h
```

### Using typescript

```js
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder
const builder = new __STypescriptBuilder();
const res = await builder.build({});
```

{{/ layout-readme }}
