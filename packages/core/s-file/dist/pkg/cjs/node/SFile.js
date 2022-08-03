"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import __SFileInterface from './interface/SFileInterface';
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const extension_1 = __importDefault(require("@coffeekraken/sugar/node/fs/extension"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const writeFile_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFile"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
// import __replacePathTokens from '@coffeekraken/sugar/node/path/replacePathTokens';
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
const fs_1 = __importDefault(require("fs"));
const minimatch_1 = __importDefault(require("minimatch"));
const path_1 = __importDefault(require("path"));
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(filepath, settings) {
        super((0, deepMerge_1.default)({
            checkExistence: true,
            cwd: process.cwd(),
            shrinkSizesTo: 4,
            watch: false,
            writeSettings: {
                encoding: 'utf8',
                flag: undefined,
                mode: 0x666,
                cast: true,
                path: undefined,
            },
            readSettings: {
                encoding: 'utf8',
                flag: undefined,
                cast: true,
            },
            processors: {
                content: [],
                save: [],
            },
        }, settings || {}));
        /**
         * @name      sourcesFiles
         * @type      Record<string, SFile>
         *
         * Store the sources files found using the specified sourcesExtensions in the settings
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._stats = {};
        /**
         * @name        commits
         * @type        Array<String>
         *
         * Store all the commits made before saving the file
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._commits = [];
        this._path = filepath;
        Object.defineProperty(this, '_stats', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: null,
        });
        // check if the file exists
        this.exists = fs_1.default.existsSync(filepath);
        // save the file path
        this.cwd = this.settings.cwd;
        this._name = (0, filename_1.default)(filepath);
        this.extension = (0, extension_1.default)(this.path).toLowerCase();
        this._nameWithoutExt = this.name.replace(`.${this.extension}`, '');
        // check if need to check for the file existence or not...
        if (this.settings.checkExistence && !this.exists) {
            throw new Error(`The passed filepath "<cyan>${this.path}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`);
        }
        // check if some sourcesExtensions have been specified
        if (this.settings.sourcesExtensions &&
            this.settings.sourcesExtensions.length) {
            this.settings.sourcesExtensions.forEach((ext) => {
                const replaceReg = new RegExp(`\.${this.extension}$`);
                const potentialPath = this.path.replace(replaceReg, `.${ext}`);
                if (fs_1.default.existsSync(potentialPath)) {
                    this.sourcesFiles[ext] = SFile.new(potentialPath);
                }
            });
        }
        if (this.settings.watch) {
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static new(path, settings) {
        const fileName = (0, filename_1.default)(path);
        for (let i = 0; i < Object.keys(this._registeredClasses).length; i++) {
            const pattern = Object.keys(this._registeredClasses)[i], cls = this._registeredClasses[pattern];
            if ((0, minimatch_1.default)(fileName, pattern)) {
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
        let path = this._path;
        if (!path_1.default.isAbsolute(path) &&
            this.settings.cwd &&
            !path.includes(this.settings.cwd)) {
            path = path_1.default.resolve(this.settings.cwd, path);
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get dirPath() {
        return path_1.default.dirname(this.path);
    }
    /**
     * @name            hash
     * @type            String
     * @get
     *
     * Get the file `md5` hash
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get hash() {
        return md5_1.default.encrypt(this.content);
    }
    get stats() {
        if (!this._stats)
            this.update();
        return this._stats;
    }
    get raw() {
        if (this._raw)
            return this._raw;
        this._raw = fs_1.default.readFileSync(this.path, 'utf8');
        return this._raw;
    }
    get content() {
        if (this._content)
            return this._content;
        this._content = this.readSync();
        for (let i = 0; i < this.settings.processors.content.length; i++) {
            this._content = this.settings.processors.content[i](this._content);
        }
        return this._content;
    }
    set content(value) {
        this._commits.push({
            time: Date.now(),
            data: value,
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toObject(readContent = true) {
        const obj = {
            exists: this.exists,
            cwd: this.cwd,
            path: this.path,
            relPath: this.relPath,
            name: this.name,
            extension: this.extension,
            dirPath: this.dirPath,
            stats: this.stats,
        };
        if (readContent)
            obj.content = this.readSync();
        return obj;
    }
    /**
     * @name            update
     * @type            Function
     * @private
     *
     * This method simply updates the informations like the file size, etc...
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        if (this.settings.shrinkSizesTo) {
            this._stats.bytes = Number(this._stats.bytes.toFixed(this.settings.shrinkSizesTo));
            this._stats.kbytes = Number(this._stats.kbytes.toFixed(this.settings.shrinkSizesTo));
            this._stats.mbytes = Number(this._stats.mbytes.toFixed(this.settings.shrinkSizesTo));
            this._stats.gbytes = Number(this._stats.gbytes.toFixed(this.settings.shrinkSizesTo));
        }
    }
    watch(callback) {
        if (this._watcher)
            return;
        this._watcher = fs_1.default.watchFile(this.path, {
            interval: 500,
        }, (event) => {
            this.update();
            callback === null || callback === void 0 ? void 0 : callback(this);
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    duplicateSync(to) {
        // let destination = to;
        // if (!to) {
        //     const __replacePathTokens = __require(
        //         '@coffeekraken/sugar/node/path/replacePathTokens',
        //     ).default;
        //     destination = __replacePathTokens(
        //         `%tmpDir/files/${this.constructor.name}/${
        //             this.nameWithoutExt
        //         }.${__uniqid()}.${this.extension}`,
        //     );
        //     __onProcessExit(() => {
        //         try {
        //             __fs.unlinkSync(destination);
        //         } catch (e) {}
        //     });
        // }
        // destination = __path.resolve(destination);
        // // make sure the destination does not exists already
        // if (__fs.existsSync(destination)) {
        //     throw new Error(
        //         `<red>[sugar.node.fs.SFile.duplicate]</red> Sorry but a file already exists at "<cyan>${destination}</cyan>"`,
        //     );
        // }
        // // ensure destination directory exists
        // __ensureDirSync(__folderPath(destination));
        // // copy the file
        // __fs.copyFileSync(this.path, destination);
        // // create a new instance for this new file
        // // @ts-ignore
        // const newFileInstance = new this.constructor(
        //     destination,
        //     this.settings,
        // );
        // // return this new instance
        // return newFileInstance;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    saveSync() {
        // check if some commits are waiting to be saved
        if (!this.commits.length)
            return this;
        // save the last commit
        let toSave = this.content;
        if (this.settings.processors.save.length) {
            for (let i = 0; i < this.settings.processors.save.length; i++) {
                toSave = this.settings.processors.save[i](toSave);
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(settings = {}) {
        return new Promise((resolve, reject) => {
            if (this.exists === false) {
                return reject(`You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`);
            }
            const set = Object.assign(Object.assign({}, this.settings.readSettings), settings);
            fs_1.default.readFile(this.path, {
                // @ts-ignore
                encoding: set.encoding,
                flag: set.flag,
            }, (error, data) => {
                if (error)
                    return reject(error);
                if (this.extension === 'json' && set.cast) {
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    readSync(settings = {}) {
        if (this.exists === false) {
            throw new Error(`You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`);
        }
        const set = Object.assign(Object.assign({}, this.settings.readSettings), settings);
        let content;
        if (this.extension === 'json' && set.cast) {
            content = (0, readJsonSync_1.default)(this.path);
            return content;
        }
        else {
            content = fs_1.default.readFileSync(this.path, {
                encoding: set.encoding,
                flag: set.flag,
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    write(data, settings = {}) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            data =
                (_a = (0, toString_1.default)(data, {
                    beautify: true,
                    highlight: false,
                })) !== null && _a !== void 0 ? _a : '';
            yield (0, writeFile_1.default)(this.path, data, settings);
            resolve(true);
        }));
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    writeSync(data, settings = {}) {
        var _a;
        data =
            (_a = (0, toString_1.default)(data, {
                beautify: true,
                highlight: false,
            })) !== null && _a !== void 0 ? _a : '';
        (0, writeFileSync_1.default)(this.path, data, settings);
        this.update();
    }
}
/**
 * @name        _registeredClasses
 * @type        Record<string, SFile>
 * @static
 *
 * Store the registered classes map
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFile._registeredClasses = {};
// const Cls: ISFileCtor = SFile;
exports.default = SFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQTZEO0FBQzdELG9GQUFnRjtBQUNoRixzRkFBZ0U7QUFDaEUsb0ZBQWlFO0FBQ2pFLDRGQUFzRTtBQUN0RSxzRkFBZ0U7QUFDaEUsOEZBQXdFO0FBQ3hFLHFGQUFxRjtBQUNyRiwrRUFBeUQ7QUFDekQsNEZBQXNFO0FBQ3RFLDBGQUFvRTtBQUNwRSw0Q0FBc0I7QUFDdEIsMERBQW9DO0FBQ3BDLGdEQUEwQjtBQTBKMUIsYUFBYTtBQUNiLE1BQU0sS0FBTSxTQUFRLHlCQUFlO0lBdU4vQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQWdCLEVBQUUsUUFBeUI7UUFDbkQsS0FBSyxDQUNELElBQUEsbUJBQVcsRUFDUDtZQUNJLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2xCLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLEtBQUssRUFBRSxLQUFLO1lBQ1osYUFBYSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsU0FBUzthQUNsQjtZQUNELFlBQVksRUFBRTtnQkFDVixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLElBQUk7YUFDYjtZQUNELFVBQVUsRUFBRTtnQkFDUixPQUFPLEVBQUUsRUFBRTtnQkFDWCxJQUFJLEVBQUUsRUFBRTthQUNYO1NBQ0osRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFyTk47Ozs7Ozs7O1dBUUc7UUFDSCxpQkFBWSxHQUEwQixFQUFFLENBQUM7UUF3UXpDOzs7Ozs7Ozs7V0FTRztRQUNILFdBQU0sR0FBUSxFQUFFLENBQUM7UUFrRGpCOzs7Ozs7OztXQVFHO1FBQ0gsYUFBUSxHQUFtQixFQUFFLENBQUM7UUEvSDFCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNsQyxVQUFVLEVBQUUsS0FBSztZQUNqQixZQUFZLEVBQUUsSUFBSTtZQUNsQixRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4QyxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUEsa0JBQWEsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVuRSwwREFBMEQ7UUFDMUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FDWCw4QkFBOEIsSUFBSSxDQUFDLElBQUksa0hBQWtILENBQzVKLENBQUM7U0FDTDtRQUVELHNEQUFzRDtRQUN0RCxJQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUN4QztZQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQy9ELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUNyRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtJQUNMLENBQUM7SUEzUkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQTBCLEVBQUUsR0FBUTtRQUNyRCxJQUFJLGFBQWEsR0FBYSxFQUFFLENBQUM7UUFDakMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUFFLGFBQWEsR0FBRyxPQUFPLENBQUM7YUFDL0MsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDbEMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMzRDtRQUNELGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWFEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLFFBQXlCO1FBQzlDLE1BQU0sUUFBUSxHQUFHLElBQUEsa0JBQWEsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEUsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDbkQsR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFJLElBQUEsbUJBQVcsRUFBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUU7Z0JBQ2hDLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7UUFDRCxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBWUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFZRCxJQUFXLGNBQWM7UUFDckIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFpQ0QsSUFBSSxJQUFJO1FBQ0osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV0QixJQUNJLENBQUMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQ2pCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUNuQztZQUNFLElBQUksR0FBRyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQTBCRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxPQUFPO1FBQ1AsT0FBTyxjQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLE9BQU87UUFDUCxPQUFPLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFnR0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxJQUFJO1FBQ0osT0FBTyxhQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBYUQsSUFBSSxLQUFLO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBYUQsSUFBSSxHQUFHO1FBQ0gsSUFBSSxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQWFELElBQUksT0FBTztRQUNQLElBQUksSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNoQixJQUFJLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFZRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUk7UUFDdkIsTUFBTSxHQUFHLEdBQWlCO1lBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEIsQ0FBQztRQUNGLElBQUksV0FBVztZQUFFLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9DLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU07UUFDRix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE9BQU87U0FDVjtRQUNELHFCQUFxQjtRQUNyQixNQUFNLEtBQUssR0FBRyxZQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBRXhDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FDekQsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQzFELENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUMxRCxDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FDMUQsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQWNELEtBQUssQ0FBQyxRQUFtQjtRQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQUksQ0FBQyxTQUFTLENBQzFCLElBQUksQ0FBQyxJQUFJLEVBQ1Q7WUFDSSxRQUFRLEVBQUUsR0FBRztTQUNoQixFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDTixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUcsSUFBSSxDQUFDLENBQUM7WUFDWCxJQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQ0osQ0FBQztRQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWiw4QkFBOEI7WUFDeEIsSUFBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxPQUFPO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLDhCQUE4QjtRQUN4QixJQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsU0FBUyxDQUFDLEVBQUc7UUFDVCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILGFBQWEsQ0FBQyxFQUFHO1FBQ2Isd0JBQXdCO1FBQ3hCLGFBQWE7UUFDYiw2Q0FBNkM7UUFDN0MsNkRBQTZEO1FBQzdELGlCQUFpQjtRQUNqQix5Q0FBeUM7UUFDekMscURBQXFEO1FBQ3JELGtDQUFrQztRQUNsQyw4Q0FBOEM7UUFDOUMsU0FBUztRQUNULDhCQUE4QjtRQUM5QixnQkFBZ0I7UUFDaEIsNENBQTRDO1FBQzVDLHlCQUF5QjtRQUN6QixVQUFVO1FBQ1YsSUFBSTtRQUNKLDZDQUE2QztRQUM3Qyx1REFBdUQ7UUFDdkQsc0NBQXNDO1FBQ3RDLHVCQUF1QjtRQUN2Qix5SEFBeUg7UUFDekgsU0FBUztRQUNULElBQUk7UUFDSix5Q0FBeUM7UUFDekMsOENBQThDO1FBQzlDLG1CQUFtQjtRQUNuQiw2Q0FBNkM7UUFDN0MsNkNBQTZDO1FBQzdDLGdCQUFnQjtRQUNoQixnREFBZ0Q7UUFDaEQsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixLQUFLO1FBQ0wsOEJBQThCO1FBQzlCLDBCQUEwQjtJQUM5QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsSUFBSTtRQUNBLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFFBQVE7UUFDSixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3RDLHVCQUF1QjtRQUN2QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0QsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyRDtTQUNKO1FBRUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSTtnQkFDQSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sR0FBRyxHQUFHLENBQUM7YUFDaEI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixJQUNJLE9BQU8sTUFBTSxLQUFLLFFBQVE7b0JBQzFCLE1BQU0sQ0FBQyxRQUFRO29CQUNmLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQ3ZDO29CQUNFLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQzlCO2FBQ0o7U0FDSjtRQUVELFlBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0Qyw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsa0JBQWtCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU07UUFDRixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLFlBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM3QixJQUFJLEtBQUs7b0JBQUUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFVBQVU7UUFDTixZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsSUFBSSxDQUFDLFdBQXdDLEVBQUU7UUFDM0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO2dCQUN2QixPQUFPLE1BQU0sQ0FDVCxxQ0FBcUMsSUFBSSxDQUFDLElBQUksNERBQTRELENBQzdHLENBQUM7YUFDTDtZQUNELE1BQU0sR0FBRyxtQ0FDRixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FDMUIsUUFBUSxDQUNkLENBQUM7WUFDRixZQUFJLENBQUMsUUFBUSxDQUNULElBQUksQ0FBQyxJQUFJLEVBQ1Q7Z0JBQ0ksYUFBYTtnQkFDYixRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTthQUNqQixFQUNELENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNaLElBQUksS0FBSztvQkFBRSxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO29CQUN2QyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQy9DO2dCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQ0osQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsUUFBUSxDQUFDLFdBQXdDLEVBQUU7UUFDL0MsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUNYLHFDQUFxQyxJQUFJLENBQUMsSUFBSSw0REFBNEQsQ0FDN0csQ0FBQztTQUNMO1FBQ0QsTUFBTSxHQUFHLG1DQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUMxQixRQUFRLENBQ2QsQ0FBQztRQUNGLElBQUksT0FBWSxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtZQUN2QyxPQUFPLEdBQUcsSUFBQSxzQkFBYyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxPQUFPLE9BQU8sQ0FBQztTQUNsQjthQUFNO1lBQ0gsT0FBTyxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDbkMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO2dCQUN0QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7YUFDakIsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDVixJQUFJO2dCQUNBLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUN6QztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzdCO1NBQ0o7UUFDRCxPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEtBQUssQ0FDRCxJQUFZLEVBQ1osV0FBeUMsRUFBRTtRQUUzQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUN6QyxJQUFJO2dCQUNBLE1BQUEsSUFBQSxrQkFBVSxFQUFDLElBQUksRUFBRTtvQkFDYixRQUFRLEVBQUUsSUFBSTtvQkFDZCxTQUFTLEVBQUUsS0FBSztpQkFDbkIsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFFYixNQUFNLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxTQUFTLENBQUMsSUFBWSxFQUFFLFdBQXlDLEVBQUU7O1FBQy9ELElBQUk7WUFDQSxNQUFBLElBQUEsa0JBQVUsRUFBQyxJQUFJLEVBQUU7Z0JBQ2IsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsU0FBUyxFQUFFLEtBQUs7YUFDbkIsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDYixJQUFBLHVCQUFlLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7O0FBaDBCRDs7Ozs7Ozs7O0dBU0c7QUFDSSx3QkFBa0IsR0FBMkIsRUFBRSxDQUFDO0FBeXpCM0QsaUNBQWlDO0FBQ2pDLGtCQUFlLEtBQUssQ0FBQyJ9