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

    transports: {

      sourcesFolder: 'logTransports',

      transportsByType: {
        error: process.env.ENV === 'prod' ? 'squid' : 'console squid',
        warn: process.env.ENV === 'prod' ? 'squid' : 'console squid',
        info: process.env.ENV === 'prod' ? 'squid' : 'console squid',
        http: process.env.ENV === 'prod' ? 'squid' : 'console squid',
        verbose: process.env.ENV === 'prod' ? 'squid' : 'console squid',
        debug: process.env.ENV === 'prod' ? 'squid' : 'console squid',
        silly: process.env.ENV === 'prod' ? 'squid' : 'console squid'
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
