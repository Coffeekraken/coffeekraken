const __SPromise = require('../promise/SPromise');
const __SFsFileInterface = require('./interface/SFsFileInterface');
const __fs = require('fs');
const __path = require('path');
const __extension = require('./extension');
const __getFilename = require('./filename');

/**
 * @name            SFsFile
 * @namespace       sugar.node.fs
 * @type            Class
 * @implements      SFsFileInterface
 * @extends         SPromise
 *
 * This class represent a file in the filesystem. With it you can simply instanciate one by passing the file path,
 * and get access to all the nice meta data like:
 * - filename: The file name
 * - filepath: The full path to the file
 * - path: The path to the folder where is the file
 * - extension: The file extension
 * - size: The file size in megabytes
 * - sizeInBytes: The file siz in bytes
 * - exists: true if the file exists on the disk, false otherwise
 *
 * @param         {String}          filepath        The file path you want to init
 * @param         {Object}          [settings={}]    An object of settings to configure your file instance:
 * - checkExistence (true) {Boolean}: Specify if you want this inited file to really exists on the disk or not
 *
 * @example           js
 * const SFsFile = require('@coffeekraken/sugar/node/fs/SFsFile');
 * const file = new SFsFile('something/cool/sugar.json');
 * file.extension; // => json
 * file.exists; // => true
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsFile extends __SPromise {
  /**
   * @name        filename
   * @type        String
   *
   * Store the full file name
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  filename = null;

  /**
   * @name        filepath
   * @type        String
   *
   * Store the full file path
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  filepath = null;

  /**
   * @name        path
   * @type        String
   *
   * Store the path to the folder where the file lives
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  path = null;

  /**
   * @name        extension
   * @type        String
   *
   * Store the file extension
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  extension = null;

  /**
   * @name        size
   * @type        Number
   *
   * Store the file size in megabytes
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  size = 0;

  /**
   * @name        sizeInBytes
   * @type        Number
   *
   * Store the file size in bytes
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sizeInBytes = 0;

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(filepath, settings = {}) {
    super(null, settings);

    // check if the file exists
    this.exists = __fs.existsSync(filepath);

    // check if need to check for the file existence or not...
    if (settings.checkExistence && !this.exists) {
      throw new __SError(
        `The passed filepath "<cyan>${filepath}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`
      );
    }

    // save the file path
    this.filepath = filepath;
    this.filename = __getFilename(filepath);
    this.extension = __extension(filepath);
    this.path = __path.dirname(filepath);

    if (this.exists) {
      this.update();
    }
  }

  /**
   * @name            update
   * @type            Function
   * @private
   *
   * This method simply updates the informations like the file size, etc...
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    if (!this.exists) return;
    // get the file states
    const stats = __fs.statSync(this.filepath);
    this.sizeInBytes = stats.size;
    this.size = stats.size / 1000000;
  }
}

module.exports = __SFsFileInterface.implements(SFsFile);
