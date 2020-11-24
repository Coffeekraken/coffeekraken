"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SDeamon_1 = __importDefault(require("../SDeamon"));
const SFsDeamonProcess_1 = __importDefault(require("./SFsDeamonProcess"));
module.exports = class SFsDeamon extends SDeamon_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            name: 'Unnamed SFsDeamon',
            id: 'SFsDeamon',
            updateStacks: ['update', 'add', 'unlink'],
            updateLog: (updateObj) => {
                return `<yellow>Update</yellow> detected on the file "<magenta>${updateObj.relPath}</magenta>"`;
            }
        }, settings));
        /**
         * @name          _watchPromisesStack
         * @type          Array<SPromise>
         * @private
         *
         * Store all the running watch processes
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._watchPromisesStack = [];
        // handle cancel
        this.on('cancel', () => {
            this._watchPromisesStack.forEach((watchProcess) => {
                watchProcess.kill();
            });
            this._watchPromisesStack = []; // just to be sure
        });
    }
    /**
     * @name            watch
     * @type            Function
     * @async
     *
     * This method allows you to start a watch process on some files
     * by passing either a simple path, a glob pattern or an Array of these.
     *
     * @param       {String|Array<String>}        input         The file(s) you want to watch by specifying a path, a glob pattern or an Array of these
     * @param       {Object}                  [settings={}]       An object of settings to override the default one passed in the constructor only for this watch process
     * @return      {SPromise}                                   An SPromise instance on which you can subscribe for events like "update", "add" or "unlink"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch(watch, settings = {}) {
        settings = deepMerge_1.default(this._settings, settings);
        watch = typeof watch === 'string' ? watch : watch.watch;
        const watchProcess = new SFsDeamonProcess_1.default();
        watchProcess.run({
            watch
        });
        watchProcess.on('cancel', () => {
            const idx = this._watchPromisesStack.indexOf(watchProcess);
            if (idx === -1)
                return;
            this._watchPromisesStack.splice(idx, 1);
        });
        // save the watch process in the stack for later
        this._watchPromisesStack.push(watchProcess);
        // return the current promise
        return super.watch(watchProcess);
    }
};
