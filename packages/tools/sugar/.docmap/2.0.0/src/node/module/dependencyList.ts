/**
*
* @name                dependencyList
* @namespace            node.module
* @type                Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* This function make use of the ```dependencyTree``` one and returns the result into a simple array of file pathes
*
* @param       {String}                    filePath                The absolute file path you want to get the dependency tree from
* @param       {IDependencyTreeExtendedSettings}       [settings={}]       Some settings (like all the dependency-tree supported ones (excluding filename and directory)), and some additional like caching.
* @return      {SPromise}                               An SPromise instance through which you can get logs, and that will be resolved once the process is over
*
* @example         js
* import dependencyList from '@coffeekraken/sugar/node/module/dependencyList';
* await dependencyList('/something/cool.js', {
*      cache: true,
*      // etc...
* });
*
* @see             https://www.npmjs.com/package/dependency-tree
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/