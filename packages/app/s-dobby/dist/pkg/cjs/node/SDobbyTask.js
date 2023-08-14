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
const string_1 = require("@coffeekraken/sugar/string");
const network_1 = require("@coffeekraken/sugar/network");
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const SDobby_js_1 = __importDefault(require("./SDobby.js"));
/**
 * @name                SDobbyTask
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a base task
 *
 * @param           {ISDobbyTaskSettings}          [settings={}]           Some settings to configure your dobby task instance
 *
 * @example         js
 * import { __SDobbyTask } from '@coffeekraken/s-dobby';
 * export default class MyCoolDobbyAdapter extends __SDobbyTask {
 *   // ...
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDobbyTask extends s_class_1.default {
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
    constructor(taskMetas) {
        super();
        this.metas = taskMetas;
        this.settings = taskMetas.settings;
        this.reporterMetas = taskMetas.reporter;
        if (this.reporterMetas) {
            if (!SDobby_js_1.default.registeredReporters[this.reporterMetas.type]) {
                throw new Error(`The requested "${this.reporterMetas.type}" reporter is not registered...}"`);
            }
            // @ts-ignore
            this.reporter = new SDobby_js_1.default.registeredReporters[this.reporterMetas.type](this.reporterMetas);
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`<yellow>[SDobby]</yellow> Starting <magenta>${this.metas.name} (${this.metas.type})</magenta> task...`);
            this._time = Date.now();
            this._duration = new s_duration_1.default();
            yield this._getGeo();
            return true;
        });
    }
    _getGeo() {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = new Headers();
            headers.set('Authorization', 'Basic ' +
                Buffer.from(`897136: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`).toString('base64'));
            const publicIp = yield (0, network_1.__publicIpAddress)();
            const response = yield fetch(`https://geolite.info/geoip/v2.1/city/${publicIp}`, {
                method: 'GET',
                headers: headers,
            });
            const geoJson = yield response.json();
            this._geo = {
                country: {
                    iso: geoJson.country.iso_code,
                    name: geoJson.country.names.en,
                },
                city: {
                    code: geoJson.postal.code,
                    name: geoJson.city.names.en,
                },
                timezone: geoJson.location.time_zone,
                lat: geoJson.location.latitude,
                lng: geoJson.location.longitude,
            };
        });
    }
    end(data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const durationObj = this._duration.end();
            console.log(`<green>[SDobby]</green> Task <magenta>${this.metas.name} (${this.metas.type})</magenta> finished <green>successfully</green> in <cyan>${durationObj.formatedDuration}</cyan>`);
            const finalResult = {
                uid: (0, string_1.__uniqid)(),
                time: this._time,
                geo: this._geo,
                duration: durationObj,
                task: this.metas,
                data,
            };
            // report if specified
            if (this.reporter) {
                yield this.reporter.report(finalResult);
            }
            return finalResult;
        });
    }
}
exports.default = SDobbyTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLHVEQUFzRDtBQUV0RCx5REFBZ0U7QUFFaEUsMEVBQW1EO0FBRW5ELDREQUFtQztBQVduQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFxQixVQUFXLFNBQVEsaUJBQVE7SUE2QzVDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBNEI7UUFDcEMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBRXhDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsbUJBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4RCxNQUFNLElBQUksS0FBSyxDQUNYLGtCQUFrQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksbUNBQW1DLENBQy9FLENBQUM7YUFDTDtZQUVELGFBQWE7WUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxtQkFBbUIsQ0FDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQzFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQU1LLEtBQUs7O1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FDUCwrQ0FBK0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLHFCQUFxQixDQUMxRyxDQUFDO1lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztZQUVuQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVyQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFSyxPQUFPOztZQUNULE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxlQUFlLEVBQ2YsUUFBUTtnQkFDSixNQUFNLENBQUMsSUFBSSxDQUNQLGlEQUFpRCxDQUNwRCxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FDM0IsQ0FBQztZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBQSwyQkFBaUIsR0FBRSxDQUFDO1lBQzNDLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUN4Qix3Q0FBd0MsUUFBUSxFQUFFLEVBQ2xEO2dCQUNJLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRSxPQUFPO2FBQ25CLENBQ0osQ0FBQztZQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUc7Z0JBQ1IsT0FBTyxFQUFFO29CQUNMLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7b0JBQzdCLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2lCQUNqQztnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSTtvQkFDekIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7aUJBQzlCO2dCQUNELFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVM7Z0JBQ3BDLEdBQUcsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVE7Z0JBQzlCLEdBQUcsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVM7YUFDbEMsQ0FBQztRQUNOLENBQUM7S0FBQTtJQUVLLEdBQUcsQ0FBQyxPQUFZLEVBQUU7O1lBQ3BCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FDUCx5Q0FBeUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLDZEQUE2RCxXQUFXLENBQUMsZ0JBQWdCLFNBQVMsQ0FDakwsQ0FBQztZQUVGLE1BQU0sV0FBVyxHQUFHO2dCQUNoQixHQUFHLEVBQUUsSUFBQSxpQkFBUSxHQUFFO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDaEIsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNkLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2hCLElBQUk7YUFDUCxDQUFDO1lBRUYsc0JBQXNCO1lBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzNDO1lBRUQsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztLQUFBO0NBQ0o7QUFsSkQsNkJBa0pDIn0=