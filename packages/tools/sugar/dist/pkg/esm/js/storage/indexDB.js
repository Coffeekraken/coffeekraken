/**
 * @name        indexDb
 * @namespace   js.storage
 * @type        Object
 * @platform    js
 * @status      beta
 *
 * This indexDb replacement gived you the ability to store large amount of data in indexDB with a similar api that the indexDb one.
 * The only difference is that you can store more data that the indexDb, as well as store directly objects, arrays, etc...
 * Note that this API is async due to the nature of indexDB.
 *
 * @example    js
 * import __indexDb from '@coffeekraken/sugar/js/storage/indexDb';
 * await __indexDb.setItem('my-item', 'wefwef.wef.......');
 * await __indexDb.getItem('my-item');
 * await __indexDb.removeItem('my-item');
 *
 * @see         https://gist.github.com/JamesMessinger/a0d6389a5d0e3a24814b
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
// @ts-ignore
const indexedDB = window.indexedDB ||
    // @ts-ignore
    window.mozIndexedDB ||
    // @ts-ignore
    window.webkitIndexedDB ||
    // @ts-ignore
    window.msIndexedDB ||
    // @ts-ignore
    window.shimIndexedDB;
const _dbs = {};
// @ts-ignore
function createAndGetDb(dbName = 'sugar.js.storage.indexDb', table = 'default') {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        if (_dbs[table]) {
            return resolve(_dbs[table]);
        }
        let open = indexedDB.open(dbName, 1);
        open.onsuccess = function () {
            console.log('succ');
            const db = open.result;
            _dbs[table] = db;
            resolve(_dbs[table]);
        };
        // prepare the simple schema
        open.onupgradeneeded = function () {
            console.log('up');
            const db = open.result;
            if (!db.objectStoreNames.contains(table)) {
                // @ts-ignore
                db.createObjectStore(table, { keyPath: 'key' });
            }
        };
    }));
}
export default class IndexDb {
    constructor(settings = {}) {
        this._settings = {};
        this._settings = Object.assign({ db: 'sugar.js.storage.indexDb' }, settings);
    }
    setItem(key, value, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign(Object.assign({}, this._settings), settings);
            const db = yield createAndGetDb(settings.db, finalSettings.table);
            // @ts-ignore
            const tx = db.transaction([table], 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            $table.put({
                key,
                value,
            });
            return tx.complete;
        });
    }
    getItem(key, settings = this._settings) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign(Object.assign({}, this._settings), settings);
            const db = yield createAndGetDb(settings.db, finalSettings.table);
            // @ts-ignore
            const tx = db.transaction([finalSettings.table], 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            const request = $table.get(key);
            request.onsuccess = function () {
                resolve(request.result.value);
            };
        }));
    }
    getAll(settings = this._settings) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign(Object.assign({}, this._settings), settings);
            const db = yield createAndGetDb(settings.db, finalSettings.table);
            // @ts-ignore
            const tx = db.transaction([finalSettings.table], 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            const request = $table.getAll();
            request.onsuccess = function () {
                resolve(request.result);
            };
        }));
    }
    removeItem(key, settings = this._settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign(Object.assign({}, this._settings), settings);
            const db = yield createAndGetDb(finalSettings.db, finalSettings.table);
            // @ts-ignore
            const tx = db.transaction([finalSettings.table], 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            $table.delete(key);
            return tx.complete;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7Ozs7Ozs7OztBQU9ILGlGQUFpRjtBQUNqRixhQUFhO0FBQ2IsTUFBTSxTQUFTLEdBQ1gsTUFBTSxDQUFDLFNBQVM7SUFDaEIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxZQUFZO0lBQ25CLGFBQWE7SUFDYixNQUFNLENBQUMsZUFBZTtJQUN0QixhQUFhO0lBQ2IsTUFBTSxDQUFDLFdBQVc7SUFDbEIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFFekIsTUFBTSxJQUFJLEdBQVEsRUFBRSxDQUFDO0FBRXJCLGFBQWE7QUFDYixTQUFTLGNBQWMsQ0FDbkIsU0FBaUIsMEJBQTBCLEVBQzNDLFFBQWdCLFNBQVM7SUFFekIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDL0I7UUFFRCxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQztRQUVGLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFD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