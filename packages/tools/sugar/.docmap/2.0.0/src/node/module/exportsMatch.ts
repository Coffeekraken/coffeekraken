/**
*
* @name        exportsMatch
* @namespace            node.module
* @type        Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function take as parameter the content of the "exports" package.json field
* and the requested "module" string/path. With these informations, it will search
* for a matching export file path and return it back.
*
* @param       {String}        packageDir      The path to the package directory
* @param       {Object}        exports         The "exports" field content
* @param       {String}        modulePath      The "module" path you want to get
* @param       {IExportsMatchSettings}     [settings={}]           Some settings to configure your exports match process
*
* @example         js
* import exportMatch from '@coffeekraken/sugar/module/exportsMatch';
* exportsMatch('/something/@coffeekraken/sugar', {...}, '@coffeekraken/sugar/class/SClass');
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/