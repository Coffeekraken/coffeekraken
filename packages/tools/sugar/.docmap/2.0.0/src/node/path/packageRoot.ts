/**
*
* @name                    packageRoot
* @namespace            node.path
* @type                    Function
* @platform        ts
* @platform        node
* @status          beta
*
* Return the path to either the first finded package root going up the folders, or the highest package root finded
*
* @feature         Support file path as input
* @feature         Allows you to specify if you want the highest package.json founded using the ```highest``` parameter
*
* @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
* @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
* @return          {String}                                      The finded package path or false if not finded
*
* @example         js
* import packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
* const root = packageRoot();
*
* @see       https://www.npmjs.com/package/find-package-json
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/