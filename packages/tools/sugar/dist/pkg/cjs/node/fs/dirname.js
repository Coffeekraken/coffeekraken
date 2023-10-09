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
 * @snippet         __dirname()
 *
 * @example             js
 * import { __dirname } from '@coffeekraken/sugar/fs';
 * __dirname(import);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function dirname(importMeta) {
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
    pathLine = pathLine
        .trim()
        .replace(/at\s/, '')
        .replace('file://', '')
        .replace('webpack-internal:///(rsc)', '')
        .split(' ')
        .pop();
    const filePathMatch = pathLine.match(/\(?([a-zA-Z0-9_\.-\/].*)\:[0-9]+\:[0-9]+\)?/);
    if (!(filePathMatch === null || filePathMatch === void 0 ? void 0 : filePathMatch[1])) {
        console.log('E', stackArray, pathLine);
    }
    let finalFilePath = filePathMatch[1];
    if (finalFilePath.startsWith('/..')) {
        finalFilePath = path_1.default.resolve(process.cwd(), finalFilePath.replace(/\//, ''));
    }
    return path_1.default.dirname(finalFilePath);
}
exports.default = dirname;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsT0FBTyxDQUFDLFVBQWU7SUFDM0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUUxQixhQUFhO0lBQ2IsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsSUFBSSxRQUFRLEVBQ1IsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QixTQUFTO1NBQ1o7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsRUFBRTtZQUM3QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDeEIsU0FBUztTQUNaO2FBQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzFCLFNBQVM7U0FDWjtRQUNELFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsTUFBTTtLQUNUO0lBRUQsUUFBUSxHQUFHLFFBQVE7U0FDZCxJQUFJLEVBQUU7U0FDTixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUNuQixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztTQUN0QixPQUFPLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxDQUFDO1NBQ3hDLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixHQUFHLEVBQUUsQ0FBQztJQUVYLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQ2hDLDZDQUE2QyxDQUNoRCxDQUFDO0lBRUYsSUFBSSxDQUFDLENBQUEsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFHLENBQUMsQ0FBQyxDQUFBLEVBQUU7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzFDO0lBRUQsSUFBSSxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJDLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNqQyxhQUFhLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDMUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUNsQyxDQUFDO0tBQ0w7SUFFRCxPQUFPLGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQWxERCwwQkFrREMifQ==