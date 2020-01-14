module.exports = {

  dist: {

    js: {

      bundleFiles: '{views,src}/**/*.bundle.js',
      outputFolder: 'dist/js'

    }

  },

  express: {

    engines: {
      'blade.php': require('./src/node/express/templateEngines/blade')
    }

  },

  server: {

    port: 8080

  },

  routes: {}

};
