// @ts-nocheck

import __SPromise from '../../../promise/SPromise';
import __SScssCompiler from '../../../scss/compile/SScssCompiler';
import __SDuration from '../../../time/SDuration';
import __SScssCompilerParamsInterface from '../../../scss/compile/interface/SScssCompilerParamsInterface';

/**
 * @name                scss
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
export = function scss(req, res, settings = {}) {
  const promise = new __SPromise();

  (async () => {
    const defaultValuesObj = __SScssCompilerParamsInterface.defaults();
    const compiler = new __SScssCompiler(defaultValuesObj);
    const duration = new __SDuration();
    const compilerPromise = compiler.compile(req.path, {
      ...(req.query || {})
    });
    promise.pipe(compilerPromise);
    compilerPromise.on('reject', (e) => {
      res.type('text/html');
      res.status(500);
      res.send(e);
      promise.reject(e);
    });
    const compileRes = await compilerPromise;
    res.type('text/css');
    res.status(200);
    res.send(compileRes.css);
    promise.resolve(
      `<bgGreen><black> scss </black></bgGreen> file "<yellow>${
        req.path
      }</yellow> served in <cyan>${duration.end()}s</cyan>"`
    );
  })();

  return promise;
};
