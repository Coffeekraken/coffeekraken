<!--
/**
 * @name            Frontspec
 * @namespace       doc.specFiles
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Spec files           /doc/specfiles/frontspec
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# `frontspec.json`

> Spec version **1.0.0-alpha.0**

The `frontspec.json` has to live in your project root. It has as goal to describe what your project has to offers (css, js, typos, etc...), and where to find them.

This file is separated by purpose in an global object like so:

```js
{
    "metas": {},
    "assets": {},
    "head": {}
}
```

## metas

The `metas` object has to contain things like the author, the open graph metas, etc...
Note that This is more a **specification** that the only way to implement it. You can as well generate this by languages using node, php, etc...

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
    }
}
```

> When using our base templates like the `coffeekraken.layouts.main` one, you can override these by passing a `$metas` object to the renderer

## assets

The `assets` object has to list the **css** and **js** resources that has to be loaded for your frontend to work properly.

Each resource can specify the `env` for which it is suited. You can then specify some different files for the `development`, `production`, etc... environments.

```js
"assets": {
    "devScript": {
        "type": "module",
        "defer": true,
        "src": "/src/js/index.ts",
        "env": "development"
    },
    "module": {
        "type": "module",
        "defer": true,
        "src": "/dist/js/module.es.js",
        "env": "production"
    },
    "main": {
        "nomodule": true,
        "defer": true,
        "src": "/dist/js/index.iife.js",
        "env": "production"
    }
    "devStyle": {
        "defer": true,
        "src": "/src/css/index.css",
        "env": "development"
    }
    "style": {
        "defer": true,
        "src": "/dist/css/index.css",
        "env": "production"
    }
},
```

> When using our base templates like the `coffeekraken.layouts.main` one, you can override these by passing a `$assets` object to the renderer

{{/layout-doc }}
