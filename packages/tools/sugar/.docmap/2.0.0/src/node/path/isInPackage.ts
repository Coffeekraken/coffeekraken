/**
*
* @name                    isInPackage
* @namespace            node.path
* @type                    Function
* @platform        ts
* @platform        node
* @status          beta
*
* Return the path to either the first finded package root going up the folders, or the highest package root finded
*
* @param           {String|Array}              name             The package name to check or a string comma separated like "myPackage,another"
* @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
* @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
* @return          {String}                                      The finded package path or false if not finded
*
* @example         js
* import isInPackage from '@coffeekraken/sugar/node/path/isInPackage';
* const root = isInPackage();
*
* @see       https://www.npmjs.com/package/find-package-json
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/