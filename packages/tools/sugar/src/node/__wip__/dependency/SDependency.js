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
 * @wip
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
        return new __SPromise((resolve, reject, trigger, cancel) => {
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
     * - data: Triggered when a log happens in the child process
     * - then: Triggered when one command is finished and another starts
     * - finally: Triggered when all the commands have finished successfully
     * - error: Triggered when something goes wrong inside a command
     *
     * @param       {Array|String}          commands            The commands you want to execute
     * @return      {SPromise}                                  An SPromise instance that will be resolved when all the commands have finished successfully
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _execCommands(commands) {
        return new __SPromise((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
            commands = [...commands];
            for (let i = 0; i < commands.length; i++) {
                const child = __awaitSpawn(commands[i], {
                    shell: true
                });
                child.catch((e) => {
                    trigger('error', e);
                });
                child.child.stdout.on('data', (value) => {
                    trigger('data', value);
                });
                child.child.stderr.on('data', (error) => {
                    trigger('error', error);
                });
                yield child;
            }
        }), {
            stacks: 'data,error'
        });
    }
};
