// @ts-nocheck

import __SActionsStreamAction from '../SActionsStreamAction';
import __packageRoot from '../../path/packageRoot';
import __fs from 'fs';
import __ensureDirSync from '../../fs/ensureDirSync';
import __deepMerge from '../../object/deepMerge';
import __md5 from '../../crypt/md5';
import __writeJsonSync from '../../fs/writeJsonSync';
import __SInterface from '../../class/SInterface';

class SFsCacheStreamActionInterface extends __SInterface {
  static definition = {
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
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @wip
 *
 * This action allows you to make profit of the filesystem cache.
 * You can specify which streamObj property will be the cache id as well as
 * in which condition you want to bypass the cached value.
 * By default the cached value will be regenerated if the "input" property is a file and that this file has been saved after the cached value.
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SFsCacheStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interfaces = {
    this: SFsCacheStreamActionInterface
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
    return super.run(streamObj, async ({ resolve, reject, emit }) => {
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
        return new Promise(({ resolve, reject }) => {
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
        emit('log', {
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
