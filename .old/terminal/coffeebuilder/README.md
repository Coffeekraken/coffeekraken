![Webkit](.resources/doc-header.jpg)

# Coffeekraken Webpack Lazy Dom Load Plugin <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/webpack-lazy-dom-load-plugin?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/webpack-lazy-dom-load-plugin?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/webpack-lazy-dom-load-plugin?style=flat-square)

This webpack plugin allows you to automatically lazy load some javascript resources depending on the presence of some HTMLElement in the document source. Each javascript resource is linked to a CSS selector that will be monitored until it appear in the source code, then the resource will be automatically lazy loaded in your project...

<a name="readme-goals"></a>

# Goals

- Lazy load some javascript resources depending on the presence of HTMLElement inside the document source code
  - Declare which webpack entries need to be lazy loaded
  - Specify a CSS selector for each resource to lazy load
  - Automatically monitor the presence of the declared CSS selectors in the document source
  - Inject the javascript resource in the source code when needed
  - Specify when you want to lazy-load the resource like "inViewport", "visible", etc...

## Table of content

1. [Goals](#readme-goals)
2. [Install](#readme-install)
3. [Config](#readme-config)
4. [Lazy load states](#readme-lazy-load-states)
5. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>

# Install

To install the package, simply launch the command bellow:

```
npm i @coffeekraken/webpack-lazy-dom-load-plugin -save-dev
```

<a name="readme-config"></a>
# Config

In order to configure your webpack lazy dom load plugin, heres a webpack sample configuration:

```js
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');
const __LazyDomLoadPlugin = require('@coffeekraken/webpack-lazy-dom-load-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'common.bundle.js': 'src/js/common.bundle.js',
    `lazyload/${__base64.encrypt('[slide-in]:inViewport')}.js`: '@coffeekraken/sugar/js/animation/in/slide',
    `lazyload/${__base64.encrypt('[slide-out]')}.js`: '@coffeekraken/sugar/js/animation/out/slide'
    // etc...
  },
  output: {
    filename: '[name]',
    path: 'dist/js',
    publicPath: '/dist/js/',
    chunkFilename: `chunks/[name]-[chunkhash].js`
  },
  plugins: [
    new __LazyDomLoadPlugin({

      /**
       * Specify in which entry to add the generated monitoring dom code...
       * @type        String
       */
      outputEntry: 'common.bundle.js',

      /**
       * A regex that detect which entry to lazy-load and with the parentheses, extract the selector from the path...
       * @type        String
       */
      entryRegexp: '^lazyload\/(.*).js$',

      /**
       * Specify the script src tag attribute that will be injected in the source code.
       * The [name] pattern will be replaced by the entry key like "lazyload/W3NsaWRlLWluXQ==.js"
       * @type         String
       */
      scriptSrc: '/app/js/[name]',

      /**
       * Specify a function to use to decrypt the extracted selector from the entry key.
       * @type          Function
       */
      decryptSelectorFn: __base64.decrypt
    })
  ]
};
```

<a name="readme-lazy-load-states"></a>

# Lazy load states

Additionally to specify an HTMLElement CSS selector that will be detected when it appears in the source code, you can specify the state that you want for this specific HTMLElement.

To specify a state to check, you just need to follow this pattern: `selector:state`.
Here's an example:

```js
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');
const __LazyDomLoadPlugin = require('@coffeekraken/webpack-lazy-dom-load-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'common.bundle.js': 'src/js/common.bundle.js',
    `lazyload/${__base64.encrypt('[slide-in]:inViewport')}.js`: '@coffeekraken/sugar/js/animation/in/slide'
    // etc...
  },
  // etc...
};
```

The states available are these ones:

- **inViewport**: Detect when the HTMLElement enter in the viewport
- **outOfViewport**: Detect when the HTMLElement exit the viewport
- **transitionEnd**: Detect when the CSS transition is finished
- **visible**: Detect when the HTMLElement became visible

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
