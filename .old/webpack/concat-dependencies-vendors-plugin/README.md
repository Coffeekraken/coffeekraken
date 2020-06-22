![Webkit](.resources/doc-header.jpg)

# Coffeekraken Webpack Concat Dependencies Vendors Plugin <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/webpack-concat-dependencies-vendors-plugin?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/webpack-concat-dependencies-vendors-plugin?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/webpack-concat-dependencies-vendors-plugin?style=flat-square)

This allow to concatene all the imported dependencies files that have the same name (but another extension) in a configurated output file.

<a name="readme-goals"></a>

# Goals

- Concatene the files that have the same name as the imported dependencies into one single output file.
  - Specify which imported files types have to be handled
  - Specify which files types have to be concatenate into the output one

## Table of content

1. [Goals](#readme-goals)
2. [Install](#readme-install)
3. [Config](#readme-config)
4. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>

# Install

To install the package, simply launch the command bellow:

```
npm i @coffeekraken/webpack-concat-dependencies-vendors-plugin -save-dev
```

<a name="readme-config"></a>
# Config

In order to configure your webpack concat dependencies vendors plugin, heres a webpack sample configuration:

```js
const __ConcatDependenciesVendorsPlugin = require('@coffeekraken/webpack-concat-dependencies-vendors-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'common.bundle.js': 'src/js/common.bundle.js'
    // etc...
  },
  output: {
    filename: '[name]',
    path: 'dist/js'
  },
  plugins: [
    new __ConcatDependenciesVendorsPlugin({

      /**
       * Specify which imported files have to be handled using an array of extensions
       * @type            Array
       */
      dependenciesExtensions: ['js'],

      /**
       * Specify which files extensions need to be concatenated in the final single output one using an array of extensions
       * @type             Array
       */
      vendorsExtensions: ['css'],

      /**
       * Specify the output file path in which you want to concatenate the vendors ones
       * If the file exists already, the concatenated content will be added at the end
       * @type            String
       */
      outputFilePath: 'dist/my-cool-output-file.css'

    })
  ]
};
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
