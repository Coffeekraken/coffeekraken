const __path = require('path');
const __fs = require('fs');
const __zlib = require('zlib');
const __log = require('@coffeekraken/sugar/node/log/log');

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
   * @name                squidIndex
   * @namespace           squid.node.express.controllers.JsController
   * @type                Function
   *
   * Handle the base javascript route that serve the global and common files
   *
   * @param         {Object}        req           The req express object
   * @param         {Object}        res            The res express object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  squidIndex: (req, res) => {
    // read the common squid framework file
    const squidCommon = __fs.readFileSync(`${__dirname}/../../../../${__squid.config.dist.js.outputFolder}/common.bundle.js`);
    // read the common project file
    const projectCommon = __fs.readFileSync(`${process.cwd()}/${__squid.config.dist.js.outputFolder}/common.bundle.js`);

    let resultingScript = `${squidCommon}${projectCommon}`;
    resultingScript += `
      Squid.config = ${JSON.stringify(__squid.config)};
    `;

    // send gziped javascript files Content
    res.send(resultingScript);
  },

  /**
   * @name                js
   * @namespace           squid.node.express.controllers.JsController
   * @type                Function
   *
   * Handle the serving of javascripts files for the url /js/:assetPath
   *
   * @param         {Object}          req           The req express object
   * @param         {Object}          res           The res express object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  squidJs: (req, res) => {
    // check if the file exist
    if ( ! __fs.existsSync(__squid.rootPath + '/' + __squid.config.dist.js.outputFolder + '/' + req.params[0])) {
      __log(`A client has requested the file "${__squid.config.dist.js.outputFolder}/${req.params[0]}" but this file does not exist...`, 'error');
      return res.sendStatus(404);
    }
    // send the file back
    res.sendFile(__squid.rootPath + '/' + __squid.config.dist.js.outputFolder + '/' + req.params[0]);
  }

};
