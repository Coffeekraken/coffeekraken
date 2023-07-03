"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fast_xml_parser_1 = require("fast-xml-parser");
/**
 * @name            xmlToJson
 * @namespace            shared.convert
 * @type            Function
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * This function take a xml string as input and return a json object.
 *
 * @param       {String}            xml             The xml string to convert
 * @return      {Object}                            The corresponding json object
 *
 * @snippet         __xmlToJson($1)
 *
 * @example         js
 * import ( __xmlToJson ) from '@coffeekraken/sugar/convert';
 * __xmlToJson('...');
 *
 * @todo        interface
 * @todo        doc
 *
 * @see             https://www.npmjs.com/package/fast-xml-parser
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __xmlToJson(xml) {
    const parser = new fast_xml_parser_1.XMLParser();
    return parser.parse(xml);
}
exports.default = __xmlToJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQTRDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBd0IsV0FBVyxDQUFDLEdBQVc7SUFDM0MsTUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBUyxFQUFFLENBQUM7SUFDL0IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFIRCw4QkFHQyJ9