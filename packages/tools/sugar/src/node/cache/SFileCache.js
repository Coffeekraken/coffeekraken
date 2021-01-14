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
const SCache_1 = __importDefault(require("./SCache"));
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
    constructor(name, settings = {}) {
        super(name, deepMerge_1.default({}, settings));
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
    get(path, settings = {}) {
        const _super = Object.create(null, {
            get: { get: () => super.get }
        });
        return __awaiter(this, void 0, void 0, function* () {
            settings = Object.assign({ valueOnly: true }, settings);
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
     * @param               {String|Array|Object}              name              The name of the item to get back from the cache. If not a string, will be hased using md5 encryption
     * @param               {Mixed}               value             The value to set.
     * @param               {Object}              [settings={}]
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
    set(path, value = null, settings = {}) {
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
module.exports = SFileCache;
//# sourceMappingURL=SFileCache.js.map