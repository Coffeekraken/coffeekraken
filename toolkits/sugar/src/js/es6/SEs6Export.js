import { parse } from 'micromatch';
import __parseEs6Imports from 'parse-es6-imports';

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
export default class SEs6Export {
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
    const reg = /^[\s]{0,999999}export\s[^\r\n;].*/gm;
    let matches = code.match(reg);
    if (!matches) {
      return [];
    }
    matches = matches.map((statement) => {
      return new SEs6Export(statement.trim());
    });
    return matches;
  }

  /**
   * @name      raw
   * @type      String
   *
   * Store the raw statement string
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  raw = null;

  /**
   * @name      path
   * @type      String
   *
   * Store the statement path
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  path = null;

  /**
   * @name      default
   * @type      String
   *
   * Store the statement default import name
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  default = null;

  /**
   * @name      star
   * @type      String
   *
   * Store the statement star name like "import * as coco from ..."
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  star = null;

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
  named = [];

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
    console.log(statement);
    const parsedStatement = __parseEs6Imports(
      statement.replace('export ', 'import ')
    )[0];
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
      } else {
        string += ' ';
      }
    }

    if (this.named && this.named.length) {
      string += '{ ';
      string += this.named
        .map((n) => {
          if (n.as) {
            return `${n.name} as ${n.as}`;
          } else {
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
