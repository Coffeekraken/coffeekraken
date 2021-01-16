// @shared

import __deepMerge from '../object/deepMerge';

import ISInterface from '../interface/interface/ISInterface';

/**
 * @name            SClass
 * @namespace       sugar.js.class
 * @type            Class
 * @beta
 *
 * This class is a simple and effective one that manage the ```_settings``` property
 * and some others features that will be documented asap
 *
 * @param       {Object}            [settings={}]               An object of settings that will be available as the property ```_settings```
 *
 * @example         js
 * import SClass from '@coffeekraken/sugar/js/class/SClass';
 * class MyCoolClass extends SClass {
 *      constructor(settings = {}) {
 *          super(settings);
 *      }
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface ISClassSettings {
  id?: string;
  [key: string]: any;
}
export interface ISClassCtor {
  new (settings?: ISClassSettings);
  interface?: ISInterface;
  settingsInterface?: ISInterface;
}
export interface ISClass {
  _settings: ISClassSettings;
  id: string;
}

const cls: ISClassCtor = class SClass implements ISClass {
  /**
   * @name            _settings
   * @type            ISClassSettings
   * @private
   *
   * Store the class settings
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISClassSettings = {};

  /**
   * @name            id
   * @type            String
   * @get
   *
   * Access the id setted in the ```_settings.id```
   * By default, the id will be the ```constructor.name```
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  public get id() {
    return this._settings.id || this.constructor.name;
  }

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings: ISClassSettings = {}) {
    // saving the settings
    if ((<any>this).constructor.settingsInterface) {
      this._settings = __deepMerge(
        (<any>this).constructor.settingsInterface.defaults(),
        settings
      );
    } else {
      this._settings = settings;
    }

    // apply the interface if exists
    if ((<any>this).constructor.interface) {
      (<any>this).constructor.interface.apply(this);
    }
  }
};
export default cls;
