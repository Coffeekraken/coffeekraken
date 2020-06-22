![Sugar](.resources/doc-header.jpg)

# Coffeekraken Monorepo <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/monorepo?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/monorepo?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/monorepo?style=flat-square)


Coffeekraken monorepo package is made to help you manage a repository that contain multiple "projects/packages".
To help you understand a little bit more the goal of this package, here's a list of features that's covered:

<a name="readme-goals"></a>

# Goals

- Define some scripts in the "package.json" root file and launch them in your subfolders using "ck run \<script\>"
  - Check inside the "local" package.json file if the wanted script exist
  - If not exist in the "local" package.json, will check in the "global" package.json file at the repository root folder
- Generate the markdown documentation from the docblocks inside your source files
- Generate a "docMap.json" file from your documentation using the "@namespace" docblock tag
  - Create an object formatted like so: { \<namespace\>: \<docFilePath\> }
- Compiling your javascript files found in the "src" folder using babel
  - Easily extend the babel configuration using a "babel.config.js" file
    - This file can be created either at the repository root or at the "project/package" root...
- Bundling and compiling your "\*.bundle.js" founded files from the "src" folder using webpack
  - Babel loader is already included
  - Easily extend the webpack configuration using a "webpack.config.js" file
    - This file can be created either at the repository root or at the "project/package" root...
- Compiling your "\*.scss" files found in the "src" folder using sass
  - Automatically set the "load-path" sass option to look inside the "node_modules" and "node_modules/@coffeekraken" directory
- Optimizing/compressing the images found in the "src/img" folder using imagemin
- Executing your "\*.test.js" files founded using jest
  - Execute the tests in the current directory
  - Execute the tests of all the "projects/packages" with 1 command


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
npm i @coffeekraken/monorepo -save-dev
```

<a name="readme-cli"></a>

# CLI

This package expose a CLI with multiple commands that you can use. Here's the list

## ```ck run <script>```

This command allows you to run a script defined inside your "package.json" file. It works pretty much like the ```npm run``` command with 1 important difference.

Admit that you have a monorepo formatted like so:

```
|- package.json
|- ...some other files/directories
|- layout
      |- package.json
      |- ...some other files/directory
```

Then you are with your terminal inside the ```.../layout/``` directory.
You want to launch the ```doSomethingCool``` command defines inside your package.json file.

By launching the command ```ck run doSomethingCool```, the package will:

1. Check in the ```.../layout/package.json``` file if a script called "doSomethingCool" is defined
  - If the script exist, it will be executed
2. If the script does not exist, the package will check inside the ```.../package.json``` file if the script exist
  - If the script exist, it will be executed
  - The "cwd" of the launched script will stay ```.../layout```

## ```ck dist <what>```

This command is used to generate/compiling/optimizing the files like javascript ones, scss ones or images ones founded inside the ```src``` folder.

#### ```ck dist js```

Using this command, the package will search for all the javascript files in the ```src/js``` folder and will compile them inside the ```dist/js``` one.

#### ```ck dist js --bundle```

This command will bundling/compiling all the ```*.bundle.js``` files founded in the ```src/js``` folder and output them inside the ```dist/js``` one.

#### ```ck dist css```

This command will compiling all the ```*.scss``` files that doesn't have the name starting with a ```_``` like ```_button.scss``` founded in the ```src/scss``` folder and output them inside the ```dist/css``` one.

#### ```ck dist img```

This command will optimize/compress all the images files founded inside the ```src/img``` folder and output them inside the ```dist/img``` one.

## ```ck doc```

This command will search docblocks inside your source files inside the ```src``` folder and generate for each files a documentation one in markdown format inside the ```doc``` folder.

#### ```ck doc all```

This command is the same as the ```ck doc``` one with the difference that it will generate documentation for every "project/package" of your repository.

#### ```ck doc map```

This command will parse every markdown files from your ```doc``` folder and generate a ```docMap.json``` file at the repository root.

Admit that you have a javascript source file stored in ```src/js/plop/myCoolFunction.js``` like so:

```js
/**
 * @name              myCoolFunction
 * @namespace         my.cool.namespace
 * etc...
 */
