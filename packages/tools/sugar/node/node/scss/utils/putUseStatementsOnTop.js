"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                putUseStatementsOnTop
 * @namespace           sugar.node.scss.utils
 * @type                Function
 * @status              beta
 *
 * This function simply search for "@use" statements in the passed content
 * and put them on top of the string
 *
 * @param       {String}            content             The content you want to process
 * @return      {String}                                The processed content
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import putUseStatementsOnTop from '@coffeekraken/sugar/node/scss/utils/putUseStatementsOnTop';
 * putUseStatementsOnTop(`
 *     $something: 'cool';
 *     \@use 'my/cool/library' as MyCoolLibrary;
 * `);
 * // \@use 'my/cool/library' as MyCoolLibrary;
 * // $something: 'cool';
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function putUseStatementsOnTop(content) {
    // take all the "@use" statements and put them on top
    const useMatches = content.match(/@use\s.*[^;]/gm);
    if (useMatches) {
        for (let i = useMatches.length; i > 0; i--) {
            const useStatement = useMatches[i - 1];
            content = content.replace(useStatement, '');
            content = `
            ${useStatement}
            ${content}
        `;
        }
    }
    return content;
}
exports.default = putUseStatementsOnTop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHV0VXNlU3RhdGVtZW50c09uVG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvc2Nzcy91dGlscy9wdXRVc2VTdGF0ZW1lbnRzT25Ub3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7O0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMscUJBQXFCLENBQUMsT0FBTztJQUNwQyxxREFBcUQ7SUFDckQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ25ELElBQUksVUFBVSxFQUFFO1FBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUMsT0FBTyxHQUFHO2NBQ0YsWUFBWTtjQUNaLE9BQU87U0FDWixDQUFDO1NBQ0w7S0FDRjtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxrQkFBZSxxQkFBcUIsQ0FBQyJ9