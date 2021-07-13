/**
*
* @name        writeJson
* @namespace            node.fs
* @type          Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* Write a JSON file. If don't exist, will be created as well as the directory structure if needed... ( (async)
* Support the ```replacePathTokens``` tokens
*
* @param       {String}              path           The file path to write
* @param       {String}              object          The object to write in the JSON file
* @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJson()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
* @return      {Promise}                           A promise that will be resolved when the writeJson is completed
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import writeJson from '@coffeekraken/node/fs/writeJson';
* writeJson('my/cool/file.json', { hello: 'world' }).then(() => {
*    // do something on complete...
* });
*
* @since           2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/