import __splitEvery from '../../shared/string/splitEvery';
import __jsStringCompression from 'js-string-compression';

/**
 * @name        localStorage
 * @namespace   js.storage
 * @type        Object
 * @platform    js
 * @status      beta
 *
 * This localStorage replacement gived you the ability to store large amount of data in indexDB with a similar api that the localStorage one.
 * The only difference is that you can store more data that the localStorage, as well as store directly objects, arrays, etc...
 * Note that this API is async due to the nature of indexDB.
 *
 * @example    js
 * import __localStorage from '@coffeekraken/sugar/js/storage/localStorage';
 * await __localStorage.setItem('my-item', 'wefwef.wef.......');
 * await __localStorage.getItem('my-item');
 *
 * @see         https://gist.github.com/JamesMessinger/a0d6389a5d0e3a24814b
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

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

const open = indexedDB.open('sugar.js.storage.localStorage', 1);

// prepare the simple schema
open.onupgradeneeded = function () {
    var db = open.result;
    var store = db.createObjectStore('store', { keyPath: 'key' });
};

let dbReadyPromiseResolve;
let dbReadyPromise = new Promise((resolve) => {
    dbReadyPromiseResolve = resolve;
});

open.onsuccess = function () {
    // db ready
    dbReadyPromiseResolve();
    // // Start a new transaction
    var db = open.result;
    var tx = db.transaction('store', 'readwrite');
    // Close the db when the transaction is done
    tx.oncomplete = function () {
        // db.close();
    };
};

export default {
    async setItem(key: string, value: string): Promise<any> {
        // waiting db ready
        await dbReadyPromise;
        // prepare transaction
        const db = open.result;
        const tx = db.transaction('store', 'readwrite');
        const store = tx.objectStore('store');
        // Add some data
        store.put({ key, value });
        // maintain chainability
        return this;
    },
    getItem(key: string): Promise<any> {
        return new Promise(async (resolve) => {
            // waiting db ready
            await dbReadyPromise;
            // prepare transaction
            const db = open.result;
            const tx = db.transaction('store', 'readwrite');
            const store = tx.objectStore('store');
            // query db
            const getKey = store.get(key);
            // on success, resolve
            getKey.onsuccess = function () {
                resolve(getKey.result.value);
            };
        });
    },
};
