// @ts-nocheck

import __SActionsStreamAction from '../../../stream/SActionsStreamAction';
import __deepMerge from '../../../object/deepMerge';
import __SBuildFrontspecInterface from '../interface/SBuildFrontspecInterface';
import __SFrontspec from '../../SFrontspec';
import __packageRoot from '../../../path/packageRoot';
import __fs from 'fs';
import __path from 'path';

/**
 * @name                SBuildFrontspecStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 * @wip
 *
 * This function is responsible of rendering the sass string in the "data" property
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SBuildFrontspecStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildFrontspecInterface;

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          name: 'Build Frontspec',
          id: 'SBuildFrontspecStreamAction'
        },
        settings
      )
    );
  }

  /**
   * @name          run
   * @type          Function
   * @async
   *
   * Override the base class run method
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(streamObj, settings) {
    return super.run(streamObj, async (resolve, reject, trigger, cancel) => {
      // compile using the SScssCompiler class

      if (!streamObj.outputStack) streamObj.outputStack = {};

      const frontspec = new __SFrontspec({
        filename: streamObj.filename,
        outputDir: streamObj.outputDir,
        dirDepth: streamObj.dirDepth,
        cache: streamObj.cache
      });

      const promise = frontspec.json();
      promise.catch((e) => {
        reject(e);
      });
      const json = await promise;

      // set in the package.json the "frontspec" property
      const packageJsonPath = `${__packageRoot()}/package.json`;
      if (__fs.existsSync(packageJsonPath)) {
        const json = JSON.parse(__fs.readFileSync(packageJsonPath, 'utf8'));
        json.frontspec = __path.relative(
          __packageRoot(),
          `${streamObj.outputDir}/${streamObj.filename}`
        );
        __fs.writeFileSync(packageJsonPath, JSON.stringify(json, null, 4));
      }

      // set in output stack
      streamObj.data = json;
      streamObj.outputStack.data = `${streamObj.outputDir}/${streamObj.filename}`;

      resolve(streamObj);
    });
  }
}
