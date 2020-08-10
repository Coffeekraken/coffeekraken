const __webpack = require('webpack');
const __getFilename = require('../../../fs/filename');
const __packageRoot = require('../../../path/packageRoot');
const __deepMerge = require('../../../object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __SBuildNodeCli = require('../SBuildNodeCli');
const __sugarConfig = require('../../../config/sugar');
const __babel = require('@babel/core');
const __tmpDir = require('../../../fs/tmpDir');
const __childProcess = require('child_process');

/**
 * @name                SNodeWebpackStreamAction
 * @namespace           node.build.node.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of passing webpack on the output files
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SNodeWebpackStreamAction extends __SActionsStreamAction {
  /**
   * @name            definitionObj
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    ...__SBuildNodeCli.definitionObj
  };

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
          id: 'actionStream.action.node.webpack'
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
    settings = __deepMerge(
      {
        babel: __sugarConfig('babel')
      },
      settings
    );

    return super.run(streamObj, async (resolve, reject, trigger) => {
      if (streamObj.input.slice(-2) === 'ts') {
        // saving the file to render it
        const tmpDir = __tmpDir();
        const filePath = `${tmpDir}/${__getFilename(streamObj.input)}`;
        const outFilePath = `${filePath}.out`;

        this.log(
          `Precessing the typescript file "<cyan>${streamObj.input.replace(
            `${__packageRoot()}/`,
            ''
          )}</cyan>"...`
        );

        console.log('XXX');

        __fs.writeFileSync(filePath, streamObj.data);

        // compiling the file
        const childProcess = __childProcess.execSync(
          `npx tsc --outFile ${outFilePath} ${filePath}`,
          {
            cwd: __packageRoot()
          }
        );

        streamObj.data = __fs.readFileSync(outFilePath, 'utf8');

        return resolve(streamObj);
      }

      this.log(
        `Precessing the javascript file "<cyan>${streamObj.input.replace(
          `${__packageRoot()}/`,
          ''
        )}</cyan>"...`
      );

      const result = await __babel
        .transformAsync(streamObj.data, {
          cwd: __packageRoot(__dirname),
          filename: streamObj.filename,
          sourceMaps: true,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 'current'
                }
              }
            ]
          ],
          ...settings.babel
        })
        .catch((error) => {
          return reject(error);
        });

      streamObj.data = result.code;
      if (streamObj.map && result.map) {
        streamObj.sourcemapData = result.map;
      }

      return resolve(streamObj);
    });
  }
};
