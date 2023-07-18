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
            port: 8787
        }, settings !== null && settings !== void 0 ? settings : {}));
        // update local tasks stack
        this.on('config', (config) => {
            this._config = config;
            console.log('con', config);
        });
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
                detail: data
            }));
        }));
    }
    getTasks() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        }));
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
}
exports.default = SDobbyClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHVEQUF5RDtBQUl6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFxQixZQUFhLFNBQVEsaUJBQVE7SUF5QjlDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBbUM7UUFDM0MsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQztZQUNkLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxJQUFJO1NBQ2IsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUVILCtCQUErQjtRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxDQUN4QixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQ3JELENBQUM7UUFFRixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVILHNCQUFzQjtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFO1lBQ3JELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBSTtnQkFDQSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2xDO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtZQUNkLElBQUk7Z0JBQ0EsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0I7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1lBRWQscUJBQXFCO1lBQ3JCLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3pELE1BQU0sRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxFQUFFLENBQUMsS0FBYSxFQUFFLFFBQWtCO1FBQ2hDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1lBQ2IsUUFBUSxDQUFDLE1BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFDRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRCxPQUFPO1lBQ0gsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBOUZELCtCQThGQyJ9