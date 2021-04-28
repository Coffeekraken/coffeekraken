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
 * @status              wip
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
        const parsedStatement = parse_es6_imports_1.default(statement)[0];
        if (parsedStatement) {
            this.raw = statement;
            this.path = parsedStatement.fromModule;
            this.default = parsedStatement.defaultImport;
            this.star = parsedStatement.starImport;
            this.named = parsedStatement.namedImports.map((n) => {
                return {
                    name: n.name,
                    as: n.value
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0VzNkltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvZXM2L1NFczZJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBR2QsMEVBQWtEO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBcUIsVUFBVTtJQXFGN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUFTO1FBbkVyQjs7Ozs7Ozs7V0FRRztRQUNILFFBQUcsR0FBRyxJQUFJLENBQUM7UUFFWDs7Ozs7Ozs7V0FRRztRQUNILFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWjs7Ozs7Ozs7V0FRRztRQUNILFlBQU8sR0FBRyxJQUFJLENBQUM7UUFFZjs7Ozs7Ozs7V0FRRztRQUNILFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQWFULE1BQU0sZUFBZSxHQUFHLDJCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksZUFBZSxFQUFFO1lBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQztZQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxhQUFhLENBQUM7WUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDbEQsT0FBTztvQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7b0JBQ1osRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLO2lCQUNaLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQTVHRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJO1FBQ25CLHdCQUF3QjtRQUN4QixNQUFNLEdBQUcsR0FBRyxxQ0FBcUMsQ0FBQztRQUNsRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNsQyxPQUFPLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQXFGRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUTtRQUNOLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7U0FDaEM7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDbkMsTUFBTSxJQUFJLElBQUksQ0FBQzthQUNoQjtpQkFBTTtnQkFDTCxNQUFNLElBQUksR0FBRyxDQUFDO2FBQ2Y7U0FDRjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNuQyxNQUFNLElBQUksSUFBSSxDQUFDO1lBQ2YsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLO2lCQUNqQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDVCxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1IsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQ2Y7WUFDSCxDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQztTQUNqQjtRQUNELE1BQU0sSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNqQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUF6SkQsNkJBeUpDIn0=