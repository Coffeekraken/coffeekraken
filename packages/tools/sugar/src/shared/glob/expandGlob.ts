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
 * expandGlob('/something/**{2,4}/*.ts');
 * // ['/something/* /* /*.ts','/something/* /* /* /*.ts', '/something/* /* /* /* /*.ts']
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function expandGlob(globs) {
    if (!Array.isArray(globs)) globs = [globs];

    const finalPatterns: string[] = [];

    globs.forEach((globPattern) => {
        // handle "maxDepth"
        const maxDepthMatch = globPattern.match(
            /\/?\*\*\{(([0-9]+,[0-9]+|[0-9]+))\}\/?/gm,
        );
        if (maxDepthMatch) {
            const minMaxStr = maxDepthMatch[0]
                .replace('**{', '')
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
                finalPatterns.push(
                    globPattern
                        .replace(toReplace, foldersArray.join('/'))
                        .replace(/\/\//g, '/'),
                );
                foldersArray.push('*');
            }
            finalPatterns.push(
                globPattern
                    .replace(toReplace, foldersArray.join('/'))
                    .replace(/\/\//g, '/'),
            );
        } else {
            finalPatterns.push(globPattern);
        }
    });

    return finalPatterns;
}
export default expandGlob;
