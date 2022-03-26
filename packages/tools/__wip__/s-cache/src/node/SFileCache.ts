import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __SCache, { ISCacheSetSettings } from './SCache';

/**
 * @name            SFileCache
 * @namespace       sugar.node.cache
 * @type            Class
 * @extends         SCache
 * @status              beta
 *
 * This class can be used to cache some files.
 * It featured all the capabilities of the SCache class
 * but take as ```get``` and ```set``` name parameter, the actual absolute
 * file path to cache.
 *
 * @param         {String}        name                  A name for your cache instance. Can have only these characters: [a-zA-Z0-9_-]
 * @param         {Object}          [settings={}]         The settings for the SCache instance
 *
 * @example       js
 * import SFileCache from '@coffeekraken/sugar/shared/cache/SFileCache';
 * const cache = new SFileCache('myCoolCache');
 * cache.set('/my/cool/file.ts');
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
interface ISFileCacheCtorSettings {
    cache: Partial<ISFileCacheSettings>;
}
interface ISFileCacheSettings extends ISCacheSetSettings {
    rootDir?: string;
    [key: string]: any;
}

class SFileCache extends __SCache {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(name, settings?: ISFileCacheCtorSettings) {
        super(name, __deepMerge({}, settings || {}));
    }

    /**
     * @name                            get
     * @type                            Function
     * @async
     *
     * Get a value back from the cache using the specified adapter in the settings
     *
     * @param               {String|Array|Object}              path              The path of the file you want to get back
     * @param               {Boolean}             [valueOnly=true]  Specify if you want the value only or the all cache object
     * @return              {Promise}                               A promise that will be resolved once the item has been getted
     *
     * @example             js
     * const myValue = myCache.get('/my/cool/file');
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    async get(path, settings?: Partial<ISFileCacheSettings>) {
        settings = {
            valueOnly: true,
            ...(settings || {}),
        };

        // check if the file actually exists
        const metas = await super.get(path, {
            ...settings,
            valueOnly: false,
        });
        if (!metas) return null;
        // get the file stats
        const stats = __fs.statSync(path);
        if (stats.mtimeMs > metas.updated) {
            return null;
        }
        // return the value
        return settings.valueOnly ? metas.value : metas;
    }

    /**
     * @name                            set
     * @type                            Function
     * @async
     *
     * Set a value to the cache system using the specified adapter with some settings like described bellow
     *
     * @param               {String}              path              The path to the file to save in cache
     * @param               {any}               value             The value to set.
     * @param               {Object}              [settings={}]
     * The settings for this particular item:
     * - ttl (-1) {Number}: Time to live in seconds
     * - deleteOnExpire (true) {Boolean}: Specify if this item has to be deleted on expire on not
     * @return              {Promise}                               A promise that will be resolved once the item has been saved
     *
     * @example             js
     * const myValue = myCache.set('coolValue', { hello: 'world' }, {
     *    ttl: 1000
     * });
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    async set(
        path: string,
        value: any = null,
        settings?: Partial<ISFileCacheSettings>,
    ) {
        // check that the file actually exists
        if (!__fs.existsSync(path)) return false;

        // read the file
        let content: any = value;
        if (!content) content = __fs.readFileSync(path, 'utf8');

        // set the file in cache
        return super.set(path, content, settings);
    }
}

export default SFileCache;
