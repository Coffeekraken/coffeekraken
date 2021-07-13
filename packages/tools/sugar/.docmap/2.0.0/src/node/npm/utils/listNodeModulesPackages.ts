/**
*
* @name        listNodeModulesPackages
* @namespace     node.npm.utils
* @type        Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function list all the packages that are installed in the node_modules folder(s).
* You can specify that you want either the current package node_modules folder listed,
* and the root node_modules folder for monorepo as well.
*
* @param       {IListNodeModulesPackagesSettings}      [settings={}]       Specify some settings for your listing process
* @return      {Record<string, IPackageJson}            An object containing each modules under the module name as key
*
* @example         js
* import listNodeModulesPackages from '@coffeekraken/sugar/node/npm/utils/listNodeModulesPackages';
* listNodeModulesPackages();
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/