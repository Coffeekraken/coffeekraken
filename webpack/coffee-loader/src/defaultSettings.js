/**
 * @name                          defaultSettings
 * @namespace                     webpack.coffeeLoader
 * @type                          Object
 *
 * This file store all the default settings for the coffee-loader.
 * These settings can be overrided as well by passing your settings object
 * in the loader registration webpack settings object
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = {

  sourcesFolder: 'src',
  distFolder: 'dist',

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
      processor: require(__dirname + '/processors/js/typescript'),
      settings: {},
      weight: 100
    },

    /**
     * Coffeescript processor
     */
    coffeescript: {
      extensions: ['coffee'],
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
}
