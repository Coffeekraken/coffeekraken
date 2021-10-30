/**
 * @name            stripDocblocks
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This function simply take a string and get rid of all docblocks
 *
 * @param       {String}            str         The string to process
 * @return      {String}                        The processed string
 *
 * @example         js
 * import __stripDocblocks from '@coffeekraken/sugar/shared/string/stripDocblocks';
 * __stripDocblocks('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function stripDocblocks(str) {
    return str.replace(/(\/\*{2})([\s\S]+?)(\*\/)/gm, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBEb2NibG9ja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpcERvY2Jsb2Nrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWMsQ0FBQyxHQUFXO0lBQzlDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMxRCxDQUFDIn0=