"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_es6_imports_1 = __importDefault(require("parse-es6-imports"));
/**
 * @name            SEs6Import
 * @namespace            js.es6
 * @type            Class
 * @platform          js
 * @platform          node
 * @status              alpha
 *
 * This class represent an es6 import statement with properties like:
 * - path {String}: The import path
 * - default {String}: The default import name
 * - star {String}: The start import name "import * as something from ..."
 * - named {Array<Object>}: THe named imports
 * - raw {String}: The raw import statement
 *
 * @param           {String}        statement           The import statement
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SEs6Import from '@coffeekraken/sugar/js/es6/SEs6Import';
 * const import = new SEs6Import('import coco from "something";');
 *
 * @since           2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
class SEs6Import {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    constructor(statement) {
        /**
         * @name      raw
         * @type      String
         *
         * Store the raw statement string
         *
         * @since         2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        this.raw = null;
        /**
         * @name      path
         * @type      String
         *
         * Store the statement path
         *
         * @since         2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        this.path = null;
        /**
         * @name      default
         * @type      String
         *
         * Store the statement default import name
         *
         * @since         2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        this.default = null;
        /**
         * @name      star
         * @type      String
         *
         * Store the statement star name like "import * as coco from ..."
         *
         * @since         2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        this.star = null;
        /**
         * @name      named
         * @type      Array<Object>
         *
         * Store the statement named imports with these properties:
         * - name {String}: The import name
         * - as {String}: The import as alias
         *
         * @since         2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        this.named = [];
        const parsedStatement = (0, parse_es6_imports_1.default)(statement)[0];
        if (parsedStatement) {
            this.raw = statement;
            this.path = parsedStatement.fromModule;
            this.default = parsedStatement.defaultImport;
            this.star = parsedStatement.starImport;
            this.named = parsedStatement.namedImports.map((n) => {
                return {
                    name: n.name,
                    as: n.value,
                };
            });
        }
    }
    /**
     * @name            parseCode
     * @type            Function
     * @static
     *
     * This function simply parse the passed code and return an array of all the
     * founded es6 imports
     *
     * @param       {String}            code            The code to parse
     * @return      {Array<SEs6Import}                  An array of all the founded es6 imports
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    static parseCode(code) {
        // search for statements
        const reg = /^[\s]{0,999999}import\s[^\r\n;].*/gm;
        let matches = code.match(reg);
        if (!matches) {
            return [];
        }
        matches = matches.map((statement) => {
            return new SEs6Import(statement.trim());
        });
        return matches;
    }
    /**
     * @name          toString
     * @type          Function
     *
     * Return the builded version of the import
     *
     * @return        {String}        The build version of the statement
     *
     * @since         2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    toString() {
        let string = 'import ';
        if (this.star) {
            string += `* as ${this.star} `;
        }
        if (this.default) {
            string += `${this.default}`;
            if (this.named && this.named.length) {
                string += ', ';
            }
            else {
                string += ' ';
            }
        }
        if (this.named && this.named.length) {
            string += '{ ';
            string += this.named
                .map((n) => {
                if (n.as) {
                    return `${n.name} as ${n.as}`;
                }
                else {
                    return n.name;
                }
            })
                .join(', ');
            string += ' } ';
        }
        string += `from "${this.path}";`;
        return string;
    }
}
exports.default = SEs6Import;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBFQUFrRDtBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsTUFBcUIsVUFBVTtJQXFGM0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUFTO1FBbkVyQjs7Ozs7Ozs7V0FRRztRQUNILFFBQUcsR0FBRyxJQUFJLENBQUM7UUFFWDs7Ozs7Ozs7V0FRRztRQUNILFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWjs7Ozs7Ozs7V0FRRztRQUNILFlBQU8sR0FBRyxJQUFJLENBQUM7UUFFZjs7Ozs7Ozs7V0FRRztRQUNILFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQWFQLE1BQU0sZUFBZSxHQUFHLElBQUEsMkJBQWlCLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxlQUFlLEVBQUU7WUFDakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQztZQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUM7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNoRCxPQUFPO29CQUNILElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtvQkFDWixFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUs7aUJBQ2QsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBNUdEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUk7UUFDakIsd0JBQXdCO1FBQ3hCLE1BQU0sR0FBRyxHQUFHLHFDQUFxQyxDQUFDO1FBQ2xELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBcUZEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRO1FBQ0osSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLE1BQU0sSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztTQUNsQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxJQUFJLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEdBQUcsQ0FBQzthQUNqQjtTQUNKO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxJQUFJLENBQUM7WUFDZixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUs7aUJBQ2YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNOLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztpQkFDakM7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO2lCQUNqQjtZQUNMLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQztTQUNuQjtRQUNELE1BQU0sSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNqQyxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUF6SkQsNkJBeUpDIn0=