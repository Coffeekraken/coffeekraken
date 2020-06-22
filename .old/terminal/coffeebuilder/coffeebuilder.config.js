const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const projectPackageJson = require(process.cwd() + '/package.json');
const __fs = require('fs');

const __CoffeeBuilderPlugin = require('./src/node/webpack/CoffeeBuilderPlugin');

/**
 * @name                              coffeebuilder.config.js
 * @namespace                         terminal.coffeebuilder
 * @type                              Object
 * 
 * This object represent the default config for the coffeebuilder package.
 * You can simply override these configs by defining a "coffeebuilder.config.js" file at the root of your project.
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const defaultConfig = {

  /**
   * @name                        watch
   * @namespace                   terminal.coffeebuilder.config
   * @type                        Array
   * 
   * Which files types to compile
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  compile: ['js', 'css', 'images'],

  /**
   * @name                        watch
   * @namespace                   terminal.coffeebuilder.config
   * @type                        Boolean
   * 
   * If you want to watch the files and run the
   * compilation automatically
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  watch: true,

  /**
   * @name                        autoSwitch
   * @namespace                   terminal.coffeebuilder.config
   * @type                        Boolean
   * 
   * If you want to switch automatically between pages depending on the running process...
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  autoSwitch: true,

  /**
   * @name                          exclude
   * @namespace                     terminal.coffeebuilder.config
   * @type                          Array
   * 
   * Define some glob patterns that have to be excluded of the compilation process
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  exclude: ['*/node_modules/*'],

  /**
   * @name                          packages
   * @namespace                     terminal.coffeebuilder.config
   * @type                          Array
   * 
   * Register all the packages that will be used during the CoffeeBuilder process.
   * A package has to responde to the criterions of at least one packagesAdapters registered.
   * A package adapter is a simple class that will analyze the passed package path and expose
   * some informations from this package as the name, the version and the description.
   * 
   * If you don't specify any packages yourself, CoffeeBuilder will search for them in the sub folders
   * of the current process root one.
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  packages: [],

  /**
   * @name                              packagesAdapters
   * @namespace                         terminal.coffeebuilder.config
   * @type                              Array
   * 
   * Specify all the packages adapters to use. A package adapter has to be a simple object that has to expose these functions:
   * - static searchGlob = 'package.json': Has to be a glob pattern that tells CoffeeBuilder how to find this package type
   * - static isPackage(path): Has to return true or false depending if the passed package path match the adapter criterions
   * - get name: Has to return the package name
   * - get description: Has to return the package description
   * - get version: Has to return the package version
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  packagesAdapters: [
    require('./src/node/classes/packagesAdapters/NodePackageAdapter'),
    require('./src/node/classes/packagesAdapters/ComposerPackageAdapter')
  ],

  /**
   * @name                          resources
   * @namespace                     terminal.coffeebuilder.config
   * @type                          Object
   * 
   * List all the file types that you want to build. The key ob each types is what is used in the "compile" config to specify
   * which file types to compile, watch, etc...
   * Each resources types is composed of 5 properties which are:
   * 1. extensions: An array of files extensions to handle
   * 2. outputFolders: An array of output folders where you want the processed files to be saved
   * 3. sourcesFolders: An array of folders in which to search for the files defines by the "sources" property
   * 4. sources: A glob pattern that define the files to handle in the sources folders
   * 5. saveExtension: An optional extension in which to save the processed files. For "scss" or "sass" files, the saveExtension will be "css"
   * 
   * example          js
   * resources: {
   *    css: {
   *      extensions: ['css','scss','sass'],
   *      outputFolders: ['dist/css'],
   *      sourcesFolders: ['src/css'],
   *      sources: '*.bundle.{css,scss,sass}',
   *      saveExtension: 'css'
   *    }
   * }
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  resources: {

    /**
     * @name                      js
     * @namespace                 terminal.coffeebuilder.config.resources
     * @type                      Object
     * 
     * JS resources type
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    js: {
      extensions: ['js', 'coffee', 'ts'],
      outputFolders: ['dist/js', 'dist/coco/js'],
      sourcesFolders: ['src/js'],
      sources: '**/*.bundle.{js,coffee,ts}',
      saveExtension: 'js'
    },

    /**
     * @name                      css
     * @namespace                 terminal.coffeebuilder.config.resources
     * @type                      Object
     * 
     * CSS resources type
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    css: {
      extensions: ['css', 'scss', 'sass'],
      outputFolders: ['dist/css'],
      sourcesFolders: ['src/css'],
      sources: '**/*.bundle.{css,scss,sass}',
      saveExtension: 'css'
    },

    /**
     * @name                      images
     * @namespace                 terminal.coffeebuilder.config.resources
     * @type                      Object
     * 
     * Images resources type. This resources type has an additional property which is:
     * - quality: A number between 0 and 100 which define the wanted image quality
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    images: {
      extensions: ['jpg', 'jpeg', 'svg', 'gif', 'png', 'webp'],
      outputFolders: ['dist/images'],
      sourcesFolders: ['src/images'],
      sources: '**/*.{jpg,jpeg,svg,gif,png,webp}',
      quality: 70
    }

  },

  /**
   * @name                            processors
   * @namespace                       terminal.coffeebuilder.config
   * @type                            Object
   * 
   * Registered processors.
   * A processor is a function that has to return a Promise, that is executed on every resources that match the extensions config and that take as parameters:
   * - filepath: The path of the file that is processed
   * - source: The file source to process in String of Buffer format
   * - settings: The settings object registered with the processor
   * 
   * The promise returned has to be resolved once the process has been made with this Object format:
   * - source: The processed source in String of Buffer format
   * - map: A source map object if needed (optional)
   * - extension: The extension under which the processed file has to be saved (optional)
   * 
   * The object used to register a processor has to be formatted like that:
   * - extendions: An array of file extensions to handle with this processor
   * - saveExtension: The extension under which the processed file has to be savec (optional)
   * - processor: The actual processor function that will be called for each resourses to process
   * - settings: An object that represent the processor settings if needed
   * - weight: A number that indicates the weight of the processor. The processor that has the higher weight will be executed first, etc...
   * 
   * @example               js
   * processors: {
   *    babel: {
   *      extensions: ['js'],
   *      processor: require('./processors/js/babel'),
   *      settings: {},
   *      weight: 10
   *    }
   * }
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  processors: {

    /**
     * @name                      babel
     * @namespace                 terminal.coffeebuilder.config.processors
     * @type                      Object
     * 
     * Processor that apply the babel package on the js sources
     * - weight: 20
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    babel: {
      extensions: ['js', 'ts', 'coffee'],
      processor: require(__dirname + '/src/node/processors/js/babel'),
      settings: {
        presets: [
          [
            "@babel/env",
            {
              useBuiltIns: "usage",
              corejs: "3.0.0"
            }
          ]
        ],
        plugins: [
          "add-module-exports",
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-export-default-from"
        ]
      },
      cache: true,
      weight: 20
    },

    /**
     * @name                      typescript
     * @namespace                 terminal.coffeebuilder.config.processors
     * @type                      Object
     * 
     * Processor that apply the typescript package on the ts sources
     * - weight: 100
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    typescript: {
      extensions: ['ts'],
      saveExtension: 'js',
      processor: require(__dirname + '/src/node/processors/js/typescript'),
      settings: {},
      cache: true,
      weight: 100
    },

    /**
     * @name                      coffeescript
     * @namespace                 terminal.coffeebuilder.config.processors
     * @type                      Object
     * 
     * Processor that apply the coffeescript package on the coffee sources
     * - weight: 100
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    coffeescript: {
      extensions: ['coffee'],
      saveExtension: 'js',
      processor: require(__dirname + '/src/node/processors/js/coffeescript'),
      settings: {},
      cache: true,
      weight: 100
    },

    /**
     * @name                      mozjpeg
     * @namespace                 terminal.coffeebuilder.config.processors
     * @type                      Object
     * 
     * Processor that apply the imagemin-mozjpeg package on the jpg sources
     * - weight: 100
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    mozjpeg: {
      extensions: ['jpg', 'jpeg'],
      processor: require(__dirname + '/src/node/processors/image/mozjpeg'),
      settings: {
        quality: 70
      },
      cache: true,
      weight: 100
    },

    /**
    * @name                      pngquant
    * @namespace                 terminal.coffeebuilder.config.processors
    * @type                      Object
    * 
    * Processor that apply the imagemin-pngquant package on the png sources
    * - weight: 100
    * 
    * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
    pngquant: {
      extensions: ['png'],
      processor: require(__dirname + '/src/node/processors/image/pngquant'),
      settings: {
        quality: 70
      },
      cache: true,
      weight: 100
    },

    /**
     * @name                      gifsicle
     * @namespace                 terminal.coffeebuilder.config.processors
     * @type                      Object
     * 
     * Processor that apply the imagemin-gifsicle package on the gif sources
     * - weight: 100
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    gifsicle: {
      extensions: ['gif'],
      processor: require(__dirname + '/src/node/processors/image/gifsicle'),
      settings: {
        quality: 70
      },
      cache: true,
      weight: 100
    },

    /**
    * @name                      webp
    * @namespace                 terminal.coffeebuilder.config.processors
    * @type                      Object
    * 
    * Processor that apply the imagemin-webp package on the webp sources
    * - weight: 100
    * 
    * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
    webp: {
      extensions: ['webp'],
      processor: require(__dirname + '/src/node/processors/image/webp'),
      settings: {
        quality: 70
      },
      cache: true,
      weight: 100
    },

    /**
    * @name                      svgo
    * @namespace                 terminal.coffeebuilder.config.processors
    * @type                      Object
    * 
    * Processor that apply the imagemin-svgo package on the svg sources
    * - weight: 100
    * 
    * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
    svgo: {
      extensions: ['svg'],
      processor: require(__dirname + '/src/node/processors/image/svgo'),
      settings: {},
      cache: true,
      weight: 100
    },

    /**
    * @name                      sass
    * @namespace                 terminal.coffeebuilder.config.processors
    * @type                      Object
    * 
    * Processor that apply the sass package on the sass sources
    * - weight: 100
    * 
    * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
    sass: {
      extensions: ['scss', 'sass'],
      processor: require(__dirname + '/src/node/processors/css/sass'),
      settings: {},
      cache: true,
      weight: 100
    }

  },

  /**
   * @name                            postProcessors
   * @namespace                       terminal.coffeebuilder.config
   * @type                            Object
   * 
   * Registered post processors.
   * A post processor is a function that has to return a Promise, that is executed on processed files (see processors) and that take as parameters:
   * - filepath: The path of the file that is processed
   * - source: The file source to process in String of Buffer format
   * - settings: The settings object registered with the post processor
   * 
   * The promise returned has to be resolved once the process has been made with this Object format:
   * - source: The processed source in String of Buffer format
   * - map: A source map object if needed (optional)
   * - extension: The extension under which the processed file has to be saved (optional)
   * 
   * The object used to register a post processor has to be formatted like that:
   * - extendions: An array of file extensions to handle with this post processor
   * - processor: The actual post processor function that will be called for each resourses to process
   * - settings: An object that represent the post processor settings if needed
   * - weight: A number that indicates the weight of the post processor. The post processor that has the higher weight will be executed first, etc...
   * 
   * @example               js
   * postProcessors: {
   *    terser: {
   *      extensions: ['js'],
   *      processor: require('./postProcessors/js/terser'),
   *      settings: {},
   *      weight: 10
   *    }
   * }
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  postProcessors: {

    // /**
    //  * @name                      injectScript
    //  * @namespace                 terminal.coffeebuilder.config.postProcessors
    //  * @type                      Object
    //  * 
    //  * Post processor that handle the injected scripts injected using the "api.injectScript" method
    //  * 
    //  * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //  */
    // injectScript: {
    //   extensions: ['js'],
    //   processor: require(__dirname + '/src/node/postProcessors/js/injectScript'),
    //   settings: {},
    //   weight: 100
    // },

    /**
     * @name                      terser
     * @namespace                 terminal.coffeebuilder.config.postProcessors
     * @type                      Object
     * 
     * Post processor that apply the terser package on the js sources to optimize and minimze them
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    terser: {
      extensions: ['js'],
      processor: require(__dirname + '/src/node/postProcessors/js/terser'),
      settings: {},
      weight: 10
    },

    /**
     * @name                      cleanCss
     * @namespace                 terminal.coffeebuilder.config.postProcessors
     * @type                      Object
     * 
     * Post processor that apply the cleanCss package on the css sources to optimize and minimze them
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cleanCss: {
      extensions: ['css', 'scss', 'sass'],
      processor: require(__dirname + '/src/node/postProcessors/css/cleanCss'),
      settings: {},
      weight: 10
    }

  },

  /**
   * @name            plugins
   * @namespace       terminal.coffeebuilder
   * @type            Object
   * 
   * Store all the registered plugins default config
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  plugins: {

    /**
     * @name                  injectScript
     * @namespace             terminal.coffeebuilder.config.plugins
     * @type                  Object
     * 
     * Default post processors plugin
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    injectScript: {
      plugin: require(`${__dirname}/src/node/plugins/injectScript`),
      settings: {}
    },

    /**
     * @name                  postProcessors
     * @namespace             terminal.coffeebuilder.config.plugins
     * @type                  Object
     * 
     * Default post processors plugin
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    postProcessors: {
      plugin: require(`${__dirname}/src/node/plugins/postProcessors`),
      settings: {}
    },

    /**
     * @name                  lazyDomLoad
     * @namespace             terminal.coffeebuilder.config.plugins
     * @type                  Object
     * 
     * Store all the lazyDomLoad plugin default config
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    lazyDomLoad: {
      plugin: require(`${__dirname}/src/node/plugins/lazyDomLoad`),
      settings: {

        /**
         * @name                  outputEntry
         * @namespace             terminal.coffeebuilder.config.plugins.lazyDomLoad
         * @type                  String
         * 
         * Specify in which entry to add the generated monitoring dom code...
         * 
         * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        outputEntry: 'common.bundle.js',

        /**
         * @name                      resourcesPattern
         * @namespace                 terminal.coffeebuilder.config.plugins.lazyDomLoad
         * @type                      String
         * 
         * A regex that detect which entry to lazy-load and with the parentheses, extract the selector from the path...
         * 
         * @type        String
         */
        resourcesPattern: 'src/js/lazyLoad/*.js',

        /**
         * @name                      resources
         * @namespace                 terminal.coffeebuilder.config.plugins.lazyDomLoad
         * @type                      Object
         * 
         * Store all the resources to lazy load. The format is {cssSelector}: {resourcePath}
         * 
         * @example           js
         * resources: {
         *    'my-cool-component': '@coffeekraken/my-cool-component',
         *    '[slide="in"]': './animations/slide-in',
         *    // etc...
         * }
         * 
         * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        resources: {

        }

      }

    }

  },

  /**
   * @name                                    vendors
   * @namespace                               terminal.coffeebuilder.config
   * @type                                    Object
   * 
   * This is used to configure the vendors used in coffeebuilder. Here's the list of them:
   * - webpack: Default webpack configuration. Normaly you don't have to touch this but the option is opened...
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  vendors: {

    /**
     * @name                            webpack
     * @namespace                       terminal.coffeebuilder.config.vendors
     * @type                            Object
     * 
     * Webpack default settings
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    webpack: {
      mode: 'production',
      entry: {},
      output: {
        filename: '[name]',
        pathinfo: false,
        path: process.cwd(),
        chunkFilename: `dist/js/chunks/[name]-[chunkhash]-${projectPackageJson.version}.js`
      },
      devtool: 'source-map',
      plugins: [],
      optimization: {
        minimize: true
      },
      resolve: {
        modules: [],
        alias: {}
      },
      module: {
        rules: [{
          test: /\.*$/,
          use: [{
            loader: `${__dirname}/src/node/webpack/CoffeeBuilderLoader`,
            options: {}
          }]
        },
          // {
          //   test: /\.js$/,
          //   use: [{
          //     loader: 'webpack-import-glob-loader',
          //     options: {}
          //   }]
          // }
        ]
      }
    }
  },

};

let settings = defaultConfig;
if (__fs.existsSync(`${process.cwd()}/coffeebuilder.config`)) {
  settings = __deepMerge(settings, require(`${process.cwd()}/coffeebuilder.config`));
}

const coffeeBuilderPluginInstance = new __CoffeeBuilderPlugin(settings);
settings.vendors.webpack.plugins.push(coffeeBuilderPluginInstance);

module.exports = settings;
module.exports.setup = function (newSettings) {
  settings = __deepMerge(settings, newSettings);
  return settings;
}