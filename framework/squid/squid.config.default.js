module.exports = {

  express: {

    engines: {
      'blade.php': require('./src/node/express/templateEngines/blade')
    }

  },

  server: {

    port: 3000

  },

  routes: {}

};
