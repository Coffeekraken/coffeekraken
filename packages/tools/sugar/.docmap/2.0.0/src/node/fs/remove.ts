/**
*
* @name        remove
* @namespace            node.fs
* @type          Function
* @platform        ts
* @platform        node
* @status          beta
*
* Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (async)
* Support the ```replacePathTokens``` tokens
*
* @param       {String}              path           The file/directory path to delete
* @return      {Promise}                           A promise that will be resolved when the remove is completed
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import remove from '@coffeekraken/node/fs/remove';
* remove('my/cool/file.json').then(() => {
*    // do something on complete...
* });
*
* @see             https://github.com/jprichardson/node-fs-extra
* @since           2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/