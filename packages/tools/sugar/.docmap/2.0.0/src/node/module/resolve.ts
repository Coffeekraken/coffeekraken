/**
*
* @name            resolve
* @namespace            node.module
* @type            Function
* @platform        ts
* @platform        node
* @status          wip
*
* This function take as parameter a module path to resolve and returns back the
* correct path to this module. It check for package.json file and fields like "main", "module", etc...
*
* @feature     Main entry point export     (https://nodejs.org/api/packages.html#packages_subpath_exports)
* @feature     Subpath exports     (https://nodejs.org/api/packages.html#packages_subpath_exports)
* @feature     Subpath patterns      (https://nodejs.org/api/packages.html#packages_subpath_exports)
* @feature     Conditional exports       (https://nodejs.org/api/packages.html#packages_subpath_exports)
* @feature     Nested conditions       (https://nodejs.org/api/packages.html#packages_subpath_exports)
* @feature     Conditions Definitions      (https://nodejs.org/api/packages.html#packages_subpath_exports)
*
* @todo        Nested node_modules
* @todo        Exports sugar         (https://nodejs.org/api/packages.html#packages_subpath_exports)
* @todo        Subpath folder mappings         (https://nodejs.org/api/packages.html#packages_subpath_exports)
* @todo        Subpath imports       (https://nodejs.org/api/packages.html#packages_subpath_exports)
*
* @param       {String}        module          The module to resolve
* @param       {IResolveSettings}      [settings={}]       Some settings to configure your resolve process
* @return      {String}                                The path to the module to actually load
*
* @example         js
* import resolve from '@coffeekraken/sugar/node/module/resolve';
* resolve('@coffeekraken/sugar'); // => /something/node_modules/@coffeekraken/sugar/index.js
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/