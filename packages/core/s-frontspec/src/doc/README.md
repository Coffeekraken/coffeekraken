<!--
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          wip
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

## What is a frontspec?

A frontspec is a simple file that describe what your frontend has to offer like the assets (js, css, etc...), the typography styles available (h1, h2, h3, etc...), and more.

> Note that for now this is a work un progress specification. More information will be available later...

## Anatomy of a `frontspec.json`

Here's an example of `frontspec.json`:

```js
{
    "metas": {
        "lang": "en",
        "title": "Coffeekraken",
        "description": "Hello world",
        "themeColor": "#FFBB00",
        "author": {
            "name": "Olivier Bossel",
            "email": "olivier.bossel@gmail.com",
            "url": "https://olivierbossel.com"
        },
        "og": {
            "title": "Coffeekraken",
            "description": "wiufhweiufh wiuehfiuwehf",
            "type": "website",
            "url": "https://olivierbossel.com",
            "image": "/cool-image.jpg"
        }
    },
    "assets": {
        "js": {
            "dev": {
                "id": "dev",
                "type": "module",
                "defer": true,
                "src": "/src/js/index.ts",
                "env": "development"
            },
            "module": {
                "id": "module",
                "type": "module",
                "defer": true,
                "src": "/dist/js/module.es.js",
                "env": "production"
            },
            "main": {
                "id": "main",
                "nomodule": true,
                "defer": true,
                "src": "/dist/js/index.iife.js",
                "env": "production"
            }
        },
        "css": {
            "main": {
                "id": "main",
                "defer": true,
                "src": "/dist/css/index.css"
            }
        },
        "html": {
            "manifest": {
                "id": "manifest",
                "src": "./dist/favicon/favicon.html"
            }
        }
    },
    "head": {}
}
```

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
