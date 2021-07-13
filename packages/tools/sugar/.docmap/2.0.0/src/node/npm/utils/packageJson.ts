/**
*
* @name                packageJson
* @namespace            node.npm.utils
* @type                Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function simply take a package name as parameter, and return the corresponding
* package.json JSON content
*
* @param       {String}        name        the package name wanted
* @param       {IPackageJson}      [settings={}]       Some settings to configure your process
* @return      {JSON}                      The package.json content
*
* @example         js
* import packageJson from '@coffeekraken/sugar/node/npm/utils/packageJson`;
* packagrJson('lodash');
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/