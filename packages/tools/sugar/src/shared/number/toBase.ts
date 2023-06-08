// @ts-nocheck

/**
 * @name        toBase
 * @namespace            shared.number
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert a number to another base between 1 and the length of the "chars" settings
 *
 * @param       {Number}        number      The number to convert
 * @param       {Number}        base         The base to convert to
 * @return      {String}                    The converted number in string format
 *
 * @setting         {String}        [chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789']          The characters set to use for conversion
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __toBase($1, $2)
 *
 * @example    js
 * import { __toBase } from '@coffeekraken/sugar/number'
 * __toBase(1024, 62); // qF
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IToBaseSettings {
    chars: string;
}

export default function __toBase(
    num: number,
    base: number,
    settings?: IToBaseSettings,
): string {
    settings = {
        chars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        ...(settings ?? {}),
    };

    const symbols = settings.chars.split('');
    let conversion = '';

    if (num <= 0) {
        return symbols[0];
    }

    if (base > symbols.length || base <= 1) {
        base = symbols.length;
    }

    while (num >= 1) {
        conversion = symbols[num - base * Math.floor(num / base)] + conversion;
        num = Math.floor(num / base);
    }

    return `${base < 11 ? parseInt(conversion) : conversion}`;
}
