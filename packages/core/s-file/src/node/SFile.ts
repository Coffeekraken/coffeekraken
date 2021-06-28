// import __SFileInterface from './interface/SFileInterface';
import __fs from 'fs';
import __path from 'path';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __SEventEmitter, { ISEventEmitter } from '@coffeekraken/s-event-emitter';
import __replacePathTokens from '@coffeekraken/sugar/node/path/replacePathTokens';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __minimatch from 'minimatch';

/**
 * @name            SFile
 * @namespace       sugar.node.fs
 * @type            Class
 * @implements      SFileInterface
 * @extends         SPromise
 * @status              beta
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
 * - cwd (__packageRootDir()) {String}: Specify a root directory for the file. This is usefull to have then access to properties like ```relPath```, etc...
 * - checkExistence (true) {Boolean}: Specify if you want this inited file to really exists on the disk or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Feature}       Add support for autocasting like yml, etc...
 *
 * @example           js
 * import SFile from '@coffeekraken/s-file';
 * const file = new SFile('something/cool/sugar.json');
 * file.extension; // => json
 * file.exists; // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISFileWatchSettings {
  pollingInterval: number;
}

export interface ISFileCtorSettings {
  file?: Partial<ISFileSettings>;
}

export interface ISFileSettings {
  checkExistence: boolean;
  cwd: string;
  shrinkSizesTo: number;
  sourcesExtensions: string[];
  watch: boolean | Partial<ISFileWatchSettings>;
  writeSettings: ISFileWriteSettings;
  readSettings: ISFileReadSettings;
  processors: Record<string, Function[]>;
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

export interface ISFileObject {
  exists: string;
  cwd: string;
  path: string;
  relPath: string;
  name: string;
  extension: string;
  dirPath: string;
  stats: any;
  content: string;
}
export interface ISFileToObjectFn {
  (): ISFileObject;
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

export interface ISFileCommit {
  time: number;
  data: any;
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

export interface ISFile extends ISEventEmitter {
  new (filepath: string, settings?: ISFileCtorSettings);
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
  watch(): void;
  unwatch(): void;
  read: ISFileReadFn;
  readSync: ISFileReadSyncFn;
  write: ISFileWriteFn;
  writeSync: ISFileWriteSyncFn;
}

// @ts-ignore
class SFile extends __SEventEmitter implements ISFile {
  // static interfaces = {
  //   // settings: {
  //   //   apply: true,
  //   //   on: '_settings.file',
  //   //   class: SFileSettingsInterface
  //   //   // class: SFileCtorSettingsInterface
  //   // }
  // };

  /**
   * @name        _registeredClasses
   * @type        Record<string, SFile>
   * @static
   *
   * Store the registered classes map
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _registeredClasses: Record<string, ISFile> = {};

  /**
   * @name        registerClass
   * @type      Function
   * @static
   *
   * This method allows you to register an SFile(...) class with an extension
   * to allows you to instanciate the best one using the ```new``` static
   * method.
   *
   * @param     {String|Array<String>}      pattern     Pattern(s) to register. Can be a string, a comma separated string or an array of strings
   * @param     {SFile}                     cls           The class to associate to this/these extension(s)
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registerClass(pattern: string | string[], cls: any) {
    let patternsArray: string[] = [];
    if (Array.isArray(pattern)) patternsArray = pattern;
    else if (typeof pattern === 'string') {
      patternsArray = pattern.split(',').map((l) => l.trim());
    }
    patternsArray.forEach((pat) => {
      this._registeredClasses[pat.toLowerCase()] = cls;
    });
  }

  /**
   * @name      sourcesFiles
   * @type      Record<string, SFile>
   *
   * Store the sources files found using the specified sourcesExtensions in the settings
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sourcesFiles: Record<string, SFile> = {};

  /**
   * @name        new
   * @type      Function
   * @static
   *
   * This function take as parameter a file path and an object of settings
   * to instanciate the proper SFile(...) class depending on the file extension.
   * If the extension does not correspond to any registered SFile(...) class,
   * the file will be instanciated using the SFile class itself.
   *
   * To register a new SFile(...) class mapping, use the ```registerClass``` static
   * method.
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static new(path: string, settings?: ISFileCtorSettings): SFile {
    const fileName = __getFilename(path);
    for (let i = 0; i < Object.keys(this._registeredClasses).length; i++) {
      const pattern = Object.keys(this._registeredClasses)[i],
        cls = this._registeredClasses[pattern];
      if (__minimatch(fileName, pattern)) {
        return new cls(path, settings);
      }
    }
    return new SFile(path, settings);
  }

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
   * @name        nameWithoutExt
   * @type        String
   *
   * Store the file name without the extension
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _nameWithoutExt: string;
  public get nameWithoutExt(): string {
    return this._nameWithoutExt;
  }

  /**
   * @name        path
   * @type        String
   *
   * Store the full file path
   * Some tokens can be used in the file path like:
   * - %tmpDir: return the absolute tmp package directory path
   * - %localDir: return the absolute .local package directory path
   * - %cacheDir: return the absolute cache package directory path
   * - %rootDir: return the absolute package root directory path
   * - %srcDir: return the absolute source package directory path
   * - %distDir: return the absolute dist package directory path
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _path: string;
  get path(): string {
    let path = <string>__replacePathTokens(this._path);

    if (
      !__path.isAbsolute(path) &&
      this.fileSettings.cwd &&
      !path.includes(this.fileSettings.cwd)
    ) {
      path = __path.resolve(this.fileSettings.cwd, path);
    }

    return path;
  }

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
   * @get
   *
   * Store the path relative to the ```cwd``` property. To have access to this property, you MUST
   * specify the settings.cwd through the constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get relPath(): string {
    return __path.relative(this.cwd, this.path);
  }

  /**
   * @name        dirPath
   * @type        String
   * @get
   *
   * Store the path to the folder where the file lives
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get dirPath(): string {
    return __path.dirname(this.path);
  }

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
    return (<any>this)._settings.file;
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
          file: {
            checkExistence: true,
            cwd: process.cwd(),
            shrinkSizesTo: 4,
            watch: {
              pollingInterval: 500
            },
            writeSettings: {
              encoding: 'utf8',
              flag: undefined,
              mode: 0x666,
              cast: true,
              path: undefined
            },
            readSettings: {
              encoding: 'utf8',
              flag: undefined,
              cast: true
            },
            processors: {
              content: [],
              save: []
            }
          }
        },
        settings || {}
      )
    );

    this._path = filepath;

    Object.defineProperty(this, '_stats', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: null
    });

    // check if the file exists
    this.exists = __fs.existsSync(filepath);

    // save the file path
    this.cwd = this.fileSettings.cwd;
    this._name = __getFilename(filepath);
    this.extension = __extension(this.path).toLowerCase();
    this._nameWithoutExt = this.name.replace(`.${this.extension}`, '');

    // check if need to check for the file existence or not...
    if (this.fileSettings.checkExistence && !this.exists) {
      throw new Error(
        `The passed filepath "<cyan>${this.path}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`
      );
    }

    // check if some sourcesExtensions have been specified
    if (
      this.fileSettings.sourcesExtensions &&
      this.fileSettings.sourcesExtensions.length
    ) {
      this.fileSettings.sourcesExtensions.forEach((ext) => {
        const replaceReg = new RegExp(`\.${this.extension}$`);
        const potentialPath = this.path.replace(replaceReg, `.${ext}`);
        if (__fs.existsSync(potentialPath)) {
          this.sourcesFiles[ext] = SFile.new(potentialPath);
        }
      });
    }

    if (this.fileSettings.watch !== false) {
      this.watch();
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
   * @name        raw
   * @type        String
   * @get
   * 
   * Access the raw file content in string format
   * 
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _raw?: string;
  get raw(): any {
    if (this._raw) return this._raw;
    this._raw = __fs.readFileSync(this.path, 'utf8');
    return this._raw;
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
  get content(): any {
    if (this._content) return this._content;
    this._content = this.readSync();
    for (let i = 0; i < this.fileSettings.processors.content.length; i++) {
      this._content = this.fileSettings.processors.content[i](this._content);
    }
    return this._content;
  }
  set content(value) {
    this._commits.push({
      time: Date.now(),
      data: value
    });
    this._content = value;
  }

  /**
   * @name        commits
   * @type        Array<String>
   *
   * Store all the commits made before saving the file
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _commits: ISFileCommit[] = [];
  get commits(): ISFileCommit[] {
    return this._commits;
  }

  /**
   * @name            toObject
   * @type            Function
   *
   * This method transform this instance into a plain object
   *
   * @return        {Object}        A plain object version of this instance
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toObject(): ISFileObject {
    return <ISFileObject>{
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
   * @name        watch
   * @type        Function
   *
   * This method allows you to start watching the file for events like "update", etc...
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _watcher: any;
  watch() {
    if (this._watcher) return;
    this._watcher = __fs.watchFile(
      this.path,
      {
        interval:
          // @ts-ignore
          this.fileSettings.watch && this.fileSettings.watch.pollingInterval
            ? // @ts-ignore
              this.fileSettings.watch.pollingInterval
            : 1000
      },
      (event) => {
        this.update();
        // @weird:ts-compilation-issue
        (<any>this).emit('update', this);
      }
    );
    setTimeout(() => {
      // @weird:ts-compilation-issue
      (<any>this).emit('watch', this);
    });
  }

  /**
   * @name        unwatch
   * @type        Function
   *
   * This method allows you to stop the watching process of the file
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  unwatch() {
    if (!this._watcher) return;
    this._watcher.close();
    this._watcher = undefined;
    // @weird:ts-compilation-issue
    (<any>this).emit('unwatch', this);
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
   * @name      duplicate
   * @type      Function
   * @async
   *
   * This method allows you to make a copy of this file.
   * If you don't specify a "to" path, the file will be diplicated
   * into the temp directory
   *
   * @param     {String}      [to=undefined]      The path where you want to duplicate this file including the file name
   * @return    {Promise}                      A promise that will be resolved once the file is fully duplicated and gives you access to a new SFile instance
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  duplicate(to?): Promise<SFile> {
    return new Promise((resolve) => {
      const newFile = this.duplicateSync(to);
      resolve(newFile);
    });
  }

  /**
   * @name      duplicateSync
   * @type      Function
   *
   * This method allows you to make a copy of this file.
   * If you don't specify a "to" path, the file will be diplicated
   * into the temp directory
   *
   * @param     {String}      [to=undefined]      The path where you want to duplicate this file including the file name
   * @return    {SFile}                      A new SFile instance that represent your new file
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  duplicateSync(to?): SFile {
    let destination = to;
    if (!to) {
      destination = __replacePathTokens(
        `%tmpDir/files/${this.constructor.name}/${
          this.nameWithoutExt
        }.${__uniqid()}.${this.extension}`
      );
      __onProcessExit(() => {
        try {
          __fs.unlinkSync(destination);
        } catch (e) {}
      });
    }
    destination = __path.resolve(destination);

    // make sure the destination does not exists already
    if (__fs.existsSync(destination)) {
      throw new Error(
        `<red>[sugar.node.fs.SFile.duplicate]</red> Sorry but a file already exists at "<cyan>${destination}</cyan>"`
      );
    }

    // ensure destination directory exists
    __ensureDirSync(__folderPath(destination));

    // copy the file
    __fs.copyFileSync(this.path, destination);

    // create a new instance for this new file
    // @ts-ignore
    const newFileInstance = new this.constructor(destination, this._settings);

    // return this new instance
    return newFileInstance;
  }

  /**
   * @name       save
   * @type      Function
   * @async
   *
   * This method allows you to save the file with the content
   * that you can set by setting the ```content``` property
   *
   * @return    {Promise}        A promise resolved once the file has been save
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  save(): Promise<SFile> {
    return new Promise((resolve, reject) => {
      const res = this.saveSync();
      resolve(res);
    });
  }

  /**
   * @name       saveSync
   * @type      Function
   *
   * This method allows you to save the file with the content
   * that you can set by setting the ```content``` property
   *
   * @return    {Promise}        A promise resolved once the file has been save
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  saveSync(): SFile {
    // check if some commits are waiting to be saved
    if (!this.commits.length) return this;
    // save the last commit
    let toSave = this.content;
    if (this.fileSettings.processors.save.length) {
      for (let i = 0; i < this.fileSettings.processors.save.length; i++) {
        toSave = this.fileSettings.processors.save[i](toSave);
      }
    }

    if (typeof toSave !== 'string') {
      try {
        const res = JSON.stringify(toSave, null, 4);
        toSave = res;
      } catch (e) {
        if (
          typeof toSave !== 'string' &&
          toSave.toString &&
          typeof toSave.toString === 'function'
        ) {
          toSave = toSave.toString();
        }
      }
    }

    __fs.writeFileSync(this.path, toSave);
    // reset content and commits
    this._commits = [];
    this._content = undefined;
    // return instance
    return this;
  }

  /**
   * @name      unlink
   * @type      Function
   * @async
   *
   * This method allows you to unlink the file asyncronously
   *
   * @return    {Promise<boolean|Error}       A promise that will be resolved with true if all good, and rejected with an Error if not
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  unlink(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      __fs.unlink(this.path, (error) => {
        if (error) return reject(error);
        this.update();
        resolve(true);
      });
    });
  }

  /**
   * @name      unlinkSync
   * @type      Function
   * @async
   *
   * This method allows you to unlinkSync the file syncronously
   *
   * @return      {Boolean|Error}     true if deleted properly, throw an error if not
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  unlinkSync(): boolean {
    __fs.unlinkSync(this.path);
    this.update();
    return true;
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
  read(settings: Partial<ISFileReadSettings> = {}): Promise<string> {
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
            console.log('RRR', data.toString());
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
  readSync(settings: Partial<ISFileReadSettings> = {}): string {
    if (this.exists === false) {
      throw new Error(
        `You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`
      );
    }
    const set: ISFileReadSettings = {
      ...this.fileSettings.readSettings,
      ...settings
    };
    let content: any;
    if (this.extension === 'json' && set.cast) {
      content = require(this.path);
      return content;
    } else {
      content = __fs.readFileSync(this.path, {
        encoding: set.encoding,
        flag: set.flag
      });
    }
    if (set.cast) {
      try {
        return JSON.parse(content.toString());
      } catch (e) {
        return content.toString();
      }
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
    settings: Partial<ISFileWriteSettings> = {}
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
      }) ?? '';
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
  writeSync(data: string, settings: Partial<ISFileWriteSettings> = {}): any {
    const set: ISFileWriteSettings = {
      ...this.fileSettings.writeSettings,
      path: this.path,
      ...settings
    };
    data = __toString(data, {
      beautify: true,
      highlight: false
    }) ?? '';
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
