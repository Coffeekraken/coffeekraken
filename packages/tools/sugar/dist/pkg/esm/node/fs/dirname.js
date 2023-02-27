import __path from 'path';
/**
 * @name            dirname
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * Return the dirname the same as the __dirname cjs variable.
 * The only difference is that it's a function and you need to pass the "import" variable
 * from the filename in which you use this...
 *
 * @param       {Import}            import          The "import" variable from the file you use this function
 * @return      {String}                            The dirname path
 *
 * @snippet         __dirname()
 *
 * @example             js
 * import { __dirname } from '@coffeekraken/sugar/fs';
 * __dirname(import);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __dirname(importMeta) {
    const error = new Error();
    // @ts-ignore
    const stackArray = error.stack.split('\n');
    let pathLine, dirnameLineFound = false;
    for (let i = 0; i < stackArray.length; i++) {
        const line = stackArray[i];
        if (!line.trim().match(/^at\s/)) {
            continue;
        }
        if (line.match(/\/dirname\.js:[0-9]+:[0-9]+\)/)) {
            dirnameLineFound = true;
            continue;
        }
        else if (!dirnameLineFound) {
            continue;
        }
        pathLine = line;
        break;
    }
    const filePathMatch = pathLine.match(/(at\s|\(|file\:\/\/)(\/[a-zA-Z0-9_-].*)\:[0-9]+\:[0-9]+/);
    const filePath = filePathMatch[2];
    const dirPath = __path.dirname(filePath).replace('file:', '');
    return dirPath;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUFDLFVBQWU7SUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUUxQixhQUFhO0lBQ2IsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsSUFBSSxRQUFRLEVBQ1IsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QixTQUFTO1NBQ1o7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsRUFBRTtZQUM3QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDeEIsU0FBUztTQUNaO2FBQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzFCLFNBQVM7U0FDWjtRQUNELFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsTUFBTTtLQUNUO0lBRUQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FDaEMseURBQXlELENBQzVELENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMifQ==