// @ts-nocheck
// @shared

import __SError from '../error/SError';
import __map from '../iterable/map';
import __SPromise from '@coffeekraken/s-promise';
import __getExtendsStack from '../class/getExtendsStack';
import __typeOf from '../value/typeof';
import __uniquid from '../string/uniqid';
import __upperFirst from '../string/upperFirst';
import __toString from '../string/toString';
import __isOfType from '../is/ofType';
import __deepMerge from '../object/deepMerge';
import __parseHtml from '../console/parseHtml';
import __parseTypeString from './parseTypeString';
import __STypeResult from './STypeResult';
import __getAvailableInterfaceTypes from '../interface/getAvailableInterfaceTypes';
import descriptor from './descriptors/stringTypeDescriptor';

import { IParseTypeStringResultObj } from './parseTypeString';

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
 * @setting     {String}        [id=this.constructor.name]        An id for your instance
 * @setting     {String}        [name=this.constructor.name]      A name for your instance
 * @setting     {Boolean}       [throw=true]            Specify if you want your instance to throw errors or not
 * @setting     {Boolean}       [verbose=true]          Specify if you want back an object describing the issue, or just a false
 * @setting     {Boolean}       [customTypes=true]      Specify if you want the instance to take care of custom types like "SType", "SPromise", etc. or not
 *
 * @todo      tests
 * @todo      doc
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
export interface ISTypeDescriptorIsFn {
  (value: any, settings?: ISTypeSettings): boolean | ISTypeVerboseObj;
}
export interface ISTypeDescriptorCastFn {
  (value: any): any;
}

export interface ISTypeVerboseExpectedObj {
  type: string;
}
export interface ISTypeVerboseReceivedObj {
  type: string;
}
export interface ISTypeVerboseObj {
  typeString: string;
  source?: any;
  idx?: string | number;
  value: any;
  expected: ISTypeVerboseExpectedObj;
  received: ISTypeVerboseReceivedObj;
}

export interface ISTypeDescriptor {
  name: string;
  id: string;
  is: ISTypeDescriptorIsFn;
  cast: ISTypeDescriptorCastFn;
}

export interface ISTypeSettings {
  name?: string | undefined;
  id?: string | undefined;
  throw?: boolean;
  verbose?: boolean;
}

export interface ISTypeRegisteredTypes {
  [key: string]: ISTypeDescriptor;
}

export interface ISTypeInstanciatedTypes {
  [key: string]: ISType;
}

export interface ISTypeRegisterStaticFn {
  (typeDescriptor: ISTypeDescriptor): void;
}

export interface ISTypeIsFn {
  (value: any): boolean;
}

export interface ISTypeCtor {
  new (typeString: string, settings: ISTypeSettings);
  _registeredTypes: ISTypeRegisteredTypes;
  _instanciatedTypes: ISTypeInstanciatedTypes;
  registerType: ISTypeRegisterStaticFn;
}
export interface ISType {
  _settings: ISTypeSettings;
  typeString: string;
  types: IParseTypeStringResultObj[];
  name: string;
  id: string;
  is: ISTypeIsFn;
}

class SType implements ISType {
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
        throw: false,
        customTypes: true,
        interfaces: true,
        verbose: false
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

    let issues = {};

    // loop on each types
    for (let i = 0; i < this.types.length; i++) {
      const typeObj = this.types[i],
        typeId = typeObj.type;
      // check the value
      const res = this._isType(value, typeId, settings);

      // if the result is falsy
      if (res === true) {
        // if this matching type does not have any "of" to check
        // simply return true cause we have a type that match
        if (typeObj.of === undefined) return true;

        // make sure the type of the passed value
        // is one of that can contain some values
        // like "object", "array" or "map"
        const typeOf = __typeOf(value);
        if (typeOf !== 'Array' && typeOf !== 'Object' && typeOf !== 'Map') {
          if (settings.throw) {
            throw `Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${typeOf}</cyan>" that does not support "child" value(s)...`;
          } else {
            continue;
          }
        }

        // get the keys on which to loop
        const loopOn =
          typeOf === 'Object' ? Object.keys(value) : Array.from(value.keys());

        // loop on all the keys found
        for (let k = 0; k < loopOn.length; k++) {
          for (let j = 0; j < typeObj.of.length; j++) {
            const type = typeObj.of[j];
            const idx = loopOn[k];
            const v: any = typeOf === 'Map' ? value.get(idx) : value[idx];
            // validate the value if needed
            const ofRes = this._isType(v, type, settings);
            if (ofRes !== true) {
              issues[typeObj.type] = {
                expected: {
                  type: typeObj.type
                },
                received: {
                  type: __typeOf(v),
                  value: v
                }
              };
            } else {
              // return true cause we found a match
              return true;
            }
          }
        }
      } else {
        const issueObj = {
          expected: {
            type: typeObj.type
          },
          received: {
            type: __typeOf(value),
            value
          }
        };
        if (
          res !== undefined &&
          res !== null &&
          res !== false &&
          res.toString &&
          typeof res.toString === 'function'
        ) {
          issueObj.message = res.toString();
        }
        issues[typeObj.type] = issueObj;
      }
    }

