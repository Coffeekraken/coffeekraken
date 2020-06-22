const __path = require('path');
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

    // render the view and send it back
    res.send(await Squid.express.views.render(req.params.viewPath, req.params.viewId));

  }

};
