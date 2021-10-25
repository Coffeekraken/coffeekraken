var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '@coffeekraken/sugar/src/shared/object/deepMerge';
import __fs from 'fs';
import __SCache from './SCache';
class SFileCache extends __SCache {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(name, settings) {
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get(path, settings) {
        const _super = Object.create(null, {
            get: { get: () => super.get }
        });
        return __awaiter(this, void 0, void 0, function* () {
            settings = Object.assign({ valueOnly: true }, (settings || {}));
            // check if the file actually exists
            const metas = yield _super.get.call(this, path, Object.assign(Object.assign({}, settings), { valueOnly: false }));
            if (!metas)
                return null;
            // get the file stats
            const stats = __fs.statSync(path);
            if (stats.mtimeMs > metas.updated) {
                return null;
            }
            // return the value
            return settings.valueOnly ? metas.value : metas;
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    set(path, value = null, settings) {
        const _super = Object.create(null, {
            set: { get: () => super.set }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // check that the file actually exists
            if (!__fs.existsSync(path))
                return false;
            // read the file
            let content = value;
            if (!content)
                content = __fs.readFileSync(path, 'utf8');
            // set the file in cache
            return _super.set.call(this, path, content, settings);
        });
    }
}
export default SFileCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGVDYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGaWxlQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxXQUFXLE1BQU0saURBQWlELENBQUM7QUFDMUUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sUUFBZ0MsTUFBTSxVQUFVLENBQUM7QUFpQ3hELE1BQU0sVUFBVyxTQUFRLFFBQVE7SUFDL0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFJLEVBQUUsUUFBa0M7UUFDbEQsS0FBSyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDRyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQXVDOzs7OztZQUNyRCxRQUFRLG1CQUNOLFNBQVMsRUFBRSxJQUFJLElBQ1osQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7WUFFRixvQ0FBb0M7WUFDcEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFNLEdBQUcsWUFBQyxJQUFJLGtDQUM3QixRQUFRLEtBQ1gsU0FBUyxFQUFFLEtBQUssSUFDaEIsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3hCLHFCQUFxQjtZQUNyQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNqQyxPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsbUJBQW1CO1lBQ25CLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2xELENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDRyxHQUFHLENBQ1AsSUFBWSxFQUNaLFFBQWEsSUFBSSxFQUNqQixRQUF1Qzs7Ozs7WUFFdkMsc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUV6QyxnQkFBZ0I7WUFDaEIsSUFBSSxPQUFPLEdBQVEsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPO2dCQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUV4RCx3QkFBd0I7WUFDeEIsT0FBTyxPQUFNLEdBQUcsWUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTtRQUM1QyxDQUFDO0tBQUE7Q0FDRjtBQUVELGVBQWUsVUFBVSxDQUFDIn0=