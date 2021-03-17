"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/src/shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const SCache_1 = __importDefault(require("./SCache"));
class SFileCache extends SCache_1.default {
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
        super(name, deepMerge_1.default({}, settings || {}));
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
            const stats = fs_1.default.statSync(path);
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
            if (!fs_1.default.existsSync(path))
                return false;
            // read the file
            let content = value;
            if (!content)
                content = fs_1.default.readFileSync(path, 'utf8');
            // set the file in cache
            return _super.set.call(this, path, content, settings);
        });
    }
}
exports.default = SFileCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGVDYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGaWxlQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnR0FBMEU7QUFDMUUsNENBQXNCO0FBQ3RCLHNEQUF3RDtBQWlDeEQsTUFBTSxVQUFXLFNBQVEsZ0JBQVE7SUFDL0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFJLEVBQUUsUUFBa0M7UUFDbEQsS0FBSyxDQUFDLElBQUksRUFBRSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0csR0FBRyxDQUFDLElBQUksRUFBRSxRQUF1Qzs7Ozs7WUFDckQsUUFBUSxtQkFDTixTQUFTLEVBQUUsSUFBSSxJQUNaLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO1lBRUYsb0NBQW9DO1lBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTSxHQUFHLFlBQUMsSUFBSSxrQ0FDN0IsUUFBUSxLQUNYLFNBQVMsRUFBRSxLQUFLLElBQ2hCLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLElBQUksQ0FBQztZQUN4QixxQkFBcUI7WUFDckIsTUFBTSxLQUFLLEdBQUcsWUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDakMsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELG1CQUFtQjtZQUNuQixPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsRCxDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0csR0FBRyxDQUNQLElBQVksRUFDWixRQUFhLElBQUksRUFDakIsUUFBdUM7Ozs7O1lBRXZDLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFFekMsZ0JBQWdCO1lBQ2hCLElBQUksT0FBTyxHQUFRLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFeEQsd0JBQXdCO1lBQ3hCLE9BQU8sT0FBTSxHQUFHLFlBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUU7UUFDNUMsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxVQUFVLENBQUMifQ==