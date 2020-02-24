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
 * @param             {String}            content             The content to save
 * @return            {Promise}                               A promise that will be resolved with the file content
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function cacheFile(filepath, content) {
  return new Promise(async (resolve, reject) => {

    const cachePath = __tmpDir() + '/coffeeBuilderCache';
    const encryptedPath = __base64.encrypt(filepath);
    let mapContent = null;

    if (__fs.existsSync(`${filepath}.map`)) {
      mapContent = __fs.readFileSync(`${filepath}.map`);
    }

    const infos = await __cacache.get.info(cachePath, encryptedPath);
    const cacheUpdateTimestamp = infos && infos.metadata ? infos.metadata.updateTimestamp : 0;

    const stats = __fs.statSync(filepath);
    const updateTimestamp = stats.mtimeMs;

    console.log('C', cacheUpdateTimestamp, updateTimestamp, filepath.replace(process.cwd(), ''));

    if ( ! infos || cacheUpdateTimestamp < updateTimestamp) {

      console.log('CACHE', filepath.replace(process.cwd(), ''));

      // save the new content
      await __cacache.put(cachePath, encryptedPath, content, {
        metadata: {
          updateTimestamp: __stats.build.startTimestamp
        }
      });
      if (mapContent) {
        await __cacache.put(cachePath, `${encryptedPath}.map`, mapContent);
      }

      // resolve with true to set the file has been cached
      return resolve(true);

    }

    // the file has not been cached cause it is either newest in the cache, or the same...
    return resolve(false);

  });
}
