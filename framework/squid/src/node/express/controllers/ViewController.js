const __path = require('path');
const __viewExist = require('../../express/views/viewExist');
const __getViewMetas = require('../../express/views/getViewMetas');
const __fs = require('fs');
const __zlib = require('zlib');
const __log = require('@coffeekraken/sugar/node/log/log');

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
      __log(`The view "${req.params.viewPath + (req.params.viewId ? '#' + req.params.viewId : '')}" has been called but seems to not exist on the filesystem...`, 'error');
      res.send('The wanted content seems to not exist or another issue has occured... Please try again later...');
      return;
    }

    // get the view metas
    const viewMetas = __getViewMetas(req.params.viewPath, req.params.viewId);

    // call the dataAdapter the receive the data back and wait until the dataAdapter promise is resolved
    const viewData = await require(__squid.config.views.dataAdapters[viewMetas.config.dataAdapter])(req.params.viewPath, req.params.viewId, viewMetas.config, req);

    // render the view and send it back
    res.render(viewMetas.renderPath, viewData);

  }

};
