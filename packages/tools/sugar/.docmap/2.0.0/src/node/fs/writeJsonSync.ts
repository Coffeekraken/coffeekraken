/**
*
* @name        writeJsonSync
* @namespace            node.fs
* @type          Function
* @platform        ts
* @platform        node
* @status          beta
*
* Write a JSON file. If don't exist, will be created as well as the directory structure if needed... (sync)
* Support the ```replacePathTokens``` tokens
*
* @param       {String}              path           The file path to write
* @param       {String}              object          The object to write in the JSON file
* @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJsonSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import writeJsonSync from '@coffeekraken/node/fs/writeJsonSync';
* try {
*    writeJsonSync('my/cool/file.json', { hello: 'world' });
* } catch(e) {}
*
* @since         2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/