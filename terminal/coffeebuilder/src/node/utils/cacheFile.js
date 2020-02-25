const __cacache = require('cacache');
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __fs = require('fs');
const __stats = require('../stats');

/**
 * @name                                  cacheFile
 * @namespace                             coffeebuilder.node.utils
 * @type                                  Function
 *
 * Take care of caching the passed file if needed
 *
 * @param             {String}            filepath            The file path to store in cache
 * @param             {String}            source             The source to save
 * @return            {Promise}                               A promise that will be resolved with the file source
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function cacheFile(filepath, source, saveExtension = null) {
  return new Promise(async (resolve, reject) => {


    const cachePath = __tmpDir() + '/coffeeBuilderCache';
    const encryptedPath = __base64.encrypt(filepath);
    let mapContent = null;

    if (__fs.existsSync(`${filepath}.map`)) {
      mapContent = __fs.readFileSync(`${filepath}.map`);
    }

    const stats = __fs.statSync(filepath);
    const updateTimestamp = stats.mtimeMs;

    let jsonCacheFileUpdateTimestamp = 0;

    // try to get the json cache file
    let jsonCacheFile = null;
    const jsonCacheFilePath = cachePath + '/' + encryptedPath + '.json';
    if (__fs.existsSync(jsonCacheFilePath)) {
      jsonCacheFile = __fs.readFileSync(jsonCacheFilePath);
      jsonCacheFile = JSON.parse(jsonCacheFile);
      jsonCacheFileUpdateTimestamp = __fs.statSync(jsonCacheFilePath).mtimeMs;
    }

    if (jsonCacheFileUpdateTimestamp < updateTimestamp) {

      // update the source
      __fs.writeFileSync(jsonCacheFilePath, JSON.stringify({
        source: Buffer.from(source).toString('base64'),
        map: mapContent,
        saveExtension
      }));

    }

    resolve(true);



    // // if ( ! infos || cacheUpdateTimestamp < updateTimestamp) {
    //
    //   // save the new source
    //   await __cacache.put(cachePath, encryptedPath, source, {
    //     metadata: {
    //       updateTimestamp: __stats.build.startTimestamp,
    //       saveExtension,
    //       map: mapContent
    //     }
    //   });
    //   // if (mapContent) {
    //   //   await __cacache.put(cachePath, `${encryptedPath}.map`, mapContent);
    //   // }
    //
    //   // resolve with true to set the file has been cached
    //   return resolve(true);
    //
    // // }
    //
    // // the file has not been cached cause it is either newest in the cache, or the same...
    // return resolve(false);

  });
}
