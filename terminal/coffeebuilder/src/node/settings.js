const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const projectPackageJson = require(process.cwd() + '/package.json');
const __path = require('path');

let _settings = {

  /**
   * Which files types to compile
   */
  compile: ['js','css','images'],

  /**
   * If you want to watch the files and run the
   * compilation automatically
   */
  watch: true,

  /**
   * List all the file types that you want to build
   */
  files: {

    /**
     * JS file type
     */
    js: {
      extensions: ['js','coffee','ts'],
      outputFolder: ['dist/js'],
      sourcesFolder: ['src/js'],
      sources: '**/*.bundle.{js,coffee,ts}',
      saveExtension: 'js'
    },

    /**
     * CSS file type
     */
    css: {
      extensions: ['css','scss','sass'],
      outputFolder: ['dist/css'],
      sourcesFolder: ['src/css'],
      sources: '**/*.bundle.{css,scss,sass}',
      saveExtension: 'css'
    },

    /**
     * Images file type
     */
    images: {
      extensions: ['jpg','jpeg','svg','gif','png','webp'],
      outputFolder: ['dist/images'],
      sourcesFolder: ['src/images'],
      sources: '**/*.{jpg,jpeg,svg,gif,png,webp}',
      quality: 70
    }
  },

  /**
   * Vendors settings like webpack, etc...
   */
  vendors: {

    /**
     * Webpack default settings
     */
    webpack: {
      mode: 'production',
      entry: {},
      output: {
        filename: '[name]',
        pathinfo: false,
        path: process.cwd(),
        publicPath: '/app/js/',
        chunkFilename: `dist/js/chunks/[name]-[chunkhash]-${projectPackageJson.version}.js`
      },
      plugins: [],
      optimization: {
        minimize: true,
        minimizer: process.env.NODE_ENV === 'production' ? [
          new __TerserPlugin({
            terserOptions: {}
          }
        )] : []
      },
      resolve: {
        alias: {
          '@app': process.cwd() + '/dist/js',
          '@coffeekraken/sugar/js': __dirname + '/../../../util/sugar/src/js',
          '@coffeekraken/sugar/node': __dirname + '/../../../util/sugar/src/node'
        }
      },
      module: {
        rules: []
      }
    }
  },

  /**
   * Default processors
   */
  processors: {

    /**
     * Babel processor
     */
    babel: {
      extensions: ['js','ts','coffee'],
      processor: require(__dirname + '/processors/js/babel'),
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
          "transform-dynamic-import-default",
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-export-default-from"
        ]
      },
      weight: 20
    },

    /**
     * Typescript processor
     */
    typescript: {
      extensions: ['ts'],
      saveExtension: 'js',
      processor: require(__dirname + '/processors/js/typescript'),
      settings: {},
      weight: 100
    },

    /**
     * Coffeescript processor
     */
    coffeescript: {
      extensions: ['coffee'],
      saveExtension: 'js',
      processor: require(__dirname + '/processors/js/coffeescript'),
      settings: {},
      weight: 100
    },

    /**
     * Imagemin mozjpeg processor
     */
    mozjpeg: {
      extensions: ['jpg','jpeg'],
      processor: require(__dirname + '/processors/image/mozjpeg'),
      settings: {
        quality: 70
      },
      weight: 100
    },

    /**
     * Imagemin pngquant processor
     */
    pngquant: {
      extensions: ['png'],
      processor: require(__dirname + '/processors/image/pngquant'),
      settings: {
        quality: 70
      },
      weight: 100
    },

    /**
     * Imagemin gifsicle processor
     */
    gifsicle: {
      extensions: ['gif'],
      processor: require(__dirname + '/processors/image/gifsicle'),
      settings: {
        quality: 70
      },
      weight: 100
    },

    /**
     * Imagemin webp processor
     */
    webp: {
      extensions: ['webp'],
      processor: require(__dirname + '/processors/image/webp'),
      settings: {
        quality: 70
      },
      weight: 100
    },

    /**
     * Imagemin svgo processor
     */
    svgo: {
      extensions: ['svg'],
      processor: require(__dirname + '/processors/image/svgo'),
      settings: {},
      weight: 100
    },

    /**
     * Sass processor
     */
    sass: {
      extensions: ['scss','sass'],
      processor: require(__dirname + '/processors/css/sass'),
      settings: {

      },
      weight: 100
    },

  }

};

module.exports = _settings;
module.exports.setup = function(newSettings) {
  _settings = __deepMerge(_settings, newSettings);
  return _settings;
}
