/**
*
* @name        copy
* @namespace            node.fs
* @type          Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* Copy a file or directory (async)
* Support the ```replacePathTokens``` tokens
*
* @param       {String}              src           The source path to copy
* @param       {String}              dest          The destination path
* @return      {Promise}                           A promise that will be resolved when the copy is completed
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import copy from '@coffeekraken/node/fs/copy';
* copy('my/cool/file.jpg', 'my/new/file.jpg').then(() => {
*    // do something on complete...
* });
*
* @see             https://github.com/jprichardson/node-fs-extra
* @since         2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/