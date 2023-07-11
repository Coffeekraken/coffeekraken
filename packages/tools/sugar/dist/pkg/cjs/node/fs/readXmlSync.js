"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const xmlTojson_js_1 = __importDefault(require("../../shared/convert/xmlTojson.js"));
/**
 * @name            readXmlSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to read an xml file and get his content back as JSON
 *
 * @param       {String}           path            The xml file path to read
 * @return      {Object}                            The readed json
 *
 * @snippet         __readXmlSync($1)
 *
 * @example         js
 * import { __readXmlSync } from '@coffeekraken/sugar/fs';
 * __readXmlSync('my-cool-xml/file.xml');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const _cache = {};
function __readXmlSync(path) {
    if (_cache[path])
        return _cache[path];
    if (!fs_1.default.existsSync(path)) {
        throw new Error(`<red>[readXmlSync]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`);
    }
    const xmlStr = fs_1.default.readFileSync(path, 'utf8').toString();
    const json = (0, xmlTojson_js_1.default)(xmlStr);
    console.log('XML', json);
    _cache[path] = json;
    return json;
}
exports.default = __readXmlSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLHFGQUE0RDtBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbEIsU0FBd0IsYUFBYSxDQUFDLElBQVk7SUFDOUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFdEMsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxrRUFBa0UsSUFBSSw2QkFBNkIsQ0FDdEcsQ0FBQztLQUNMO0lBQ0QsTUFBTSxNQUFNLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUQsTUFBTSxJQUFJLEdBQUcsSUFBQSxzQkFBVyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDcEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQWJELGdDQWFDIn0=