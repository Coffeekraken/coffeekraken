"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            jsonStringify
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to stringify an object
 *
 * @param       {Object}        object      The object to stringify
 * @param       {Any}           arg1        The arg 1 of the JSON.stringify function
 * @param       {Number}        [tabWidth=4]        How many spaces tab has to be
 * @return      {String}                    The stringified object
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function jsonStringify(object, arg1, tabWidth = 4) {
    return JSON.stringify(object, arg1, tabWidth);
}
exports.default = jsonStringify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBd0IsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLENBQUM7SUFDNUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUZELGdDQUVDIn0=