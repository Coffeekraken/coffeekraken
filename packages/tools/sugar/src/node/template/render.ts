// @ts-nocheck

import __sugarConfig from '../config/sugar';
import __getFilename from '../fs/filename';
import __fs from 'fs';
import __path from 'path';
import __getExt from '../fs/extension';
import __deepMerge from '../object/deepMerge';
import __toString from '../string/toString';
import __SPromise from '@coffeekraken/s-promise';
import __SError from '../error/SError';
import __STemplate from './STemplate';
import __unique from '../array/unique';

/**
 * @name              render
 * @namespace         sugar.node.template
 * @type              Function
 * @async
 * @status              wip
 *
 * This function take a view path, a data object and optionaly a settings object to compile
 * the view and return a simple Promise that will be resolved or rejected depending on the
 * process status.
 *
 * @param       {String}        viewPath        The view path to compile. This has to be a dotted path like "my.cool.view" relative to the @config.views.rootDir directory
 * @param       {Object}        [data={}]       An object of data to use to compile the view correctly
 * @param       {Object}        [settings={}]   An object of settings to configure your rendering process. Here's the list of available settings:
 * - rootDir (__sugarConfig('views.rootDir')) {String|Array<String>}: Specify the root directory where to search for views. Can be an array of directories in which the engine will search through if needed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import render from '@coffeekraken/sugar/node/template/render';
 * const result = await render('my.cool.template, {
 *    hello: 'world'
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function render(viewPath, data = null, settings = {}) {
  return new __SPromise(
    async ({ resolve, reject, emit }) => {
      const templateInstance = new __STemplate(viewPath, {
        ...settings
      });
      let resultObj;
      try {
        resultObj = await templateInstance.render(data, settings);
        resultObj.status = 200;
        return resolve({
          ...resultObj
        });
      } catch (e) {
        const errorTemplateInstance = new __STemplate('pages.501', settings);
        resultObj = await errorTemplateInstance.render(
          {
            ...data,
            error: e
          },
          settings
        );
        resultObj.status = 501;
        return reject({
          ...resultObj
        });
      }
    },
    {
      id: 'templateRender'
    }
  );
}
export default render;
