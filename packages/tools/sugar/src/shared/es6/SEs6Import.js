// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "parse-es6-imports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const parse_es6_imports_1 = __importDefault(require("parse-es6-imports"));
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
    exports.default = SEs6Import;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0VzNkltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFczZJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUdWLDBFQUFrRDtJQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILE1BQXFCLFVBQVU7UUFxRjdCOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksU0FBUztZQW5FckI7Ozs7Ozs7O2VBUUc7WUFDSCxRQUFHLEdBQUcsSUFBSSxDQUFDO1lBRVg7Ozs7Ozs7O2VBUUc7WUFDSCxTQUFJLEdBQUcsSUFBSSxDQUFDO1lBRVo7Ozs7Ozs7O2VBUUc7WUFDSCxZQUFPLEdBQUcsSUFBSSxDQUFDO1lBRWY7Ozs7Ozs7O2VBUUc7WUFDSCxTQUFJLEdBQUcsSUFBSSxDQUFDO1lBRVo7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQUssR0FBRyxFQUFFLENBQUM7WUFhVCxNQUFNLGVBQWUsR0FBRywyQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLGVBQWUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDbEQsT0FBTzt3QkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7d0JBQ1osRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLO3FCQUNaLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7UUE1R0Q7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSTtZQUNuQix3QkFBd0I7WUFDeEIsTUFBTSxHQUFHLEdBQUcscUNBQXFDLENBQUM7WUFDbEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNsQyxPQUFPLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztRQXFGRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUTtZQUNOLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDO2FBQ2hDO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDbkMsTUFBTSxJQUFJLElBQUksQ0FBQztpQkFDaEI7cUJBQU07b0JBQ0wsTUFBTSxJQUFJLEdBQUcsQ0FBQztpQkFDZjthQUNGO1lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNuQyxNQUFNLElBQUksSUFBSSxDQUFDO2dCQUNmLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSztxQkFDakIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNSLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztxQkFDL0I7eUJBQU07d0JBQ0wsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO3FCQUNmO2dCQUNILENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUNqQjtZQUNELE1BQU0sSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztZQUNqQyxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO0tBQ0Y7SUF6SkQsNkJBeUpDIn0=