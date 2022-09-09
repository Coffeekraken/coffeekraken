"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
/**
 * @name            checkPathWithMultipleExtensions
 * @namespace            node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function take a path and some extensions to check if a file
 * exists with one of these particular extensions.
 * If a file exists, the function return the path with the first extensions that matches
 *
 * @todo        tests
 *
 * @param       {String}            path            The file path you want to check. With or without an extension
 * @param       {Array<String>}     extensions      The extensions (without the dot) you want to check
 * @return      {String|undefined}                  The first valid path founded, or undefined
 *
 * @example         js
 * import { __checkPathWithMultipleExtensions } from '@coffeekraken/sugar/fs';
 * __checkPathWithMultipleExtensions('/my/cool/file.txt', ['txt','js','css']);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __checkPathWithMultipleExtensions(path, exts) {
    const extension = (0, fs_1.__extension)(path) || '';
    const pathWithoutExt = path.replace(`.${extension}`, '');
    for (let i = 0; i < exts.length; i++) {
        const ext = exts[i];
        if (fs_2.default.existsSync(`${pathWithoutExt}.${ext}`)) {
            return `${pathWithoutExt}.${ext}`;
        }
    }
    return undefined;
}
exports.default = __checkPathWithMultipleExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQXFEO0FBQ3JELDRDQUFzQjtBQUd0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUF3QixpQ0FBaUMsQ0FDckQsSUFBWSxFQUNaLElBQWM7SUFFZCxNQUFNLFNBQVMsR0FBRyxJQUFBLGdCQUFXLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTFDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsY0FBYyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDN0MsT0FBTyxHQUFHLGNBQWMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNyQztLQUNKO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQWRELG9EQWNDIn0=