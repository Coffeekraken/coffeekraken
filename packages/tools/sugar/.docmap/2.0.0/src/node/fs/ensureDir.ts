/**
*
* @name        ensureDir
* @namespace            node.fs
* @type          Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* Ensure that the passed directory exists. If not, will be created recursively... (async)
* Support the ```replacePathTokens``` tokens
*
* @param       {String}              dir           The directory to ensure that it exists...
* @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import ensureDir from '@coffeekraken/node/fs/ensureDir';
* ensureDir('my/cool/dir').then(() => {
*    // do something...
* });
*
* @see             https://github.com/jprichardson/node-fs-extra
* @since           2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/