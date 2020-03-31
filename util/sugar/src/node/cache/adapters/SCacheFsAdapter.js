const __deepMerge = require('../../object/deepMerge');
const __tmpDir = require('../../fs/tmpDir');
const __fs = require('fs');
const __ensureDirSync = require('../../fs/ensureDirSync');
const __removeSync = require('../../fs/removeSync');

const __SCacheAdapter = require('./SCacheAdapter');

/**
 * @name                                SCacheFsAdapter
 * @namespace                           sugar.node.fs.cacheAdapters
 * @type                                Class
 * 
 * A filesystem SCache adapter that allows you to store your cache items on the user system
 * 
 * @example             js
 * const cache = new SCache({
 *    ttl: 100,
 *    adapter: new SCacheFsAdapter({
 *      path: '/my/cool/folder
 *    })
 * });
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SCacheFsAdapter extends __SCacheAdapter {

  /**
   * @name                              constructor
   * @type                              Function
   * 
   * Construct the SCacheFsAdapter instance with the settings passed in object format. See description bellow.
   * 
   * @param         {Object}          [settings={}]             An object to configure the SCacheFsAdapter instance. This is specific to each adapters.settings.settings...
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(__deepMerge({
      path: `${__tmpDir()}/SCache`
    }, settings));
  }

  /**
   * @name                          set
   * @type                          Function
   * 
   * Set a cache item on the filesystem
   * 
   * @param             {String}              name              The item name
   * @param             {Mixed}               value             The value to save
   * @param             {Object}              [settings={}]     A settings object to override the default ones defined on the SCache instance
   * @return            {Object|Boolean}                        Return the objectToSave generated by the "this.processItem" method, or false if something goes wrong...
   * 
   * @example           js
   * await myCache.set('myCoolItem', { hello: 'world' }, {
   *    ttl: 40000
   * });
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async set(name, value) {
    // generate the item fs name
    const fsName = `${name.replace('.', '/')}.json`;
    // ensure we have the folder
    __ensureDirSync(`${this._settings.path}/${fsName.split('/').slice(0, -1).join('/')}`);
    // write the json file
    __fs.writeFileSync(`${this._settings.path}/${fsName}`, value);
    // write has been done correctly
    return true;
  }

  /**
   * @name                          get
   * @type                          Function
   * 
   * Get a cache item on the filesystem
   * 
   * @param             {String}              name              The item name
   * @return            {Object|Boolean}                        Return the objectToSave generated by the "this.processItem" method, or false if something goes wrong...
   * 
   * @example           js
   * await myCache.get('myCoolItem');
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async get(name) {
    // generate the item fs name
    const fsName = `${name.replace('.', '/')}.json`;
    // check that the file exists
    if (!__fs.existsSync(`${this._settings.path}/${fsName}`)) return null;
    // read the json file
    return __fs.readFileSync(`${this._settings.path}/${fsName}`, 'utf8');
  }

  /**
   * @name                          delete
   * @type                          Function
   * 
   * Delete a cache item on the filesystem
   * 
   * @param             {String}              name              The item name
   * @return            {Boolean}                               true if all of, false if not...
   * 
   * @example           js
   * await myCache.delete('myCoolItem');
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async delete(name) {
    // generate the item fs name
    const fsName = `${name.replace('.', '/')}.json`;
    // read the json file
    return __fs.unlinkSync(`${this._settings.path}/${fsName}`);
  }

  /**
   * @name                          clear
   * @type                          Function
   * 
   * Clear all the items in the current cache
   * 
   * @param             {String}              cacheName              The current cache name to delete
   * @return            {Boolean}                               true if all of, false if not...
   * 
   * @example           js
   * await myCache.clear;
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async clear(cacheName) {
    // read the json file
    return __removeSync(`${this._settings.path}/${cacheName}`);
  }

}