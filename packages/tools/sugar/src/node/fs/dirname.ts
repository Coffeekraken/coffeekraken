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
export default function (importMeta: any): string {
    const error = new Error();

    // @ts-ignore
    const stackArray = error.stack.split('\n');

    let pathLine,
        dirnameLineFound = false;

    for (let i = 0; i < stackArray.length; i++) {
        const line = stackArray[i];
        if (!line.trim().match(/^at\s/)) {
            continue;
        }
        if (line.match(/\/dirname\.js:[0-9]+:[0-9]+\)/)) {
            dirnameLineFound = true;
            continue;
        } else if (!dirnameLineFound) {
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
