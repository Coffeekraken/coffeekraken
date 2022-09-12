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
const fs_1 = require("@coffeekraken/sugar/fs");
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const string_1 = require("@coffeekraken/sugar/string");
const fs_2 = __importDefault(require("fs"));
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
        this.exists = fs_2.default.existsSync(filepath);
        // save the file path
        this.cwd = this.settings.cwd;
        this._name = (0, fs_1.__fileName)(filepath);
        this.extension = (0, fs_1.__extension)(this.path).toLowerCase();
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
                if (fs_2.default.existsSync(potentialPath)) {
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
        const fileName = (0, fs_1.__fileName)(path);
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
        this._raw = fs_2.default.readFileSync(this.path, 'utf8');
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
        this.exists = fs_2.default.existsSync(this.path);
        if (!this.exists) {
            this._stats = null;
            return;
        }
        // get the file stats
        const stats = fs_2.default.statSync(this.path);
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
        this._watcher = fs_2.default.watchFile(this.path, {
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
        fs_2.default.writeFileSync(this.path, toSave);
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
            fs_2.default.unlink(this.path, (error) => {
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
        fs_2.default.unlinkSync(this.path);
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
            fs_2.default.readFile(this.path, {
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
            content = (0, fs_1.__readJsonSync)(this.path);
            return content;
        }
        else {
            content = fs_2.default.readFileSync(this.path, {
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
                (_a = (0, string_1.__toString)(data, {
                    beautify: true,
                    highlight: false,
                })) !== null && _a !== void 0 ? _a : '';
            yield (0, fs_1.__writeFile)(this.path, data, settings);
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
            (_a = (0, string_1.__toString)(data, {
                beautify: true,
                highlight: false,
            })) !== null && _a !== void 0 ? _a : '';
        (0, fs_1.__writeFileSync)(this.path, data, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQTZEO0FBQzdELG9GQUFnRjtBQUNoRiwrQ0FNZ0M7QUFDaEMsK0VBQXlEO0FBQ3pELDRGQUFzRTtBQUN0RSx1REFBd0Q7QUFDeEQsNENBQXNCO0FBQ3RCLDBEQUFvQztBQUNwQyxnREFBMEI7QUEwSjFCLGFBQWE7QUFDYixNQUFNLEtBQU0sU0FBUSx5QkFBZTtJQXVOL0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFnQixFQUFFLFFBQXlCO1FBQ25ELEtBQUssQ0FDRCxJQUFBLG1CQUFXLEVBQ1A7WUFDSSxjQUFjLEVBQUUsSUFBSTtZQUNwQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsQixhQUFhLEVBQUUsQ0FBQztZQUNoQixLQUFLLEVBQUUsS0FBSztZQUNaLGFBQWEsRUFBRTtnQkFDWCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLFNBQVM7YUFDbEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxJQUFJO2FBQ2I7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLEVBQUU7YUFDWDtTQUNKLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBck5OOzs7Ozs7OztXQVFHO1FBQ0gsaUJBQVksR0FBMEIsRUFBRSxDQUFDO1FBd1F6Qzs7Ozs7Ozs7O1dBU0c7UUFDSCxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBa0RqQjs7Ozs7Ozs7V0FRRztRQUNILGFBQVEsR0FBbUIsRUFBRSxDQUFDO1FBL0gxQixJQUFJ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