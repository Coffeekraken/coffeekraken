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
