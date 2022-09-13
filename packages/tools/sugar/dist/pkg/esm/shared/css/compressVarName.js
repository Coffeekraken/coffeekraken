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
 * import { __compressVarName } from '@coffeekraken/sugar/css';
 * __compressVarName('--something-long-that-you-want-to-compress');
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __compressVarName(name) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FBQyxJQUFJO0lBQzFDLHlEQUF5RDtJQUN6RCxPQUFPLElBQUksQ0FBQztJQUVaLGtDQUFrQztJQUNsQyxtQkFBbUI7SUFDbkIsSUFBSTtJQUVKLG1DQUFtQztJQUNuQyx1REFBdUQ7SUFDdkQsK0NBQStDO0lBQy9DLGtDQUFrQztJQUNsQyxTQUFTO0lBQ1QseUJBQXlCO0lBQ3pCLGlCQUFpQjtJQUNqQixxQ0FBcUM7SUFDckMsaUJBQWlCO0lBQ2pCLG1DQUFtQztBQUN2QyxDQUFDIn0=