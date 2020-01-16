module.exports = {

  express: {
    controllers: {
      SquidJsController: require('./express/controllers/SquidJsController'),
      SquidViewController: require('./express/controllers/SquidViewController')
    },
    engines: {
      blade: require('./express/views/engines/blade')
    }
  },

  classes: {
    SquidApp: require('./classes/SquidApp'),
    SquidViewPreprocessor: require('./classes/SquidViewPreprocessor')
  },

  getConfig: require('./functions/getConfig'),
  getViewMetas: require('./functions/getViewMetas'),
  viewExist: require('./functions/viewExist')


};
