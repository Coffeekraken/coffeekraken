"use strict";

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const __SCli = require('../../cli/SCli');

const __SPromise = require('../../promise/SPromise');

const __deepMerge = require('../../object/deepMerge');

const __chokidar = require('chokidar');

const __getFilename = require('../../fs/filename');

const __extension = require('../../fs/extension');

const __packageRoot = require('../../path/packageRoot');

const __fs = require('fs');

const __argsToString = require('../../cli/argsToString');

const __childProcess = require('child_process');
/**
 * @name            SWatchFsDeamonCli
 * @namespace           node.deamon.fs
 * @type            Class
 * @extends         SCli
 *
 * This class represent the watch filesystem deamon Cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SCli) {
  _inherits(SWatchFsDeamonCli, _SCli);

  var _super = _createSuper(SWatchFsDeamonCli);

  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          definitionObj
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SWatchFsDeamonCli(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SWatchFsDeamonCli);

    return _super.call(this, __deepMerge({
      id: 'deamon.fs',
      name: 'Deamon Fs'
    }, settings));
  }
  /**
   * @name            _run
   * @type            Function
   * @private
   *
   * This method is the one that will be called once you call ```run```.
   * The params passed are processed by the ```run``` parent method so you can
   * confidently trust them.
   * You MUST return an SPromise instance so that the spawned process can be
   * managed automatically in the parent ```run``` method.
   *
   * @param       {Object}        argsObj         The object of passed arguments
   * @param       {Object}        [settings={}]     The passed settings object
   * @return      {SPromise}                      An SPromise instance through which the parent method can register for events like "success", "log", etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SWatchFsDeamonCli, [{
    key: "_run",
    value: function _run(argsObj, settings) {
      if (settings === void 0) {
        settings = {};
      }

      return new __SPromise(async function (resolve, reject, trigger, cancel) {
        const runningTests = {};
        trigger('log', {
          value: `#start Starting the "<yellow>${settings.name}</yellow>" filesystem deamon...`
        });

        __chokidar.watch(argsObj.input, {
          persistent: true,
          followSymlinks: true,
          ...settings
        }).on('ready', () => {
          trigger('log', {
            value: `#success The "<yellow>${settings.name}</yellow>" deamon is <green>ready</green>`
          });
        }).on('change', filepath => {
          if (runningTests[filepath]) return;
          runningTests[filepath] = true;

          const filename = __getFilename(filepath);

          const path = filepath.replace(`/${filename}`, '');
          const name = filename.replace(`.${__extension(filename)}`, '');
          trigger('log', {
            value: '#clear'
          });
          trigger('log', {
            value: `Update detected on the file "<cyan>${path.replace(__packageRoot(filepath) + '/', '')}</cyan>"`
          }); // reading the file content

          const content = __fs.readFileSync(filepath, 'utf8');

          const deamonReg = /\*\s?@deamon\.fs\s+(.*)/g;
          const deamonMatches = content.match(deamonReg);
          let command;

          if (deamonMatches && deamonMatches[0]) {
            command = deamonMatches[0].replace(/\s?\*\s?@deamon\.fs\s+/, '').trim();
          } else {
            command = argsObj.command;
          } // preparing the command to run


          const args = __argsToString(argsObj);

          command = command.replace('%path', path).replace('%name', name);
          trigger('log', {
            value: `Launching the command "<magenta>${command.replace(`${__packageRoot()}/`, '')}</magenta>"...`
          });

          const childProcess = __childProcess.spawn(command, null, {
            stdio: 'inherit',
            shell: true
          }).on('data', d => {// console.log('d', data.toString());
          }).on('close', () => {
            // trigger('log', {
            //   value: `#success Process finished successfully`
            // });
            delete runningTests[filepath];
          }).on('error', e => {
            console.log('EORROROROR', e);
          }); // childProcess.stdout.on('data', (data) => {
          //   console.log('data', data.toString());
          // });
          // childProcess.stderr.on('data', (data) => {
          //   console.log('data', data.toString());
          // });

        }); // process.stdin.resume();

      }, {
        id: 'cli.deamon.fs'
      }).start();
    }
  }]);

  return SWatchFsDeamonCli;
}(__SCli), _defineProperty(_class, "command", 'sugar deamon.fs %arguments'), _defineProperty(_class, "definitionObj", {
  name: {
    type: 'String',
    alias: 'n',
    description: 'Specify the name of a configured deamon in the "deamons.config.js" file',
    level: 1,
    required: false
  },
  input: {
    type: 'String',
    alias: 'i',
    description: 'Input files glob pattern',
    level: 1,
    required: false
  },
  command: {
    type: 'String',
    alias: 'c',
    description: 'Specify the command you want to launch when fs update has been detected',
    level: 1,
    required: false
  }
}), _temp);