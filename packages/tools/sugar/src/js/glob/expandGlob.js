// @shared
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
export default expandGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kR2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cGFuZEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBUyxVQUFVLENBQUMsS0FBSztJQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUzQyxNQUFNLGFBQWEsR0FBYSxFQUFFLENBQUM7SUFFbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQzVCLG9CQUFvQjtRQUNwQixNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUNyQywwQ0FBMEMsQ0FDM0MsQ0FBQztRQUNGLElBQUksYUFBYSxFQUFFO1lBQ2pCLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7aUJBQy9CLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO2lCQUNsQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztpQkFDaEIsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU1QixJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVwRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNaLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsSUFBSSxZQUFZLEdBQUc7Z0JBQ2pCLEdBQUcsSUFBSTtxQkFDSixNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLEtBQUssQ0FBQyxHQUFHLENBQUM7cUJBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzNCLENBQUM7WUFDRixLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5QixhQUFhLENBQUMsSUFBSSxDQUNoQixXQUFXO3FCQUNSLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDMUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDekIsQ0FBQztnQkFDRixZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsYUFBYSxDQUFDLElBQUksQ0FDaEIsV0FBVztpQkFDUixPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQ3pCLENBQUM7U0FDSDthQUFNO1lBQ0wsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=