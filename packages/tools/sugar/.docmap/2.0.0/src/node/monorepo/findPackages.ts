/**
*
* @name            findPackages
* @namespace            node.monorepo
* @type            Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* This function simply let you search for packages (that are not dependencies) inside
* the passed folder and returns a object with relative paths as keys and package.json
* content value
*
* @param         {String}          [rootDir=process.cwd()]       The root directory from where to search for packages
* @return        {Promise}                                       A promise that will be resolved once the process is finished with the resulting object
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import findPackages from '@coffeekraken/sugar/node/monorepo/findPackages';
* const packages = await findPackages();
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/