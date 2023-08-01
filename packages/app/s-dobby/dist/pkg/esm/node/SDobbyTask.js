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
import { __uniqid } from '@coffeekraken/sugar/string';
import { __publicIpAddress } from '@coffeekraken/sugar/network';
import __SDuration from '@coffeekraken/s-duration';
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
export default class SDobbyTask extends __SClass {
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
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`<yellow>[SDobby]</yellow> Starting <magenta>${this.metas.name} (${this.metas.type})</magenta> task...`);
            this._time = Date.now();
            this._duration = new __SDuration();
            const headers = new Headers();
            headers.set('Authorization', 'Basic ' +
                Buffer.from(`897136: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`).toString('base64'));
            const publicIp = yield __publicIpAddress();
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
            return true;
        });
    }
    end() {
        const durationObj = this._duration.end();
        console.log(`<green>[SDobby]</green> Task <magenta>${this.metas.name} (${this.metas.type})</magenta> finished <green>successfully</green> in <cyan>${durationObj.formatedDuration}</cyan>`);
        return {
            uid: __uniqid(),
            time: this._time,
            geo: this._geo,
            duration: durationObj,
            task: this.metas,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVoRSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQVFuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBdUI1Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFNBQTRCO1FBQ3BDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7SUFNSyxLQUFLOztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQ1AsK0NBQStDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxxQkFBcUIsQ0FDMUcsQ0FBQztZQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUVuQyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsZUFBZSxFQUNmLFFBQVE7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FDUCxpREFBaUQsQ0FDcEQsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQzNCLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLGlCQUFpQixFQUFFLENBQUM7WUFFM0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQ3hCLHdDQUF3QyxRQUFRLEVBQUUsRUFDbEQ7Z0JBQ0ksTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsT0FBTyxFQUFFLE9BQU87YUFDbkIsQ0FDSixDQUFDO1lBRUYsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRztnQkFDUixPQUFPLEVBQUU7b0JBQ0wsR0FBRyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtvQkFDN0IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7aUJBQ2pDO2dCQUNELElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJO29CQUN6QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtpQkFDOUI7Z0JBQ0QsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUztnQkFDcEMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUTtnQkFDOUIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUzthQUNsQyxDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBRUQsR0FBRztRQUNDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FDUCx5Q0FBeUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLDZEQUE2RCxXQUFXLENBQUMsZ0JBQWdCLFNBQVMsQ0FDakwsQ0FBQztRQUNGLE9BQU87WUFDSCxHQUFHLEVBQUUsUUFBUSxFQUFFO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2hCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNkLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztTQUNuQixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=