/**
*
* @name            extractImport
* @namespace            node.module
* @type            Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function simply parse a file content or a passed string directly and
* build the list of finded "import ... from ..." as well as commonjs "require(...)".
* You will get back an array of object containing all the imformations about each
* import and require statements
*
* @param       {String}        stringOrFilePath            A string to parse, or a file path
* @param       {IExtractImportSettings}        [settings={}]           Some settings to configure your extraction process
* @return      {IExtractImportItem[]}                          An array of extracted items objects
*
* @todo        Enhance example
* @todo        Tests
*
* @example         js
* import extractImports from '@coffeekraken/sugar/node/module/extractImport';
* extractImport('/something/cool.js');
*
* @since           2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/