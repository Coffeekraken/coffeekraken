// @ts-nocheck

import __SClass, { ISClass } from '@coffeekraken/s-class';
import __isPath from '../../../shared/is/path';
import __isClass from '../../../shared/is/class';
import __isPlain from '../../../shared/is/plainObject';
import __getFilename from '../../fs/filename';
import __SEventEmitter from '@coffeekraken/s-promise';
import __SError from '../../../shared/error/SError';
import __toString from '../../../shared/string/toString';
import __SSugarAppModuleSettingsInterface from './interface/SSugarAppModuleSettingsInterface';
import __deepMerge from '../../../shared/object/deepMerge';
import __hotkey from '../../keyboard/hotkey';
import __SBlessedStdio from '../../stdio/blessed/SBlessedStdio';
// import __SIpc from '../../ipc/SIpc';
import __SProcessManager from '@coffeekraken/s-process';
import __blessed from 'blessed';
import __stdio from '../../stdio/stdio';
import __SBlessedComponent from '../../blessed/SBlessedComponent';

import __SSugarAppModuleInterface from './interface/SSugarAppModuleInterface';

import { ISSugarAppModuleDescriptor } from './SSugarAppProcess';

/**
 * @name            SSugarAppModule
 * @namespace           sugar.node.ui.sugar
 * @type            Class
 * @extends         SEventEmitter
 * @status              wip
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

export interface ISSugarAppModuleCtorSettings {
  sugarAppModule?: Partial<ISSugarAppModuleSettings>;
}
export interface ISSugarAppModuleSettings {}

export interface ISSugarAppModuleShortcuts {
  [key: string]: ISSugarAppModuleShortcut;
}
export interface ISSugarAppModuleShortcut {
  name: string;
  params: any;
  settings: any;
  id?: string;
  keys?: string;
}

export interface ISSugarAppModule {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  processPath: string;
  readonly params: any;
}

export default class SSugarAppModule
  extends __SEventEmitter
  implements ISSugarAppModule {
  static interfaces = {
    this: {
      apply: true,
      class: __SSugarAppModuleInterface
    }
  };

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
  state(value?: string) {
    if (!value) return this._state;
    // emit an event
    this.emit(`state.${value}`, true);
    this.emit('state', value);
    this._state = value;
  }

  /**
   * @name          shortcuts
   * @type          ISSugarAppModuleShortcuts
   *
   * Store the shortcuts provided
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  shortcuts: ISSugarAppModuleShortcuts = {};

  /**
   * @name          description
   * @type          String
   * @get
   *
   * Access the module description
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get description(): string {
    return this._moduleObjDescriptor.description;
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
  get params(): any {
    return this._moduleObjDescriptor.params;
  }

  /**
   * @name          settings
   * @type          Object
   *
   * Store the passed module settings
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get settings(): any {
    return this._moduleObjDescriptor.settings;
  }

  /**
   * @name          processPath
   * @type          String
   *
   * Store the passed module process path
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get processPath(): any {
    return this._moduleObjDescriptor.processPath;
  }

  /**
   * @name          stdio
   * @type          Function
   * @get
   *
   * Access the blessed based UI of this module
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  stdios = {};
  stdio(id = 'terminal', value?: any) {
    if (value) {
      this.stdios[id] = value;
      this.emit('stdio', {
        id,
        instance: value
      });
      this.emit(`stdio.${id}`, value);
    }
    return this.stdios[id];
  }

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
  protected _active = false;

  /**
   * @name      _moduleObjDescriptor
   * @type      ISSugarAppModuleDescriptor
   * @private
   *
   * Store the passed module object descriptor from the constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _moduleObjDescriptor: ISSugarAppModuleDescriptor;

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
  private _moduleProcesses = {};

  /**
   * @nane        $stdio
   * @type        blessed.box|SBlessedStdio
   *
   * Store the stdio instance used to be displayed in the GUI
   *
   * @since       2.0.'0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  $stdio: any = undefined;

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
    return this._registeredModulesArray.filter((module: ISSugarAppModule) => {
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
  constructor(
    moduleObjDescriptor: ISSugarAppModuleDescriptor,
    settings: ISSugarAppModuleCtorSettings
  ) {
    super(
      __deepMerge(
        {
          id: moduleObjDescriptor.id,
          sugarAppModule: {
            mainProcessId: 'main',
            processIdUsedForState: undefined
          }
        },
        settings || {}
      )
    );
    this._moduleObjDescriptor = moduleObjDescriptor;

    // __SIpc.on('sugar.ui.displayedModule', (moduleId) => {
    //   this._active = this.id === moduleId;
    // });

    // @todo    replace this with new interface class
    __SSugarAppModuleSettingsInterface.apply(this._settings);

    // register the module in the list
    SSugarAppModule._registeredModulesArray.push(<never>this);
    this.on('finally', () => {
      const idx = SSugarAppModule._registeredModulesArray.indexOf(<never>this);
      if (idx === -1) return;
      SSugarAppModule._registeredModulesArray.splice(idx, 1);
    });

    // init shortcuts
    this._initShortcuts();

    // init the Stdios
    const stdios = Array.isArray(this._moduleObjDescriptor.stdio)
      ? this._moduleObjDescriptor.stdio
      : [this._moduleObjDescriptor.stdio].map((i) => i !== undefined);

    stdios.forEach((stdio) => {
      let stdioSettings: any = {
          blessedStdio: {
            attach: false
          }
        },
        stdioId,
        stdioArg = stdio;
      if (__isPlain(stdio)) {
        stdioArg = stdio.stdio;
        stdioSettings = __deepMerge(stdioSettings, stdio.settings || {});
        stdioId = stdio.id;
      }
      // define the stdioId
      if (!stdioId) {
        if (__isClass(stdioArg)) stdioId = stdioArg.name;
        else if (__isPlain(stdio)) stdioId = stdio.id;
        else if (typeof stdioArg === 'string') stdioId = stdioArg;
      }

      const stdioInstance = __stdio(this, stdioArg, stdioSettings);

      if (
        stdioInstance instanceof __SBlessedStdio ||
        stdioInstance instanceof __blessed.box
      ) {
        // @ts-ignore
        this.$stdio = stdioInstance.$container || stdioInstance;
      }
      if (stdioInstance) {
        this.stdio(stdioId || 'unknown', stdioInstance);
      }
    });

    // listen when ready
    this.on('state.ready:1', this._onReady.bind(this));
  }

  /**
   * @name          _onReady
   * @type          Function
   * @private
   *
   * Called when the module is ready
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _onReady() {
    // // listen for presets
    // this.on('preset', (presetObj) => {
    //   // kill the current process if already one
    //   const processId = presetObj.process || this._settings.mainProcessId;
    //   const pro = this.getProcess(processId);
    //   if (pro.isRunning()) {
    //     pro.kill(
    //       `Killing the current "<yellow>${processId}</yellow>" process`
    //     );
    //   }
    //   // merging the params with the preset params
    //   const presetParams = __deepMerge(
    //     this.params || {},
    //     presetObj.params || {}
    //   );
    //   // running the process with the new params
    //   pro.run(presetParams);
    // });

    if (this._moduleObjDescriptor.autoRun === true) {
      this.process.run(this._moduleObjDescriptor.params || {});
    }
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
   * @name          processIdUsedForState
   * @type          String
   * @get
   *
   * Get the process id that is used for setting the module state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get processIdUsedForState() {
    if (this._settings.processIdUsedForState === undefined)
      return this._settings.mainProcessId;
    return this._settings.processIdUsedForState;
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
    this.emit('activate', true);
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
    this.emit('unactivate', true);
  }

  /**
   * @name          isActive
   * @type          Function
   *
   * This method simply return true or false depending on the active module state
   *
   * @return    {Boolean}       true if the module is active (displayed), false if not
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
      this.state('ready');

      setTimeout(() => {
        if (this.state() === 'error') {
          this.emit('warning', {
            value: `The module <red>${
              this._settings.name || this._settings.id
            }</red> cannot start correctly because of an error...`
          });
          return;
        }

        // this.emit('log', {
        //   value: `<yellow>${
        //     this._settings.name || this._settings.id
        //   }</yellow> module is <green>ready</green>`
        // });
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
      this.state('error');

      setTimeout(() => {
        this.emit('log', {
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
   * @param       {SProcess}        pro       The process instance you want to register
   * @param       {String}      [id='main']      An id for your instance to use later
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerProcess(pro, id = this._settings.mainProcessId) {
    if (this._moduleProcesses[id] !== undefined) {
      throw `Sorry but a process with the id "<yellow>${id}</yellow>" in the module "<cyan>${this.this.constructor.name}</cyan>" seem's to already exists...`;
    }
    if (id === this.processIdUsedForState) {
      pro.on('state', (d) => {
        setTimeout(() => {
          this.state(d.value);
        });
      });
    }
    // Pipe the process
    this.pipe(pro);
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
    if (this._moduleProcesses[id] === undefined) {
      throw `Sorry but you try to get a process named "<yellow>${id}</yellow>" that does not have been registered yet... Here's the processes that you have access to:\n- ${Object.keys(
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
    // @wip
    // @ts-ignore
    if (this.handleShortcuts === undefined) {
      throw `You have some shortcuts defined in the module "<yellow>${this.constructor.name}</yellow>" but you don't have the required "<cyan>handleShortcuts(shortcutObj, params, settings)</cyan>" method defined...`;
    }

    if (
      !this._moduleObjDescriptor.shortcuts ||
      !Object.keys(this._moduleObjDescriptor.shortcuts).length
    )
      return;

    for (const shortcut in this._moduleObjDescriptor.shortcuts) {
      const shortcutObj: ISSugarAppModuleShortcut = this._moduleObjDescriptor
        .shortcuts[shortcut];
      shortcutObj.keys = shortcut;
      if (shortcutObj.id === undefined) shortcutObj.id = shortcut;
      __hotkey(shortcut).on('press', () => {
        if (this.isActive() !== true) return;

        const params = __deepMerge(
          Object.assign({}, this.params || {}),
          Object.assign({}, shortcutObj.params || {})
        );
        const settings = __deepMerge(
          Object.assign({}, this.settings || {}),
          Object.assign({}, shortcutObj.settings || {})
        );
        delete shortcutObj.params;
        delete shortcutObj.settings;
        // this.handleShortcuts(shortcutObj, params, settings);
      });
    }
  }
}
