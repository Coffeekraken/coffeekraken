// @ts-nocheck

/**
 * @name        fromQuantifier
 * @namespace            shared.array
 * @type      Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * This function allows you to generate an array from a certain passed quantifier like "2", "<10", ">10", "9-12", etc...
 * This is useful to create arrays that are depending on user-friendly quantifier and it's used for example in the
 * s-postcss-sugar-plugin for the `@sugar.lod(>2)` mixin.
 *
 * @param       {String|Number}     quantifier          The quantifier to generate
 * @param       {IFromQuantifierSettings}       [settings={}]           Some settings to configure your array generation
 * @return    {Array}                                   The generated array
 *
 * @setting         {Number}        max             The maximum wanted when using > and >= quantifiers
 * @setting         {Function}      value           A function that take the current index and that MUST return the value wanted in the generated array
 *
 * @example    js
 * import { __fromQuantifier } from '@coffeekraken/sugar/array'
 * __fromQuantifier(3); // => [0,1,2]
 * __fromQuantifier('3-5'); // => [3,4,5]
 * __fromQuantifier('3-6', {
 *    value(i) => `c-${i}`
 * }); // => ['c-3','c-4','c-5','c-6']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IFromQuantifierSettings {
    max: number;
    value: Function;
    action: '>' | '<' | '>=' | '<=';
}

export default function __fromQuantifier(
    quantifier: string | number,
    settings?: Partial<IFromQuantifierSettings>,
): any[] {
    const finalSettings: IFromQuantifierSettings = {
        action: '<=',
        ...(settings ?? {}),
    };
    let action = finalSettings.action;

    const finalArray: any[] = [];

    if (typeof quantifier === 'number') {
        quantifier = `${action}${quantifier}`;
    }

    if (action.startsWith('>') && finalSettings.max === undefined) {
        throw new Error(
            `<red>[fromQuantifier]</red> When using the action ">" or ">=", you MUST specify a settings.max value`,
        );
    }

    const actionMatch = quantifier.match(/^((>|<)?\=?)/);
    if (actionMatch[0]) {
        action = actionMatch[0];
    }

    let startLevel,
        endLevel,
        levelInt = parseInt(quantifier.replace(/^(>|<)?\=?/, ''));
    if (quantifier.match(/[0-9]+\-[0-9]+/)) {
        const parts = quantifier.split('-');
        startLevel = parseInt(parts[0]);
        endLevel = parseInt(parts[1]);
    } else if (action === '>=') {
        startLevel = levelInt;
        endLevel = finalSettings.max;
    } else if (action === '<=') {
        startLevel = 0;
        endLevel = levelInt;
    } else if (action === '=') {
        startLevel = levelInt;
        endLevel = levelInt;
    } else if (action === '<') {
        startLevel = 0;
        endLevel = levelInt - 1;
    } else if (action === '>') {
        startLevel = levelInt + 1;
        endLevel = finalSettings.max;
    }

    // add the wanted level(s) in the stack
    for (let i = startLevel; i <= endLevel; i++) {
        if (finalSettings.value) {
            finalArray.push(finalSettings.value(i));
        } else {
            finalArray.push(i);
        }
    }

    return finalArray;
}
