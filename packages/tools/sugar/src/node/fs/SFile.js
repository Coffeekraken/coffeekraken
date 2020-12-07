"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const toString_1 = __importDefault(require("../string/toString"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
// import __SFileInterface from './interface/SFileInterface';
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const extension_1 = __importDefault(require("./extension"));
const filename_1 = __importDefault(require("./filename"));
const SError_1 = __importDefault(require("../error/SError"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
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
 * - rootDir: The root directory specified through the settings.rootDir property
 * - relPath: The relative file path from the rootDir
 * - dirPath: The path to the folder where is the file
 * - extension: The file extension
 * - size: The file size in megabytes
 * - sizeInBytes: The file siz in bytes
 * - exists: true if the file exists on the disk, false otherwise
 *
 * @param         {String}          filepath        The file path you want to init
 * @param         {Object}          [settings={}]    An object of settings to configure your file instance:
 * - rootDir (__packageRoot()) {String}: Specify a root directory for the file. This is usefull to have then access to properties like ```relPath```, etc...
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
const Cls = class SFile extends SPromise_1.default {
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
        /**
         * @name        size
         * @type        Number
         *
         * Store the file size in megabytes
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.size = -1;
        /**
         * @name        sizeInBytes
         * @type        Number
         *
         * Store the file size in bytes
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.sizeInBytes = -1;
        this._settings = deepMerge_1.default({
            id: 'SFile',
            checkExistence: true,
            rootDir: packageRoot_1.default()
        }, this._settings);
        if (settings.rootDir && !filepath.includes(settings.rootDir)) {
            filepath = path_1.default.resolve(settings.rootDir, filepath);
        }
        // check if the file exists
        this.exists = fs_1.default.existsSync(filepath);
        // check if need to check for the file existence or not...
        if (settings.checkExistence && !this.exists) {
            throw new SError_1.default(`The passed filepath "<cyan>${filepath}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`);
        }
        if (this._settings.rootDir) {
            this.rootDir = this._settings.rootDir;
            this.relPath = path_1.default.relative(this.rootDir, filepath);
        }
        // save the file path
        this.path = filepath;
        this.name = filename_1.default(filepath);
        this.extension = extension_1.default(filepath).toLowerCase();
        this.dirPath = path_1.default.dirname(filepath);
        if (this.exists) {
            this.update();
        }
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
            rootDir: this.rootDir,
            path: this.path,
            relPath: this.relPath,
            name: this.name,
            extension: this.extension,
            dirPath: this.dirPath,
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
        if (!this.exists)
            return;
        // get the file stats
        const stats = fs_1.default.statSync(this.path);
        this.sizeInBytes = stats.size;
        this.size = stats.size / 1000000;
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
        settings = Object.assign({ encoding: 'utf8' }, settings);
        data = toString_1.default(data, {
            beautify: true,
            highlight: false
        });
        const result = fs_1.default.writeFile(this.path, data, settings);
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
        settings = Object.assign({ encoding: 'utf8' }, settings);
        data = toString_1.default(data, {
            beautify: true,
            highlight: false
        });
        const result = fs_1.default.writeFileSync(this.path, data, settings);
        this.update();
        return result;
    }
};
module.exports = Cls;
//# sourceMappingURL=SFile.js.map