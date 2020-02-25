const __cacache = require('cacache');
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __fs = require('fs');
const __events = require('../events');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');

/**
 * @name                                  getCachedFile
 * @namespace                             coffeebuilder.node.utils
 * @type                                  Function
 *
 * Take care of caching the passed file if needed
 *
 * @param             {String}            filepath            The file path to store in cache
 * @return            {Promise}                               A promise that will be resolved with the file content
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function cacheFile(filepath) {
  return new Promise(async (resolve, reject) => {

    // console.log('FILE TO CACHE', filepath.replace(process.cwd(), ''));

    const cachePath = __tmpDir() + '/coffeeBuilderCache';
    const encryptedPath = __base64.encrypt(filepath);
    const jsonCacheFilePath = cachePath + '/' + encryptedPath + '.json';

    if ( ! __fs.existsSync(jsonCacheFilePath)) {
      return resolve(false);
    }

    const updateTimestamp = __fs.statSync(filepath).mtimeMs;
    const jsonCacheFileUpdateTimestamp = __fs.statSync(jsonCacheFilePath).mtimeMs;

    if ( updateTimestamp > jsonCacheFileUpdateTimestamp) {
      return resolve(false);
    }

    // reading the cache file
    const jsonCacheFile = JSON.parse(__fs.readFileSync(jsonCacheFilePath));

    jsonCacheFile.source = new Buffer(jsonCacheFile.source, 'base64');

    __events.emit('cache', {
      files: [filepath]
    });

    return resolve({
      source: jsonCacheFile.source,
      map: jsonCacheFile.map,
      saveExtension: jsonCacheFile.saveExtension
    });

  });
}
