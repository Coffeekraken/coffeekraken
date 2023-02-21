"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const url_1 = require("@coffeekraken/sugar/url");
const SEnv_1 = __importDefault(require("../shared/SEnv"));
/**
 * @name            SEnv
 * @namespace       js
 * @type            Class
 * @platform        js
 * @status          beta
 *
 * This class allows you to access, set and update environment variables seemlessly on node
 * and browser env.
 * You can also check if the environment is a dev one or a production using the
 * helpfull ```is``` function like so: ```SEnv.is('prod')```
 *
 * @todo        tests
 *
 * @example         js
 * import __SEnv from '@coffeekraken/s-env';
 * this.get('something');
 * __SEnv.is('prod');
 * __SEnv.is('production');
 * __SEnv.is('development');
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
// @ts-ignore
class SEnv extends SEnv_1.default {
    static get env() {
        if (this._env)
            return this._env;
        const envConfig = s_sugar_config_1.default.get('env');
        const queryStringObj = (0, url_1.__queryStringToObject)(document.location.search);
        let finalEnv = 'development'; // fallback
        if (envConfig.env) {
            finalEnv = envConfig.env;
        }
        else if (envConfig.envFromLocation &&
            Object.keys(envConfig.envFromLocation).length) {
            for (let [env, regex] of Object.entries(envConfig.envFromLocation)) {
                if (new RegExp(regex).test(document.location.href)) {
                    finalEnv = env;
                    break;
                }
            }
        }
        else {
            console.log(`<red>[SEnv]</red> The environment cannot be determined. Either set the config.env.env configuration or specify some environments by setting the config.env.envFromLocation object of {env}:{regex} environments`);
        }
        document.env.ENVIRONMENT = finalEnv;
        document.env.ENV = finalEnv;
        document.env.PLATFORM = 'browser';
        document.env.DEVS_CUT = queryStringObj.devsCut !== undefined;
        document.env.VERBOSE = queryStringObj.verbose !== undefined;
        this._env = document.env;
        return document.env;
    }
}
exports.default = SEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELGlEQUFnRTtBQUNoRSwwREFBb0M7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILGFBQWE7QUFDYixNQUFxQixJQUFLLFNBQVEsY0FBTTtJQWFwQyxNQUFNLEtBQUssR0FBRztRQUNWLElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFaEMsTUFBTSxTQUFTLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsTUFBTSxjQUFjLEdBQUcsSUFBQSwyQkFBcUIsRUFBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZFLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxDQUFDLFdBQVc7UUFDekMsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2YsUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7U0FDNUI7YUFBTSxJQUNILFNBQVMsQ0FBQyxlQUFlO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sRUFDL0M7WUFDRSxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDbkMsU0FBUyxDQUFDLGVBQWUsQ0FDNUIsRUFBRTtnQkFDQyxJQUFJLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNoRCxRQUFRLEdBQUcsR0FBRyxDQUFDO29CQUNmLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUNQLGlOQUFpTixDQUNwTixDQUFDO1NBQ0w7UUFFRCxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDcEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNsQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztRQUM3RCxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztRQUM1RCxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDekIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQ3hCLENBQUM7Q0FDSjtBQWpERCx1QkFpREMifQ==