// @ts-nocheck

import __SPromise from '../../promise/SPromise';
import __SError from '../../error/SError';
import __toString from '../../string/toString';
import __SSugarAppModuleSettingsInterface from './interface/SSugarAppModuleSettingsInterface';
import __deepMerge from '../../object/deepMerge';
import __hotkey from '../../keyboard/hotkey';
// import __SIpc from '../../ipc/SIpc';
import __SProcessManager from '../../process/SProcess';
import __blessed from 'blessed';

/**
 * @name            SSugarAppModule
 * @namespace           sugar.node.ui.sugar
 * @type            Class
 * @extends         SPromise
 * @wip
 *
 * This class represent the process that expose every registered "modules"
 * through through a socket connection and handle the talk between
 * the backend parts with the frontend parts of each modules.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarAppModule extends __SPromise {
  /**
   * @name          state
   * @type          String
   * @values        loading,ready,running,error
   * @default       loading
   *
   * Store the module state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _state = 'loading';
  get state() {
    return this._state;
  }
  set state(value) {
    this._setState(value);
  }
  _setState(value) {
    // trigger an event
    this.trigger(`state.${value}`, true);
    this.trigger('state', value);
    this._state = value;
  }

  /**
   * @name          id
   * @type          Boolean
   * @get
   *
   * Access the "settings.id" property
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get id() {
    return this._settings.id;
  }

  /**
   * @name          params
   * @type          Object
   *
   * Store the passed module parameters
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  params = {};

  /**
   * @name        _active
   * @type        Boolean
   * @private
   *
   * Store the module state. Active mean that the shortcuts and all the other features
   * of this module can be used
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _active = false;

  /**
   * @name      _moduleProcesses
   * @type      Object
   * @private
   *
   * Store all the "SProcess" instances initiated during the ```start``` phase
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _moduleProcesses = {};

  /**
   * @name          getRegisteredModules
   * @type          Function
   * @static
   *
   * This static method allows you to get back all the registered modules during this process
   *
   * @return      {Array<SSugarAppModule>}           The list of all the registered modules
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _registeredModulesArray = [];
  static getRegisteredModules() {
    return this._registeredModulesArray;
  }

  /**
   * @name          getRegisteredModuleById
   * @type          Function
   * @static
   *
   * This static method allows you to get back one of the registered modules using his id
   *
   * @param       {String}          id              The id of the module you want back
   * @return      {Array<SSugarAppModule>}           The list of all the registered modules
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static getRegisteredModuleById(id) {
    return this._registeredModulesArray.filter((module) => {
      return module.id === id;
    })[0];
  }

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(moduleObj, settings = {}) {
    super(
      __deepMerge(
        {
          id: 'SSugarApp',
          name: 'Sugar App Module',
          autoRun: false,
          mainProcessId: 'main',
          processUsedForState: undefined,
          processSettings: {}
        },
        settings
      )
    );
    this._settings.id = `SSugarAppModule.${this._settings.id}`;
    this._moduleObj = moduleObj;

    // __SIpc.on('sugar.ui.displayedModule', (moduleId) => {
    //   this._active = this.id === moduleId;
    // });

    // @todo    replace this with new interface class
    __SSugarAppModuleSettingsInterface.apply(this._settings);

    // register the module in the list
    SSugarAppModule._registeredModulesArray.push(this);
    this.on('finally', () => {
      const idx = SSugarAppModule._registeredModulesArray.indexOf(this);
      if (idx === -1) return;
      SSugarAppModule._registeredModulesArray.splice(idx, 1);
    });

    if (this.constructor.interface) {
      this.constructor.interface.apply(this._moduleObj);
    }

    // init shortcuts
    this._initShortcuts();

    // listen when ready
    this.on('state.ready:1', () => {
      if (this._settings.autoRun === true) {
        this.process.run();
      }
    });
  }

  /**
   * @name          process
   * @type          SProcess
   * @get
   *
   * Access the "main" registered process
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get process() {
    return this._moduleProcesses[this._settings.mainProcessId];
  }

  /**
   * @name          processUsedForState
   * @type          String
   * @get
   *
   * Get the process id that is used for setting the module state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get processUsedForState() {
    if (this._settings.processUsedForState === undefined)
      return this._settings.mainProcessId;
    return this._settings.processUsedForState;
  }

  /**
   * @name          $output
   * @type          Function
   * @get
   *
   * Access the blessed based UI of this module
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get $output() {
    if (!this._$output) {
      this._$output = __blessed.box({
        content:
          'No ui has been provided for this module. To create one, use the "<yellow>SSugarAppModule.createUi</yellow>" method...'
      });
    }
    return this._$output;
  }

  /**
   * @name          activate
   * @type          Function
   *
   * This method allows you to activate the module.
   * This mean that the shortcuts, etc will be usable
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  activate() {
    if (this._active === true) return;
    this._active = true;
    this.trigger('activate', true);
  }

  /**
   * @name          unactivate
   * @type          Function
   *
   * This method allows you to unactivate the module.
   * This mean that the shortcuts, etc will be unusable
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  unactivate() {
    if (this._active === false) return;
    this._active = false;
    this.trigger('unactivate', true);
  }

  /**
   * @name          isActive
   * @type          Function
   *
   * This method simply return true or false depending on the active module state
   *
   * @return    {Boolean}       true if the module is active (displayed), false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isActive() {
    return this._active;
  }

  /**
   * @name          ready
   * @type          Function
   *
   * This method simply notify the main SugarUi class that this module
   * is ready
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  ready() {
    setTimeout(() => {
      this.state = 'ready';

      setTimeout(() => {
        if (this.state === 'error') {
          this.trigger('warning', {
            value: `The module <red>${
              this._settings.name || this._settings.id
            }</red> cannot start correctly because of an error...`
          });
          return;
        }

        this.trigger('log', {
          value: `<yellow>${
            this._settings.name || this._settings.id
          }</yellow> module is <green>ready</green>`
        });
      });
    });
  }

  /**
   * @name          error
   * @type          Function
   *
   * This method simply notify the main SugarUi class that this module
   * has an error
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  error() {
    setTimeout(() => {
      this.state = 'error';

      setTimeout(() => {
        this.trigger('log', {
          value: `<yellow>${
            this._settings.name || this._settings.id
          }</yellow> module is in <red>error</red> state`
        });
      });
    });
  }

  /**
   * @name        registerProcess
   * @type        Function
   *
   * This method allows you to register a new process "SProcess" based instance
   * that you will be able to use later on by calling the "run" or "stop" module method.
   *
   * @param       {SProcess}        pro       The process instance you want to register
   * @param       {String}      [id='main']      An id for your instance to use later
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerProcess(pro, id = this._settings.mainProcessId) {
    if (this._moduleProcesses[id] !== undefined) {
      throw `Sorry but a process with the id "<yellow>${id}</yellow>" in the module "<cyan>${this.this.constructor.name}</cyan>" seem's to already exists...`;
    }
    if (id === this.processUsedForState) {
      pro.on('state', (d) => {
        this.state = d.value;
      });
    }
    // Pipe the process
    __SPromise.pipe(pro, this);
    // save the process in the stack
    this._moduleProcesses[id] = pro;
  }

  /**
   * @name        getProcess
   * @type        Function
   *
   * This method allows you to get a process instance using his id.
   * If no id is passed, the "main" one will be retreived
   *
   * @param     {String}      [id='main']      The process if you want back
   * @return    {SProcess}            The process that correspond to the passed id
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getProcess(id = this._settings.mainProcessId) {
    if (this._moduleProcesses[processId] === undefined) {
      throw `Sorry but you try to get a process named "<yellow>${processId}</yellow>" that does not have been registered yet... Here's the processes that you have access to:\n- ${Object.keys(
        this._moduleProcesses
      ).join('\n- ')}`;
    }
    return this._moduleProcesses[id];
  }

  /**
   * @name        _initShortcuts
   * @type        Function
   * @private
   *
   * This method simply init the shortcuts to run process with some
   * special parameters
   *
   * @since     2.0.0
   */
  _initShortcuts() {
    if (
      this._moduleObj.shortcuts !== undefined &&
      this.handleShortcuts === undefined
    ) {
      throw `You have some shortcuts defined in the module "<yellow>${this.constructor.name}</yellow>" but you don't have the required "<cyan>handleShortcuts(shortcutObj, params, settings)</cyan>" method defined...`;
    }

    Object.keys(this._moduleObj.shortcuts || {}).forEach((shortcut) => {
      const shortcutObj = this._moduleObj.shortcuts[shortcut];
      shortcutObj.keys = shortcut;
      if (shortcutObj.id === undefined) shortcutObj.id = shortcut;
      __hotkey(shortcut).on('press', () => {
        if (!this.isActive()) return;
        const params = __deepMerge(
          Object.assign({}, this._moduleObj.params || {}),
          Object.assign({}, shortcutObj.params || {})
        );
        const settings = __deepMerge(
          Object.assign({}, this._moduleObj.settings || {}),
          Object.assign({}, shortcutObj.settings || {})
        );
        delete shortcutObj.params;
        delete shortcutObj.settings;
        this.handleShortcuts(shortcutObj, params, settings);
      });
    });
  }
}
