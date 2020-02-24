const __cacache = require('cacache');
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __fs = require('fs');
const __events = require('../events');

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

    const infos = await __cacache.get.info(cachePath, encryptedPath);
    const cacheUpdateTimestamp = infos && infos.metadata ? infos.metadata.updateTimestamp : 0;

    const stats = __fs.statSync(filepath);
    const updateTimestamp = Math.round(stats.mtimeMs);

    // if (infos) {
    //   console.log(Math.round(infos.time / 1000) - Math.round(stats.mtimeMs / 1000));
    //   console.log(Math.round(stats.mtimeMs / 1000));
    //   console.log(Math.round(infos.time / 1000));
    //   console.log(filepath);
    //   console.log(Math.round(infos.time / 1000) - updateTimestamp);
    // }

    if ( ! infos || cacheUpdateTimestamp < updateTimestamp) {
      return resolve(false);
    }

    let content = null;
    let mapContent = null;
    try {
      content = await __cacache.get(cachePath, encryptedPath);
    } catch (e) {}
    try {
      mapContent = await __cacache.get(cachePath, `${encryptedPath}.map`);
    } catch(e) {}
    if (content) {
      console.log('CAC', filepath.replace(process.cwd(), ''));
      __events.emit('cache', {
        files: [filepath]
      });
      return resolve({
        source: content.data,
        map: mapContent ? mapContent.data : null
      });
    }

    return resolve(false);

  });
}
