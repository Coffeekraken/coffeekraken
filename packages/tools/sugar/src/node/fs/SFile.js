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
        // console.log('ss', settings);
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
            console.log(this._settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRUFBNEM7QUFDNUMsb0VBQThDO0FBQzlDLDJFQUFxRDtBQUNyRCw2REFBNkQ7QUFDN0QsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQix1REFBaUM7QUFDakMsNERBQXNDO0FBQ3RDLDhEQUF3QztBQUN4QywwREFBdUM7QUFHdkMsb0VBQThDO0FBQzlDLHlFQUFtRDtBQUNuRCw0REFBc0M7QUFDdEMsZ0VBQTBDO0FBQzFDLDhEQUF3QztBQUN4Qyw0REFBc0M7QUFDdEMsOERBQXdDO0FBQ3hDLGdFQUEwQztBQUUxQzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSwwQkFBMkIsU0FBUSxvQkFBWTs7QUFBNUQsZ0VBNkJDO0FBNUJRLHFDQUFVLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUU7WUFDTixNQUFNO1lBQ04sT0FBTztZQUNQLE9BQU87WUFDUCxTQUFTO1lBQ1QsTUFBTTtZQUNOLE9BQU87WUFDUCxRQUFRO1lBQ1IsUUFBUTtZQUNSLFFBQVE7WUFDUixLQUFLO1NBQ047UUFDRCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxNQUFNO0tBQ2hCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsS0FBSztLQUNoQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsSUFBSTtLQUNkO0NBQ0YsQ0FBQztBQUdKOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDJCQUE0QixTQUFRLG9CQUFZOztBQUE3RCxrRUFzQ0M7QUFyQ1Esc0NBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRTtZQUNOLE1BQU07WUFDTixPQUFPO1lBQ1AsT0FBTztZQUNQLFNBQVM7WUFDVCxNQUFNO1lBQ04sT0FBTztZQUNQLFFBQVE7WUFDUixRQUFRO1lBQ1IsUUFBUTtZQUNSLEtBQUs7U0FDTjtRQUNELFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLE1BQU07S0FDaEI7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFHSjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSwyQkFBNEIsU0FBUSxvQkFBWTs7QUFBN0Qsa0VBUUM7QUFQUSxzQ0FBVSxHQUFHO0lBQ2xCLGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsR0FBRztLQUNiO0NBQ0YsQ0FBQztBQUdKOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLHNCQUF1QixTQUFRLG9CQUFZOztBQUF4RCx3REFxQ0M7QUFwQ1EsaUNBQVUsR0FBRztJQUNsQixjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtLQUN2QjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFLDJCQUEyQjtRQUN0QyxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxhQUFhLEVBQUU7UUFDYixTQUFTLEVBQUUsMkJBQTJCLENBQUMsUUFBUSxDQUFDO1lBQzlDLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsS0FBSzthQUNoQjtTQUNGLENBQUM7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxZQUFZLEVBQUU7UUFDWixTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFHSixNQUFhLDBCQUEyQixTQUFRLG9CQUFZOztBQUE1RCxnRUFRQztBQVBRLHFDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osU0FBUyxFQUFFLHNCQUFzQjtRQUNqQyxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBNExKLE1BQU0sS0FBTSxTQUFRLHVCQUFlO0lBMklqQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQWdCLEVBQUUsUUFBNkI7UUFDekQsK0JBQStCO1FBQy9CLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsSUFBSSxFQUFFLEVBQUU7U0FDVCxFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBNkNKOzs7Ozs7Ozs7V0FTRztRQUNILFdBQU0sR0FBUSxFQUFFLENBQUM7UUFyRGYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ3BDLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7UUFFSCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhDLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXRELDBEQUEwRDtRQUMxRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QixNQUFNLElBQUksS0FBSyxDQUNiLDhCQUE4QixJQUFJLENBQUMsSUFBSSxrSEFBa0gsQ0FDMUosQ0FBQztTQUNIO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQXhLRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQW1CRCxJQUFJLElBQUk7UUFDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxnQkFBUSxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsa0JBQVUsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGtCQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxpQkFBUyxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsZ0JBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGlCQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVuQyxJQUNFLENBQUMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHO1lBQ3JCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNyQztZQUNBLElBQUksR0FBRyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBMEJEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLE9BQU87UUFDVCxPQUFPLGNBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksT0FBTztRQUNULE9BQU8sY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQWFEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksWUFBWTtRQUNkLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQW9ERDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLElBQUk7UUFDTixPQUFPLGFBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFhRCxJQUFJLEtBQUs7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFhRCxJQUFJLE9BQU87UUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVE7UUFDTixPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtTQUN6QixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU07UUFDSix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixPQUFPO1NBQ1I7UUFDRCxxQkFBcUI7UUFDckIsTUFBTSxLQUFLLEdBQUcsWUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUV4QyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQzNELENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUM1RCxDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FDNUQsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQzVELENBQUM7U0FDSDtJQUNILENBQUM7SUFZRCxXQUFXLEtBQUksQ0FBQztJQUNoQixVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFJLENBQUMsU0FBUyxDQUM1QixJQUFJLENBQUMsSUFBSSxFQUNUO1lBQ0UsUUFBUSxFQUFFLElBQUk7U0FDZixFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDUixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQ0YsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO1lBQzlELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFNBQVM7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxJQUFJLENBQUMsV0FBdUMsRUFBRTtRQUM1QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7Z0JBQ3pCLE9BQU8sTUFBTSxDQUNYLHFDQUFxQyxJQUFJLENBQUMsSUFBSSw0REFBNEQsQ0FDM0csQ0FBQzthQUNIO1lBQ0QsTUFBTSxHQUFHLG1DQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUM5QixRQUFRLENBQ1osQ0FBQztZQUNGLFlBQUksQ0FBQyxRQUFRLENBQ1gsSUFBSSxDQUFDLElBQUksRUFDVDtnQkFDRSxhQUFhO2dCQUNiLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtnQkFDdEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2FBQ2YsRUFDRCxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDZCxJQUFJLEtBQUs7b0JBQUUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDekMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUM3QztnQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFFBQVEsQ0FBQyxXQUF1QyxFQUFFO1FBQ2hELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7WUFDekIsTUFBTSxxQ0FBcUMsSUFBSSxDQUFDLElBQUksNERBQTRELENBQUM7U0FDbEg7UUFDRCxNQUFNLEdBQUcsbUNBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQzlCLFFBQVEsQ0FDWixDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQVEsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2hELFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7U0FDZixDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxLQUFLLENBQ0gsSUFBWSxFQUNaLFdBQXdDLEVBQUU7UUFFMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxNQUFNLEdBQUcsaURBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEtBQ2xDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxLQUNaLFFBQVEsQ0FDWixDQUFDO1lBQ0YsSUFBSSxHQUFHLGtCQUFVLENBQUMsSUFBSSxFQUFFO2dCQUN0QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxTQUFTLEVBQUUsS0FBSzthQUNqQixDQUFDLENBQUM7WUFDSCx1QkFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixZQUFJLENBQUMsU0FBUyxDQUNaLEdBQUcsQ0FBQyxJQUFJLEVBQ1IsSUFBSSxFQUNKO2dCQUNFLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTthQUN2QixFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxLQUFLO29CQUFFLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsU0FBUyxDQUFDLElBQVksRUFBRSxXQUF3QyxFQUFFO1FBQ2hFLE1BQU0sR0FBRyxpREFDSixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsS0FDbEMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQ1osUUFBUSxDQUNaLENBQUM7UUFDRixJQUFJLEdBQUcsa0JBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFDSCx1QkFBZSxDQUFDLG9CQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxNQUFNLEdBQVEsWUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtZQUNyRCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7QUExZk0sZ0JBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixLQUFLLEVBQUUsSUFBSTtRQUNYLEVBQUUsRUFBRSxXQUFXO1FBQ2YsS0FBSyxFQUFFLDBCQUEwQjtLQUNsQztDQUNGLENBQUM7QUF1ZkosaUNBQWlDO0FBQ2pDLGtCQUFlLEtBQUssQ0FBQyJ9