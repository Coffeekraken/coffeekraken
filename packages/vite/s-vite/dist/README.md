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

<!-- image -->

<!-- 
![@coffeekraken/s-vite](http://127.0.0.1:3000/img/doc/readmeHeader.jpg)
 -->

<!-- header -->

# @coffeekraken/s-vite
###### MIT 2.0.0 - [Git repository]()

[![size](https://shields.io/bundlephobia/min/[packageJson.name]?style&#x3D;for-the-badge)](https://www.npmjs.com/package/[packageJson.name])
[![downloads](https://shields.io/npm/dm/[packageJson.name]?style&#x3D;for-the-badge)](https://www.npmjs.com/package/[packageJson.name])
[![license](https://shields.io/npm/l/[packageJson.name]?style&#x3D;for-the-badge)](./LICENSE)
[![discord](https://shields.io/discord/Coffeekraken?style&#x3D;for-the-badge)](https://discord.gg/ERsX54UE)


<!-- description -->



<!-- install -->

### Install

```shell
npm i @coffeekraken/s-vite

```



## [ViteJS][https://vitejs.dev] without the headeachs.

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


```js
{
    "input": {
        "description": "Specify the input js/ts file to use for the build",
        "type": "String",
        "path": {
            "exists": true,
            "absolute": true
        },
        "default": "/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/s-vite/src/js/index.ts",
        "required": true
    },
    "type": {
        "description": "Specify the type(s) of build you want. Can be \"lib\", \"bundle\" or \"module\"",
        "type": "Array<String>",
        "values": [
            "lib",
            "bundle",
            "module"
        ],
        "default": [
            "bundle",
            "module"
        ],
        "alias": "t"
    },
    "format": {
        "description": "Specify the format(s) of the output build. Can be \"es\",\"umd\",\"cjs\" or \"iife\"",
        "type": "Array<String>",
        "values": [
            "es",
            "umd",
            "cjs",
            "iife"
        ],
        "default": [],
        "alias": "f"
    },
    "target": {
        "description": "Specify the target you want for your build. Can be \"modules\",\"esnext\",\"es2015\",\"es2016\" or \"es2020\"",
        "type": "String",
        "values": [
            "modules",
            "esnext",
            "es2015",
            "es2016",
            "es2020"
        ]
    },
    "watch": {
        "description": "Specify if you want the process to watch for updates and rebuild automatically",
        "type": "Boolean",
        "default": false,
        "alias": "w"
    },
    "lib": {
        "description": "Specify if your build type is \"lib\". Same as setting the \"type\" argument to \"lib\"",
        "type": "Boolean",
        "default": false,
        "alias": "l"
    },
    "bundle": {
        "description": "Specify if your build type is \"bundle\". Same as setting the \"type\" argument to \"bundle\"",
        "type": "Boolean",
        "default": false,
        "alias": "b"
    },
    "noWrite": {
        "description": "Specify if you want to ust build but not write file(s) to the filesystem",
        "type": "Boolean",
        "default": false
    },
    "prod": {
        "description": "Specify if your build is made for production environment or not. This will automatically minify and optimize your build",
        "type": "Boolean",
        "default": false,
        "alias": "p"
    },
    "chunks": {
        "description": "Specify if you allow your build to be separated into multiple chunks or not",
        "type": "Boolean",
        "default": false,
        "alias": "c"
    },
    "minify": {
        "description": "Specify if you want to minify your build or not",
        "type": "Boolean",
        "default": false,
        "alias": "m"
    },
    "analyze": {
        "description": "Specify if you want an analyze report of your build. This use the rollup analyze plugin under the hood",
        "type": "Boolean",
        "default": false,
        "alias": "a"
    }
}

```




<!-- doc-menu -->



<!-- License -->

### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- Contact -->

### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style&#x3D;for-the-badge&amp;logo&#x3D;discord)](https://discord.gg/ERsX54UE)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style&#x3D;for-the-badge&amp;logo&#x3D;Mail.Ru)](mailto:olivier.bossel@gmail.com)

