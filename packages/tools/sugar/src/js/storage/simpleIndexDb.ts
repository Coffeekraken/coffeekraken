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
function createAndGetDb(
    dbName: string = 'sugar.js.storage.indexDb',
    table: string = 'default',
) {
    return new Promise(async (resolve) => {
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
    });
}

export default class IndexDb {
    static _settings = {};
    constructor(settings: Partial<IIndexDbSettings> = {}) {
        this._settings = {
            db: 'sugar.js.storage.indexDb',
            table: 'default',
            ...settings,
        };
    }
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
        const tx = db.transaction([table], 'readwrite');
        const $table = tx.objectStore(finalSettings.table);
        $table.put({
            key,
            value,
        });
        return tx.complete;
    }
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
            const tx = db.transaction([finalSettings.table], 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            const request = $table.get(key);
            request.onsuccess = function () {
                resolve(request.result.value);
            };
        });
    }
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
            const tx = db.transaction([finalSettings.table], 'readwrite');
            const $table = tx.objectStore(finalSettings.table);
            const request = $table.getAll();
            request.onsuccess = function () {
                resolve(request.result);
            };
        });
    }
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
        const tx = db.transaction([finalSettings.table], 'readwrite');
        const $table = tx.objectStore(finalSettings.table);
        $table.delete(key);
        return tx.complete;
    }
}
