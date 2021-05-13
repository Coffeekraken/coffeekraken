// import __SFileInterface from './interface/SFileInterface';
import __fs from 'fs';
import __path from 'path';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __replacePathTokens from '@coffeekraken/sugar/node/path/replacePathTokens';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __minimatch from 'minimatch';
// @ts-ignore
class SFile extends __SEventEmitter {
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
    constructor(filepath, settings) {
        super(__deepMerge({
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
        }, settings || {}));
        /**
         * @name      sourcesFiles
         * @type      Record<string, SFile>
         *
         * Store the sources files found using the specified sourcesExtensions in the settings
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.sourcesFiles = {};
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
        this._stats = {};
        /**
         * @name        commits
         * @type        Array<String>
         *
         * Store all the commits made before saving the file
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._commits = [];
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
            throw new Error(`The passed filepath "<cyan>${this.path}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`);
        }
        // check if some sourcesExtensions have been specified
        if (this.fileSettings.sourcesExtensions &&
            this.fileSettings.sourcesExtensions.length) {
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
    static registerClass(pattern, cls) {
        let patternsArray = [];
        if (Array.isArray(pattern))
            patternsArray = pattern;
        else if (typeof pattern === 'string') {
            patternsArray = pattern.split(',').map((l) => l.trim());
        }
        patternsArray.forEach((pat) => {
            this._registeredClasses[pat.toLowerCase()] = cls;
        });
    }
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
    static new(path, settings) {
        const fileName = __getFilename(path);
        for (let i = 0; i < Object.keys(this._registeredClasses).length; i++) {
            const pattern = Object.keys(this._registeredClasses)[i], cls = this._registeredClasses[pattern];
            if (__minimatch(fileName, pattern)) {
                return new cls(path, settings);
            }
        }
        return new SFile(path, settings);
    }
    get name() {
        return this._name;
    }
    get nameWithoutExt() {
        return this._nameWithoutExt;
    }
    get path() {
        let path = __replacePathTokens(this._path);
        if (!__path.isAbsolute(path) &&
            this.fileSettings.cwd &&
            !path.includes(this.fileSettings.cwd)) {
            path = __path.resolve(this.fileSettings.cwd, path);
        }
        return path;
    }
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
    get relPath() {
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
    get dirPath() {
        return __path.dirname(this.path);
    }
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
    get fileSettings() {
        return this._settings.file;
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
    get stats() {
        if (!this._stats)
            this.update();
        return this._stats;
    }
    get content() {
        if (this._content)
            return this._content;
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
    get commits() {
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
            this._stats.bytes = Number(this._stats.bytes.toFixed(this.fileSettings.shrinkSizesTo));
            this._stats.kbytes = Number(this._stats.kbytes.toFixed(this.fileSettings.shrinkSizesTo));
            this._stats.mbytes = Number(this._stats.mbytes.toFixed(this.fileSettings.shrinkSizesTo));
            this._stats.gbytes = Number(this._stats.gbytes.toFixed(this.fileSettings.shrinkSizesTo));
        }
    }
    watch() {
        if (this._watcher)
            return;
        this._watcher = __fs.watchFile(this.path, {
            interval: 
            // @ts-ignore
            this.fileSettings.watch && this.fileSettings.watch.pollingInterval
                ? // @ts-ignore
                    this.fileSettings.watch.pollingInterval
                : 1000
        }, (event) => {
            this.update();
            // @weird:ts-compilation-issue
            this.emit('update', this);
        });
        setTimeout(() => {
            // @weird:ts-compilation-issue
            this.emit('watch', this);
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
        if (!this._watcher)
            return;
        this._watcher.close();
        this._watcher = undefined;
        // @weird:ts-compilation-issue
        this.emit('unwatch', this);
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
    duplicate(to) {
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
    duplicateSync(to) {
        let destination = to;
        if (!to) {
            destination = __replacePathTokens(`%tmpDir/files/${this.constructor.name}/${this.nameWithoutExt}.${__uniqid()}.${this.extension}`);
            __onProcessExit(() => {
                try {
                    __fs.unlinkSync(destination);
                }
                catch (e) { }
            });
        }
        destination = __path.resolve(destination);
        // make sure the destination does not exists already
        if (__fs.existsSync(destination)) {
            throw new Error(`<red>[sugar.node.fs.SFile.duplicate]</red> Sorry but a file already exists at "<cyan>${destination}</cyan>"`);
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
    save() {
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
    saveSync() {
        // check if some commits are waiting to be saved
        if (!this.commits.length)
            return this;
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
            }
            catch (e) {
                if (typeof toSave !== 'string' &&
                    toSave.toString &&
                    typeof toSave.toString === 'function') {
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
    unlink() {
        return new Promise((resolve, reject) => {
            __fs.unlink(this.path, (error) => {
                if (error)
                    return reject(error);
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
    unlinkSync() {
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
    read(settings = {}) {
        return new Promise((resolve, reject) => {
            if (this.exists === false) {
                return reject(`You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`);
            }
            const set = Object.assign(Object.assign({}, this.fileSettings.readSettings), settings);
            __fs.readFile(this.path, {
                // @ts-ignore
                encoding: set.encoding,
                flag: set.flag
            }, (error, data) => {
                if (error)
                    return reject(error);
                if (this.extension === 'json' && set.cast) {
                    console.log('RRR', data.toString());
                    return resolve(JSON.parse(data.toString()));
                }
                resolve(data.toString());
            });
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
    readSync(settings = {}) {
        if (this.exists === false) {
            throw new Error(`You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`);
        }
        const set = Object.assign(Object.assign({}, this.fileSettings.readSettings), settings);
        let content;
        if (this.extension === 'json' && set.cast) {
            content = require(this.path);
            return content;
        }
        else {
            content = __fs.readFileSync(this.path, {
                encoding: set.encoding,
                flag: set.flag
            });
        }
        if (set.cast) {
            try {
                return JSON.parse(content.toString());
            }
            catch (e) {
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
    write(data, settings = {}) {
        return new Promise((resolve, reject) => {
            const set = Object.assign(Object.assign(Object.assign({}, this.fileSettings.writeSettings), { path: this.path }), settings);
            data = __toString(data, {
                beautify: true,
                highlight: false
            });
            __ensureDirSync(set.path);
            __fs.writeFile(set.path, data, {
                encoding: set.encoding
            }, (error) => {
                if (error)
                    return reject(error);
                this.update();
                resolve(true);
            });
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
    writeSync(data, settings = {}) {
        const set = Object.assign(Object.assign(Object.assign({}, this.fileSettings.writeSettings), { path: this.path }), settings);
        data = __toString(data, {
            beautify: true,
            highlight: false
        });
        __ensureDirSync(__folderPath(set.path));
        const result = __fs.writeFileSync(set.path, data, {
            encoding: set.encoding
        });
        this.update();
        return result;
    }
}
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
SFile._registeredClasses = {};
// const Cls: ISFileCtor = SFile;
export default SFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2REFBNkQ7QUFDN0QsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLGVBQW1DLE1BQU0sK0JBQStCLENBQUM7QUFDaEYsT0FBTyxtQkFBbUIsTUFBTSxpREFBaUQsQ0FBQztBQUNsRixPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLFdBQVcsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRSxPQUFPLGFBQWEsTUFBTSxzQ0FBc0MsQ0FBQztBQUNqRSxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUM3RSxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUErSnBDLGFBQWE7QUFDYixNQUFNLEtBQU0sU0FBUSxlQUFlO0lBZ09qQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQWdCLEVBQUUsUUFBNkI7UUFDekQsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLElBQUksRUFBRTtnQkFDSixjQUFjLEVBQUUsSUFBSTtnQkFDcEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixLQUFLLEVBQUU7b0JBQ0wsZUFBZSxFQUFFLEdBQUc7aUJBQ3JCO2dCQUNELGFBQWEsRUFBRTtvQkFDYixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLEtBQUs7b0JBQ1gs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