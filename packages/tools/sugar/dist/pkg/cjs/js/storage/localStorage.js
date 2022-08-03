"use strict";
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
exports.default = {
    setItem(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            // waiting db ready
            yield dbReadyPromise;
            // prepare transaction
            const db = open.result;
            const tx = db.transaction('store', 'readwrite');
            const store = tx.objectStore('store');
            // Add some data
            store.put({ key, value });
            // maintain chainability
            return this;
        });
    },
    getItem(key) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // waiting db ready
            yield dbReadyPromise;
            // prepare transaction
            const db = open.result;
            const tx = db.transaction('store', 'readwrite');
            const store = tx.objectStore('store');
            // query db
            const getKey = store.get(key);
            return;
            // on success, resolve
            getKey.onsuccess = function (...args) {
                console.log('AARES', getKey.result, args);
                resolve(getKey.result.value);
            };
        }));
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRzs7Ozs7Ozs7Ozs7QUFFSCxpRkFBaUY7QUFDakYsYUFBYTtBQUNiLE1BQU0sU0FBUyxHQUNYLE1BQU0sQ0FBQyxTQUFTO0lBQ2hCLGFBQWE7SUFDYixNQUFNLENBQUMsWUFBWTtJQUNuQixhQUFhO0lBQ2IsTUFBTSxDQUFDLGVBQWU7SUFDdEIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxXQUFXO0lBQ2xCLGFBQWE7SUFDYixNQUFNLENBQUMsYUFBYSxDQUFDO0FBRXpCLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFaEUsNEJBQTRCO0FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUc7SUFDbkIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDbEUsQ0FBQyxDQUFDO0FBRUYsSUFBSSxxQkFBcUIsQ0FBQztBQUMxQixJQUFJLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQ3pDLHFCQUFxQixHQUFHLE9BQU8sQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxTQUFTLEdBQUc7SUFDYixXQUFXO0lBQ1gscUJBQXFCLEVBQUUsQ0FBQztJQUN4Qiw2QkFBNkI7SUFDN0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM5Qyw0Q0FBNEM7SUFDNUMsRUFBRSxDQUFDLFVBQVUsR0FBRztRQUNaLGNBQWM7SUFDbEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUYsa0JBQWU7SUFDTCxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQWE7O1lBQ3BDLG1CQUFtQjtZQUNuQixNQUFNLGNBQWMsQ0FBQztZQUNyQixzQkFBc0I7WUFDdEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNoRCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLGdCQUFnQjtZQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDMUIsd0JBQXdCO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFXO1FBQ2YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLG1CQUFtQjtZQUNuQixNQUFNLGNBQWMsQ0FBQztZQUNyQixzQkFBc0I7WUFDdEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNoRCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLFdBQVc7WUFDWCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLE9BQU87WUFDUCxzQkFBc0I7WUFDdEIsTUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsSUFBSTtnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDIn0=