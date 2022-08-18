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
 * @example         js
 * import compressVarName from '@coffeekraken/sugar/shared/css/compressVarName';
 * compressVarName('--something-long-that-you-want-to-compress');
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function compressVarName(name) {
    // @TODO            implement correctly this optimization
    return name;

    // if (!__SEnv.is('production')) {
    //     return name;
    // }

    // const md5 = __md5.encrypt(name);
    // const dict = 'abcdefghijklmnopqrstuvwxyz0123456789';
    // const sum = md5.split('').reduce((a, b) => {
    //     return a + dict.indexOf(b);
    // }, 0);
    // const compressed = md5
    //     .split('')
    //     .filter((char, i) => !(i % 5))
    //     .join('');
    // return `--s${sum}${compressed}`;
}