export default function myCoolFunction() {
  // something cool here...
}
```

By launching the command ```ck doc```, a markdown file will be generated at ```doc/src/js/plop/myCoolFunction.md```

This file will be parsed by the command ```ck docMap``` and will generate a ```docMap.json``` file in the repository root folder like so:

```json
{
  "my.cool.namespace": "doc/src/js/plop/myCoolFunction.md",
  // etc...
}
```

This ```docMap.json``` file is very useful if you want to create some UI like a searchable select input and map the result with the documentation file path, etc... This is just an example but you can do a lot of things with this generated file.

## ```ck test```

This command will search for every ```*.test.js``` files inside the ```tests``` folder and execute them using [jest](https://jestjs.io/).

#### ```ck test all```

This command is the same the the ```ck test``` one with the difference that this one will execute the tests of all the "projects/packages" found in your repository.

## ```ck install```

This command is the same as the ```npm install``` one with the difference that this one will take these properties of the ```package.json``` file:

- ```dependencies```: All the standard dependencies of your package
- ```devDependencies```: All the dependencies that are only for the development purpose
- ```globalDependencies```: All the dependencies that need to be installed globally on your system

<a name="readme-config"></a>

# Config

In order to configure your monorepo, you just need to create a ```monorepo.config.js``` file in your repository root folder.

Here's a ```monorepo.config.js``` config file sample:

```js
const __pkgUp = require("pkg-up");
const __findUp = require('find-up');
let repositoryRootPath = __findUp.sync(['.git', 'monorepo.config.js']);
let generalPackageJsonPath = __pkgUp.sync({ cwd: process.cwd() + "/../" });
module.exports = {

  /**
   * This define how to find your "projects/packages" folders inside your repository.
   * The [glob](https://www.npmjs.com/package/glob) is used under the hood to process the search
   * @type      String
   */
  packagesPattern: '**/package.json',

  /**
   * This define how to load the "package.json" file of the "current working directory"
   * @type      JSON
   */
  localPackageJson: require(process.cwd() + "/package.json"),

  /**
   * This define how to load the "package.json" file of the repository root folder
   * @type      JSON
   */
  generalPackageJson: require(generalPackageJsonPath),

  /**
   * This define the repository root folder path
   * In the default config file, it is defined by searching for a ".git" folder and a "monorepo.config.js" file
   * @type        String
   */
  repositoryRootPath: repositoryRootPath,

  dist: {

    js: {

      /**
       * This define the path to the javascript source folder
       * The "<rootDir>" will be replaced by the "--rootDir <value>" command option
       * @type      String
       */
      sourceFolder: '<rootDir>/src/js',

      /**
       * This define the path to the javascript output folder
       * The "<rootDir>" will be replaced by the "--rootDir <value>" command option
       * @type      String
       */
      outputFolder: '<rootDir>/dist/js',

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
        sourceFilesPattern: './<rootDir>/src/js/**/*.bundle.js',

        /**
         * This define the path to the bundles output folder
         * The "<rootDir>" will be replaced by the "--rootDir <value>" command option
         * @type      String
         */
        outputFolder: '<rootDir>/dist/js'
      }
    },

    css: {

      /**
       * This define the css source folder
       * The "<rootDir>" will be replaced by the "--rootDir <value>" command option
       * @type        String
       */
      sourceFolder: '<rootDir>/src/scss',

      /**
       * This define the css output folder
       * The "<rootDir>" will be replaced by the "--rootDir <value>" command option
       * @type        String
       */
      outputFolder: '<rootDir>/dist/css',

      /**
       * This define the folders to lookup when compiling the sources files
       * @type        String
       */
      loadPaths: [
        'node_modules',
        'node_modules/@coffeekraken'
      ],

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
       * The "<rootDir>" will be replaced by the "--rootDir <value>" command option
       * @type        String
       */
      sourceFolder: '<rootDir>/src/img',

      /**
       * This define the output folder for the optimized images
       * The "<rootDir>" will be replaced by the "--rootDir <value>" command option
       * @type        String
       */
      outputFolder: '<rootDir>/dist/img',

      /**
       * This define the output quality for the images. This can be between 100 and 0
       * @type        Integer
       */
      quality: 80
    }
  },

  demo: {

    /**
     * This define the demo folder where you can find a "src" one and a "dist" one
     * @type          String
     */
    folder: 'demo'

  },

  doc: {

    /**
     * This definethe glob pattern to find the sources folders in the monorepo
     * @type          String
     */
    srcFoldersPattern: '**/src',

    /**
     * This define the folders glob patterns of the folders to ignore when searching for the documentation docblocks
     * @type          Array<String>
     */
    srcFoldersIgnore: [
      '**/node_modules/**',
      '**/vendor/**',
      '**/doc/**',
      '**/demo/**',
      '**/appsRoot/**'
    ],

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
