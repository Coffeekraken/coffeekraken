"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFileCtorSettingsInterface = exports.SFileSettingsInterface = exports.SFileWatchSettingsInterface = exports.SFileWriteSettingsInterface = exports.SFileReadSettingsInterface = void 0;
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
const ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
const SInterface_1 = __importDefault(require("../interface/SInterface"));
const tmpDir_1 = __importDefault(require("../path/tmpDir"));
const localDir_1 = __importDefault(require("../path/localDir"));
const rootDir_1 = __importDefault(require("../path/rootDir"));
const srcDir_1 = __importDefault(require("../path/srcDir"));
const distDir_1 = __importDefault(require("../path/distDir"));
const cacheDir_1 = __importDefault(require("../path/cacheDir"));
/**
 * @name          SFileReadSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @status              beta
 *
 * Watch settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFileReadSettingsInterface extends SInterface_1.default {
}
exports.SFileReadSettingsInterface = SFileReadSettingsInterface;
SFileReadSettingsInterface.definition = {
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
/**
 * @name          SFileWriteSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @status              beta
 *
 * Watch settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFileWriteSettingsInterface extends SInterface_1.default {
}
exports.SFileWriteSettingsInterface = SFileWriteSettingsInterface;
SFileWriteSettingsInterface.definition = {
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
/**
 * @name          SFileWatchSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @status              beta
 *
 * Watch settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFileWatchSettingsInterface extends SInterface_1.default {
}
exports.SFileWatchSettingsInterface = SFileWatchSettingsInterface;
SFileWatchSettingsInterface.definition = {
    pollingInterval: {
        type: 'Number',
        required: true,
        default: 500
    }
};
/**
 * @name          SFileSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @status              beta
 *
 * Settings infertage
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFileSettingsInterface extends SInterface_1.default {
}
exports.SFileSettingsInterface = SFileSettingsInterface;
SFileSettingsInterface.definition = {
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
class SFileCtorSettingsInterface extends SInterface_1.default {
}
exports.SFileCtorSettingsInterface = SFileCtorSettingsInterface;
SFileCtorSettingsInterface.definition = {
    file: {
        interface: SFileSettingsInterface,
        type: 'Object',
        required: true
    }
};
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
    constructor(filepath, settings) {
        super(deepMerge_1.default({
            file: {}
        }, settings || {}));
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
        this._path = filepath;
        this._name = filename_1.default(filepath);
        this.extension = extension_1.default(this.path).toLowerCase();
        // check if need to check for the file existence or not...
        if (this.fileSettings.checkExistence && !this.exists) {
            throw new Error(`The passed filepath "<cyan>${this.path}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`);
        }
        if (this.fileSettings.watch !== false) {
            this.startWatch();
        }
    }
    get name() {
        return this._name;
    }
    get path() {
        let path = this._path;
        path = path.replace('%tmpDir', tmpDir_1.default());
        path = path.replace('%localDir', localDir_1.default());
        path = path.replace('%cacheDir', cacheDir_1.default());
        path = path.replace('%rootDir', rootDir_1.default());
        path = path.replace('%srcDir', srcDir_1.default());
        path = path.replace('%distDir', distDir_1.default());
        path = path.replace(/\/\//gm, '/');
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
        if (this.fileSettings.shrinkSizesTo) {
            this._stats.bytes = Number(this._stats.bytes.toFixed(this.fileSettings.shrinkSizesTo));
            this._stats.kbytes = Number(this._stats.kbytes.toFixed(this.fileSettings.shrinkSizesTo));
            this._stats.mbytes = Number(this._stats.mbytes.toFixed(this.fileSettings.shrinkSizesTo));
            this._stats.gbytes = Number(this._stats.gbytes.toFixed(this.fileSettings.shrinkSizesTo));
        }
    }
    _startWatch() { }
    startWatch() {
        if (this._watcher)
            return;
        this._watcher = fs_1.default.watchFile(this.path, {
            interval: 1000
        }, (event) => {
            this.update();
            this.emit('update', this);
        });
        if (this._startWatch && typeof this._startWatch === 'function') {
            this._startWatch();
        }
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
        const content = fs_1.default.readFileSync(this.path, {
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
SFile.interfaces = {
    settings: {
        apply: true,
        on: '_settings',
        class: SFileCtorSettingsInterface
    }
};
// const Cls: ISFileCtor = SFile;
exports.default = SFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRUFBNEM7QUFDNUMsb0VBQThDO0FBQzlDLDJFQUFxRDtBQUNyRCw2REFBNkQ7QUFDN0QsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQix1REFBaUM7QUFDakMsNERBQXNDO0FBQ3RDLDhEQUF3QztBQUN4QywwREFBdUM7QUFHdkMsb0VBQThDO0FBQzlDLHlFQUFtRDtBQUNuRCw0REFBc0M7QUFDdEMsZ0VBQTBDO0FBQzFDLDhEQUF3QztBQUN4Qyw0REFBc0M7QUFDdEMsOERBQXdDO0FBQ3hDLGdFQUEwQztBQUUxQzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSwwQkFBMkIsU0FBUSxvQkFBWTs7QUFBNUQsZ0VBNkJDO0FBNUJRLHFDQUFVLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUU7WUFDTixNQUFNO1lBQ04sT0FBTztZQUNQLE9BQU87WUFDUCxTQUFTO1lBQ1QsTUFBTTtZQUNOLE9BQU87WUFDUCxRQUFRO1lBQ1IsUUFBUTtZQUNSLFFBQVE7WUFDUixLQUFLO1NBQ047UUFDRCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxNQUFNO0tBQ2hCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsS0FBSztLQUNoQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsSUFBSTtLQUNkO0NBQ0YsQ0FBQztBQUdKOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDJCQUE0QixTQUFRLG9CQUFZOztBQUE3RCxrRUFzQ0M7QUFyQ1Esc0NBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRTtZQUNOLE1B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