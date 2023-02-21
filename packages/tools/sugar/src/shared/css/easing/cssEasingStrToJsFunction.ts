import __bezierEasing from 'bezier-easing';

/**
 * @name      cssEasingStrToJsFunction
 * @namespace            shared.css.easing
 * @type      Function
 * @platform          js
 * @status          beta
 *
 * Convert a css easing string line "cubic-bezier(.17,.67,.83,.67)" to a js easing function
 *
 * @param 		{String}            easing              The easing you want to convert
 * @return      {Function}                               The js easing function
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __cssEasingStrToJsFunction } from '@coffeekraken/sugar/css'
 * const fn = __cssEasingStrToJsFunction('cubic-bezier(.17,.67,.83,.67)');
 * fn(0.5);
 * fn(0.34);
 *
 * @see             https://www.npmjs.com/package/bezier-easing
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IEasingFunction {
    (t: number): number;
}

export default function __cssEasingStrToJsFunction(
    easing: string,
): IEasingFunction {
    // linear easing by default
    let params = [0, 0, 1, 1];

    switch (easing) {
        case 'ease':
            params = [0.25, 1, 0.25, 1];
            break;
        case 'ease-in-out':
            params = [0.42, 0, 0.58, 1];
            break;
        case 'ease-in':
            params = [0.42, 0, 1, 1];
            break;
        case 'ease-out':
            params = [0, 0, 0.58, 1];
            break;
        case 'linear':
            break;
        default:
            params = easing
                .replace(/^cubic-bezier\(/, '')
                .replace(/\)$/, '')
                .split(',')
                .map((v) => parseFloat(v));
            break;
    }
    // @ts-ignore
    return __bezierEasing(...params);
}
