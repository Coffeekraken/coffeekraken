// @ts-nocheck
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0VzNkltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFczZJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBR2QsMEVBQWtEO0lBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsTUFBcUIsVUFBVTtRQXFGN0I7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxTQUFTO1lBbkVyQjs7Ozs7Ozs7ZUFRRztZQUNILFFBQUcsR0FBRyxJQUFJLENBQUM7WUFFWDs7Ozs7Ozs7ZUFRRztZQUNILFNBQUksR0FBRyxJQUFJLENBQUM7WUFFWjs7Ozs7Ozs7ZUFRRztZQUNILFlBQU8sR0FBRyxJQUFJLENBQUM7WUFFZjs7Ozs7Ozs7ZUFRRztZQUNILFNBQUksR0FBRyxJQUFJLENBQUM7WUFFWjs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBSyxHQUFHLEVBQUUsQ0FBQztZQWFULE1BQU0sZUFBZSxHQUFHLDJCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksZUFBZSxFQUFFO2dCQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxhQUFhLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNsRCxPQUFPO3dCQUNMLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTt3QkFDWixFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUs7cUJBQ1osQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztRQTVHRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJO1lBQ25CLHdCQUF3QjtZQUN4QixNQUFNLEdBQUcsR0FBRyxxQ0FBcUMsQ0FBQztZQUNsRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxFQUFFLENBQUM7YUFDWDtZQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ2xDLE9BQU8sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBcUZEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRO1lBQ04sSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDYixNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7YUFDaEM7WUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNuQyxNQUFNLElBQUksSUFBSSxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDTCxNQUFNLElBQUksR0FBRyxDQUFDO2lCQUNmO2FBQ0Y7WUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ25DLE1BQU0sSUFBSSxJQUFJLENBQUM7Z0JBQ2YsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLO3FCQUNqQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDVCxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQ1IsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO3FCQUMvQjt5QkFBTTt3QkFDTCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7cUJBQ2Y7Z0JBQ0gsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZCxNQUFNLElBQUksS0FBSyxDQUFDO2FBQ2pCO1lBQ0QsTUFBTSxJQUFJLFNBQVMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO1lBQ2pDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7S0FDRjtJQXpKRCw2QkF5SkMifQ==