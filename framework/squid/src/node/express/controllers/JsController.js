const __path = require('path');
const __getConfig = require('../../getConfig');
const __fs = require('fs');
const __zlib = require('zlib');

/**
 * @name              SquidJsController
 * @namespace         squid.node.express.controllers
 * @type              Object
 *
 * Squid javascript related routes controller functions
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
module.exports = {

  /**
   * @name                index
   * @namespace           squid.node.express.controllers.SquidJsController
   * @type                Function
   *
   * Handle the base javascript route that serve the global and common files
   *
   * @param         {Object}        req           The req express object
   * @param         {Object}        res            The res express object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  index: (req, res) => {
    const config = __getConfig();
    // read the common squid framework file
    const squidCommon = __fs.readFileSync(`${__dirname}/../../../../${config.dist.js.outputFolder}/common.bundle.js`);
    // read the common project file
    const projectCommon = __fs.readFileSync(`${process.cwd()}/${config.dist.js.outputFolder}/common.bundle.js`);
    // send gziped javascript files Content
    res.send(`${squidCommon}${projectCommon}`);
  }

};
