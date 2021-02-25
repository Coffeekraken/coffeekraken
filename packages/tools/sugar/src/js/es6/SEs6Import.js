// @ts-nocheck
// @shared
import __parseEs6Imports from 'parse-es6-imports';
/**
 * @name            SEs6Import
 * @namespace       sugar.js.es6
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
export default class SEs6Import {
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
        const parsedStatement = __parseEs6Imports(statement)[0];
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
     * @param       {String}            code            The code to parse
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0VzNkltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFczZJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFHVixPQUFPLGlCQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFVO0lBcUY3Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFNBQVM7UUFuRXJCOzs7Ozs7OztXQVFHO1FBQ0gsUUFBRyxHQUFHLElBQUksQ0FBQztRQUVYOzs7Ozs7OztXQVFHO1FBQ0gsU0FBSSxHQUFHLElBQUksQ0FBQztRQUVaOzs7Ozs7OztXQVFHO1FBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztRQUVmOzs7Ozs7OztXQVFHO1FBQ0gsU0FBSSxHQUFHLElBQUksQ0FBQztRQUVaOzs7Ozs7Ozs7O1dBVUc7UUFDSCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBYVQsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxlQUFlLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQztZQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUM7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsRCxPQUFPO29CQUNMLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtvQkFDWixFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUs7aUJBQ1osQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBNUdEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUk7UUFDbkIsd0JBQXdCO1FBQ3hCLE1BQU0sR0FBRyxHQUFHLHFDQUFxQyxDQUFDO1FBQ2xELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBcUZEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLE1BQU0sSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztTQUNoQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNuQyxNQUFNLElBQUksSUFBSSxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxHQUFHLENBQUM7YUFDZjtTQUNGO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ25DLE1BQU0sSUFBSSxJQUFJLENBQUM7WUFDZixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUs7aUJBQ2pCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNULElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDUixPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7aUJBQy9CO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztpQkFDZjtZQUNILENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDO1NBQ2pCO1FBQ0QsTUFBTSxJQUFJLFNBQVMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ2pDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRiJ9