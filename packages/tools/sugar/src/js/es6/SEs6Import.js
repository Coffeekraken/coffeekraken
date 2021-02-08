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
    var parse_es6_imports_1 = __importDefault(require("parse-es6-imports"));
    return /** @class */ (function () {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0VzNkltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFczZJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBR1Ysd0VBQWtEO0lBNEJsRDtRQXFGRTs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBWSxTQUFTO1lBbkVyQjs7Ozs7Ozs7ZUFRRztZQUNILFFBQUcsR0FBRyxJQUFJLENBQUM7WUFFWDs7Ozs7Ozs7ZUFRRztZQUNILFNBQUksR0FBRyxJQUFJLENBQUM7WUFFWjs7Ozs7Ozs7ZUFRRztZQUNILFlBQU8sR0FBRyxJQUFJLENBQUM7WUFFZjs7Ozs7Ozs7ZUFRRztZQUNILFNBQUksR0FBRyxJQUFJLENBQUM7WUFFWjs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBSyxHQUFHLEVBQUUsQ0FBQztZQWFULElBQU0sZUFBZSxHQUFHLDJCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksZUFBZSxFQUFFO2dCQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxhQUFhLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7b0JBQzlDLE9BQU87d0JBQ0wsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO3dCQUNaLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSztxQkFDWixDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO1FBNUdEOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSSxvQkFBUyxHQUFoQixVQUFpQixJQUFJO1lBQ25CLHdCQUF3QjtZQUN4QixJQUFNLEdBQUcsR0FBRyxxQ0FBcUMsQ0FBQztZQUNsRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxFQUFFLENBQUM7YUFDWDtZQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsU0FBUztnQkFDOUIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7UUFxRkQ7Ozs7Ozs7Ozs7V0FVRztRQUNILDZCQUFRLEdBQVI7WUFDRSxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNiLE1BQU0sSUFBSSxVQUFRLElBQUksQ0FBQyxJQUFJLE1BQUcsQ0FBQzthQUNoQztZQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsTUFBTSxJQUFJLEtBQUcsSUFBSSxDQUFDLE9BQVMsQ0FBQztnQkFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNuQyxNQUFNLElBQUksSUFBSSxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDTCxNQUFNLElBQUksR0FBRyxDQUFDO2lCQUNmO2FBQ0Y7WUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ25DLE1BQU0sSUFBSSxJQUFJLENBQUM7Z0JBQ2YsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLO3FCQUNqQixHQUFHLENBQUMsVUFBQyxDQUFDO29CQUNMLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDUixPQUFVLENBQUMsQ0FBQyxJQUFJLFlBQU8sQ0FBQyxDQUFDLEVBQUksQ0FBQztxQkFDL0I7eUJBQU07d0JBQ0wsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO3FCQUNmO2dCQUNILENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUNqQjtZQUNELE1BQU0sSUFBSSxZQUFTLElBQUksQ0FBQyxJQUFJLFFBQUksQ0FBQztZQUNqQyxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBQ0gsaUJBQUM7SUFBRCxDQUFDLEFBekpRLElBeUpQIn0=