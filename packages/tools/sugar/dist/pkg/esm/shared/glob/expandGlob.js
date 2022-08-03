/**
 * @name            expandGlob
 * @namespace            js.glob
 * @type            Function
 * @platform          js
 * @platform          node
 * @status            alpha
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
 * expandGlob('/something/*{2,4}/*.ts');
 * // ['/something/* /* /*.ts','/something/* /* /* /*.ts', '/something/* /* /* /* /*.ts']
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function expandGlob(globs) {
    if (!Array.isArray(globs))
        globs = [globs];
    const finalPatterns = [];
    globs.forEach((globPattern) => {
        // handle "maxDepth"
        const maxDepthMatch = globPattern.match(/\/?\*\{(([0-9]+,[0-9]+|[0-9]+))\}\/?/gm);
        if (maxDepthMatch) {
            const minMaxStr = maxDepthMatch[0]
                .replace('*{', '')
                .replace('}', '')
                .replace(/[\{\}\/]/g, '');
            const toReplace = maxDepthMatch[0].replace(/\//g, '');
            const spl = minMaxStr.split(',');
            let min = 0;
            let max = parseInt(spl[0]);
            if (spl.length === 2) {
                min = parseInt(spl[0]);
                max = parseInt(spl[1]);
            }
            const foldersArray = [
                ...'* '
                    .repeat(min)
                    .split(' ')
                    .filter((l) => l !== ''),
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
export default expandGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxVQUFVLENBQUMsS0FBSztJQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUzQyxNQUFNLGFBQWEsR0FBYSxFQUFFLENBQUM7SUFFbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQzFCLG9CQUFvQjtRQUNwQixNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUNuQyx3Q0FBd0MsQ0FDM0MsQ0FBQztRQUNGLElBQUksYUFBYSxFQUFFO1lBQ2YsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztpQkFDN0IsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7aUJBQ2pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2lCQUNoQixPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTlCLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXRELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ1osSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ2xCLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUI7WUFDRCxNQUFNLFlBQVksR0FBRztnQkFDakIsR0FBRyxJQUFJO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDL0IsQ0FBQztZQUNGLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVCLGFBQWEsQ0FBQyxJQUFJLENBQ2QsV0FBVztxQkFDTixPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQzdCLENBQUM7Z0JBQ0YsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxQjtZQUNELGFBQWEsQ0FBQyxJQUFJLENBQ2QsV0FBVztpQkFDTixPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQzdCLENBQUM7U0FDTDthQUFNO1lBQ0gsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxhQUFhLENBQUM7QUFDekIsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=