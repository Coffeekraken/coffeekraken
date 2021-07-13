/**
*
* @name            checkPathWithMultipleExtensions
* @namespace            node.fs
* @type            Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function take a path and some extensions to check if a file
* exists with one of these particular extensions.
* If a file exists, the function return the path with the first extensions that matches
*
* @todo        tests
*
* @param       {String}            path            The file path you want to check. With or without an extension
* @param       {Array<String>}     extensions      The extensions (without the dot) you want to check
* @return      {String|undefined}                  The first valid path founded, or undefined
*
* @example         js
* import checkPathWithMultipleExtensions from '@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions';
* checkPathWithMultipleExtensions('/my/cool/file.txt', ['txt','js','css']);
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/