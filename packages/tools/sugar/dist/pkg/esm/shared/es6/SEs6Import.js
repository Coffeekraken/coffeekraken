// @ts-nocheck
import __parseEs6Imports from 'parse-es6-imports';
/**
 * @name            SEs6Import
 * @namespace            shared.es6
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
 * import { __SEs6Import } from '@coffeekraken/sugar/es6';
 * const import = new __SEs6Import('import coco from "something";');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGlCQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVU7SUFxRjNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBUztRQW5FckI7Ozs7Ozs7O1dBUUc7UUFDSCxRQUFHLEdBQUcsSUFBSSxDQUFDO1FBRVg7Ozs7Ozs7O1dBUUc7UUFDSCxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVo7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVo7Ozs7Ozs7Ozs7V0FVRztRQUNILFVBQUssR0FBRyxFQUFFLENBQUM7UUFhUCxNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLGVBQWUsRUFBRTtZQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUM7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDO1lBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQztZQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hELE9BQU87b0JBQ0gsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO29CQUNaLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSztpQkFDZCxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUE1R0Q7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSTtRQUNqQix3QkFBd0I7UUFDeEIsTUFBTSxHQUFHLEdBQUcscUNBQXFDLENBQUM7UUFDbEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDaEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFxRkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVE7UUFDSixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDakMsTUFBTSxJQUFJLElBQUksQ0FBQzthQUNsQjtpQkFBTTtnQkFDSCxNQUFNLElBQUksR0FBRyxDQUFDO2FBQ2pCO1NBQ0o7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakMsTUFBTSxJQUFJLElBQUksQ0FBQztZQUNmLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSztpQkFDZixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDUCxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ04sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2lCQUNqQztxQkFBTTtvQkFDSCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQ2pCO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDO1NBQ25CO1FBQ0QsTUFBTSxJQUFJLFNBQVMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ2pDLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSiJ9