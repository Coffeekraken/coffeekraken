module.exports = {

  views: {

    folder: 'views',

    engines: {
      'blade.php': require('./src/node/express/views/engines/blade')
    },

    defaultDataAdapter: 'viewsFolderJson',

    dataAdapters: {
      'viewsFolderJson': require('./src/node/express/views/dataAdapters/viewsFolderJson')
    }

  },

  dist: {

    js: {

      bundleFiles: '{views,src}/**/*.bundle.js',
      outputFolder: 'dist/js'

    }

  },

  express: {

  },

  server: {

    port: 8080

  },

  routes: {}

};
