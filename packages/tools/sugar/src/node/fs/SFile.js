'use strict';
// @ts-nocheck
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const deepMerge_1 = __importDefault(require('../object/deepMerge'));
const SPromise_1 = __importDefault(require('../promise/SPromise'));
// import __SFileInterface from './interface/SFileInterface';
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const extension_1 = __importDefault(require('./extension'));
const filename_1 = __importDefault(require('./filename'));
const SError_1 = __importDefault(require('../error/SError'));
const packageRoot_1 = __importDefault(require('../path/packageRoot'));
/**
 * @name            SFile
 * @namespace       sugar.node.fs
 * @type            Class
 * @implements      SFileInterface
 * @extends         SPromise
 * @beta
 *
 * This class represent a file in the filesystem. With it you can simply instanciate one by passing the file path,
 * and get access to all the nice meta data like:
 * - name: The file name
 * - path: The full path to the file
 * - rootDir: The root directory specified through the settings.rootDir property
 * - relPath: The relative file path from the rootDir
 * - dirPath: The path to the folder where is the file
 * - extension: The file extension
 * - size: The file size in megabytes
 * - sizeInBytes: The file siz in bytes
 * - exists: true if the file exists on the disk, false otherwise
 *
 * @param         {String}          filepath        The file path you want to init
 * @param         {Object}          [settings={}]    An object of settings to configure your file instance:
 * - rootDir (__packageRoot()) {String}: Specify a root directory for the file. This is usefull to have then access to properties like ```relPath```, etc...
 * - checkExistence (true) {Boolean}: Specify if you want this inited file to really exists on the disk or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import SFile from '@coffeekraken/sugar/node/fs/SFile';
 * const file = new SFile('something/cool/sugar.json');
 * file.extension; // => json
 * file.exists; // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls = class SFile extends SPromise_1.default {
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(filepath, settings = {}) {
    super(settings);
    /**
     * @name        size
     * @type        Number
     *
     * Store the file size in megabytes
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    this.size = 0;
    /**
     * @name        sizeInBytes
     * @type        Number
     *
     * Store the file size in bytes
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    this.sizeInBytes = 0;
    this._settings = deepMerge_1.default(
      {
        id: 'SFile',
        checkExistence: true,
        rootDir: packageRoot_1.default()
      },
      this._settings
    );
    console.log('path', filepath);
    if (settings.rootDir && !filepath.includes(settings.rootDir)) {
      filepath = path_1.default.resolve(settings.rootDir, filepath);
    }
    console.log(this._settings);
    // check if the file exists
    this.exists = fs_1.default.existsSync(filepath);
    // check if need to check for the file existence or not...
    if (settings.checkExistence && !this.exists) {
      throw new SError_1.default(
        `The passed filepath "<cyan>${filepath}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`
      );
    }
    if (this._settings.rootDir) {
      this.rootDir = this._settings.rootDir;
      console.log('tt', this.rootDir, filepath);
      this.relPath = path_1.default.relative(this.rootDir, filepath);
    }
    // save the file path
    this.path = filepath;
    this.name = filename_1.default(filepath);
    this.extension = extension_1.default(filepath);
    this.dirPath = path_1.default.dirname(filepath);
    if (this.exists) {
      this.update();
    }
  }
  /**
   * @name            toObject
   * @type            Function
   *
   * This method transform this instance into a plain object
   *
   * @return        {Object}        A plain object version of this instance
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toObject() {
    return {
      exists: this.exists,
      rootDir: this.rootDir,
      path: this.path,
      relPath: this.relPath,
      name: this.name,
      extension: this.extension,
      dirPath: this.dirPath
    };
  }
  /**
   * @name            update
   * @type            Function
   * @private
   *
   * This method simply updates the informations like the file size, etc...
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    if (!this.exists) return;
    // get the file stats
    const stats = fs_1.default.statSync(this.path);
    this.sizeInBytes = stats.size;
    this.size = stats.size / 1000000;
  }
};
module.exports = Cls;
