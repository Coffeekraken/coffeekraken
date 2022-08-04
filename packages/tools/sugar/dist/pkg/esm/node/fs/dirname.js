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
 * @example             js
 * import dirname from '@coffeekraken/sugar/node/fs/dirname';
 * dirname(import);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (importMeta) {
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
    const filePathMatch = pathLine.match(/(\(|file:\/\/)(.*)\:[0-9]+\:[0-9]+/);
    const filePath = filePathMatch[2];
    const dirPath = __path.dirname(filePath).replace('file:', '');
    return dirPath;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLFVBQWU7SUFDcEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUUxQixhQUFhO0lBQ2IsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsSUFBSSxRQUFRLEVBQ1IsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QixTQUFTO1NBQ1o7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsRUFBRTtZQUM3QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDeEIsU0FBUztTQUNaO2FBQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzFCLFNBQVM7U0FDWjtRQUNELFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsTUFBTTtLQUNUO0lBRUQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBRTNFLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUQsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyJ9