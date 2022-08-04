"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uncamelize_1 = __importDefault(require("../../../shared/string/uncamelize"));
const autoCast_1 = __importDefault(require("../../../shared/string/autoCast"));
const toString_1 = __importDefault(require("../../../shared/string/toString"));
/**
 * @name      dataset
 * @namespace            js.dom.data
 * @type      Function
 * @platform          js
 * @status              wip
 *
 * Get or set a value on the passed element with the passed name
 *
 * @param       {HTMLElement}       $elm         The HTMLElement on which to set to value
 * @param       {String}            key         The key to set the data
 * @param       {Mixed}             [value=null]  The value to set
 * @return      {Mixed}                         Return the value wanted or setted
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import dataset from '@coffeekraken/sugar/js/dom/dataset';
 * dataset(myCoolElement, 'hello', 'world'); // => 'world';
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function dataset($elm, key, value = null) {
    if (!$elm.getAttribute)
        return;
    if (!value) {
        const v = $elm.dataset[key] || $elm.getAttribute('data-' + (0, uncamelize_1.default)(key));
        return (0, autoCast_1.default)(v);
    }
    else {
        // try to set the value
        const dataset = $elm.dataset;
        if (dataset) {
            $elm.dataset[key] = (0, toString_1.default)(value);
        }
        else {
            // set the data through setAttribute
            // cause no support for dataset
            $elm.setAttribute('data-' + (0, uncamelize_1.default)(key), (0, toString_1.default)(value));
        }
        // return the element
        return $elm;
    }
}
exports.default = dataset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG1GQUE2RDtBQUM3RCwrRUFBeUQ7QUFDekQsK0VBQXlEO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJO0lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtRQUFFLE9BQU87SUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE1BQU0sQ0FBQyxHQUNILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBWSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEUsT0FBTyxJQUFBLGtCQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7U0FBTTtRQUNILHVCQUF1QjtRQUN2QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFBLGtCQUFVLEVBQUMsS0FBSyxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNILG9DQUFvQztZQUNwQywrQkFBK0I7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBWSxFQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUEsa0JBQVUsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QscUJBQXFCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=