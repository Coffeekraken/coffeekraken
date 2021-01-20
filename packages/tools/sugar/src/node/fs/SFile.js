"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SEventEmitter_1 = __importDefault(require("../event/SEventEmitter"));
// import __SFileInterface from './interface/SFileInterface';
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const md5_1 = __importDefault(require("../crypt/md5"));
const extension_1 = __importDefault(require("./extension"));
const folderPath_1 = __importDefault(require("./folderPath"));
const filename_1 = __importDefault(require("./filename"));
const SError_1 = __importDefault(require("../error/SError"));
const ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
class SFile extends SEventEmitter_1.default {
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
        this.treatAsValue = true;
        this._settings = deepMerge_1.default({
            id: 'SFile',
            checkExistence: true,
            cwd: process.cwd(),
            shrinkSizesTo: 4,
            watch: true
        }, this._settings);
        Object.defineProperty(this, '_stats', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: null
        });
        if (this._settings.cwd && !filepath.includes(this._settings.cwd)) {
            filepath = path_1.default.resolve(this._settings.cwd, filepath);
        }
        // check if the file exists
        this.exists = fs_1.default.existsSync(filepath);
        // check if need to check for the file existence or not...
        if (this._settings.checkExistence && !this.exists) {
            throw new SError_1.default(`The passed filepath "<cyan>${filepath}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`);
        }
        if (this._settings.cwd) {
            this.cwd = this._settings.cwd;
            this.relPath = path_1.default.relative(this.cwd, filepath);
        }
        // save the file path
        this.path = filepath;
        this.name = filename_1.default(filepath);
        this.extension = extension_1.default(filepath).toLowerCase();
        this.dirPath = path_1.default.dirname(filepath);
        if (this._settings.watch === true) {
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
        return md5_1.default.encrypt(this.content);
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
    get stats() {
        if (!this._stats)
            this.update();
        return this._stats;
    }
    get content() {
        if (this._content)
            return this._content;
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
        if (this._settings.shrinkSizesTo) {
            this._stats.bytes = Number(this._stats.bytes.toFixed(this._settings.shrinkSizesTo));
            this._stats.kbytes = Number(this._stats.kbytes.toFixed(this._settings.shrinkSizesTo));
            this._stats.mbytes = Number(this._stats.mbytes.toFixed(this._settings.shrinkSizesTo));
            this._stats.gbytes = Number(this._stats.gbytes.toFixed(this._settings.shrinkSizesTo));
        }
    }
    startWatch() {
        if (this._watcher)
            return;
        this._watcher = fs_1.default.watchFile(this.path, (event) => {
            this.update();
            this.emit('update', this);
        });
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
        if (!this._watcher)
            return;
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
    read(settings = {}) {
        if (this.exists === false) {
            throw `You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`;
        }
        settings = Object.assign({ encoding: 'utf8', cast: true }, settings);
        const content = fs_1.default.readFile(this.path, settings);
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
    readSync(settings = {}) {
        if (this.exists === false) {
            throw `You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`;
        }
        settings = Object.assign({ encoding: 'utf8', cast: true }, settings);
        const content = fs_1.default.readFileSync(this.path, settings);
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
    write(data, settings = {}) {
        settings = Object.assign({ path: this.path, encoding: 'utf8' }, settings);
        data = toString_1.default(data, {
            beautify: true,
            highlight: false
        });
        ensureDirSync_1.default(settings.path);
        const result = fs_1.default.writeFile(settings.path, data, settings);
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
    writeSync(data, settings = {}) {
        settings = Object.assign({ path: this.path, encoding: 'utf8' }, settings);
        data = toString_1.default(data, {
            beautify: true,
            highlight: false
        });
        ensureDirSync_1.default(folderPath_1.default(settings.path));
        const result = fs_1.default.writeFileSync(settings.path, data, settings);
        this.update();
        return result;
    }
}
const Cls = SFile;
exports.default = SFile;
//# sourceMappingURL=SFile.js.map