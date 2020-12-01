// @ts-nocheck
// @shared

import __typeOf from '../value/typeof';
import __uniquid from '../string/uniqid';
import __upperFirst from '../string/upperFirst';
import __toString from '../string/toString';
import __isOfType from '../is/ofType';
import __deepMerge from '../object/deepMerge';
import __parseTypeString from './parseTypeString';
import ISType, {
  ISTypeCtor,
  ISTypeDescriptor,
  ISTypeSettings,
  ISTypeVerboseObj,
  ISTypeRegisteredTypes,
  ISTypeInstanciatedTypes
} from './interface/ISType';
import { IParseTypeStringResultObj } from './interface/IParseTypeString';

/**
 * @name                SType
 * @namespace           sugar.js.type
 * @type                Class
 *
 * This class is the main one that MUST be used as parent one
 * when creating any type like object, string, etc...
 *
 * @param       {ISTypeSettings}      settings        An object of setting to configure your descriptor instance
 *
 * @example       js
 * import SType from '@coffeekraken/sugar/js/descriptor/SType';
 * class MyDescriptor extends SType {
 *    constructor(settings) {
 *      super(settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISTypeCtor = class SType implements ISType {
  /**
   * @name        _settings
   * @type        ISTypeSettings
   * @private
   *
   * Store the descriptor settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISTypeSettings;

  /**
   * @name      typeString
   * @type      String
   *
   * This store the typeString passed in the constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  typeString: string;

  /**
   * @name      types
   * @type      IParseTypeStringResultObj[]
   *
   * This specify the type represented by this SType instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  types: IParseTypeStringResultObj[];

  /**
   * @name      _instanciatedTypes
   * @type      ISTypeInstanciatedTypes
   * @static
   *
   * Store all the instanciated types to reuse them
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static _instanciatedTypes: ISTypeInstanciatedTypes = {};

  /**
   * @name      _registeredTypes
   * @type      ISTypeRegisteredTypes
   * @static
   *
   * Store the registered _registeredTypes into a simple object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static _registeredTypes: ISTypeRegisteredTypes = {};

  /**
   * @name      registerType
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
  static registerType(type: ISTypeDescriptor): void {
    if (type.id === undefined || typeof type.id !== 'string') {
      throw `Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...`;
    }
    this._registeredTypes[type.id] = type;
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
  constructor(typeString: string, settings: ISTypeSettings = {}) {
    // save the typeString
    this.typeString = typeString;
    // standardise the typeString
    typeString = typeString.toLowerCase().trim();
    // check if already bein instanciated
    if (this.constructor._instanciatedTypes[typeString] !== undefined)
      return this.constructor._instanciatedTypes[typeString];
    // parse the typeString
    this.types = __parseTypeString(typeString).types;
    // save the settings
    this._settings = __deepMerge(
      {
        id: this.constructor.name,
        name: this.constructor.name,
        throw: true,
        verbose: true
      },
      settings
    );
    // save the instance into the instanciated stack
    this.constructor._instanciatedTypes[typeString] = this;
  }

  /**
   * @name        is
   * @type        Function
   *
   * This method allows you to make sure the passed value correspond with the type(s)
   * this instance represent
   *
   * @param     {Any}       value       The value to check
   * @param     {ISTypeSettings}        [settings={}]     Some settings to configure your check
   * @return    {Boolean}               true if correspond, false if not
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  is(value: any, settings: ISTypeSettings = {}): boolean {
    settings = __deepMerge(this._settings, settings);
    // loop on each types
    for (let i = 0; i < this.types.length; i++) {
      const typeObj = this.types[i],
        typeId = typeObj.type;
      // check the value
      const res: boolean = this._isType(value, typeId);
      // if the result is falsy
      if (res !== true) {
        if (settings.verbose === true) {
          const typeOf = __typeOf(value);
          const verboseObj: ISTypeVerboseObj = {
            typeString: this.typeString,
            value,
            expected: {
              type: __upperFirst(typeId)
            },
            received: {
              type: __upperFirst(typeOf)
            }
          };
          return verboseObj;
        }
        return false;
      }
      // check if the element has to be an array or an object containing some types
      if (typeObj.of !== undefined) {
        // make sure the type of the passed value
        // is one of that can contain some values
        // like "object", "array" or "map"
        const typeOf = __typeOf(value);
        if (
          settings.throw &&
          typeOf !== 'Array' &&
          typeOf !== 'Object' &&
          typeOf !== 'Map'
        ) {
          throw `Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${typeOf}</cyan>" that does not support "child" value(s)...`;
        }
        const loopOn =
          typeOf === 'Array'
            ? value.keys()
            : typeOf === 'Object'
            ? Object.keys(value)
            : Array.from(value.keys());

        for (let k = 0; k < loopOn.length; k++) {
          let isValid = false,
            invalidType: string,
            invalidValue: any,
            invalidIdx: string | number;
          for (let j = 0; j < typeObj.of.length; j++) {
            if (isValid === false) {
              const type = typeObj.of[j];
              const idx = loopOn[k];
              const v: any = typeOf === 'Map' ? value.get(idx) : value[idx];
              // validate the value if needed
              const ofRes: boolean = this._isType(v, type);
              if (ofRes !== true) {
                invalidIdx = idx;
                invalidType = __typeOf(v);
                invalidValue = v;
              }
              isValid = ofRes;
            }
          }
          // check if the checked value does not correspond to any of the passed
          // types
          if (isValid === false) {
            if (settings.verbose === true) {
              const verboseObj: ISTypeVerboseObj = {
                typeString: this.typeString,
                from: value,
                index: invalidIdx,
                value: invalidValue,
                expected: {
                  type: typeObj.of.map((t) => __upperFirst(t)).join(',')
                },
                received: {
                  type: __upperFirst(invalidType)
                }
              };
              return verboseObj;
            }
            return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * @name          _isType
   * @type          Function
   * @private
   *
   * This method simply take a type string like "string", "array", etc..., a value and
   * check if this value correspond to the passed type
   *
   * @param     {Any}       value       The value to validate
   * @param     {String}    type        The type to check the value with
   * @return    {Boolean}               true if all if ok, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  _isType(value: any, type: string, settings: ISTypeSettings = {}): boolean {
    settings = __deepMerge(this._settings, settings);
    // check that the passed type is registered
    if (
      settings.throw &&
      this.constructor._registeredTypes[type.toLowerCase()] === undefined
    ) {
      throw `Sorry but you try to validate a value with the type "<yellow>${type}</yellow>" but this type is not registered...`;
    }
    // validate the value using the "is" type method
    return this.constructor._registeredTypes[type.toLowerCase()].is(value);
  }

  /**
   * @name          name
   * @type          String
   * @get
   *
   * Access the descriptor name. Either the value of settings.name, or the constructor name
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  get name(): string {
    return this._settings.name;
  }

  /**
   * @name          id
   * @type          String
   * @get
   *
   * Access the descriptor id. Either the value of settings.name, or the constructor name
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  get id(): string {
    return this._settings.id;
  }
};

export = Cls;
