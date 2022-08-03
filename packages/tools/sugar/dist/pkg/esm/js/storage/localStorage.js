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
export default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHOzs7Ozs7Ozs7O0FBRUgsaUZBQWlGO0FBQ2pGLGFBQWE7QUFDYixNQUFNLFNBQVMsR0FDWCxNQUFNLENBQUMsU0FBUztJQUNoQixhQUFhO0lBQ2IsTUFBTSxDQUFDLFlBQVk7SUFDbkIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxlQUFlO0lBQ3RCLGFBQWE7SUFDYixNQUFNLENBQUMsV0FBVztJQUNsQixhQUFhO0lBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUV6QixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWhFLDRCQUE0QjtBQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHO0lBQ25CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLENBQUMsQ0FBQztBQUVGLElBQUkscUJBQXFCLENBQUM7QUFDMUIsSUFBSSxjQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUN6QyxxQkFBcUIsR0FBRyxPQUFPLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHO0lBQ2IsV0FBVztJQUNYLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsNkJBQTZCO0lBQzdCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDOUMsNENBQTRDO0lBQzVDLEVBQUUsQ0FBQyxVQUFVLEdBQUc7UUFDWixjQUFjO0lBQ2xCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLGVBQWU7SUFDTCxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQWE7O1lBQ3BDLG1CQUFtQjtZQUNuQixNQUFNLGNBQWMsQ0FBQztZQUNyQixzQkFBc0I7WUFDdEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNoRCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLGdCQUFnQjtZQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDMUIsd0JBQXdCO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFXO1FBQ2YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLG1CQUFtQjtZQUNuQixNQUFNLGNBQWMsQ0FBQztZQUNyQixzQkFBc0I7WUFDdEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNoRCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLFdBQVc7WUFDWCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLE9BQU87WUFDUCxzQkFBc0I7WUFDdEIsTUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsSUFBSTtnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDIn0=