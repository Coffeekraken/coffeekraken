/**
 * @name            compressVarName
 * @namespace       shared.css
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This function allows you to compress a css variable name only when the environment is production
 *
 * @param       {String}         name       The name to compress
 * @return      {String}                The compressed variable name
 *
 * @snippet         __compressCssVarName($1)
 * 
 * @example         js
 * import { __compressCssVarName } from '@coffeekraken/sugar/css';
 * __compressCssVarName('--something-long-that-you-want-to-compress');
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __compressCssVarName(name) {
    const original = name;

    function compress(varName) {
        const base64 = varName.toLowerCase().replace(/\-/gm, '');
        const dict = 'abcdefghijklmnopqrstuvwxyz0123456789=- ';
        const sum =
            base64.split('').reduce((a, b) => {
                return a + dict.indexOf(b);
            }, 0) + name.length;
        const invert = sum <= 250;
        const compressed = base64
            .split('')
            .filter((char, i) => !(i % 5))
            .join('')
            .toLowerCase();
        let finalHash = `${compressed}`;
        if (invert) {
            finalHash = finalHash.split('').reverse().join('');
        }
        // console.log(original, `--${finalHash}${sum}`);

        return `--${finalHash}${sum}`;
    }

    const matches = name.match(/(--[a-zA-Z0-9_-]+)/gm);
    if (!matches) {
        return name;
    }
    matches.forEach((varName) => {
        if (varName.length <= 13) return;
        name = name.replace(varName, compress(varName));
    });

    return name;
}
