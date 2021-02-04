// @ts-nocheck

import __SPromise from '../../../promise/SPromise';
import __SScssCompiler from '../../../scss/compile/SScssCompiler';
import __SDuration from '../../../time/SDuration';
import __SScssCompilerParamsInterface from '../../../scss/compile/interface/SScssCompilerParamsInterface';
import __SDocMap from '../../../docMap/SDocMap';

/**
 * @name                doc
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @wip
 *
 * This function is responsible of responding to express requests made on the doc pages
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
export = function doc(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, pipe }) => {
    const docMap = new __SDocMap();
    const files = await docMap.find();
    console.log(files);

    // nativeConsole.log(req);
    res.type('text/html');
    res.status(200);
    res.send('yop');
    resolve('yop');
  });
};
