"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimatch_1 = __importDefault(require("minimatch"));
const deepize_1 = __importDefault(require("./deepize"));
const flatten_1 = __importDefault(require("./flatten"));
/**
 * @name                          getGlob
 * @namespace            shared.object
 * @type                          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue".
 * It support glob patterns like "something.*.id" and returns you a new object containing
 * all values with the path that matches the passed glob pattern.
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @param               {Object}            [settings={}]           A settings object to configure your glob get process
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @setting         {Boolean}               [deepize=true]          Specify if you want the result object to be deepized using the ```deepize``` sugar function
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import { __getGlob } from '@coffeekraken/sugar/object';
 * __getGlob({
 *  hello: {
 *     world: true,
 *     plop: false
 * }, 'hello.*');
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __getGlob(obj, glob, settings = {}) {
    settings = Object.assign({ deepize: true }, settings);
    const flat = (0, flatten_1.default)(obj);
    const resultObj = {};
    Object.keys(flat).forEach((path) => {
        if ((0, minimatch_1.default)(path, glob)) {
            resultObj[path] = flat[path];
        }
    });
    if (settings.deepize === true)
        return (0, deepize_1.default)(resultObj);
    return resultObj;
}
exports.default = __getGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUNwQyx3REFBa0M7QUFDbEMsd0RBQWtDO0FBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxTQUF3QixTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN0RCxRQUFRLG1CQUNKLE9BQU8sRUFBRSxJQUFJLElBQ1YsUUFBUSxDQUNkLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFBLGlCQUFTLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFFNUIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxJQUFBLG1CQUFXLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJO1FBQUUsT0FBTyxJQUFBLGlCQUFTLEVBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQWxCRCw0QkFrQkMifQ==