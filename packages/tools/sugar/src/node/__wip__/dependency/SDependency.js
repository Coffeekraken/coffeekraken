"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __isPath = require('../is/path');
const __semver = require('semver');
const __os = require('os');
const __childProcess = require('child_process');
const __awaitSpawn = require('await-spawn');
/**
 * @name                    SDependency
 * @namespace           sugar.node.dependency
 * @type                    Class
 * @status              wip
 *
 * This class is the base one for dependencys like PHP, Node, etc... It allows you to check if you have already the dependency installed,
 * if you can update it, etc...
 *
 * @param           {String}          name            The dependency name like "php", "node", etc...
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * const SDependency = require('@coffeekraken/sugar/node/dependency/SDependency');
 * class MyDependency extends SDependency {
 *    constructor() {
 *      super('myDependency');
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SDependency {
    /**
     * @name              constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(name, depFilepath, settings = {}) {
        /**
         * @name              _settings
         * @type              Object
         * @private
         *
         * Store the process settings
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        /**
         * @name              _name
         * @type              String
         * @private
         *
         * Store the dependency name
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._name = {};
        /**
         * @name              _depFilepath
         * @type              String
         * @private
         *
         * Store the dependency file path
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._depFilepath = null;
        /**
         * @name              _depJson
         * @type              Object
         * @private
         *
         * Store the dependency object description
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._depJson = null;
        // save the name
        this._name = name;
        // check that the dep file path is a valid file
        if (!__isPath(depFilepath, true)) {
            throw new Error(`Sorry but the passed dependency file path "${depFilepath}" does not exist...`);
        }
        // save the dependency filepath
        this._depFilepath = depFilepath;
        // save the settings
        this._settings = __deepMerge({}, settings);
        // load the dep file
        this._loadDepFile();
    }
    /**
     * @name                      _loadDepFile
     * @type                      Function
     * @private
     *
     * Load the dep file path content
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _loadDepFile() {
        const depJson = require(this._depFilepath);
        if (!depJson[__os.platform]) {
            throw new Error(`Sorry but this ${this._name} dependency is not supported for your "${__os.platform}" platform... Here's the platforms supported:\n- ${Object.keys(depJson).join('\n- ')}`);
        }
        this._depJson = depJson[__os.platform];
    }
    /**
     * @name                      install
     * @type                      Function
     *
     * This method process to the installation of the dependency
     *
     * @param       {String}        [version=null]        The version you want to install
     * @return      {SPromise}                            A promise that will be resolved once the dependency has been installed
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    install(version = null) {
        return new __SPromise(({ resolve, reject, emit }) => {
            // get the available versions to install
            const versionsArray = Object.keys(this._depJson);
            // set the version to install
            let versionToInstall = null;
            // if a version is passed, check if it is supported by the dependency json
            if (version) {
                if (versionsArray.indexOf(version) === -1) {
                    throw new Error(`Sorry but you have asked to install the ${this._name} version "${version}" but this version is not available. Here's the available versions that you can install:\n- ${versionsArray.join('\n- ')}`);
                }
                versionToInstall = version;
            }
            else {
                versionToInstall = versionsArray[versionsArray.length - 1];
            }
            // get the install script for this version
            const installCommands = [...this._depJson[versionToInstall].install];
            // execute the commands for the installation
            this._execCommands(installCommands);
        });
    }
    /**
     * @name                  _execCommands
     * @type                  Function
     * @private
     *
     * This method take care of executing one or more commands and send back an SPromise on which you can subscribe for:
     * - data: emited when a log happens in the child process
     * - then: emited when one command is finished and another starts
     * - finally: emited when all the commands have finished successfully
     * - error: emited when something goes wrong inside a command
     *
     * @param       {Array|String}          commands            The commands you want to execute
     * @return      {SPromise}                                  An SPromise instance that will be resolved when all the commands have finished successfully
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _execCommands(commands) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            commands = [...commands];
            for (let i = 0; i < commands.length; i++) {
                const child = __awaitSpawn(commands[i], {
                    shell: true
                });
                child.catch((e) => {
                    emit('error', e);
                });
                child.child.stdout.on('data', (value) => {
                    emit('data', value);
                });
                child.child.stderr.on('data', (error) => {
                    emit('error', error);
                });
                yield child;
            }
        }), {
            stacks: 'data,error'
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RlcGVuZGVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGVwZW5kZW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNCLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNoRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLFdBQVc7SUE2Q2hDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBckQ1Qzs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFFZjs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWDs7Ozs7Ozs7V0FRRztRQUNILGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXBCOzs7Ozs7OztXQVFHO1FBQ0gsYUFBUSxHQUFHLElBQUksQ0FBQztRQVlkLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQiwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FDYiw4Q0FB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