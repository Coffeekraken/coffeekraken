"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
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
function default_1(importMeta) {
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
    const dirPath = path_1.default.dirname(filePath).replace('file:', '');
    return dirPath;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILG1CQUF5QixVQUFlO0lBQ3BDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7SUFFMUIsYUFBYTtJQUNiLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLElBQUksUUFBUSxFQUNSLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUU3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDN0IsU0FBUztTQUNaO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLEVBQUU7WUFDN0MsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLFNBQVM7U0FDWjthQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixTQUFTO1NBQ1o7UUFDRCxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE1BQU07S0FDVDtJQUVELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQ2hDLHlEQUF5RCxDQUM1RCxDQUFDO0lBQ0YsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sT0FBTyxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5RCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBOUJELDRCQThCQyJ9