"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                    extension
 * @namespace           sugar.js.file
 * @type                    Function
 * @stable
 *
 * Return the passed file path extension
 *
 * @param           {String}            path                The file path to get the extension from
 * @return          {String}                                The file extension
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import extension from '@coffeekraken/sugar/js/file/extension';
 * extension('hello/world.jpg'); // => jpg
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extension(path) {
    const lastPart = path.split('/').pop();
    if (!lastPart.includes('.'))
        return '';
    return path.split('.').pop();
}
exports.default = extension;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSTtJQUNyQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMvQixDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=