    // if (settings.throw === true) {
    //   throw __parseHtml(
    //     [
    //       `Sorry but the value passed:`,
    //       '',
    //       __toString(value),
    //       '',
    //       `which is of type "<red>${__typeOf(
    //         value
    //       )}</red>" does not correspond to the requested type(s) "<green>${
    //         this.typeString
    //       }</green>"`
    //     ].join('\n')
    //   );
    // }

    const res = new __STypeResult({
      typeString: this.typeString,
      value,
      expected: {
        type: this.typeString
      },
      received: {
        type: __typeOf(value)
      },
      issues,
      settings
    });
    if (settings.throw === true) throw res.toString();
    return res;
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

    // console.log('type', type, settings);

    // check that the passed type is registered
    if (this.constructor._registeredTypes[type.toLowerCase()] === undefined) {
      if (settings.interfaces === true) {
        const availableInterfaceTypes = __getAvailableInterfaceTypes();
        if (availableInterfaceTypes[type] !== undefined) {
          const res = availableInterfaceTypes[type].apply(value, {});
          return res;
        }
      }
      // handle custom types
      if (settings.customTypes === true) {
        const typeOf = __typeOf(value).toLowerCase();
        const extendsStack = Object.keys(__getExtendsStack(value)).map((s) =>
          s.toLowerCase()
        );
        if (type === typeOf || extendsStack.indexOf(type) !== -1) return true;
      }
      if (settings.throw) {
        throw `Sorry but you try to validate a value with the type "<yellow>${type}</yellow>" but this type is not registered...`;
      } else {
        return false;
      }
    }
    // validate the value using the "is" type method
    return this.constructor._registeredTypes[type.toLowerCase()].is(value);
  }

  /**
   * @name          cast
   * @type          Function
   *
   * This method allows you to cast the passed value to the wanted type.
   * !!! If multiple types are passed in the typeString, the first one that
   * is "castable" to will be used.
   *
   * @param     {Any}         value         The value you want to cast
   * @param     {ISTypeSettings}      [settings={}]       Some settings you want to override
   * @return    {Any|Error}                         The casted value, or undefined if cannot be casted
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  cast(value: any, settings: ISTypeSettings): any {
    settings = __deepMerge(this._settings, settings);

    // store exceptions coming from descriptors
    let verboseObj = {
      value,
      issues: {},
      settings
    };

    // loop on each types
    for (let i = 0; i < this.types.length; i++) {
      const typeObj = this.types[i],
        typeId = typeObj.type;

      // get the descriptor object
      const descriptorObj = this.constructor._registeredTypes[
        typeId.toLowerCase()
      ];

      // check that we have a descriptor for this type
      if (descriptorObj === undefined) {
        // pass to the next descriptor
        continue;
      }
      // check that this descriptor is eligeble for casting
      if (descriptorObj.cast === undefined) continue;
      // try to cast the value
      let castedValue: any;
      // try {
      castedValue = descriptorObj.cast(value);
      if (castedValue instanceof Error) {
        // add the issue in the verboseObj
        verboseObj.issues[typeId] = castedValue.toString();
        // next
        continue;
      }

      // handle the "of" parameter
      // make sure the passed type can have child(s)
      if (
        typeObj.of !== undefined &&
        this.canHaveChilds(castedValue) === false
      ) {
        const issueStr = `Sorry but the passed type "<yellow>${typeId}</yellow>" has some child(s) dependencies "<green>${typeObj.of.join(
          '|'
        )}</green>" but this type can not have child(s)`;
        if (settings.throw === true) {
          throw __parseHtml(issueStr);
        }
        // add the issue in the verboseObj
        verboseObj.issues[typeId] = issueStr;
      } else if (typeObj.of !== undefined) {
        const sTypeInstance = new SType(typeObj.of.join('|'));
        castedValue = __map(castedValue, (key, value, idx) => {
          return sTypeInstance.cast(value, settings);
        });
      }

      if (castedValue === null && descriptorObj.id === 'null') return null;
      if (castedValue === undefined && descriptorObj.id === 'undefined')
        return undefined;
      if (castedValue !== null && castedValue !== undefined) return castedValue;
      // something goes wrong
      verboseObj.issues[
        typeId
      ] = `Something goes wrong but no details are available... Sorry`;
    }

    // our value has not bein casted
    if (settings.throw) {
      let stack = [
        `Sorry but the value of type "<cyan>${__typeOf(
          value
        )}</cyan>" passed to be casted in type "<yellow>${
          this.typeString
        }</yellow>" can not be casted correctly. Here's why:\n`
      ];
      Object.keys(verboseObj.issues).forEach((descriptorId) => {
        stack.push(
          `- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`
        );
      });
      throw __parseHtml(stack.join('\n'));
    }
    if (settings.verbose === true) {
      return new __SError(verboseObj);
    }
    return new __SError(
      `Something goes wrong with the casting process but not details available sorry...`
    );
  }

  /**
   * @name          canHaveChilds
   * @type          Function
   *
   * This method simply take a value and return true if can have child(s), false if not
   *
   * @param       {Any}       value       The value to check
   * @return      {Boolean}         true if can have child(s) (Object, Array and Map), false if not
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  canHaveChilds(value: any): boolean {
    const type = __typeOf(value);
    return type === 'Array' || type === 'Object' || type === 'Map';
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
}

const Cls: ISTypeCtor = SType;
export default SType;
