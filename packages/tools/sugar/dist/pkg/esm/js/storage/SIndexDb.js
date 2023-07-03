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
 * @snippet         __SIndexDb($1)
 * const db = new __SIndexDb({
 *    db: $1,
 *    table: $2
 * });
 *
 * @example    js
 * import { __SIndexDb } from '@coffeekraken/sugar/storage';
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
export default class IndexDb {
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
    constructor(settings = {}) {
        this._settings = {};
        this._settings = Object.assign({ db: 'sugar.js.storage.SIndexDb', table: 'default' }, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7Ozs7Ozs7Ozs7QUFPSCxpRkFBaUY7QUFDakYsYUFBYTtBQUNiLE1BQU0sU0FBUyxHQUNYLE1BQU0sQ0FBQyxTQUFTO0lBQ2hCLGFBQWE7SUFDYixNQUFNLENBQUMsWUFBWTtJQUNuQixhQUFhO0lBQ2IsTUFBTSxDQUFDLGVBQWU7SUFDdEIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxXQUFXO0lBQ2xCLGFBQWE7SUFDYixNQUFNLENBQUMsYUFBYSxDQUFDO0FBRXpCLE1BQU0sSUFBSSxHQUFRLEVBQUUsQ0FBQztBQUVyQixhQUFhO0FBQ2IsU0FBUyxjQUFjLENBQUMsTUFBYyxFQUFFLEtBQWE7SUFDakQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLElBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUVELElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDYixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFFRiw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FB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