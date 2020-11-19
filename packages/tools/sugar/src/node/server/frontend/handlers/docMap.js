const __SPromise = require('../../../promise/SPromise');
const __SDocMap = require('../../../doc/SDocMap');

/**
 * @name                docMap
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the docMap url
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function docMap(req, res, settings = {}) {
  const docMap = new __SDocMap();
  const docMapJson = await docMap.read();
  res.status(200);
  res.type('application/json');
  res.send(docMapJson);
};
