"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
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
class IndexDb {
    constructor(settings = {}) {
        this._settings = Object.assign({ db: 'sugar.js.storage.indexDb', table: 'default' }, settings);
    }
    setItem(key, value, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign(Object.assign({}, this._settings), settings);
            const db = yield createAndGetDb(finalSettings.db, finalSettings.table);
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
            const db = yield createAndGetDb(finalSettings.db, finalSettings.table);
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
            const db = yield createAndGetDb(finalSettings.db, finalSettings.table);
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
exports.default = IndexDb;
IndexDb._settings = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7Ozs7Ozs7Ozs7O0FBT0gsaUZBQWlGO0FBQ2pGLGFBQWE7QUFDYixNQUFNLFNBQVMsR0FDWCxNQUFNLENBQUMsU0FBUztJQUNoQixhQUFhO0lBQ2IsTUFBTSxDQUFDLFlBQVk7SUFDbkIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxlQUFlO0lBQ3RCLGFBQWE7SUFDYixNQUFNLENBQUMsV0FBVztJQUNsQixhQUFhO0lBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUV6QixNQUFNLElBQUksR0FBUSxFQUFFLENBQUM7QUFFckIsYUFBYTtBQUNiLFNBQVMsY0FBYyxDQUNuQixTQUFpQiwwQkFBMEIsRUFDM0MsUUFBZ0IsU0FBUztJQUV6QixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDYixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDO1FBRUYsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENB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