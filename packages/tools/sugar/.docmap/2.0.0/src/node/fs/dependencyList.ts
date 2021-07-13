/**
*
* @name            dependencyList
* @namespace       node.fs
* @type            Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* This function allows you to specify a file from which to get all the dependencies
* tree.
* You can also specify that you want to watch these dependencies to be notified
* when some are updated.
*
* @param       {String}        filePath        The file path from which you want the dependencies tree
* @param       {IDependencyListSettings}       [settings={}]       Some settings to configure your process
* @return      {SPromise}                          An SPromise instance that will be resolved once the list has been getted and through which you can subscribe to some events if you want to watch these dependencies
*
* @example         js
* import dependencyList from '@coffeekraken/sugar/node/fs/dependencyList';
* await dependencyList('/my/cool/file.js');
* const promise = dependencyList('/my/cool/file.js', {
*      watch: true
* });
* promise.on('update', ({ path, list }) => {
*      // do something when a dependency has been updated
* });
*
* @see             https://www.npmjs.com/package/dependency-tree
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/