/**
*
* @name                            folderSize
* @namespace            node.fs
* @type                            Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* Calculate the size of the passed folder and return it through a promise, either in raw format, either in human readdable one...
* Support the ```replacePathTokens``` tokens
*
* @param             {String}                folderPath                  The folder path to calculate the size
* @param             {Boolean}               [rawFormat=false]           If true, will return the folder size in raw format
* @return            {Promise}                                           A promise that will be resolved once the folder size has been calculated
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example           js
* import folderSize from '@coffeekraken/sugar/node/fs/folderSize';
* folderSize('my/cool/folder').then((size) => {
*      // do something...
* });
*
* @since           2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/