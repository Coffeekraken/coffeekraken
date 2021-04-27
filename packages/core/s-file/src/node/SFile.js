"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import __SFileInterface from './interface/SFileInterface';
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const replacePathTokens_1 = __importDefault(require("@coffeekraken/sugar/node/path/replacePathTokens"));
const ensureDirSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/ensureDirSync"));
const extension_1 = __importDefault(require("@coffeekraken/sugar/node/fs/extension"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const folderPath_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderPath"));
const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
const onProcessExit_1 = __importDefault(require("@coffeekraken/sugar/node/process/onProcessExit"));
const minimatch_1 = __importDefault(require("minimatch"));
// @ts-ignore
class SFile extends s_event_emitter_1.default {
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
        super(deepMerge_1.default({
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
        this.exists = fs_1.default.existsSync(filepath);
        // save the file path
        this.cwd = this.fileSettings.cwd;
        this._name = filename_1.default(filepath);
        this.extension = extension_1.default(this.path).toLowerCase();
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
                if (fs_1.default.existsSync(potentialPath)) {
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
        const fileName = filename_1.default(path);
        for (let i = 0; i < Object.keys(this._registeredClasses).length; i++) {
            const pattern = Object.keys(this._registeredClasses)[i], cls = this._registeredClasses[pattern];
            if (minimatch_1.default(fileName, pattern)) {
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
        let path = replacePathTokens_1.default(this._path);
        if (!path_1.default.isAbsolute(path) &&
            this.fileSettings.cwd &&
            !path.includes(this.fileSettings.cwd)) {
            path = path_1.default.resolve(this.fileSettings.cwd, path);
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
        return path_1.default.relative(this.cwd, this.path);
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
        return path_1.default.dirname(this.path);
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
        return md5_1.default.encrypt(this.content);
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
        this.exists = fs_1.default.existsSync(this.path);
        if (!this.exists) {
            this._stats = null;
            return;
        }
        // get the file stats
        const stats = fs_1.default.statSync(this.path);
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
        this._watcher = fs_1.default.watchFile(this.path, {
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
            destination = replacePathTokens_1.default(`%tmpDir/files/${this.constructor.name}/${this.nameWithoutExt}.${uniqid_1.default()}.${this.extension}`);
            onProcessExit_1.default(() => {
                try {
                    fs_1.default.unlinkSync(destination);
                }
                catch (e) { }
            });
        }
        destination = path_1.default.resolve(destination);
        // make sure the destination does not exists already
        if (fs_1.default.existsSync(destination)) {
            throw new Error(`<red>[sugar.node.fs.SFile.duplicate]</red> Sorry but a file already exists at "<cyan>${destination}</cyan>"`);
        }
        // ensure destination directory exists
        ensureDirSync_1.default(folderPath_1.default(destination));
        // copy the file
        fs_1.default.copyFileSync(this.path, destination);
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
        fs_1.default.writeFileSync(this.path, toSave);
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
            fs_1.default.unlink(this.path, (error) => {
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
        fs_1.default.unlinkSync(this.path);
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
            fs_1.default.readFile(this.path, {
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
            throw `You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`;
        }
        const set = Object.assign(Object.assign({}, this.fileSettings.readSettings), settings);
        let content;
        if (this.extension === 'json' && set.cast) {
            content = require(this.path);
            return content;
        }
        else {
            content = fs_1.default.readFileSync(this.path, {
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
            data = toString_1.default(data, {
                beautify: true,
                highlight: false
            });
            ensureDirSync_1.default(set.path);
            fs_1.default.writeFile(set.path, data, {
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
        data = toString_1.default(data, {
            beautify: true,
            highlight: false
        });
        ensureDirSync_1.default(folderPath_1.default(set.path));
        const result = fs_1.default.writeFileSync(set.path, data, {
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
exports.default = SFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUE2RDtBQUM3RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLCtFQUF5RDtBQUN6RCw0RkFBc0U7QUFDdEUsMEZBQW9FO0FBQ3BFLG9GQUFnRjtBQUNoRix3R0FBa0Y7QUFDbEYsOEZBQXdFO0FBQ3hFLHNGQUFnRTtBQUNoRSxvRkFBaUU7QUFDakUsd0ZBQWtFO0FBQ2xFLHNGQUFnRTtBQUNoRSxtR0FBNkU7QUFDN0UsMERBQW9DO0FBK0pwQyxhQUFhO0FBQ2IsTUFBTSxLQUFNLFNBQVEseUJBQWU7SUFnT2pDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBZ0IsRUFBRSxRQUE2QjtRQUN6RCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLElBQUksRUFBRTtnQkFDSixjQUFjLEVBQUUsSUFBSTtnQkFDcEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixLQUFLLEVBQUU7b0JBQ0wsZUFBZSxFQUFFLEdBQUc7aUJBQ3JCO2dCQUNELGFBQWEsRUFBRTtvQkFDYixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2dCQUNELFlBQVksRUFBRTtvQkFDWixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLElBQUk7aUJBQ1g7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLE9BQU8sRUFBRSxFQUFFO29CQUNYLElBQUksRUFBRSxFQUFFO2lCQUNUO2FBQ0Y7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBek5KOzs7Ozs7OztXQVFHO1FBQ0gsaUJBQVksR0FB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