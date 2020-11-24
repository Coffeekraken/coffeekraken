// @ts-nocheck

import __SScssCompiler from '../../../scss/SScssCompiler';
import __SDuration from '../../../time/SDuration';
import __SBuildScssInterface from '../../../scss/build/interface/SBuildScssInterface';

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
export = async function scss(req, res, settings = {}) {
  const defaultValuesObj = __SBuildScssInterface.getDefaultValues();
  const compiler = new __SScssCompiler(defaultValuesObj);
  const duration = new __SDuration();
  const compileRes = await compiler.compile(req.path, {
    ...(req.query || {})
  });
  if (settings.log) {
    console.log(
      `<bgGreen><black> scss </black></bgGreen> Scss file "<yellow>${
        req.path
      }</yellow> served in <cyan>${duration.end()}s</cyan>"`
    );
  }
  res.type('text/css');
  res.status(200);
  res.send(compileRes.css);
}
