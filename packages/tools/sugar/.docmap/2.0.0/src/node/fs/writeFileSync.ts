/**
*
* @name        writeFileSync
* @namespace            node.fs
* @type          Function
* @platform        ts
* @platform        node
* @status          beta
*
* Write a file. If don't exist, will be created as well as the directory structure if needed... (sync)
* Support the ```replacePathTokens``` tokens
*
* @param       {String}              path           The file path to write
* @param       {String}              data          The data to write in the file
* @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import writeFileSync from '@coffeekraken/node/fs/writeFileSync';
* try {
*    writeFileSync('my/cool/file.txt', 'Hello World');
* } catch(e) {}
*
* @see             https://github.com/jprichardson/node-fs-extra
* @since         2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/