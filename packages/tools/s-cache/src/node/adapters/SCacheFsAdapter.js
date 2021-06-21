var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        super(__deepMerge({
            fsCacheAdapter: {
                rootDir: __SugarConfig.get('storage.cacheDir') || `${__packageTmpDir()}/SCache`
            }
        }, settings));
    }
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
    get fsCacheAdapterSettings() {
        return this._settings.fsCacheAdapter;
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
    set(name, value) {
        return __awaiter(this, void 0, void 0, function* () {
            // generate the item fs name
            const fsName = `${this.cache.id}/${name}.json`.replace(/\/\//gm, '/');
            // ensure we have the folder
            __ensureDirSync(`${this.fsCacheAdapterSettings.rootDir}/${fsName
                .split('/')
                .slice(0, -1)
                .join('/')}`);
            // write the json file
            __fs.writeFileSync(`${this.fsCacheAdapterSettings.rootDir}/${fsName}`, value);
            // write has been done correctly
            return true;
        });
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
    get(name) {
        return __awaiter(this, void 0, void 0, function* () {
            // generate the item fs name
            if (name.slice(0, 1) === '/')
                name = name.slice(1);
            const fsName = `${this.cache.id}/${name}.json`;
            // check that the file exists
            if (!__fs.existsSync(`${this.fsCacheAdapterSettings.rootDir}/${fsName}`))
                return null;
            // read the json file
            return __fs.readFileSync(`${this.fsCacheAdapterSettings.rootDir}/${fsName}`, 'utf8');
        });
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
    delete(name) {
        return __awaiter(this, void 0, void 0, function* () {
            // generate the item fs name
            const fsName = `${this.cache.id}/${name}.json`;
            // read the json file
            return __fs.unlinkSync(`${this.fsCacheAdapterSettings.rootDir}/${fsName}`);
        });
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
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            // read the json file
            return __removeSync(`${this.fsCacheAdapterSettings.rootDir}/${this.cache.id}`);
        });
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
    keys() {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
}
SCacheFsAdapter.id = 'fs';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlRnNBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NhY2hlRnNBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLCtDQUErQyxDQUFDO0FBQzVFLE9BQU8sWUFBWSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLGlEQUFpRCxDQUFDO0FBQzlFLE9BQU8sV0FBVyxNQUFNLGlEQUFpRCxDQUFDO0FBQzFFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxlQUFlO0lBaUIxRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsY0FBYyxFQUFFO2dCQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxlQUFlLEVBQUUsU0FBUzthQUNoRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztJQUNKLENBQUM7SUFwQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDeEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBMEJEOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSzs7WUFDbkIsNEJBQTRCO1lBQzVCLE1BQU0sTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUV0RSw0QkFBNEI7WUFDNUIsZUFBZSxDQUNiLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sSUFBSSxNQUFNO2lCQUM3QyxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ2YsQ0FBQztZQUVGLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUNoQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLElBQUksTUFBTSxFQUFFLEVBQ2xELEtBQUssQ0FDTixDQUFDO1lBQ0YsZ0NBQWdDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNHLEdBQUcsQ0FBQyxJQUFJOztZQUNaLDRCQUE0QjtZQUU1QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsTUFBTSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFJLE9BQU8sQ0FBQztZQUUvQyw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUN0RSxPQUFPLElBQUksQ0FBQztZQUNkLHFCQUFxQjtZQUNyQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQ3RCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUUsRUFDbEQsTUFBTSxDQUNQLENBQUM7UUFDSixDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0csTUFBTSxDQUFDLElBQUk7O1lBQ2YsNEJBQTRCO1lBQzVCLE1BQU0sTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxPQUFPLENBQUM7WUFDL0MscUJBQXFCO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLElBQUksTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM3RSxDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDRyxLQUFLOztZQUNULHFCQUFxQjtZQUNyQixPQUFPLFlBQVksQ0FDakIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQzFELENBQUM7UUFDSixDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNHLElBQUk7O1lBQ1IsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO0tBQUE7O0FBdktNLGtCQUFFLEdBQUcsSUFBSSxDQUFDIn0=