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
  processors: {

    /**
     * Babel processor
     */
    babel: {
      extensions: ['js'],
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
     * Imagemin mozjpeg processor
     */
    mozjpeg: {
      extensions: ['jpg','jpeg'],
      processor: require(__dirname + '/processors/image/mozjpeg'),
      settings: {
        quality: 70
      },
      weight: 10
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
