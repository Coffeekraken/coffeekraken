module.exports = {

  express: {
    controllers: {
      JsController: require('./express/controllers/JsController'),
      ViewController: require('./express/controllers/ViewController')
    },
    views: {
      engines: {
        blade: require('./express/views/engines/blade')
      },
      dataAdapters: {
        viewsFolderJson: require('./express/views/dataAdapters/viewsFolderJson')
      },
      getViewMetas: require('./express/views/getViewMetas'),
      viewExist: require('./express/views/viewExist')
    }
  },

  classes: {
    SquidApp: require('./classes/SquidApp'),
    SquidViewPreprocessor: require('./classes/SquidViewPreprocessor')
  },

  getConfig: require('./getConfig')

};
