const __path = require('path');
const __getConfig = require('../../functions/getConfig');
const __viewExist = require('../../functions/viewExist');
const __getViewMetas = require('../../functions/getViewMetas');
const __fs = require('fs');
const __zlib = require('zlib');

/**
 * @name              SquidViewController
 * @namespace         squid.node.express.controllers
 * @type              Object
 *
 * All the methods to handle squid internal view actions...
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
module.exports = {

  /**
   * @name                index
   * @namespace           squid.node.express.controllers.SquidViewController
   * @type                Function
   *
   * Handle the asked views using the path "/view/:viewId"
   *
   * @param         {Object}        req           The req express object
   * @param         {Object}        res            The res express object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  index: (req, res) => {
    const config = __getConfig();

    if ( ! __viewExist(req.params.viewPath)) {
      res.send('Not found...');
      return;
    }

    // get the view conf
    let viewConfig = {
      adapter: __squid.config.views.defaultDataAdapter
    };
    let confFilePath = `${process.cwd()}/${__squid.config.views.folder}/${req.params.viewPath.replace('.','/')}`;
    if (req.params.viewId) confFilePath += `.${req.params.viewId}`;
    confFilePath += '.config.js';
    console.log(confFilePath);
    if (__fs.existsSync(confFilePath)) {
      viewConfig = require(confFilePath);
    } else if (__fs.existsSync(`${process.cwd()}/${__squid.config.views.folder}/views.conf.js`)) {
      const generalViewsConfig = require(`${process.cwd()}/${__squid.config.views.folder}/views.conf.js`);
      if (generalViewsConfig[req.params.viewPath]) {
        viewConfig = generalViewsConfig[req.params.viewPath];
      } else if (generalViewsConfig[`${req.params.viewPath}#${req.params.viewId}`]) {
        viewConfig = generalViewsConfig[`${req.params.viewPath}#${req.params.viewId}`];
      }
    }

    // try to get the data from the registered adapters

    console.log(viewConfig);

    __getViewMetas(req.params.viewPath, req.param.viewId);

    // res.render(req.params.viewPath);

  }

};
