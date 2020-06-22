![Webkit](.resources/doc-header.jpg)

# Coffeekraken Webkit <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/webkit?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/webkit?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/webkit?style=flat-square)

Coffeekraken webkit package is made to help you create views (blade, twig), stylesheets using sass, postcss, etc..., and javascript bundles using babel, webpack and some plugins without having to configure anything. Here's the list of features that cover the webkit package:

<a name="readme-goals"></a>

# Goals

- Generate, compile and optimize your stylesheets
  - [sass-glob-importer](https://www.npmjs.com/package/sass-glob-importer) built-in
  - [PostCSS Autoprefixer](https://www.npmjs.com/package/autoprefixer) built-in
  - [PostCSS PreCSS](https://www.npmjs.com/package/precss) built-in
  - [PostCSS Preset Env](https://www.npmjs.com/package/postcss-preset-env) built-in
  - [PostCss CSS Nano](https://www.npmjs.com/package/cssnano) built-in
  - [PostCSS Rucksack CSS](https://www.npmjs.com/package/rucksack-css) built-in
- Generate, compile and optimize your javascript files/bundles
  - [Babel](https://babeljs.io/) built-in
  - [Babel Preset Env](https://babeljs.io/docs/en/babel-preset-env) built-in
  - [Webpack](https://webpack.js.org/) built-in
  - [Import glob](https://www.npmjs.com/package/webpack-import-glob-loader) built-in
  - [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) built-in
- Compress and optimize your images
  - [Coffeekraken Imagemin](https://www.npmjs.com/package/coffeekraken-imagemin) built-in
- Generate your markdown documentation files from source code
  - [Coffeekraken Docblock to markdown](https://www.npmjs.com/package/@coffeekraken/docblock-to-markdown) built-in
  - Generate a "docMap.json" file at the root of your project if wanted
- Run your tests using [Jest](https://jestjs.io/)
- Create a development php server to enhance your workflow
  - [Coffeekraken Pre-view](https://www.npmjs.com/package/@coffeekraken/pre-view) built-in
- Clean and useful terminal interface to handle all these features easily
  - [Coffeekraken Scripts-stack](https://www.npmjs.com/package/@coffeekraken/scripts-stack) built-in
  - Scripts-stack configuration built-in with a nice list of scripts that handle all the webkit features
  - Automatically watch your sources files to launch the differents compilation scripts

## Table of content

1. [Goals](#readme-goals)
2. [Install](#readme-install)
3. [CLI](#readme-cli)
4. [Config](#readme-config)
5. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>

# Install

To install the package, simply launch the command bellow:

```
npm i @coffeekraken/webkit -save-dev
```

<a name="readme-cli"></a>

# CLI

This package expose a CLI with multiple commands that you can use. Here's the list

## ```ck-webkit start```

Start the [Coffeekraken Scripts-stack](https://www.npmjs.com/package/@coffeekraken/scripts-stack) interface listing all the scripts needed to compile/generate your sources files

## ```ck-webkit dist```

Compile/generate/optimize all your sources files like images, javascript and stylesheets (.scss) files

#### ```ck-webkit js```

Build your javascripts files stored in *src/js* directory using babel. This will not build the javascripts files that match this pattern: ```*.bundle.js```

#### ```ck-webkit js -b```

Build your javascripts bundle files stored in *src/js* that follow this pattern ```*.bundle.js``` using webpack.

#### ```ck-webkit js -a```

Build your javascripts bundle files stored in *src/js* and open in the browser an interface that let you analyze your bundle.

#### ```ck-webkit css```

Compile your ```.scss``` files stored in *src/css* directory. This command will handle all the ```.scss``` files that does not start with a *_* like ```_button.scss```.

#### ```ck-webkit img```

Compress and optimize all your images stored in *src/img* directory.

## ```ck-webkit doc```

Generate your documentation markdown files by analyzing your sources files like ```scss|js``` ones, grabing the docblocks founded in these files and converting this to well formatted markdown files inside the *doc* directory.

#### ```ck-webkit doc map```

This will analyze your documentation markdown files for ```@namespace     something.something...``` docblock tags to generate a ```docMap.json``` file that will look like this:

```JSON
{
  "my.cool.namespace": "doc/path/to/the/markdown/file.md",
  // etc...
}
```

## ```ck-webkit test```

This will launch all your javascript tests files stored in the *tests* directory using [Jest](https://jestjs.io/).

## ```ck-webkit pre-view```

This will launch the [Coffeekraken Pre-view](https://www.npmjs.com/package/@coffeekraken/pre-view) server to help you having a smoother workflow and display your views with ease.

<a name="readme-config"></a>
# Config

In order to configure your webkit project, you just need to create a ```webkit.config.js``` file in your repository root folder.

Here's a ```webkit.config.js``` config file sample:

```js
module.exports = {

  dist: {

    js: {

      /**
       * This define the path to the javascript source folder
       * @type      String
       */
      sourceFolder: 'src/js',

      /**
       * This define the path to the javascript output folder
       * @type      String
       */
      outputFolder: 'dist/js',

      /**
       * This define a pattern to ignore when searching for the javascript files to compile
       * @type      String
       */
      ignorePattern: '**/*.bundle.js',

      bundle: {

        /**
         * This define a glob pattern to search for the javascript files to bundle
         * @type      String
         */
        sourceFilesPattern: './src/js/**/*.bundle.js',

        /**
         * This define the path to the bundles output folder
         * @type      String
         */
        outputFolder: 'dist/js'

      }

    },

    css: {

      /**
       * This define a pattern to follow to find the stylesheet files inside the sourceFolder
       * @type        String
       */
      sourceFilesPattern: '**/!(_)*.scss',

      /**
       * This define the css source folder
       * @type        String
       */
      sourceFolder: 'src/scss',

      /**
       * This define the css output folder
       * @type        String
       */
      outputFolder: 'dist/css',

      /**
       * This define the folders to lookup when compiling the sources files
       * @type        String
       */
      loadPaths: [
        'node_modules',
        'node_modules/@coffeekraken'
      ],

      /**
       * This define a glob pattern that will be added inside the source files before compiling them
       * @type        String
       */
      importGlobPattern: 'views/**/!(_)*.scss',

      /**
       * This define the output style of the css files
       * This can be "compressed, nested, expanded, compact"
       * @type        String
       */
      style: 'compressed'

    },

    img: {

      /**
       * This define the source folder that hold the images to optimize
       * @type        String
       */
      sourceFolder: 'src/img',

      /**
       * This define the output folder for the optimized images
       * @type        String
       */
      outputFolder: 'dist/img',

      /**
       * This define the output quality for the images. This can be between 100 and 0
       * @type        Integer
       */
      quality: 80

    }

  },

  doc: {

    /**
     * This define the glob pattern to search for files in the doc source folder
     * @type          String
     */
    filesPattern: 'src/**/*',

    /**
     * This define the output folder where to generate all the documentations markdown files from the docblocks
     * @type        String
     */
    outputFolder: 'doc'

  },

  docMap: {

    /**
     * This define the glob pattern to find for the markdown (.md) documentation files
     * @type            String
     */
    srcFilesPattern: '**/*.md',

    /**
     * This define the glob patterns of the folders to avoid when searching for the documentation markdown files
     * @type          Array<String>
     */
    srcFilesIgnore: ['**/node_modules/**'],

    /**
     * This define the name of the docMap file that will be generated at the monorepo root folder
     * @type          String
     */
    outputFilename: 'docMap.json'
  },

  tests: {

    /**
     * This define the glob patterns to find the tests files
     * @type      String
     */
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],

    /**
     * This define the loaders to execute depending on the regex that define the object key
     * @type          Object<String|Array>
     */
    transform: {
      "\\.txt$": "jest-raw-loader",
      "\\.js$": ["babel-jest", { rootMode: "upward" }]
    }

  }

};
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
