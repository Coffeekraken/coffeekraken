// @ts-nocheck

import __extension from '../../fs/extension';
import __SCache from '../../cache/SCache';
import __SFileCache from '../../cache/SFileCache';
import __unquote from '../../string/unquote';
import __path from 'path';
import __stripCssComments from '../../css/stripCssComments';
import __folderPath from '../../fs/folderPath';
import __deepMerge from '../../object/deepMerge';
import __SPromise from '../../promise/SPromise';
import __md5 from '../../crypt/md5';
import __sass from 'sass';
import __packageRoot from '../../path/packageRoot';
import __getFilename from '../../fs/filename';
import __isPath from '../../is/path';
import __fs from 'fs';
import __getSharedResourcesString from '../utils/getSharedResourcesString';
import __putUseStatementsOnTop from '../utils/putUseStatementsOnTop';
import __glob from 'glob';
import __csso from 'csso';
import __isGlob from 'is-glob';
import __unique from '../../array/unique';
import __SCompiler from '../../compiler/SCompiler';
import __absolute from '../../path/absolute';
import __ensureDirSync from '../../fs/ensureDirSync';
import __SScssFile from '../SScssFile';

import __ISScssCompileParams from './interface/ISScssCompileParams';
import __SScssCompileParamsInterface from './interface/SScssCompileParamsInterface';

/**
 * @name                SScssCompiler
 * @namespace           sugar.node.scss
 * @type                Class
 * @wip
 *
 * This class wrap the "sass" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 * @feature         2.0.0       Optimize the render time as much as 6x faster
 *
 * @param           {Object}            [settings={}]       An object of settings to configure your instance
 *
 * @setting         {String}        [id=this.constructor.name]          An id for your compiler. Used for cache, etc...
 * @setting         {Object}        [sass={}]        Pass the "sass" (https://www.npmjs.com/package/sass) options here. ! The "file" and "data" properties are overrided by the first parameter of the "compile" method
 * @setting         {Onject}       [optimizers={}]     Pass an object of optimizing settings
 * @setting         {Boolean}       [optimizers.split=true]     Specify if you want to make use of the splitting code technique to compile only what's really changed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SScssCompiler from '@coffeekraken/sugar/node/scss/compile/SScssCompiler';
 * const compiler = new SScssCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 * const compiledCode = await compiler.compile(`
 *      \@include myCoolMixin();
 * `);
 *
 * @see             https://www.npmjs.com/package/sass
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SScssCompiler extends __SCompiler {
  static interface = __SScssCompileParamsInterface;

  _includePaths = [];

  /**
   * @name            constructor
   * @type             Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings: __ISScssCompileParams = {}) {
    super(__deepMerge({}, settings));

    // prod
    if (this._settings.prod) {
      this._settings.cache = false;
      this._settings.style = 'compressed';
      this._settings.minify = true;
      this._settings.stripComments = true;
    }
  }

  /**
   * @name              _compile
   * @type              Function
   * @async
   *
   * This method is the main one that allows you to actually compile the
   * code you pass either inline, either a file path.
   *
   * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
   * @param         {Object}            [settings={}]       An object of settings to override the instance ones
   * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _compile(input, settings: __ISScssCompileParams = {}) {
    const promise = new __SPromise({
      id: 'COMPILER'
    });
    settings = __deepMerge(this._settings, {}, settings);

    const resultsObj = {};

    let filesPaths = [];

    // make input absolute
    input = __absolute(input);
    // process inputs
    input.forEach((inputStr) => {
      if (__isGlob(inputStr)) {
        filesPaths = [...filesPaths, ...__glob.sync(inputStr)];
      } else {
        filesPaths.push(inputStr);
      }
    });

    const startTime = Date.now();

    (async () => {
      for (let i = 0; i < filesPaths.length; i++) {
        let filePath = filesPaths[i];
        let file = new __SScssFile(filePath, {
          compile: settings
        });
        promise.pipe(file);

        const resPromise = file.compile({
          ...settings
        });
        const res = await resPromise;
        resultsObj[file.path] = res;
      }

      // resolve with the compilation result
      if (!settings.watch) {
        promise.resolve({
          files: resultsObj,
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      } else {
        promise.trigger('files', {
          files: resultsObj,
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      }
    })();

    return promise;
  }
};
