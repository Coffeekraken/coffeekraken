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

export interface IIndexDbSettings {
    db: string;
    table: string;
}

// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
// @ts-ignore
const indexedDB =
    window.indexedDB ||
    // @ts-ignore
    window.mozIndexedDB ||
    // @ts-ignore
    window.webkitIndexedDB ||
    // @ts-ignore
    window.msIndexedDB ||
    // @ts-ignore
    window.shimIndexedDB;

const _dbs: any = {};

// @ts-ignore
function createAndGetDb(dbName: string, table: string) {
    return new Promise(async (resolve) => {
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
    });
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
    static setItem(
        key: string,
        value: string,
        settings: Partial<IIndexDbSettings> = {},
    ) {
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
    static getItem(key: string, settings: Partial<IIndexDbSettings> = {}) {
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
    static getAll(settings: Partial<IIndexDbSettings> = {}) {
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
    static removeItem(key: string, settings: Partial<IIndexDbSettings> = {}) {
        const db = new IndexDb(settings);
        return db.removeItem(key);
    }

    _settings = {};
    constructor(settings: Partial<IIndexDbSettings> = {}) {
        this._settings = {
            db: 'sugar.js.storage.SIndexDb',
            table: 'default',
            ...settings,
        };
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
    async setItem(
        key: string,
        value: string,
        settings: Partial<IIndexDbSettings> = {},
    ): Promise<any> {
        const finalSettings: IIndexDbSettings = {
            ...this._settings,
            ...settings,
        };

        const db = await createAndGetDb(finalSettings.db, finalSettings.table);
        // @ts-ignore
        const tx = db.transaction(finalSettings.table, 'readwrite');
        const $table = tx.objectStore(finalSettings.table);
        $table.put({
            key,
            value,
        });
        return tx.complete;
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
    getItem(
        key: string,
        settings: Partial<IIndexDbSettings> = this._settings,
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const finalSettings: IIndexDbSettings = {
                ...this._settings,
                ...settings,
            };
            const db = await createAndGetDb(
                finalSettings.db,
                finalSettings.table,
            );
            // @ts-ignore
            const tx = db.transaction(finalSettings.table, 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            const request = $table.get(key);
            request.onsuccess = function () {
                resolve(request.result.value);
            };
        });
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
    getAll(settings: Partial<IIndexDbSettings> = this._settings): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const finalSettings: IIndexDbSettings = {
                ...this._settings,
                ...settings,
            };
            const db = await createAndGetDb(
                finalSettings.db,
                finalSettings.table,
            );
            // @ts-ignore
            const tx = db.transaction(finalSettings.table, 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            const request = $table.getAll();
            request.onsuccess = function () {
                resolve(request.result);
            };
        });
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
    async removeItem(
        key: string,
        settings: Partial<IIndexDbSettings> = this._settings,
    ): Promise<any> {
        const finalSettings: IIndexDbSettings = {
            ...this._settings,
            ...settings,
        };
        const db = await createAndGetDb(finalSettings.db, finalSettings.table);
        // @ts-ignore
        const tx = db.transaction(finalSettings.table, 'readwrite');
        const $table = tx.objectStore(finalSettings.table);
        $table.delete(key);
        return tx.complete;
    }
}
