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
    var parse_es6_imports_1 = __importDefault(require("parse-es6-imports"));
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
    var SEs6Import = /** @class */ (function () {
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
        function SEs6Import(statement) {
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
            var parsedStatement = parse_es6_imports_1.default(statement)[0];
            if (parsedStatement) {
                this.raw = statement;
                this.path = parsedStatement.fromModule;
                this.default = parsedStatement.defaultImport;
                this.star = parsedStatement.starImport;
                this.named = parsedStatement.namedImports.map(function (n) {
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
        SEs6Import.parseCode = function (code) {
            // search for statements
            var reg = /^[\s]{0,999999}import\s[^\r\n;].*/gm;
            var matches = code.match(reg);
            if (!matches) {
                return [];
            }
            matches = matches.map(function (statement) {
                return new SEs6Import(statement.trim());
            });
            return matches;
        };
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
        SEs6Import.prototype.toString = function () {
            var string = 'import ';
            if (this.star) {
                string += "* as " + this.star + " ";
            }
            if (this.default) {
                string += "" + this.default;
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
                    .map(function (n) {
                    if (n.as) {
                        return n.name + " as " + n.as;
                    }
                    else {
                        return n.name;
                    }
                })
                    .join(', ');
                string += ' } ';
            }
            string += "from \"" + this.path + "\";";
            return string;
        };
        return SEs6Import;
    }());
    exports.default = SEs6Import;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0VzNkltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFczZJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUdWLHdFQUFrRDtJQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNIO1FBcUZFOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFZLFNBQVM7WUFuRXJCOzs7Ozs7OztlQVFHO1lBQ0gsUUFBRyxHQUFHLElBQUksQ0FBQztZQUVYOzs7Ozs7OztlQVFHO1lBQ0gsU0FBSSxHQUFHLElBQUksQ0FBQztZQUVaOzs7Ozs7OztlQVFHO1lBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztZQUVmOzs7Ozs7OztlQVFHO1lBQ0gsU0FBSSxHQUFHLElBQUksQ0FBQztZQUVaOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFLLEdBQUcsRUFBRSxDQUFDO1lBYVQsSUFBTSxlQUFlLEdBQUcsMkJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxlQUFlLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO2dCQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQztvQkFDOUMsT0FBTzt3QkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7d0JBQ1osRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLO3FCQUNaLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7UUE1R0Q7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNJLG9CQUFTLEdBQWhCLFVBQWlCLElBQUk7WUFDbkIsd0JBQXdCO1lBQ3hCLElBQU0sR0FBRyxHQUFHLHFDQUFxQyxDQUFDO1lBQ2xELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixPQUFPLEVBQUUsQ0FBQzthQUNYO1lBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxTQUFTO2dCQUM5QixPQUFPLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztRQXFGRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsNkJBQVEsR0FBUjtZQUNFLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsTUFBTSxJQUFJLFVBQVEsSUFBSSxDQUFDLElBQUksTUFBRyxDQUFDO2FBQ2hDO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixNQUFNLElBQUksS0FBRyxJQUFJLENBQUMsT0FBUyxDQUFDO2dCQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7b0JBQ25DLE1BQU0sSUFBSSxJQUFJLENBQUM7aUJBQ2hCO3FCQUFNO29CQUNMLE1BQU0sSUFBSSxHQUFHLENBQUM7aUJBQ2Y7YUFDRjtZQUVELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDbkMsTUFBTSxJQUFJLElBQUksQ0FBQztnQkFDZixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUs7cUJBQ2pCLEdBQUcsQ0FBQyxVQUFDLENBQUM7b0JBQ0wsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNSLE9BQVUsQ0FBQyxDQUFDLElBQUksWUFBTyxDQUFDLENBQUMsRUFBSSxDQUFDO3FCQUMvQjt5QkFBTTt3QkFDTCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7cUJBQ2Y7Z0JBQ0gsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZCxNQUFNLElBQUksS0FBSyxDQUFDO2FBQ2pCO1lBQ0QsTUFBTSxJQUFJLFlBQVMsSUFBSSxDQUFDLElBQUksUUFBSSxDQUFDO1lBQ2pDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFDSCxpQkFBQztJQUFELENBQUMsQUF6SkQsSUF5SkMifQ==