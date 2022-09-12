var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import __SFileInterface from './interface/SFileInterface';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import { __extension, __fileName, __readJsonSync, __writeFile, __writeFileSync, } from '@coffeekraken/sugar/fs';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { __toString } from '@coffeekraken/sugar/string';
import __fs from 'fs';
import __minimatch from 'minimatch';
import __path from 'path';
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(filepath, settings) {
        super(__deepMerge({
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
        this.exists = __fs.existsSync(filepath);
        // save the file path
        this.cwd = this.settings.cwd;
        this._name = __fileName(filepath);
        this.extension = __extension(this.path).toLowerCase();
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
                if (__fs.existsSync(potentialPath)) {
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
        const fileName = __fileName(path);
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
        let path = this._path;
        if (!__path.isAbsolute(path) &&
            this.settings.cwd &&
            !path.includes(this.settings.cwd)) {
            path = __path.resolve(this.settings.cwd, path);
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get dirPath() {
        return __path.dirname(this.path);
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
        return __md5.encrypt(this.content);
    }
    get stats() {
        if (!this._stats)
            this.update();
        return this._stats;
    }
    get raw() {
        if (this._raw)
            return this._raw;
        this._raw = __fs.readFileSync(this.path, 'utf8');
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
        this._watcher = __fs.watchFile(this.path, {
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(settings = {}) {
        return new Promise((resolve, reject) => {
            if (this.exists === false) {
                return reject(`You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`);
            }
            const set = Object.assign(Object.assign({}, this.settings.readSettings), settings);
            __fs.readFile(this.path, {
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
            content = __readJsonSync(this.path);
            return content;
        }
        else {
            content = __fs.readFileSync(this.path, {
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
                (_a = __toString(data, {
                    beautify: true,
                    highlight: false,
                })) !== null && _a !== void 0 ? _a : '';
            yield __writeFile(this.path, data, settings);
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
            (_a = __toString(data, {
                beautify: true,
                highlight: false,
            })) !== null && _a !== void 0 ? _a : '';
        __writeFileSync(this.path, data, settings);
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
export default SFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDZEQUE2RDtBQUM3RCxPQUFPLGVBQW1DLE1BQU0sK0JBQStCLENBQUM7QUFDaEYsT0FBTyxFQUNILFdBQVcsRUFDWCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFdBQVcsRUFDWCxlQUFlLEdBQ2xCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxLQUFLLE1BQU0sc0NBQXNDLENBQUM7QUFDekQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBMEoxQixhQUFhO0FBQ2IsTUFBTSxLQUFNLFNBQVEsZUFBZTtJQXVOL0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFnQixFQUFFLFFBQXlCO1FBQ25ELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUUsSUFBSTtZQUNwQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsQixhQUFhLEVBQUUsQ0FBQztZQUNoQixLQUFLLEVBQUUsS0FBSztZQUNaLGFBQWEsRUFBRTtnQkFDWCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLFNBQVM7YUFDbEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxJQUFJO2FBQ2I7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsSUFB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