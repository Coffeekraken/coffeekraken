// @ts-nocheck

import __SDuration from '../../../time/SDuration';
import __SJsCompiler from '../../../js/SJsCompiler';
import __SPromise from '../../../promise/SPromise';

/**
 * @name                js
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @wip
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = function js(req, res, settings = {}) {
  const promise = new __SPromise();

  (async () => {
    let filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;
    const duration = new __SDuration();

    const compiler = new __SJsCompiler({});
    const compilePromise = compiler.compile(filePath);
    __SPromise.pipe(compilePromise, promise);
    compilePromise.on('reject', (e) => {
      res.type('text/html');
      res.status(500);
      res.send(e);
      promise.reject(e);
    });
    const resultObj = await compilePromise;

    res.type('text/javascript');
    res.status(200);
    res.send(resultObj.js);
    promise.resolve(
      `<bgGreen><black> js </black></bgGreen> file "<yellow>${
        req.path
      }</yellow> served in <cyan>${duration.end()}s</cyan>"`
    );
  })();

  return promise;
};
