import __toString from '../string/toString';
import __deepMerge from '../object/deepMerge';
import __SEventEmitter from '../event/SEventEmitter';
// import __SFileInterface from './interface/SFileInterface';
import __fs from 'fs';
import __path from 'path';
import __md5 from '../crypt/md5';
import __extension from './extension';
import __folderPath from './folderPath';
import __getFilename from './filename';
import __SError from '../error/SError';
import __packageRoot from '../path/packageRoot';
import __ensureDirSync from './ensureDirSync';
import __SInterface from '../interface/SInterface';

/**
 * @name          SFileReadSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @beta
 *
 * Watch settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SFileReadSettingsInterface extends __SInterface {
  static definition = {
    encoding: {
      type: 'String',
      values: [
        'utf8',
        'ascii',
        'utf-8',
        'utf16le',
        'ucs2',
        'ucs-2',
        'base64',
        'latin1',
        'binary',
        'hex'
      ],
      required: true,
      default: 'utf8'
    },
    flag: {
      type: 'String',
      required: false
    },
    cast: {
      type: 'Boolean',
      required: true,
      default: true
    }
  };
}

/**
 * @name          SFileWriteSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @beta
 *
 * Watch settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SFileWriteSettingsInterface extends __SInterface {
  static definition = {
    encoding: {
      type: 'String',
      values: [
        'utf8',
        'ascii',
        'utf-8',
        'utf16le',
        'ucs2',
        'ucs-2',
        'base64',
        'latin1',
        'binary',
        'hex'
      ],
      required: true,
      default: 'utf8'
    },
    flag: {
      type: 'String',
      required: false
    },
    mode: {
      type: 'Number',
      required: true,
      default: 0o666
    },
    cast: {
      type: 'Boolean',
      required: true,
      default: true
    },
    path: {
      type: 'String',
      required: true
    }
  };
}

/**
 * @name          SFileWatchSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @beta
 *
 * Watch settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SFileWatchSettingsInterface extends __SInterface {
  static definition = {
    pollingInterval: {
      type: 'Number',
      required: true,
      default: 500
    }
  };
}

/**
 * @name          SFileSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @beta
 *
 * Settings infertage
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SFileSettingsInterface extends __SInterface {
  static definition = {
    checkExistence: {
      type: 'Boolean',
      required: true,
      default: true
    },
    cwd: {
      type: 'String',
      required: true,
      default: process.cwd()
    },
    shrinkSizesTo: {
      type: 'Integer',
      required: true,
      default: 4
    },
    watch: {
      interface: SFileWatchSettingsInterface,
      type: 'Boolean|Object',
      required: true
    },
    writeSettings: {
      interface: SFileWriteSettingsInterface.override({
        path: {
          required: false
        }
      }),
      type: 'Object',
      required: true
    },
    readSettings: {
      interface: SFileReadSettingsInterface,
      type: 'Object',
      required: true
    }
  };
}

export class SFileCtorSettingsInterface extends __SInterface {
  static definition = {
    file: {
      interface: SFileSettingsInterface,
      type: 'Object',
      required: true
    }
  };
}

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
 * - bytes: The file siz in bytes
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

export interface ISFileOptionalWatchSettings {
  pollingInterval?: number;
}
export interface ISFileWatchSettings {
  pollingInterval: number;
}

export interface ISFileCtorSettings {
  file?: ISFileOptionalSettings;
}

export interface ISFileOptionalSettings {
  checkExistence?: boolean;
  cwd?: string;
  shrinkSizesTo?: number;
  watch?: boolean | ISFileOptionalWatchSettings;
  writeSettings?: ISFileWriteOptionalSettings;
  readSettings?: ISFileReadOptionalSettings;
}
export interface ISFileSettings {
  checkExistence: boolean;
  cwd: string;
  shrinkSizesTo: number;
  watch: boolean | ISFileOptionalWatchSettings;
  writeSettings: ISFileWriteSettings;
  readSettings: ISFileReadSettings;
}

export interface ISFileReadOptionalSettings {
  encoding?:
    | 'utf8'
    | 'ascii'
    | 'utf-8'
    | 'utf16le'
    | 'ucs2'
    | 'ucs-2'
    | 'base64'
    | 'latin1'
    | 'binary'
    | 'hex'
    | null;
  flag?: string;
  cast?: boolean;
}
export interface ISFileReadSettings {
  encoding:
    | 'utf8'
    | 'ascii'
    | 'utf-8'
    | 'utf16le'
    | 'ucs2'
    | 'ucs-2'
    | 'base64'
    | 'latin1'
    | 'binary'
    | 'hex'
    | null;
  flag: string;
  cast: boolean;
}

export interface ISFileWriteOptionalSettings {
  encoding?:
    | 'utf8'
    | 'ascii'
    | 'utf-8'
    | 'utf16le'
    | 'ucs2'
    | 'ucs-2'
    | 'base64'
    | 'latin1'
    | 'binary'
    | 'hex'
    | null
    | undefined;
  mode?: number;
  flag?: string;
  cast?: boolean;
  path?: string;
}
export interface ISFileWriteSettings {
  encoding:
    | 'utf8'
    | 'ascii'
    | 'utf-8'
    | 'utf16le'
    | 'ucs2'
    | 'ucs-2'
    | 'base64'
    | 'latin1'
    | 'binary'
    | 'hex'
    | null
    | undefined;
  mode: number;
  flag: string;
  cast: boolean;
  path: string;
}

export interface ISFileToObjectFn {
  (): Object;
}
export interface ISFileUpdateFn {
  (): void;
}

export interface ISFileReadFn {
  (settings?: ISFileReadSettings): Promise<string>;
}

export interface ISFileReadSyncFn {
  (settings?: ISFileReadSettings): string;
}

export interface ISFileWriteFn {
  (data: string, settings?: ISFileWriteSettings): Promise<any>;
}
export interface ISFileWriteSyncFn {
  (data: string, settings?: ISFileWriteSettings): any;
}
export interface ISFileCtor {
  new (filepath: string, settings?: ISFileSettings): ISFile;
}

export interface ISFile {
  name: string;
  path: string;
  relPath: string;
  dirPath: string;
  extension: string;
  exists: boolean;
  _content?: string;
  content: string;
  toObject: ISFileToObjectFn;
  update(): void;
  startWatch(): void;
  stopWatch(): void;
  read: ISFileReadFn;
  readSync: ISFileReadSyncFn;
  write: ISFileWriteFn;
  writeSync: ISFileWriteSyncFn;
}

class SFile extends __SEventEmitter implements ISFile {
  static interfaces = {
    _settings: {
      apply: true,
      class: SFileCtorSettingsInterface
    }
  };

  /**
   * @name        name
   * @type        String
   *
   * Store the full file name
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name: string;
  public get name(): string {
    return this._name;
  }

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
   * @name      exists
   * @type      Boolean
   *
   * Specify if the file exists on the filesystem or not
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  exists;

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
   * @name        fileSettings
   * @type        ISFileSettings
   * @get
   *
   * Access the file settings setted in the ```settings.file``` property
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get fileSettings(): ISFileSettings {
    return (<any>this._settings).file;
  }

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
  constructor(filepath: string, settings?: ISFileCtorSettings) {
    super(
      __deepMerge(
        {
          file: {}
        },
        settings || {}
      )
    );

    Object.defineProperty(this, '_stats', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: null
    });

    if (this.fileSettings.cwd && !filepath.includes(this.fileSettings.cwd)) {
      filepath = __path.resolve(this.fileSettings.cwd, filepath);
    }

    // check if the file exists
    this.exists = __fs.existsSync(filepath);

    // check if need to check for the file existence or not...
    if (this.fileSettings.checkExistence && !this.exists) {
      throw new __SError(
        `The passed filepath "<cyan>${filepath}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`
      );
    }

    console.log(this.fileSettings);

    this.cwd = this.fileSettings.cwd;
    this.relPath = __path.relative(this.cwd, filepath);

    // save the file path
    this.path = filepath;
    this._name = __getFilename(filepath);
    this.extension = __extension(filepath).toLowerCase();
    this.dirPath = __path.dirname(filepath);

    if (this.fileSettings.watch === true) {
      this.startWatch();
    }
  }

  /**
   * @name            hash
   * @type            String
   * @get
   *
   * Get the file `md5` hash
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get hash() {
    return __md5.encrypt(this.content);
  }

  /**
   * @name            stats
   * @type            Object
   * @get
   *
   * Access the file stats like the updated timestamp, sizes, etc...
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _stats: any = {};
  get stats() {
    if (!this._stats) this.update();
    return this._stats;
  }

  /**
   * @name          content
   * @type          String
   * @get
   *
   * Access the file content
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _content?: string;
  get content() {
    if (this._content) return this._content;
    this._content = this.readSync();
    return this._content;
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
      stats: this.stats,
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
    // reset some variables
    this._content = undefined;

    this.exists = __fs.existsSync(this.path);
    if (!this.exists) {
      this._stats = null;
      return;
    }
    // get the file stats
    const stats = __fs.statSync(this.path);
    this._stats = stats;
    this._stats.bytes = stats.size;
    this._stats.gbytes = stats.size * 0.00000001;
    this._stats.mbytes = stats.size * 0.000001;
    this._stats.kbytes = stats.size * 0.001;

    if (this.fileSettings.shrinkSizesTo) {
      this._stats.bytes = Number(
        this._stats.bytes.toFixed(this.fileSettings.shrinkSizesTo)
      );
      this._stats.kbytes = Number(
        this._stats.kbytes.toFixed(this.fileSettings.shrinkSizesTo)
      );
      this._stats.mbytes = Number(
        this._stats.mbytes.toFixed(this.fileSettings.shrinkSizesTo)
      );
      this._stats.gbytes = Number(
        this._stats.gbytes.toFixed(this.fileSettings.shrinkSizesTo)
      );
    }
  }

  /**
   * @name        startWatch
   * @type        Function
   *
   * This method allows you to start watching the file for events like "update", etc...
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _watcher: any;
  startWatch() {
    if (this._watcher) return;
    this._watcher = __fs.watchFile(
      this.path,
      {
        interval: 1000
      },
      (event) => {
        this.update();
        this.emit('update', this);
      }
    );
  }

  /**
   * @name        stopWatch
   * @type        Function
   *
   * This method allows you to stop the watching process of the file
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  stopWatch() {
    if (!this._watcher) return;
    this._watcher.close();
    this._watcher = undefined;
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
  read(settings: ISFileReadOptionalSettings = {}): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.exists === false) {
        return reject(
          `You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`
        );
      }
      const set: ISFileReadSettings = {
        ...this.fileSettings.readSettings,
        ...settings
      };
      __fs.readFile(
        this.path,
        {
          // @ts-ignore
          encoding: set.encoding,
          flag: set.flag
        },
        (error, data) => {
          if (error) return reject(error);
          if (this.extension === 'json' && set.cast) {
            return resolve(JSON.parse(data.toString()));
          }
          resolve(data.toString());
        }
      );
    });
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
  readSync(settings: ISFileReadOptionalSettings = {}): string {
    if (this.exists === false) {
      throw `You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`;
    }
    const set: ISFileReadSettings = {
      ...this.fileSettings.readSettings,
      ...settings
    };
    const content: any = __fs.readFileSync(this.path, {
      encoding: set.encoding,
      flag: set.flag
    });
    if (this.extension === 'json' && set.cast) {
      return JSON.parse(content.toString());
    }
    return content.toString();
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
  write(
    data: string,
    settings: ISFileWriteOptionalSettings = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const set: ISFileWriteSettings = {
        ...this.fileSettings.writeSettings,
        path: this.path,
        ...settings
      };
      data = __toString(data, {
        beautify: true,
        highlight: false
      });
      __ensureDirSync(set.path);
      __fs.writeFile(
        set.path,
        data,
        {
          encoding: set.encoding
        },
        (error) => {
          if (error) return reject(error);
          this.update();
          resolve(true);
        }
      );
    });
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
  writeSync(data: string, settings: ISFileWriteOptionalSettings = {}): any {
    const set: ISFileWriteSettings = {
      ...this.fileSettings.writeSettings,
      path: this.path,
      ...settings
    };
    data = __toString(data, {
      beautify: true,
      highlight: false
    });
    __ensureDirSync(__folderPath(set.path));
    const result: any = __fs.writeFileSync(set.path, data, {
      encoding: set.encoding
    });
    this.update();
    return result;
  }
}

// const Cls: ISFileCtor = SFile;
export default SFile;
