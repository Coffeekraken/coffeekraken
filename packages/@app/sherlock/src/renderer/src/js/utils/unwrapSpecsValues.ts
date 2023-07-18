import { __flatten, __set } from '@coffeekraken/sugar/object';

/**
 * This util function just remove the "value": ... from the data getted
 * by the s-specs-editor-component.
 */
export default function unwrapSpecsValues(values: any): any {
    const flattened = __flatten(values);
    const finalValues = {};

    for (let [key, value] of Object.entries(flattened)) {
        __set(finalValues, key.replaceAll('.value', ''), value);
    }

    return finalValues;
}
