import { XMLParser } from 'fast-xml-parser';

/**
 * @name            xmlToJson
 * @namespace            js.convert
 * @type            Function
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * This function take a xml string as input and return a json object.
 * Used under the hood the AMAZING [xml2json](https://www.npmjs.com/package/xml2json) package.
 *
 * @param       {String}            xml             The xml string to convert
 * @return      {Object}                            The corresponding json object
 *
 * @todo        interface
 * @todo        doc
 *
 * @see             https://www.npmjs.com/package/xml2json
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function xmlToJson(xml: string): any {
    const parser = new XMLParser();
    return parser.parse(xml);
}
