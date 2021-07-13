/**
*
* @name        emptyDir
* @namespace            node.fs
* @type          Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* Empty a directory (async)
* Support the ```replacePathTokens``` tokens
*
* @param       {String}              dir           The directory path to empty
* @return      {Promise}                           A promise that will be resolved once the directory has been cleaned
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import emptyDir from '@coffeekraken/node/fs/emptyDir';
* emptyDir('my/cool/directory').then(() => {
*    // do something...
* });
*
* @see             https://github.com/jprichardson/node-fs-extra
* @since           2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/