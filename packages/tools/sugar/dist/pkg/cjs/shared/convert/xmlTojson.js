"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fast_xml_parser_1 = require("fast-xml-parser");
/**
 * @name            xmlToJson
 * @namespace            js.convert
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
 * @todo        interface
 * @todo        doc
 *
 * @see             https://www.npmjs.com/package/fast-xml-parser
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function xmlToJson(xml) {
    const parser = new fast_xml_parser_1.XMLParser();
    return parser.parse(xml);
}
exports.default = xmlToJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQTRDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBd0IsU0FBUyxDQUFDLEdBQVc7SUFDekMsTUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBUyxFQUFFLENBQUM7SUFDL0IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFIRCw0QkFHQyJ9