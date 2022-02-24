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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kR2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cGFuZEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxLQUFLO0lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNDLE1BQU0sYUFBYSxHQUFhLEVBQUUsQ0FBQztJQUVuQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDMUIsb0JBQW9CO1FBQ3BCLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQ25DLHdDQUF3QyxDQUMzQyxDQUFDO1FBQ0YsSUFBSSxhQUFhLEVBQUU7WUFDZixNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO2lCQUM3QixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztpQkFDakIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7aUJBQ2hCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFOUIsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdEQsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDbEIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtZQUNELE1BQU0sWUFBWSxHQUFHO2dCQUNqQixHQUFHLElBQUk7cUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxLQUFLLENBQUMsR0FBRyxDQUFDO3FCQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUMvQixDQUFDO1lBQ0YsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUIsYUFBYSxDQUFDLElBQUksQ0FDZCxXQUFXO3FCQUNOLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDMUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDN0IsQ0FBQztnQkFDRixZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzFCO1lBQ0QsYUFBYSxDQUFDLElBQUksQ0FDZCxXQUFXO2lCQUNOLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDMUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDN0IsQ0FBQztTQUNMO2FBQU07WUFDSCxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==