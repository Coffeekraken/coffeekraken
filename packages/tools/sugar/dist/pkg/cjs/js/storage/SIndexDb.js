"use strict";
/**
 * @name        SIndexDb
 * @namespace   js.storage
 * @type        Object
 * @platform    js
 * @status      beta
 *
 * This SIndexDb class gives you a nive and easy way to interact with your indexDb storage.
 * It provides a localStorage like api with the methods "setItem", "getItem", "getAll" and "removeItem"
 * wrapped in a nice Promise based api.
 * You can also use it through his static methods that are exacly the same as the instance ones.
 *
 * @example    js
 * import __SIndexDb from '@coffeekraken/sugar/js/storage/SIndexDb';
 * const db = new __SIndexDb({
 *    db: 'my-cool-db', // default: sugar.js.storage.SIndexDb
 *    table: 'my-table' // default: default
 * });
 * await db.setItem('my-item', 'wefwef.wef.......');
 * await db.getItem('my-item');
 * await db.removeItem('my-item');
 *
 * await __SIndexDb.setItem('my-item', 'fwefwefwefwef');
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
function createAndGetDb(dbName, table) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        if (_dbs[`${dbName}-${table}`]) {
            return resolve(_dbs[`${dbName}-${table}`]);
        }
        let open = indexedDB.open(dbName, 1);
        open.onsuccess = function () {
            const db = open.result;
            _dbs[`${dbName}-${table}`] = db;
            resolve(_dbs[`${dbName}-${table}`]);
        };
        // prepare the simple schema
        open.onupgradeneeded = function () {
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
        this._settings = {};
        this._settings = Object.assign({ db: 'sugar.js.storage.SIndexDb', table: 'default' }, settings);
    }
    /**
     * @name            setItem
     * @type            Function
     * @static
     * @async
     *
     * This static method allows you to add an item into your indexDb
     *
     * @param       {String}        key         The key under which you want to store your data
     * @param       {Any}           value       The value you want to store
     * @param       {Partial<IIndexDbSettings>}         [settings={}]           Some settings like the "db" and the "table" you want to target
     * @return      {Promise}                   A promise resolved once the data has been stored
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setItem(key, value, settings = {}) {
        const db = new IndexDb(settings);
        return db.setItem(key, value);
    }
    /**
     * @name            getItem
     * @type            Function
     * @static
     * @async
     *
     * This static method allows you to get back an item from your indexDb
     *
     * @param       {String}        key         The key under which you want to store your data
     * @param       {Partial<IIndexDbSettings>}         [settings={}]           Some settings like the "db" and the "table" you want to target
     * @return      {Promise}                   A promise resolved with your data once they have been getted
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getItem(key, settings = {}) {
        const db = new IndexDb(settings);
        return db.getItem(key);
    }
    /**
     * @name            getAll
     * @type            Function
     * @static
     * @async
     *
     * This static method allows you to get back all the items of a table from your indexDb
     *
     * @param       {Partial<IIndexDbSettings>}         [settings={}]           Some settings like the "db" and the "table" you want to target
     * @return      {Promise}                   A promise resolved with your data once they have been getted
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getAll(settings = {}) {
        const db = new IndexDb(settings);
        return db.getAll();
    }
    /**
     * @name            removeItem
     * @type            Function
     * @static
     * @async
     *
     * This static method allows you to delete an item from your indexDb
     *
     * @param       {String}        key         The key of the item you want to delete
     * @param       {Partial<IIndexDbSettings>}         [settings={}]           Some settings like the "db" and the "table" you want to target
     * @return      {Promise}                   A promise resolved with your data once they have been getted
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static removeItem(key, settings = {}) {
        const db = new IndexDb(settings);
        return db.removeItem(key);
    }
    /**
     * @name            setItem
     * @type            Function
     * @async
     *
     * This method allows you to add an item into your indexDb
     *
     * @param       {String}        key         The key under which you want to store your data
     * @param       {Any}           value       The value you want to store
     * @param       {Partial<IIndexDbSettings>}         [settings={}]           Some settings like the "db" and the "table" you want to target
     * @return      {Promise}                   A promise resolved once the data has been stored
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setItem(key, value, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign(Object.assign({}, this._settings), settings);
            const db = yield createAndGetDb(finalSettings.db, finalSettings.table);
            // @ts-ignore
            const tx = db.transaction(finalSettings.table, 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            $table.put({
                key,
                value,
            });
            return tx.complete;
        });
    }
    /**
     * @name            getItem
     * @type            Function
     * @async
     *
     * This method allows you to get back an item from your indexDb
     *
     * @param       {String}        key         The key under which you want to store your data
     * @param       {Partial<IIndexDbSettings>}         [settings={}]           Some settings like the "db" and the "table" you want to target
     * @return      {Promise}                   A promise resolved with your data once they have been getted
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getItem(key, settings = this._settings) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign(Object.assign({}, this._settings), settings);
            const db = yield createAndGetDb(finalSettings.db, finalSettings.table);
            // @ts-ignore
            const tx = db.transaction(finalSettings.table, 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            const request = $table.get(key);
            request.onsuccess = function () {
                resolve(request.result.value);
            };
        }));
    }
    /**
     * @name            getAll
     * @type            Function
     * @async
     *
     * This method allows you to get back all the items of a table from your indexDb
     *
     * @param       {Partial<IIndexDbSettings>}         [settings={}]           Some settings like the "db" and the "table" you want to target
     * @return      {Promise}                   A promise resolved with your data once they have been getted
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getAll(settings = this._settings) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign(Object.assign({}, this._settings), settings);
            const db = yield createAndGetDb(finalSettings.db, finalSettings.table);
            // @ts-ignore
            const tx = db.transaction(finalSettings.table, 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            const request = $table.getAll();
            request.onsuccess = function () {
                resolve(request.result);
            };
        }));
    }
    /**
     * @name            removeItem
     * @type            Function
     * @async
     *
     * This method allows you to delete an item from your indexDb
     *
     * @param       {String}        key         The key of the item you want to delete
     * @param       {Partial<IIndexDbSettings>}         [settings={}]           Some settings like the "db" and the "table" you want to target
     * @return      {Promise}                   A promise resolved with your data once they have been getted
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    removeItem(key, settings = this._settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign(Object.assign({}, this._settings), settings);
            const db = yield createAndGetDb(finalSettings.db, finalSettings.table);
            // @ts-ignore
            const tx = db.transaction(finalSettings.table, 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            $table.delete(key);
            return tx.complete;
        });
    }
}
exports.default = IndexDb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHOzs7Ozs7Ozs7OztBQU9ILGlGQUFpRjtBQUNqRixhQUFhO0FBQ2IsTUFBTSxTQUFTLEdBQ1gsTUFBTSxDQUFDLFNBQVM7SUFDaEIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxZQUFZO0lBQ25CLGFBQWE7SUFDYixNQUFNLENBQUMsZUFBZTtJQUN0QixhQUFhO0lBQ2IsTUFBTSxDQUFDLFdBQVc7SUFDbEIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFFekIsTUFBTSxJQUFJLEdBQVEsRUFBRSxDQUFDO0FBRXJCLGFBQWE7QUFDYixTQUFTLGNBQWMsQ0FBQyxNQUFjLEVBQUUsS0FBYTtJQUNqRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsSUFBSSxJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksS0FBSyxFQUFFLENBQUMsRUFBRTtZQUM1QixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNiLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQztRQUVGLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHO1lB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