/**
*
* @name        moveSync
* @namespace            node.fs
* @type          Function
* @platform        ts
* @platform        node
* @status          beta
*
* Moves a file or directory, even across devices (sync)
* Support the ```replacePathTokens``` tokens
*
* @param       {String}              src           The source path to moveSync
* @param       {String}              dest          The destination path
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import moveSync from '@coffeekraken/node/fs/moveSync';
* try {
*    moveSync('my/cool/dir', 'another/place/for/directory');
* } catch(e) {}
*
* @see             https://github.com/jprichardson/node-fs-extra
* @since         2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/