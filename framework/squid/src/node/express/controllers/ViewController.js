const __path = require('path');
const __viewExist = require('../../express/views/viewExist');
const __getViewMetas = require('../../express/views/getViewMetas');
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
  index: async (req, res) => {

    if ( ! __viewExist(req.params.viewPath)) {
      res.send('Not found...');
      return;
    }

    // call the dataAdapter the receive the data back and wait until the dataAdapter promise is resolved
    const viewData = await __squid.config.views.dataAdapters[viewConfig.dataAdapter](req.params.viewPath, req.params.viewId, viewConfig, req);

    // get the view metas
    const viewMetas = __getViewMetas(req.params.viewPath, req.params.viewId);

    console.log(viewMetas);

    // __getViewMetas(req.params.viewPath, req.param.viewId);

    // res.render(req.params.viewPath);

  }

};
