/**
*
* @name            SEs6Import
* @namespace            js.es6
* @type            Class
* @platform          js
* @platform          ts
* @platform          node
* @status              alpha
*
* This class represent an es6 import statement with properties like:
* - path {String}: The import path
* - default {String}: The default import name
* - star {String}: The start import name "import
* as something from ..."
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
/**
*
* @name            constructor
* @type            Function
* @constructor
*
* Constructor
*
* @since           2.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com>

*/
/**
*
* @name      raw
* @type      String
*
* Store the raw statement string
*
* @since         2.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com>

*/
/**
*
* @name      path
* @type      String
*
* Store the statement path
*
* @since         2.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com>

*/
/**
*
* @name      default
* @type      String
*
* Store the statement default import name
*
* @since         2.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com>

*/
/**
*
* @name      star
* @type      String
*
* Store the statement star name like "import
* as coco from ..."
*
* @since         2.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com>

*/
/**
*
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
/**
*
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
/**
*
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