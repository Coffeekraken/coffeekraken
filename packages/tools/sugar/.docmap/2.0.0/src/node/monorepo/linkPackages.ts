/**
*
* @name            linkPackages
* @namespace            node.monorepo
* @type            Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* This function simply check all the packages available in the monorepo
* and link then together using symbolic links in each node_modules folders
*
* @param       {Object}        [settings={}]         A settings object to configure your linking process
* @return      {SPromise}                           A promise that will be resolved once the process is finished
*
* @setting     {String}      [rootDir=process.cwd()]       Specify the root directory from where to start the process
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import linkPackages from '@coffeekraken/sugar/node/monorepo/linkPackages';
* await linkPackages();
*
* @since       2.0.0
* @author      Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/