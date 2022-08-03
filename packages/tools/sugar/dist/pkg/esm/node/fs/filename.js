// @ts-nocheck
import __extension from './extension';
/**
 * @name                       filename
 * @namespace            node.fs
 * @type                        Function
 * @platform        node
 * @status          beta
 *
 * Return the filename from the passed path with or without the extension
 *
 * @param           {String}              path              The path to take the filename from
 * @param           {Boolean}             [withExtension=true]        Tell if we want the filename with or without the extension
 * @return          {String}                                  The requested filename
 *
 * @example       js
 * import filename from '@coffeekraken/sugar/node/fs/filename';
 * filename('hello/world.js'); // => world.js
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function filename(path, withExtension = true) {
    let filename = path.split('/').pop();
    if (!withExtension) {
        filename = filename.replace(`.${__extension(filename)}`, '');
    }
    return filename;
}
export default filename;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxHQUFHLElBQUk7SUFDeEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQyxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2hCLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDaEU7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBQ0QsZUFBZSxRQUFRLENBQUMifQ==