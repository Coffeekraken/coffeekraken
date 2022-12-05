import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __queryStringToObject } from '@coffeekraken/sugar/url';
import __SEnv from '../shared/SEnv';
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
export default class SEnv extends __SEnv {
    static get env() {
        if (this._env)
            return this._env;
        const envConfig = __SSugarConfig.get('env');
        const queryStringObj = __queryStringToObject(document.location.search);
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
        document.env.VERBOSE = queryStringObj.verbose !== undefined;
        this._env = document.env;
        return document.env;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sTUFBTSxNQUFNLGdCQUFnQixDQUFDO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsYUFBYTtBQUNiLE1BQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSyxTQUFRLE1BQU07SUFhcEMsTUFBTSxLQUFLLEdBQUc7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRWhDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsTUFBTSxjQUFjLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2RSxJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsQ0FBQyxXQUFXO1FBQ3pDLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNmLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO1NBQzVCO2FBQU0sSUFDSCxTQUFTLENBQUMsZUFBZTtZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEVBQy9DO1lBQ0UsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ25DLFNBQVMsQ0FBQyxlQUFlLENBQzVCLEVBQUU7Z0JBQ0MsSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDaEQsUUFBUSxHQUFHLEdBQUcsQ0FBQztvQkFDZixNQUFNO2lCQUNUO2FBQ0o7U0FDSjthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FDUCx3TUFBd00sRUFDeE0sZUFBZSxDQUNsQixDQUFDO1NBQ0w7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUNQLG9DQUFvQyxRQUFRLElBQ3hDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxFQUM1RCxFQUFFLEVBQ0YsVUFDSSxRQUFRLEtBQUssWUFBWTtZQUNyQixDQUFDLENBQUMsS0FBSztZQUNQLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUztnQkFDeEIsQ0FBQyxDQUFDLE1BQU07Z0JBQ1IsQ0FBQyxDQUFDLFlBQ1YsRUFBRSxDQUNMLENBQUM7UUFFRixRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDcEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNsQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztRQUM3RCxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztRQUM1RCxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDekIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQ3hCLENBQUM7Q0FDSiJ9