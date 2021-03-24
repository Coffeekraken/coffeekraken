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
 * @param       {String}            content             The content you want to process
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHV0VXNlU3RhdGVtZW50c09uVG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHV0VXNlU3RhdGVtZW50c09uVG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLHFCQUFxQixDQUFDLE9BQU87SUFDcEMscURBQXFEO0lBQ3JELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNuRCxJQUFJLFVBQVUsRUFBRTtRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sR0FBRztjQUNGLFlBQVk7Y0FDWixPQUFPO1NBQ1osQ0FBQztTQUNMO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBQ0Qsa0JBQWUscUJBQXFCLENBQUMifQ==