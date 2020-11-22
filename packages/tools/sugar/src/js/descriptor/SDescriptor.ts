import _deepMerge from '../object/deepMerge';
import ISDescriptor, {
  ISDescriptorCtor,
  ISDescriptorRule,
  ISDescriptorSettings,
  ISDescriptorRulesMap,
  ISDescriptorResultObj,
  ISDescriptorRuleApplyFn
} from './interface/ISDescriptor';

/**
 * @name                SDescriptor
 * @namespace           sugar.js.descriptor
 * @type                Class
 *
 * This class is the main one that MUST be used as parent one
 * when creating any descriptor like object, string, etc...
 *
 * @param       {ISDescriptorSettings}      settings        An object of setting to configure your descriptor instance
 *
 * @example       js
 * import SDescriptor from '@coffeekraken/sugar/js/descriptor/SDescriptor';
 * class MyDescriptor extends SDescriptor {
 *    constructor(settings) {
 *      super(settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISDescriptorCtor = class SDescriptor implements ISDescriptor {
  /**
   * @name        _settings
   * @type        ISDescriptorSettings
   * @private
   *
   * Store the descriptor settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISDescriptorSettings;

  /**
   * @name      rulesMap
   * @type      Object
   * @static
   *
   * Store the registered rules into a simple object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static rulesMap: ISDescriptorRulesMap = {};

  /**
   * @name      registerRule
   * @type      Function
   * @static
   *
   * This static method allows you to register a new rule
   * by passing a valid ISDescriptorRule object
   *
   * @param     {ISDescriptorRule}        rule        The rule object to register
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static registerRule(rule: ISDescriptorRule): void {
    if (rule.id === undefined || typeof rule.id !== 'string') {
      throw `Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...`;
    }
    this.rulesMap[rule.id] = rule;
  }

  /**
   * @name        apply
   * @type        Function
   * @static
   *
   * This static method allows you to apply the descriptor on a value
   * withour having to instanciate a new descriptor.
   *
   * @param       {Any}         value         The value on which you want to apply the descriptor
   * @param       {ISDescriptorSettings}      [settings={}]       An object of settings to configure your apply process
   * @return      {ISDescriptorResultObj|true}            true if the descriptor does not have found any issue(s), an ISDescriptorResultObj object if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static apply(
    value: any,
    settings?: ISDescriptorSettings
  ): ISDescriptorResultObj | true {
    const instance = new this(settings);
    return instance.apply(value);
  }

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings?: ISDescriptorSettings) {
    // save the settings
    this._settings = _deepMerge({}, settings);
    // check that the descriptor class has a static "description" property
  }

  /**
   * @name          apply
   * @type          Function
   *
   * This method simply apply the descriptor instance on the passed value.
   * The value can be anything depending on the descriptor you use.
   * When you pass an Array, by default it will apply the descriptor on
   * each array items. If you don't want this behavior and the Array passed has to be
   * treated as a single value, pass the "arrayAsValue" setting to true
   *
   * @param       {Any}       value         The value to apply the descriptor on
   * @param       {ISDescriptorSettings}        [settings={}]       An object of settings to configure your descriptor. These settings will override the base ones passed in the constructor
   * @return      {ISDescriptorResultObj|true}           Will return true if all is ok, and an object describing the issue if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  apply(
    value: any,
    settings?: ISDescriptorSettings
  ): ISDescriptorResultObj | true {
    console.log('apply');

    return true;
  }
};

export default Cls;
