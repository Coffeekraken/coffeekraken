var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
/**
 * @name                SDobbyClient
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a base adapter to save the configuration of the dobby deamon
 *
 * @param           {ISDobbyClientSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @example         js
 * import { __SDobbyClient } from '@coffeekraken/s-dobby';
 * export default class MyCoolDobbyAdapter extends __SDobbyClient {
 *   // ...
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDobbyClient extends __SClass {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge({
            host: 'localhost',
            port: 8787,
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        pools
         * @type        Any
         *
         * Store the registered pools
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.pools = {};
        // update local tasks stack
        this.on('pool', (res) => {
            console.log('POOL', res);
            this.pools[res.pool.uid] = res;
        });
        // this.on('pool.config', (res: any) => {
        //     if (!this.pools[res.pool.uid]) {
        //         return;
        //     }
        //     this.pools[res.pool.uid].config = res.config;
        // });
    }
    /**
     * Connect to server
     */
    connect() {
        // Create WebSocket connection.
        this._socket = new WebSocket(`ws://${this.settings.host}:${this.settings.port}`);
        // Connection opened
        this._socket.addEventListener('open', (event) => {
            this._socket.send('Hello Server!');
        });
        // Listen for messages
        this._socket.addEventListener('message', (event) => __awaiter(this, void 0, void 0, function* () {
            let data = event.data;
            try {
                data = yield event.data.text();
            }
            catch (e) { }
            try {
                data = JSON.parse(data);
            }
            catch (e) { }
            // dispatch the event
            document.dispatchEvent(new CustomEvent(`dobby.${data.type}`, {
                detail: data,
            }));
        }));
    }
    getTasks() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () { }));
    }
    on(event, callback) {
        const cb = (e) => {
            var _a;
            callback((_a = e.detail.data) !== null && _a !== void 0 ? _a : e.detail);
        };
        document.addEventListener(`dobby.${event}`, cb);
        return function () {
            document.removeEventListener(`dobby.${event}`, cb);
        };
    }
    exec(action) {
        this._socket.send(JSON.stringify(action));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxRQUFRO0lBeUI5Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQWdDO1FBQ3hDLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsSUFBSTtTQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUE5Qk47Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQWdDLEVBQUUsQ0FBQztRQXVCcEMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILHlDQUF5QztRQUN6Qyx1Q0FBdUM7UUFDdkMsa0JBQWtCO1FBQ2xCLFFBQVE7UUFDUixvREFBb0Q7UUFDcEQsTUFBTTtJQUNWLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU87UUFDSCwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FDeEIsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUNyRCxDQUFDO1FBRUYsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxLQUFLLEVBQUUsRUFBRTtZQUNyRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUk7Z0JBQ0EsSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNsQztZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7WUFDZCxJQUFJO2dCQUNBLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtZQUVkLHFCQUFxQjtZQUNyQixRQUFRLENBQUMsYUFBYSxDQUNsQixJQUFJLFdBQVcsQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbEMsTUFBTSxFQUFFLElBQUk7YUFDZixDQUFDLENBQ0wsQ0FBQztRQUNOLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRSxnREFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxFQUFFLENBQUMsS0FBYSxFQUFFLFFBQWtCO1FBQ2hDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1lBQ2IsUUFBUSxDQUFDLE1BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFDRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRCxPQUFPO1lBQ0gsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELElBQUksQ0FBQyxNQUEyQjtRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNKIn0=