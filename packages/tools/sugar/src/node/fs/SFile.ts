// @ts-nocheck

import __toString from '../string/toString';
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
// import __SFileInterface from './interface/SFileInterface';
import __fs from 'fs';
import __path from 'path';
import __extension from './extension';
import __getFilename from './filename';
import __SFileSettingsInterface from './interface/SFileSettingsInterface';
import __SError from '../error/SError';
import __packageRoot from '../path/packageRoot';
import __ensureDirSync from './ensureDirSync';

import ISFile, {
  ISFileSettings,
  ISFileCtor,
  ISFileReadSettings,
  ISFileWriteSettings
} from './interface/ISFile';

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
 * - cwd: The root directory specified through the settings.cwd property
 * - relPath: The relative file path from the cwd
 * - dirPath: The path to the folder where is the file
 * - extension: The file extension
 * - size: The file size in megabytes
 * - sizeInBytes: The file siz in bytes
 * - exists:Bytestrue if the file exists on the disk, false otherwise
 *
 * @param         {String}          filepath        The file path you want to init
 * @param         {Object}          [settings={}]    An object of settings to configure your file instance:
 * - cwd (__packageRoot()) {String}: Specify a root directory for the file. This is usefull to have then access to properties like ```relPath```, etc...
 * - checkExistence (true) {Boolean}: Specify if you want this inited file to really exists on the disk or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Feature}       Add support for autocasting like yml, etc...
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
const Cls: ISFileCtor = class SFile extends __SPromise implements ISFile {
  /**
   * @name        name
   * @type        String
   *
   * Store the full file name
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  name;

  /**
   * @name        path
   * @type        String
   *
   * Store the full file path
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  path;

  /**
   * @name        cwd
   * @type        String
   *
   * Store the root directory where the file actually lives.
   * The root directory can be for example ```src/js``` for a file that lives under ```/my/cool/path/src/js/array/sort.js```.
   * To set this property, you need to pass the ```cwd``` setting through the constructor...
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cwd;

  /**
   * @name        relPath
   * @type        String
   *
   * Store the path relative to the ```cwd``` property. To have access to this property, you MUST
   * specify the settings.cwd through the constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  relPath;

  /**
   * @name        dirPath
   * @type        String
   *
   * Store the path to the folder where the file lives
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  dirPath;

  /**
   * @name        extension
   * @type        String
   *
   * Store the file extension
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  extension;

  /**
   * @name        size
   * @type        Number
   *
   * Store the file size in megabytes
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  size = -1;

  /**
   * @name        sizeInGBytes
   * @type        Number
   *
   * Store the file size in gigabytes
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sizeInGBytes = -1;

  /**
   * @name        sizeInMBytes
   * @type        Number
   *
   * Store the file size in megabytes
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sizeInMBytes = -1;

  /**
   * @name        sizeInKBytes
   * @type        NuBytesber
   *
   * Store the file size in kilobytes
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sizeInKBytes = -1;

  /**
   * @name        sizeInBytes
   * @type        NuBytesber
   *
   * Store the file size in bytes
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sizeInBytes = -1;

  treatAsValue = true;

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
  constructor(filepath: string, settings?: ISFileSettings = {}) {
    super(settings);
    this._settings = __deepMerge(
      {
        id: 'SFile',
        checkExistence: true,
        cwd: process.cwd(),
        sizeIn: 'MBytes',
        shrinkSizesTo: 2,
        watch: true
      },
      this._settings
    );

    if (this._settings.cwd && !filepath.includes(this._settings.cwd)) {
      filepath = __path.resolve(this._settings.cwd, filepath);
    }

    // check if the file exists
    this.exists = __fs.existsSync(filepath);

    // check if need to check for the file existence or not...
    if (this._settings.checkExistence && !this.exists) {
      throw new __SError(
        `The passed filepath "<cyan>${filepath}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`
      );
    }

    if (this._settings.cwd) {
      this.cwd = this._settings.cwd;
      this.relPath = __path.relative(this.cwd, filepath);
    }

    // save the file path
    this.path = filepath;
    this.name = __getFilename(filepath);
    this.extension = __extension(filepath).toLowerCase();
    this.dirPath = __path.dirname(filepath);

    if (this.exists) {
      this.update();
      if (this._settings.watch === true) {
        const watcher = __fs.watch(this.path, (event) => {
          if (event !== 'change' && watcher) watcher.close();
          this.update();
        });
      }
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
      cwd: this.cwd,
      path: this.path,
      relPath: this.relPath,
      name: this.name,
      extension: this.extension,
      dirPath: this.dirPath,
      size: this.size,
      sizeInBytes: this.sizeInBytes,
      sizeInKBytes: this.sizeInKBytes,
      sizeInMBytes: this.sizeInMBytes,
      sizeInGBytes: this.sizeInGBytes,
      content: this.readSync()
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
    this.exists = __fs.existsSync(this.path);
    if (!this.exists) {
      this.sizeInBytes = -1;
      this.sizeInKBytes = -1;
      this.sizeInMBytes = -1;
      this.sizeInGBytes = -1;
      return;
    }
    // get the file stats
    const stats = __fs.statSync(this.path);
    this.sizeInBytes = stats.size;
    this.sizeInGBytes = stats.sizes * 0.00000001;
    this.sizeInMBytes = stats.size * 0.000001;
    this.sizeInKBytes = stats.size * 0.001;

    if (this._settings.shrinkSizesTo) {
      this.sizeInBytes = Number(
        this.sizeInBytes.toFixed(this._settings.shrinkSizesTo)
      );
      this.sizeInKBytes = Number(
        this.sizeInKBytes.toFixed(this._settings.shrinkSizesTo)
      );
      this.sizeInMBytes = Number(
        this.sizeInMBytes.toFixed(this._settings.shrinkSizesTo)
      );
      this.sizeInGBytes = Number(
        this.sizeInGBytes.toFixed(this._settings.shrinkSizesTo)
      );
    }

    // save the default size
    this.size = this[`sizeIn${this._settings.sizeIn}`];
  }

  /**
   * @name        toString
   * @type        Function
   *
   * Return the string version of the file. Here, the path...
   *
   * @return      {String}          The file path
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toString() {
    return this.path;
  }

  /**
   * @name        read
   * @type        Function
   * @async
   *
   * This method allows you to read the file asycronously
   *
   * @param     {ISFileReadSettings}        [settings={}]           An object of settings to configure your read process
   * @return    {Promise}                                          A promise that will be resolved with the file content when readed
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  read(settings: ISFileReadSettings = {}): Promise<string> {
    if (this.exists === false) {
      throw `You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`;
    }
    settings = {
      encoding: 'utf8',
      cast: true,
      ...settings
    };
    const content: string = __fs.readFile(this.path, settings);
    if (this.extension === 'json' && settings.cast) {
      return JSON.parse(content);
    }
    return content;
  }

  /**
   * @name        readSync
   * @type        Function
   *
   * This method allows you to read the file syncronously
   *
   * @param     {ISFileReadSettings}        [settings={}]           An object of settings to configure your read process
   * @return    {String}                                          The file content readed
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  readSync(settings: ISFileReadSettings = {}): string {
    if (this.exists === false) {
      throw `You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`;
    }
    settings = {
      encoding: 'utf8',
      cast: true,
      ...settings
    };
    const content: string = __fs.readFileSync(this.path, settings);
    if (this.extension === 'json' && settings.cast) {
      return JSON.parse(content);
    }
    return content;
  }

  /**
   * @name        write
   * @type        Function
   * @async
   *
   * This method allows you to write the file asycronously
   *
   * @param     {String}                data                    The data to write in the file
   * @param     {ISFileWriteSettings}        [settings={}]           An object of settings to configure your read process
   * @return    {Promise}                                          A promise that will be resolved with the file content when readed
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  write(data: string, settings: ISFileWriteSettings = {}): Promise<any> {
    settings = {
      encoding: 'utf8',
      ...settings
    };
    data = __toString(data, {
      beautify: true,
      highlight: false
    });
    __ensureDirSync(this.dirPath);
    const result: any = __fs.writeFile(this.path, data, settings);
    this.update();
    return result;
  }

  /**
   * @name        writeSync
   * @type        Function
   *
   * This method allows you to write the file sycronously
   *
   * @param     {String}                data                    The data to write in the file
   * @param     {ISFileWriteSettings}        [settings={}]           An object of settings to configure your read process
   * @return    {Promise}                                          A promise that will be resolved with the file content when readed
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  writeSync(data: string, settings: ISFileWriteSettings = {}): any {
    settings = {
      encoding: 'utf8',
      ...settings
    };
    data = __toString(data, {
      beautify: true,
      highlight: false
    });
    __ensureDirSync(this.dirPath);
    const result: any = __fs.writeFileSync(this.path, data, settings);
    this.update();
    return result;
  }
};

export = Cls;
