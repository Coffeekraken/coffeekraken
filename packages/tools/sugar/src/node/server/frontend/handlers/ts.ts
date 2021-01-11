// @ts-nocheck

import __SPromise from '../../../promise/SPromise';
import __STsCompiler from '../../../typescript/compile/STsCompiler';
import __SDuration from '../../../time/SDuration';
import __STsCompileInterface from '../../../typescript/compile/interface/STsCompileInterface';

/**
 * @name                ts
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
export = function ts(req, res, settings = {}) {
  const promise = new __SPromise();

  (async () => {
    const defaultValuesObj = __STsCompileInterface.getDefaultValues();
    const compiler = new __STsCompiler({
      ...defaultValuesObj
    });
    const duration = new __SDuration();
    const compilerPromise = compiler.compile({
      ...(req.query || {}),
      input: req.path.slice(1),
      transpileOnly: true
    });
    __SPromise.pipe(compilerPromise, promise);
    compilerPromise.on('reject', (e) => {
      res.type('text/html');
      res.status(500);
      res.send(e);
      promise.reject(e);
    });
    const compileRes = await compilerPromise;
    if (compileRes.files) {
      let string = '';
      compileRes.files.forEach((file) => {
        string += `\n${file.readSync()}`;
      });

      res.type('text/javascript');
      res.status(200);
      res.send(string);
      return promise.resolve(
        `<bgGreen><black> ts </black></bgGreen> file "<yellow>${
          req.path
        }</yellow> served in <cyan>${duration.end()}s</cyan>"`
      );
    }
    res.type('text/html');
    res.status(500);
    res.send(`requested file does not exist...`);
    promise.reject('requested file does not exist...');
  })();

  return promise;
};
