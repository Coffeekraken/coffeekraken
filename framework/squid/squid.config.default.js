module.exports = {

  views: {

    folder: 'views',

    engines: {
      'blade.php': __dirname + '/src/node/express/views/engines/blade'
    },

    defaultDataAdapter: 'viewsFolderJson',
    dataAdapters: {
      'viewsFolderJson': __dirname + '/src/node/express/views/dataAdapters/viewsFolderJson'
    }

  },

  dist: {

    js: {

      bundleFiles: '{views,src}/**/*.bundle.js',
      sourcesFolder: 'src/js',
      outputFolder: 'dist/js'

    }

  },

  log: {

    frontend: {

      transportsByType: {
        error: process.env.NODE_ENV === 'production' ? 'squid' : 'console',
        warn: process.env.NODE_ENV === 'production' ? 'squid' : 'console',
        info: process.env.NODE_ENV === 'production' ? '' : 'console',
        verbose: process.env.NODE_ENV === 'production' ? '' : 'console',
        debug: process.env.NODE_ENV === 'production' ? '' : 'console',
        silly: process.env.NODE_ENV === 'production' ? '' : 'console',
        success: process.env.NODE_ENV === 'production' ? '' : 'console'
      },

      transports: {

      }

    },

    backend: {

      transportsByType: {
        error: process.env.NODE_ENV === 'production' ? 'mail' : 'console files',
        warn: process.env.NODE_ENV === 'production' ? 'mail' : 'console files',
        info: process.env.NODE_ENV === 'production' ? '' : 'console files',
        verbose: process.env.NODE_ENV === 'production' ? '' : 'console files',
        debug: process.env.NODE_ENV === 'production' ? '' : 'console files',
        silly: process.env.NODE_ENV === 'production' ? '' : 'console files',
        success: process.env.NODE_ENV === 'production' ? '' : 'console files'
      },

      transports: {
        mail: {
          to: 'olivier.bossel@gmail.com',
          service: 'SendinBlue',
          auth: {
            user: 'olivier.bossel@gmail.com',
            pass: 'L8XrfE4WABpMkhHN'
          }
        }
      }

    }

  },

  express: {

  },

  animations: {
    defaultIn: null,
    defaultOut: 'ccccc'
  },

  server: {

    port: 8080

  },

  routes: {}

};
