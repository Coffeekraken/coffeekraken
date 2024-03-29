import __isPlainObject from '../is/isPlainObject.js';

/**
 * @name            applyScope
 * @namespace       shared.object
 * @type            Function
 * @platform            js
 * @platform            node
 * @status              beta
 * @private
 *
 * This function allows you to apply a certain scope on the passed object.
 * A scope can be for example the environment your object lives in like "production",
 * "development", etc...
 * It can be literally all you want as soon as your object follow the property syntax to define
 * scoped values described in the example bellow.
 *
 * @param           {Object}            object          An object on which to apply the scope
 * @param           {Record<string, string>}        scope       The scope you want to apply. Check the example it will be easier to understand
 * @param           {IApplyScopeSettings}           [settings={}]           Some settings to configure your scope application process
 *
 * @setting         {Boolean}           [deep=true]             Specify if you want to apply the scope deep in the object or just in the first level
 * @setting          {Boolean}          [clone=false]           Specify if you want to clone the object before applying scope or not
 *
 * @example         js
 * import { __applyScope } from '@coffeekraken/sugar/object';
 * const myObject = {
 *      myValue: 'Hello',
 *      '@dev': {
 *          myValue: 'World'
 *      },
 *      'something@prod': {
 *          plop: 'yop'
 *      }
 * };
 *
 * // apply the "env" scope with the value of "dev"
 * __applyScope(myObject, ['dev']);
 * // {
 * //   myValue: 'World'
 * // }
 *
 * // apply two scopes
 * __applyScope(myObject, ['prod']);
 * // {
 * //   myValue: 'Hello',
 * //   something: {
 * //       plop: 'yop'
 * //   }
 * // }
 *
 * // apply a scope with multiple values
 * __applyScope(myObject, ['dev','prod']);
 * // {
 * //   myValue: 'World',
 * //   something: {
 * //       plop: 'yop'
 * //   }
 * // }
 *
 * @since           2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IApplyScopeSettings {
    deep: boolean;
    clone: boolean;
}

export default function __applyScope(
    object: Record<string, any>,
    scopes: string[],
    settings?: Partial<IApplyScopeSettings>,
): Record<string, any> {
    settings = {
        deep: true,
        clone: false,
        ...settings,
    };

    function recursive(obj) {
        // break reference
        obj = Object.assign({}, obj);

        Object.keys(obj).forEach((prop) => {
            const value = obj[prop];
            if (prop.split('@').length === 2) {
                const scope = prop.split('@')[1],
                    scopedProp = prop.split('@')[0];

                if (scopes.indexOf(scope) !== -1) {
                    // plain object with no scoped prop
                    if (__isPlainObject(value) && !scopedProp) {
                        Object.keys(value).forEach((valueProp) => {
                            obj[valueProp] = value[valueProp];
                        });
                    } else if (__isPlainObject(value) && scopedProp) {
                        if (!obj[scopedProp]) obj[scopedProp] = value;
                        else
                            obj[scopedProp] = {
                                ...obj[scopedProp],
                                ...value,
                            };
                    } else if (scopedProp) {
                        obj[scopedProp] = value;
                    }
                }
                delete obj[prop];
            }
        });

        let needRecursion = false;
        for (let i = 0; i < Object.keys(obj).length; i++) {
            const prop = Object.keys(obj)[i];
            if (prop.split('@').length === 2) {
                needRecursion = true;
                break;
            }
        }
        if (needRecursion) {
            obj = recursive(obj);
        }

        if (settings?.deep) {
            Object.keys(obj).forEach((prop) => {
                const value = obj[prop];
                if (__isPlainObject(value)) {
                    obj[prop] = recursive(value);
                }
            });
        }

        return obj;
    }

    const newObj = recursive(object);

    return newObj;
}
