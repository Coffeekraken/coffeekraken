// @ts-nocheck
// @shared
import __deepMerge from '../../object/deepMerge';
import __SDocblock from '../../docblock/SDocblock';
/**
 * @name            htmlFromDocblocks
 * @namespace       sugar.js.convert
 * @type            Function
 * @status              wip
 *
 * Take a markdown string as input and convert it to HTML.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process:
 * @return      {String}                              The HTML converted result
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import htmlFromDocblocks from '@coffeekraken/sugar/js/convert/html/htmlFromDocblocks';
 * htmlFromDocblocks(`
 *  \/\*\*
 *   * @name    Hello world
 *  \*\/
 * `);
 * // <h1>Hello world</h1>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function htmlFromDocblocks(inputString, settings = {}) {
    settings = __deepMerge({}, settings);
    const sDocblock = new __SDocblock(inputString, settings);
    return sDocblock.toHtml(settings);
}
export default htmlFromDocblocks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbEZyb21Eb2NibG9ja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodG1sRnJvbURvY2Jsb2Nrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUdWLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ25ELFFBQVEsR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sU0FBUyxHQUFHLElBQUksV0FBVyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6RCxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUNELGVBQWUsaUJBQWlCLENBQUMifQ==