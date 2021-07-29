import __flatten from './flatten';
import __isPlainObject from '../is/plainObject';

/**
 * @name            applyScope
 * @namespace       shared.object
 * @type            Function
 * @platform            js
 * @platform            node
 * @platform            ts
 * @status              beta
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
 * 
 * @example         js
 * import applyScope from '@coffeekraken/sugar/shared/object/applyScope';
 * const myObject = {
 *      myValue: 'Hello',
 *      'env:dev': {
 *          myValue: 'World'
 *      },
 *      'something:cool': {
 *          plop: 'yop'
 *      }
 * };
 * 
 * // apply the "env" scope with the value of "dev"
 * applyScope(myObject, {
 *      env: 'dev'
 * });
 * // {
 * //   myValue: 'World'
 * // }
 * 
 * // apply two scopes
 * applyScope(myObject, {
 *      env: 'prod',
 *      something: '*'
 * });
 * // {
 * //   myValue: 'Hello',
 * //   plop: 'yop'
 * // }
 * 
 * // apply a scope with multiple values
 * applyScope(myObject, {
 *      env: ['dev','prod']
 * });
 * // {
 * //   myValue: 'World'
 * // }
 * 
 * @since           2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IApplyScopeSettings {
    deep: boolean;
}

export default function applyScope(object: Record<string, any>, scope: Record<string, string|string[]>, settings?: Partial<IApplyScopeSettings>): Record<string, any> {
    
    settings = {
        deep: true,
        ...settings
    };

    const scopes: string[] = [];
    Object.keys(scope).forEach(scopeKey => {
        const scopeValue = scope[scopeKey];
        if (Array.isArray(scopeValue)) {
            scopeValue.forEach(v => {
                scopes.push(`${scopeKey}:${v}`);
            })
        } else {
            scopes.push(`${scopeKey}:${scopeValue}`);
        }
    });

    function recursive(obj) {

        // break reference
        obj = Object.assign({}, obj);

        Object.keys(obj).forEach(prop => {
            const value = obj[prop];
            if (prop.split(':').length === 2) {
                if (scopes.indexOf(prop) !== -1 || scopes.indexOf(`${prop.split(':')[0]}:*`) !== -1) {
                    if (__isPlainObject(value)) {
                        Object.keys(value).forEach(valueProp => {
                            obj[valueProp] = value[valueProp];
                        });
                    }
                }
                delete obj[prop];
            }
        });

        let needRecursion = false;
        for (let i=0; i<Object.keys(obj).length; i++) {
            const prop = Object.keys(obj)[i];
            if (prop.split(':').length === 2) {
                needRecursion = true;
                break;
            }
        }
        if (needRecursion) {
            obj = recursive(obj);
        }

        if (settings?.deep) {
            Object.keys(obj).forEach(prop => {
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