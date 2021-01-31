// @ts-nocheck

import __SSugarAppModuleObjInterface from './interface/SSugarAppModuleObjInterface';
import __SInterface from '../../interface/SInterface';
import __SSugarAppModule from './SSugarAppModule';
import __deepMerge from '../../object/deepMerge';

/**
 * @name                SSugarAppProcessModule
 * @namespace           sugar.node.app.sugar
 * @type                Class
 * @extends             SSugarAppModule
 * @wip
 *
 * This class represent the simple process module for the Sugar UI.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export = class SSugarAppProcessModule extends __SSugarAppModule {
  // static interfaces = { this: __SFrontendServerInterface };

  /**
   * @name            constructor
   * @type             Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(moduleObj, settings = {}) {
    // check the settings interface
    super(
      __deepMerge(moduleObj, {
        shortcuts: {
          'ctrl+r': {
            id: 'run',
            name: 'Run',
            params: {},
            settings: {}
          },
          'ctrl+e': {
            id: 'exit',
            name: 'Exit',
            params: {},
            settings: {}
          }
        }
      }),
      __deepMerge(settings)
    );

    const ProcessClass = require(moduleObj.processPath);
    const pro = new ProcessClass(Object.assign({}, moduleObj.params || {}), {
      process: {
        ...(this._settings.processSettings || {}),
        metas: false,
        stdio: false
      }
    });

    // register process
    this.registerProcess(pro);

    // // set the module as ready
    this.ready();
  }

  handleShortcuts(shortcutObj, params, settings) {
    switch (shortcutObj.id) {
      case 'exit':
        if (!this.process.isRunning()) return;
        this.process.kill(
          `The process has been killed using the "<yellow>ctrl+e</yellow>" shortcut`
        );
        break;
      case 'run':
        if (this.process.isRunning()) return;
        this.process.run(params);
        break;
    }
  }
};
