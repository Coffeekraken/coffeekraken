import __SugarConfig from '@coffeekraken/s-sugar-config';
import __ensureDirSync from '@coffeekraken/sugar/src/node/fs/ensureDirSync';
import __removeSync from '@coffeekraken/sugar/src/node/fs/removeSync';
import __packageTmpDir from '@coffeekraken/sugar/src/node/path/packageTmpDir';
import __deepMerge from '@coffeekraken/sugar/src/shared/object/deepMerge';
import __fs from 'fs';
import __SCacheAdapter from './SCacheAdapter';

/**
 * @name                                SCacheFsAdapter
 * @namespace           sugar.node.fs.cacheAdapters
 * @type                                Class
 * @status              beta
 *
 * A filesystem SCache adapter that allows you to store your cache items on the user system
 *
 * @example             js
 * const cache = new SCache({
 *    ttl: 100,
 *    adapter: new SCacheFsAdapter({
 *      rootDir: '/my/cool/folder
 *    })
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SCacheFsAdapter extends __SCacheAdapter {
  static id = 'fs';

  /**
   * @name      fsCacheAdapter
   * @type      any
   * @get
   *
   * Access the fs cache adapter settings
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get fsCacheAdapterSettings(): any {
    return (<any>this)._settings.fsCacheAdapter;
  }

  /**
   * @name                              constructor
   * @type                              Function
   *
   * Construct the SCacheFsAdapter instance with the settings passed in object format. See description bellow.
   *
   * @param         {Object}          [settings={}]             An object to configure the SCacheFsAdapter instance. This is specific to each adapters.settings.settings...
   * - rootDir (config.storage.package.cacheDir) {String}: Specify the root directory where to put all the files to cache
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          fsCacheAdapter: {
            rootDir: __SugarConfig.get('storage.cacheDir') || `${__packageTmpDir()}/SCache`
          }
        },
        settings
      )
    );
  }

  /**
   * @name                          set
   * @type                          Function
   *
   * Set a cache item on the filesystem
   *
   * @param             {String}              name              The item name
   * @param             {Mixed}               value             The value to save
   * @param             {Object}              [settings={}]     A settings object to override the default ones defined on the SCache instance
   * @return            {Object|Boolean}                        Return the objectToSave generated by the "this.processItem" method, or false if something goes wrong...
   *
   * @example           js
   * await myCache.set('myCoolItem', { hello: 'world' }, {
   *    ttl: 40000
   * });
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async set(name, value) {
    // generate the item fs name
    const fsName = `${this.cache.id}/${name}.json`.replace(/\/\//gm, '/');

    // ensure we have the folder
    __ensureDirSync(
      `${this.fsCacheAdapterSettings.rootDir}/${fsName
        .split('/')
        .slice(0, -1)
        .join('/')}`
    );

    // write the json file
    __fs.writeFileSync(
      `${this.fsCacheAdapterSettings.rootDir}/${fsName}`,
      value
    );
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
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async get(name) {
    // generate the item fs name

    if (name.slice(0, 1) === '/') name = name.slice(1);
    const fsName = `${this.cache.id}/${name}.json`;

    // check that the file exists
    if (!__fs.existsSync(`${this.fsCacheAdapterSettings.rootDir}/${fsName}`))
      return null;
    // read the json file
    return __fs.readFileSync(
      `${this.fsCacheAdapterSettings.rootDir}/${fsName}`,
      'utf8'
    );
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
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async delete(name) {
    // generate the item fs name
    const fsName = `${this.cache.id}/${name}.json`;
    // read the json file
    return __fs.unlinkSync(`${this.fsCacheAdapterSettings.rootDir}/${fsName}`);
  }

  /**
   * @name                          clear
   * @type                          Function
   *
   * Clear all the items in the current cache
   *
   * @return            {Boolean}                               true if all of, false if not...
   *
   * @example           js
   * await myCache.clear();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async clear() {
    // read the json file
    return __removeSync(
      `${this.fsCacheAdapterSettings.rootDir}/${this.cache.id}`
    );
  }

  /**
   * @name                          keys
   * @type                          Function
   *
   * Get all the items keys stored in cache
   *
   * @return            {Boolean}                               true if all of, false if not...
   *
   * @todo      implement this feature
   *
   * @example           js
   * await myCache.keys();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async keys() {
    return [];
  }
}
