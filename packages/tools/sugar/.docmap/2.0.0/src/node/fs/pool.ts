/**
*
* @name                pool
* @namespace            ts.fs
* @type                Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* This function simply take as parameter a glob (or array of globs) pattern(s)
* and return an SPromise instance through which you can subscribe to events like:
* - ready: Emitted once the pool is ready
* - file: Emitted for each file founded, added or updated
* - files: Emitted with a list of founded files
* - update: Emitted when a file has been updated
* - unlink: Emitted when a file has been deleted
* - add: Emitted when a file has been added
*
*
* @param       {String|Array<String>}          input           The input glob(s)
* @param       {IPoolSettings}             [settings={}]       Some settings to configure your pool. Support all the chokidar settings
* @return      {SPromise}                                      An SPromise instance through which you can subscribe to events and cancel the pool
*
* @example         js
* import pool from '@coffeekraken/sugar/node/fs/pool';
* pool('/something/cool/** /*').on('file', file => {
*      // do something with each files
* }).on('update', (file) => {
*      // do something with updated files
* });
*
* @see             https://www.npmjs.com/package/chokidar
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*/*', '*
*/