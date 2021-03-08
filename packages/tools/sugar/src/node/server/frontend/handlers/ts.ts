// @ts-nocheck

import __SPromise from '../@coffeekraken/s-promise';
import __STsCompiler from '../../../typescript/compile/STsCompiler';
import __SDuration from '../../../time/SDuration';
import __STsCompileInterface from '../../../typescript/compile/interface/STsCompileInterface';

/**
 * @name                ts
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
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
export default function ts(req, res, settings = {}) {
  const promise = new __SPromise();

  (async () => {
    const compiler = new __STsCompiler();
    const duration = new __SDuration();
    const compilerPromise = compiler.compile(req.path.slice(1), {
      ...(req.query || {}),
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
    return;
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
}
