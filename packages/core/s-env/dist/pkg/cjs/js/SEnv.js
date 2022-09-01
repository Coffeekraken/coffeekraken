"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const queryStringToObject_1 = __importDefault(require("@coffeekraken/sugar/shared/url/queryStringToObject"));
const SEnv_1 = __importDefault(require("../shared/SEnv"));
/**
 * @name            SEnv
 * @namespace       js
 * @type            Class
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
        const queryStringObj = (0, queryStringToObject_1.default)(document.location.search);
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
            console.log(`%c[SEnv] The environment cannot be determined. Either set the config.env.env configuration or specify some environments by setting the config.env.envFromLocation object of {env}:{regex} environments`, 'color: orange');
        }
        console.log(`%c[SEnv] Current environment is "${finalEnv}"${queryStringObj.devsCut ? " developer's cut (devsCut)" : ''}`, `color: ${finalEnv === 'production'
            ? 'red'
            : finalEnv === 'staging'
                ? 'cyan'
                : 'lightGreen'}`);
        document.env.ENVIRONMENT = finalEnv;
        document.env.ENV = finalEnv;
        document.env.PLATFORM = 'browser';
        document.env.DEVS_CUT = queryStringObj.devsCut !== undefined;
        this._env = document.env;
        return document.env;
    }
}
exports.default = SEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELDZHQUF1RjtBQUN2RiwwREFBb0M7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxhQUFhO0FBQ2IsTUFBcUIsSUFBSyxTQUFRLGNBQU07SUFhcEMsTUFBTSxLQUFLLEdBQUc7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRWhDLE1BQU0sU0FBUyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVDLE1BQU0sY0FBYyxHQUFHLElBQUEsNkJBQXFCLEVBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2RSxJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsQ0FBQyxXQUFXO1FBQ3pDLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNmLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO1NBQzVCO2FBQU0sSUFDSCxTQUFTLENBQUMsZUFBZTtZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEVBQy9DO1lBQ0UsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ25DLFNBQVMsQ0FBQyxlQUFlLENBQzVCLEVBQUU7Z0JBQ0MsSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDaEQsUUFBUSxHQUFHLEdBQUcsQ0FBQztvQkFDZixNQUFNO2lCQUNUO2FBQ0o7U0FDSjthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FDUCx3TUFBd00sRUFDeE0sZUFBZSxDQUNsQixDQUFDO1NBQ0w7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUNQLG9DQUFvQyxRQUFRLElBQ3hDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxFQUM1RCxFQUFFLEVBQ0YsVUFDSSxRQUFRLEtBQUssWUFBWTtZQUNyQixDQUFDLENBQUMsS0FBSztZQUNQLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUztnQkFDeEIsQ0FBQyxDQUFDLE1BQU07Z0JBQ1IsQ0FBQyxDQUFDLFlBQ1YsRUFBRSxDQUNMLENBQUM7UUFFRixRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDcEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNsQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztRQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDekIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQ3hCLENBQUM7Q0FDSjtBQTlERCx1QkE4REMifQ==