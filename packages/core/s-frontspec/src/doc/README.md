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

## SFrontspec

This package expose a simple `SFrontspec` class that allows you to represent the `frontspec.json` file at the root of your project.

## Features

-   Read the `frontspec.json` file
-   Apply en `env` to get the adapted frontspec result
-   Add a default `frontspec.json` file to your project
-   And more...

## Usage

Here's a simple example how to use the SFrontspec class:

```js
import __SFrontspec from '@coffeekraken/s-frontspec';
const frontspec = new __SFrontspec();
const result = await frontspec.read();
```

Or Using the `sugar` CLI:

```shell
# read the frontspec
sugar frontspec.read
# add default frontspec to your project
sugar frontspec.add
```

## Read parameters

{{> interface namespace='@coffeekraken.s-frontspec.node.interface.SFrontspecReadParamsInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-frontspec.node.SFrontspec)

{{/ layout-readme }}
