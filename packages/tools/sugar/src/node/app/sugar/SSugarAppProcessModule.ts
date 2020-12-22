// @ts-nocheck

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
  // static interface = __SFrontendServerInterface;

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
          'ctrl+s': {
            id: 'stop',
            name: 'Stop',
            params: {},
            settings: {}
          }
        }
      }),
      __deepMerge(settings)
    );

    const ProcessClass = require(moduleObj.processPath);
    const pro = new ProcessClass({
      ...this._settings.processSettings,
      metas: false,
      stdio: false
    });

    // register process
    this.registerProcess(pro);

    // set the module as ready
    this.ready();
  }

  handleShortcuts(shortcutObj, params, settings) {
    switch (shortcutObj.id) {
      case 'stop':
        this.process.kill();
        break;
      case 'run':
        this.process.run(params);
        break;
    }
  }
};
