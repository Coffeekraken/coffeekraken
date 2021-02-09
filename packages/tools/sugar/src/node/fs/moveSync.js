"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        moveSync
 * @namespace           sugar.node.fs
 * @type          Function
 * @stable
 *
 * Moves a file or directory, even across devices (sync)
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import moveSync from '@coffeekraken/node/fs/moveSync';
 * try {
 *    moveSync('my/cool/dir', 'another/place/for/directory');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function moveSync(src, dest) {
    _fs.moveSync(src, dest);
}
exports.default = moveSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZVN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb3ZlU3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFJZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUk7SUFDekIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUNELGtCQUFlLFFBQVEsQ0FBQyJ9