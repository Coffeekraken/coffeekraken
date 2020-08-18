const __SActionsStreamAction = require('../../stream/SActionsStreamAction');
const __deepMerge = require('../../object/deepMerge');
const __globby = require('globby');
const __path = require('path');
const __packageRoot = require('../../path/packageRoot');

/**
 * @name                SSugarJsonStreamAction
 * @namespace           node.build.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This action is responsible of searching for packages with a ```sugar.json``` root file
 * and impoirting the main css and scss files before compilation
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarJsonStreamAction extends __SActionsStreamAction {
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
    sugarJsonDirs: {
      type: 'String|Array<String>',
      required: false
    },
    sugarJsonImports: {
      type: 'String|Array<String>',
      required: true,
      default: 'all'
    },
    sugarJsonExclude: {
      type: 'Array<String>',
      required: false
    },
    buildLevel: {
      type: 'String',
      required: true,
      values: ['default', 'style', 'bare'],
      default: 'default'
    },
    buildType: {
      type: 'String',
      required: true,
      values: ['js', 'css']
    }
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
          name: 'Sugar Json',
          id: 'actionStream.action.sugarJson'
        },
        settings
      )
    );
    this._coco = 'plop';
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
    return super.run(streamObj, (resolve, reject) => {
      if (!streamObj.sugarJsonDirs) {
        this.log({
          value: `No "<cyan>sugarJsonDirs</cyan>" has been specified so use the default value which is "<cyan>${__packageRoot()}</cyan>"...`
        });
        streamObj.sugarJsonDirs = [__packageRoot()];
      }

      // search for sugar.json files
      let dirs = streamObj.sugarJsonDirs;
      if (!Array.isArray(dirs)) dirs = [dirs];
      let files = [];
      for (let dir of dirs) {
        files = [
          ...files,
          ...__globby.sync([
            `${dir}/sugar.json`,
            `${dir}/node_modules/*/sugar.json`,
            `${dir}/node_modules/*/*/sugar.json`
          ])
        ];
      }

      // read each sugar files
      files.forEach(async (filePath) => {
        const sugarJson = require(filePath);
        sugarJson.path = __path.dirname(filePath);

        if (
          streamObj.sugarJsonExclude &&
          Array.isArray(streamObj.sugarJsonExclude)
        ) {
          if (streamObj.sugarJsonExclude.indexOf(sugarJson.name) !== -1) return;
        }

        switch (streamObj.buildType) {
          case 'js':
            streamObj = await this._handleJs(streamObj, sugarJson, settings);
            break;
          case 'css':
            streamObj = await this._handleCss(streamObj, sugarJson, settings);
            break;
          default:
            break;
        }
      });

      // resolve streamObj
      resolve(streamObj);
    });
  }

  /**
   * @name                _handleJs
   * @type                Function
   * @private
   * @async
   *
   * This method handle the js build features
   *
   * @param       {Object}      streamObj       The stream object to process
   * @param       {Object}      sugarJson       The sugar json file content
   * @param       {Object}      [settings={}]     An object of settings
   * @return      {SPromise}                    An SPromise instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _handleJs(streamObj, sugarJson, settings = {}) {
    return new Promise((resolve) => {
      if (sugarJson.sources) {
        if (sugarJson.sources.js && Array.isArray(sugarJson.sources.js)) {
          sugarJson.sources.js.forEach((jsObj) => {
            // skip the js obj if the level does not correspond
            if (
              streamObj.buildLevel !== 'default' &&
              jsObj.level &&
              streamObj.buildLevel !== jsObj.level
            )
              return;
            // check stream object import type
            if (
              streamObj.sugarJsonImports !== 'all' &&
              Array.isArray(streamObj.sugarJsonImports) &&
              streamObj.sugarJsonImports.indexOf(sugarJson.name) === -1
            ) {
              // if the name of the sugarJson package is not in the list
              return;
            }

            const path = __path.resolve(sugarJson.path, jsObj.path);
            this.log({
              group: settings.name,
              value: `Importing the <magenta>JS</magenta> file "<cyan>${path}<cyan>"...`
            });

            // add the import in the file
            streamObj.data = `
              import "${sugarJson.name}/${jsObj.path}";
              ${streamObj.data}
            `;
          });
        }
      }
      resolve(streamObj);
    });
  }

  /**
   * @name                _handleCss
   * @type                Function
   * @private
   * @async
   *
   * This method handle the scss build features
   *
   * @param       {Object}      streamObj       The stream object to process
   * @param       {Object}      sugarJson       The sugar json file content
   * @param       {Object}      [settings={}]     An object of settings
   * @return      {SPromise}                    An SPromise instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _handleCss(streamObj, sugarJson, settings = {}) {
    return new Promise((resolve) => {
      if (sugarJson.sources) {
        if (sugarJson.sources.scss && Array.isArray(sugarJson.sources.scss)) {
          sugarJson.sources.scss.forEach((cssObj) => {
            // skip the css obj if the level does not correspond
            if (
              streamObj.buildLevel !== 'default' &&
              cssObj.level &&
              streamObj.buildLevel !== cssObj.level
            )
              return;
            // check stream object import type
            if (
              streamObj.sugarJsonImports !== 'all' &&
              Array.isArray(streamObj.sugarJsonImports) &&
              streamObj.sugarJsonImports.indexOf(sugarJson.name) === -1
            ) {
              // if the name of the sugarJson package is not in the list
              return;
            }

            const path = __path.resolve(sugarJson.path, cssObj.path);
            this.log({
              group: settings.name,
              value: `Importing the <magenta>SCSS</magenta> file "<cyan>${path}<cyan>"...`
            });

            // add the import in the file
            streamObj.data = `
              @import "${sugarJson.path}/${cssObj.path}";
              ${streamObj.data}
            `;
          });
        }
      }
      resolve(streamObj);
    });
  }
};
