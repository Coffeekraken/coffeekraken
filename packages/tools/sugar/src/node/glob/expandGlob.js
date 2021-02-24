"use strict";
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            expandGlob
 * @namespace       sugar.js.glob
 * @type            Function
 *
 * This function take some extended glob pattern(s) and expand them to standard supported
 * glob patterns. With this, you will have access to some syntax sugar like these:
 * - /something/**{2,4}/*.ts => **{2,4} = search in level 2 bis level 4
 *
 * @param       {String|Array<String>}      globs           The glob(s) to expand
 * @return      {Array<String>}                             An array of expanded globs
 *
 * @example         js
 * import expandGlob from '@coffeekraken/sugar/js/glob/expandGlob';
 * expandGlob('/something/**{2,4}/*.ts');
 * // ['/something/* /* /*.ts','/something/* /* /* /*.ts', '/something/* /* /* /* /*.ts']
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function expandGlob(globs) {
    if (!Array.isArray(globs))
        globs = [globs];
    const finalPatterns = [];
    globs.forEach((globPattern) => {
        // handle "maxDepth"
        const maxDepthMatch = globPattern.match(/\/?\*\*\{(([0-9]+,[0-9]+|[0-9]+))\}\/?/gm);
        if (maxDepthMatch) {
            const minMaxStr = maxDepthMatch[0]
                .replace('**{', '')
                .replace('}', '')
                .replace(/[\{\}\/]/g, '');
            let toReplace = maxDepthMatch[0].replace(/\//g, '');
            const spl = minMaxStr.split(',');
            let min = 0;
            let max = parseInt(spl[0]);
            if (spl.length === 2) {
                min = parseInt(spl[0]);
                max = parseInt(spl[1]);
            }
            let foldersArray = [
                ...'* '
                    .repeat(min)
                    .split(' ')
                    .filter((l) => l !== '')
            ];
            for (let i = min; i < max; i++) {
                finalPatterns.push(globPattern
                    .replace(toReplace, foldersArray.join('/'))
                    .replace(/\/\//g, '/'));
                foldersArray.push('*');
            }
            finalPatterns.push(globPattern
                .replace(toReplace, foldersArray.join('/'))
                .replace(/\/\//g, '/'));
        }
        else {
            finalPatterns.push(globPattern);
        }
    });
    return finalPatterns;
}
exports.default = expandGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kR2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cGFuZEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7O0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxLQUFLO0lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNDLE1BQU0sYUFBYSxHQUFhLEVBQUUsQ0FBQztJQUVuQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDNUIsb0JBQW9CO1FBQ3BCLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQ3JDLDBDQUEwQyxDQUMzQyxDQUFDO1FBQ0YsSUFBSSxhQUFhLEVBQUU7WUFDakIsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztpQkFDL0IsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7aUJBQ2xCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2lCQUNoQixPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTVCLElBQUksU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXBELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ1osSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEI7WUFDRCxJQUFJLFlBQVksR0FBRztnQkFDakIsR0FBRyxJQUFJO3FCQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDM0IsQ0FBQztZQUNGLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlCLGFBQWEsQ0FBQyxJQUFJLENBQ2hCLFdBQVc7cUJBQ1IsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMxQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUN6QixDQUFDO2dCQUNGLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDeEI7WUFDRCxhQUFhLENBQUMsSUFBSSxDQUNoQixXQUFXO2lCQUNSLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDMUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDekIsQ0FBQztTQUNIO2FBQU07WUFDTCxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDO0FBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=