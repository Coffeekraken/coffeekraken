// @ts-nocheck

import __SPromise from '../../promise/SPromise';

/**
 * @name          json
 * @namespace     sugar.node.template.dataHandlers
 * @type          Function
 * @beta
 *
 * This function simply take the .data.json file path and return
 * the resulting object
 *
 * @param       {String}      filePath      The file path to take care
 * @return      {SPromise}                  An SPromise instance that will be resolved with the resulting object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function json(filePath) {
  return new __SPromise(
    async ({ resolve }) => {
      resolve(await import(filePath));
    },
    {
      id: 'templateJsonDataHandler'
    }
  );
}
export = json;
