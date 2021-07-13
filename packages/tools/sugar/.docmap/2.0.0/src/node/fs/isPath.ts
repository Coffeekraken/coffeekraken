/**
*
* @name                            isPath
* @namespace            node.fs
* @type                            Function
* @platform        ts
* @platform        node
* @status          beta
*
* Check if the passed string is a valid path or not
* Support the ```replacePathTokens``` tokens
*
* @param         {String}            path              The path to check
* @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
* @return        {Boolean}                             true if the path is valide, false if not
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import isPath from '@coffeekraken/sugar/node/fs/isPath';
* isPath('hello/world'); // => true
*
* @see       https://www.npmjs.com/package/is-valid-path
* @since         2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/