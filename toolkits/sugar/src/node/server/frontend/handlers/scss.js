const __SPromise = require('../../../promise/SPromise');
const __sugarConfig = require('../../../config/sugar');
const __SScssCompiler = require('../../../scss/SScssCompiler');
const rootDir = __sugarConfig('frontend.rootDir');

/**
 * @name                scss
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function scss(req, res, settings = {}) {
  let filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;

  const promise = new __SPromise({
    id: 'frontendServerScssHandler'
  });

  const compiler = new __SScssCompiler({
    sharedResources: ['sugar']
  });
  const compileRes = await compiler.compile(req.path);
  // console.log(compileRes);

  return promise;
};
