// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';

/**
 * @name          js
 * @namespace     s-view.dataHandlers
 * @type          Function
 * @status              beta
 *
 * This function simply take the .data.js file path and return
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
  name: 'JsDataHandler',
  extensions: ['js', 'json'],
  handle(filePath) {
    return new __SPromise(async ({ resolve }) => {
      resolve(await import(filePath));
    });
  }
};
