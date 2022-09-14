// @ts-nocheck

import __isPlainObject from '../is/isPlainObject';

/**
 * @name                toPlainObject
 * @namespace            shared.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function take an object as parameter and return a new one that does not have getters, setters, etc...
 *
 * @param           {Object}            object
 * @param           {Object}            [settings={}]       Some settings to configure your process
 * @return          {Object}                              The new simple object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import { __toPlainObject } from '@coffeekraken/sugar/object';
 * __toPlainObject({ something: 'cool' });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IToPlainObjectSettings {
    deep: boolean;
}
export default function __toPlainObject(
    object: any,
    settings?: Partial<IToPlainObjectSettings>,
): any {
    const finalSettings = {
        deep: true,
        ...(settings ?? {}),
    };

    function clean(obj) {
        const newObj = Object.assign({}, obj);
        for (let [key, value] of Object.entries(newObj)) {
            newObj[key] = value;
            if (finalSettings.deep && __isPlainObject(newObj[key])) {
                newObj[key] = clean(newObj[key]);
            }
        }
        return newObj;
    }

    const newObj = clean(object);

    return newObj;
}
