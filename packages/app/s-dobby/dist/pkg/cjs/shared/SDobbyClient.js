"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
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
class SDobbyClient extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({
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
exports.default = SDobbyClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHVEQUF5RDtBQVV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFxQixZQUFhLFNBQVEsaUJBQVE7SUF5QjlDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBZ0M7UUFDeEMsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxJQUFJO1NBQ2IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQTlCTjs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBZ0MsRUFBRSxDQUFDO1FBdUJwQywyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gseUNBQXlDO1FBQ3pDLHVDQUF1QztRQUN2QyxrQkFBa0I7UUFDbEIsUUFBUTtRQUNSLG9EQUFvRDtRQUNwRCxNQUFNO0lBQ1YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUNILCtCQUErQjtRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxDQUN4QixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQ3JELENBQUM7UUFFRixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVILHNCQUFzQjtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFO1lBQ3JELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBSTtnQkFDQSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2xDO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtZQUNkLElBQUk7Z0JBQ0EsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0I7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1lBRWQscUJBQXFCO1lBQ3JCLFFBQVEsQ0FBQyxhQUFhLENBQ2xCLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNsQyxNQUFNLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FDTCxDQUFDO1FBQ04sQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFLGdEQUFFLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELEVBQUUsQ0FBQyxLQUFhLEVBQUUsUUFBa0I7UUFDaEMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7WUFDYixRQUFRLENBQUMsTUFBQSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksbUNBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQztRQUNGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELE9BQU87WUFDSCxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQTJCO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0o7QUE3R0QsK0JBNkdDIn0=