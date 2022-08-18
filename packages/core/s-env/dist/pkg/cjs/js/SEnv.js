"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
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
        console.log(`%c[SEnv] Current environment is "${finalEnv}"`, `color: ${finalEnv === 'production'
            ? 'red'
            : finalEnv === 'staging'
                ? 'cyan'
                : 'lightGreen'}`);
        document.env.ENVIRONMENT = finalEnv;
        document.env.ENV = finalEnv;
        document.env.PLATFORM = 'browser';
        this._env = document.env;
        return document.env;
    }
}
exports.default = SEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELDBEQUFvQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILGFBQWE7QUFDYixNQUFxQixJQUFLLFNBQVEsY0FBTTtJQWFwQyxNQUFNLEtBQUssR0FBRztRQUNWLElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFaEMsTUFBTSxTQUFTLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLENBQUMsV0FBVztRQUN6QyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZixRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztTQUM1QjthQUFNLElBQ0gsU0FBUyxDQUFDLGVBQWU7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxFQUMvQztZQUNFLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNuQyxTQUFTLENBQUMsZUFBZSxDQUM1QixFQUFFO2dCQUNDLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2hELFFBQVEsR0FBRyxHQUFHLENBQUM7b0JBQ2YsTUFBTTtpQkFDVDthQUNKO1NBQ0o7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQ1Asd01BQXdNLEVBQ3hNLGVBQWUsQ0FDbEIsQ0FBQztTQUNMO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCxvQ0FBb0MsUUFBUSxHQUFHLEVBQy9DLFVBQ0ksUUFBUSxLQUFLLFlBQVk7WUFDckIsQ0FBQyxDQUFDLEtBQUs7WUFDUCxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVM7Z0JBQ3hCLENBQUMsQ0FBQyxNQUFNO2dCQUNSLENBQUMsQ0FBQyxZQUNWLEVBQUUsQ0FDTCxDQUFDO1FBRUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUM1QixRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3pCLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUN4QixDQUFDO0NBQ0o7QUF6REQsdUJBeURDIn0=