"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __babelParser = require("@babel/parser");
const generator_1 = require("@babel/generator");
const traverse_1 = require("@babel/traverse");
const code = `
    export let name1, name2; // also var, const
    export let name1 = 'plop', name2 = coco, nameN; // also var, const
    export function functionName(arg, arg2 = 'adf'){ const hello = arg2; }
    export class ClassName {}
    export let name1; // also var, const
    
    // Export list
    export { name1, name2, nameN };
    
    // Renaming exports
    export { variable1 as name1, variable2 as name2, nameN };
    
    // Exporting destructured assignments with renaming
    export const { name1, name2: bar } = o;
    
    // Default exports
    export default expression;
    export default function () {} // also class, function*
    export default function name1() {} // also class, function*
    export { name1 as default };
    
    // Aggregating modules
    export * from 'something'; // does not set the default export
    export * as name1 from 'something'; // Draft ECMAScript® 2O21
    export { name1, name2, nameN } from 'something';
    export { import1 as name1, import2 as name2, nameN } from 'something';
    export { default } from 'something';
    
    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line global-require
      export { default } from './dist/hotkeys.common.min.js';
    } else {
      // eslint-disable-next-line global-require
      export { default } from './dist/hotkeys.common.js';
    }
    `;
/**
 * @name            SEs6Export
 * @namespace       sugar.js.es6
 * @type            Class
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
 * @example             js
 * import SEs6Export from '@coffeekraken/sugar/js/es6/SEs6Export';
 * const exp = new SEs6Export('export { coco } from "something";');
 *
 * @since           2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
class SEs6Export {
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
        console.log(statement);
        const line = statement;
        const parsed = __babelParser.parse(line, {
            allowImportExportEverywhere: true
        }).program.body[0];
        let exportObj = {
            named: []
        };
        console.log(parsed);
        switch (parsed.type) {
            case 'ExportNamedDeclaration':
                if (parsed.declaration && parsed.declaration.type) {
                    switch (parsed.declaration.type) {
                        case 'VariableDeclaration':
                            const declarations = parsed.declaration && parsed.declaration.declarations
                                ? parsed.declaration.declarations
                                : parsed.declarations
                                    ? parsed.declarations
                                    : [];
                            declarations.forEach((declaration) => {
                                if (declaration.id && declaration.id.properties) {
                                    declaration.id.properties.forEach((prop) => {
                                        const parts = generator_1.default(prop).code.split(':');
                                        let value = null;
                                        if (parts.length > 1) {
                                            value = __unquote(parts.pop().trim());
                                        }
                                        exportObj.named.push({
                                            name: prop.value.name,
                                            value
                                        });
                                    });
                                    return;
                                }
                                const parts = line
                                    .slice(declaration.start, declaration.end)
                                    .split('=');
                                let value = null;
                                if (parts.length > 1) {
                                    value = __unquote(parts.pop().trim());
                                }
                                exportObj.named.push({
                                    name: declaration.id.name,
                                    value
                                });
                            });
                            break;
                        case 'ClassDeclaration':
                        case 'FunctionDeclaration':
                            const codeAst = parsed.declaration;
                            const value = generator_1.default(codeAst).code;
                            exportObj.named.push({
                                name: parsed.declaration.id.name,
                                value
                            });
                            break;
                    }
                    break;
                }
                else if (parsed.specifiers) {
                    const parts = generator_1.default(parsed).code.split('=');
                    let value = null;
                    if (parts.length > 1) {
                        value = __unquote(parts.pop().trim());
                    }
                    parsed.specifiers.forEach((specifier) => {
                        console.log(specifier.exported);
                        exportObj.named.push({
                            name: specifier.local.name,
                            as: specifier.exported.name !== specifier.local.name
                                ? specifier.exported.name
                                : null,
                            value
                        });
                    });
                }
        }
        console.log(exportObj);
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
     * @return      {Array<SEs6Export}                  An array of all the founded es6 imports
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    static parseCode(code) {
        // search for statements
        const parts = code.split();
        const ast = __babelParser.parse(code, {
            allowImportExportEverywhere: true,
            allowUndeclaredExports: true,
            sourceType: 'script',
            strictMode: false
        });
        traverse_1.default(ast, {
            ExportNamedDeclaration: function (path) {
                console.log('path');
            }
        });
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
        let string = 'export ';
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
exports.default = SEs6Export;
