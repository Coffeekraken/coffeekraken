"use strict";

var _temp;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __deepMerge = require('../object/deepMerge');

var __SPromise = require('../promise/SPromise');

var __isPath = require('../is/path');

var __semver = require('semver');

var __os = require('os');

var __childProcess = require('child_process');

var __awaitSpawn = require('await-spawn');
/**
 * @name                    SDependency
 * @namespace           node.dependency
 * @type                    Class
 *
 * This class is the base one for dependencys like PHP, Node, etc... It allows you to check if you have already the dependency installed,
 * if you can update it, etc...
 *
 * @param           {String}          name            The dependency name like "php", "node", etc...
 * @param           {Object}          [settings={}]   An object of settings described bellow:
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


module.exports = (_temp = /*#__PURE__*/function () {
  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store the process settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              _name
   * @type              String
   * @private
   *
   * Store the dependency name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              _depFilepath
   * @type              String
   * @private
   *
   * Store the dependency file path
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              _depJson
   * @type              Object
   * @private
   *
   * Store the dependency object description
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SDependency(name, depFilepath, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SDependency);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_name", {});

    _defineProperty(this, "_depFilepath", null);

    _defineProperty(this, "_depJson", null);

    // save the name
    this._name = name; // check that the dep file path is a valid file

    if (!__isPath(depFilepath, true)) {
      throw new Error("Sorry but the passed dependency file path \"".concat(depFilepath, "\" does not exist..."));
    } // save the dependency filepath


    this._depFilepath = depFilepath; // save the settings

    this._settings = __deepMerge({}, settings); // load the dep file

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


  _createClass(SDependency, [{
    key: "_loadDepFile",
    value: function _loadDepFile() {
      var depJson = require(this._depFilepath);

      if (!depJson[__os.platform]) {
        throw new Error("Sorry but this ".concat(this._name, " dependency is not supported for your \"").concat(__os.platform, "\" platform... Here's the platforms supported:\n- ").concat(Object.keys(depJson).join('\n- ')));
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

  }, {
    key: "install",
    value: function install(version) {
      if (version === void 0) {
        version = null;
      }

      return new __SPromise((resolve, reject, trigger, cancel) => {
        // get the available versions to install
        var versionsArray = Object.keys(this._depJson); // set the version to install

        var versionToInstall = null; // if a version is passed, check if it is supported by the dependency json

        if (version) {
          if (versionsArray.indexOf(version) === -1) {
            throw new Error("Sorry but you have asked to install the ".concat(this._name, " version \"").concat(version, "\" but this version is not available. Here's the available versions that you can install:\n- ").concat(versionsArray.join('\n- ')));
          }

          versionToInstall = version;
        } else {
          versionToInstall = versionsArray[versionsArray.length - 1];
        } // get the install script for this version


        var installCommands = [...this._depJson[versionToInstall].install]; // execute the commands for the installation

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

  }, {
    key: "_execCommands",
    value: function _execCommands(commands) {
      return new __SPromise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve, reject, trigger, cancel) {
          commands = [...commands];

          for (var i = 0; i < commands.length; i++) {
            var child = __awaitSpawn(commands[i], {
              shell: true
            });

            child.catch(e => {
              trigger('error', e);
            });
            child.child.stdout.on('data', value => {
              trigger('data', value);
            });
            child.child.stderr.on('data', error => {
              trigger('error', error);
            });
            yield child;
          }
        });

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }(), {
        stacks: 'data,error'
      }).start();
    }
  }]);

  return SDependency;
}(), _temp);