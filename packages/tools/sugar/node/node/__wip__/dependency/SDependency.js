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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RlcGVuZGVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9fX3dpcF9fL2RlcGVuZGVuY3kvU0RlcGVuZGVuY3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNuRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNsRCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQixNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDaEQsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxXQUFXO0lBNkNoQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQXJENUM7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRVg7Ozs7Ozs7O1dBUUc7UUFDSCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUVwQjs7Ozs7Ozs7V0FRRztRQUNILGFBQVEsR0FBRyxJQUFJLENBQUM7UUFZZCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsK0NBQStDO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUks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