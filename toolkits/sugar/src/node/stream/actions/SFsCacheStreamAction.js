const __SActionsStreamAction = require('../SActionsStreamAction');
const __packageRoot = require('../../path/packageRoot');
const __fs = require('fs');
const __ensureDirSync = require('../../fs/ensureDirSync');
const __deepMerge = require('../../object/deepMerge');
const __md5 = require('../../crypt/md5');
const __writeJsonSync = require('../../fs/writeJsonSync');
const __SInterface = require('../../class/SInterface');

class SFsCacheStreamActionInterface extends __SInterface {
  static definitionObj = {
    input: {
      type: 'String',
      required: true
    },
    cacheDir: {
      type: 'String',
      required: true,
      default: `${__packageRoot()}/.cache/SFsCacheStreamAction`
    }
  };
}

/**
 * @name            SFsCacheStreamAction
 * @namespace           node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This action allows you to make profit of the filesystem cache.
 * You can specify which streamObj property will be the cache id as well as
 * in which condition you want to bypass the cached value.
 * By default the cached value will be regenerated if the "input" property is a file and that this file has been saved after the cached value.
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFsCacheStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = SFsCacheStreamActionInterface;

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
          id: 'actionStream.action.fs.cache',
          idProperty: 'input'
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
  run(streamObj, settings = this._settings) {
    return super.run(streamObj, async (resolve, reject, trigger, cancel) => {
      // make sure we have the cache directory
      __ensureDirSync(streamObj.cacheDir);

      // generate the id
      const id = `${this._settings.id}-${__md5.encrypt(
        streamObj[settings.idProperty]
      )}`;

      // check if the output files exists or not
      let outputFilesExists = true;
      if (streamObj.outputStack) {
        Object.keys(streamObj.outputStack).forEach((key) => {
          const path = streamObj.outputStack[key];
          if (!__fs.existsSync(path)) {
            outputFilesExists = false;
          }
        });
      }

      // cache file path
      const cacheFilePath = `${streamObj.cacheDir}/${id}.json`;

      // generate cache function
      function generateCache(streamObj) {
        return new Promise((resolve, reject) => {
          __writeJsonSync(cacheFilePath, {
            streamObj,
            _sugarVersion: require(`${__packageRoot(__dirname)}/package.json`)
              .version
          });
          resolve(streamObj);
        });
      }

      // check if the cache file exists
      // or if the output files does not exists
      if (!__fs.existsSync(cacheFilePath) || !outputFilesExists) {
        this.registerCallback(generateCache, 'after');
        return resolve(streamObj);
      }

      // get the timestamp of each files
      const inputStats = __fs.statSync(streamObj.input);
      const cacheStats = __fs.statSync(cacheFilePath);

      // check if the input file is newer that the cache one
      if (inputStats.mtimeMs > cacheStats.mtimeMs) {
        this.registerCallback(generateCache, 'after');
      } else {
        // load the cache file
        const cacheJson = require(cacheFilePath);
        // restore the streamObject
        streamObj = cacheJson.streamObj;
        // specify to the ActionStream that we need to skip all the next actions
        trigger('log', {
          value: `#warning Skipping the next actions cause the data have been <primary>laoded from the cache</primary>...`
        });
        this.skipNextActions();
      }

      setTimeout(() => {
        resolve(streamObj);
      });
    });
  }
};
