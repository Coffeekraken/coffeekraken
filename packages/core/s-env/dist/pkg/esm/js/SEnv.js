import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __queryStringToObject } from '@coffeekraken/sugar/url';
import __SEnv from '../shared/SEnv.js';
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
 * @snippet         __SEnv.get($1)
 * @snippet         __SEnv.is($1)
 *
 * @example         js
 * import __SEnv from '@coffeekraken/s-env';
 * __SEnv.get('something');
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
        var _a;
        if (this._env)
            return this._env;
        const envConfig = (_a = __SSugarConfig.get('env')) !== null && _a !== void 0 ? _a : {};
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
            console.log(`<red>[SEnv]</red> The environment cannot be determined. Either set the config.env.env configuration or specify some environments by setting the config.env.envFromLocation object of {env}:{regex} environments`);
        }
        document.env.ENV = finalEnv;
        document.env.PLATFORM = 'browser';
        document.env.DEVS_CUT = queryStringObj.devsCut !== undefined;
        document.env.VERBOSE = queryStringObj.verbose !== undefined;
        this._env = document.env;
        return document.env;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxhQUFhO0FBQ2IsTUFBTSxDQUFDLE9BQU8sT0FBTyxJQUFLLFNBQVEsTUFBTTtJQWFwQyxNQUFNLEtBQUssR0FBRzs7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRWhDLE1BQU0sU0FBUyxHQUFHLE1BQUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBRWxELE1BQU0sY0FBYyxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkUsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLENBQUMsV0FBVztRQUN6QyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZixRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztTQUM1QjthQUFNLElBQ0gsU0FBUyxDQUFDLGVBQWU7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxFQUMvQztZQUNFLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNuQyxTQUFTLENBQUMsZUFBZSxDQUM1QixFQUFFO2dCQUNDLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2hELFFBQVEsR0FBRyxHQUFHLENBQUM7b0JBQ2YsTUFBTTtpQkFDVDthQUNKO1NBQ0o7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQ1AsaU5BQWlOLENBQ3BOLENBQUM7U0FDTDtRQUVELFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUM1QixRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDbEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUM7UUFDN0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3pCLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUN4QixDQUFDO0NBQ0oifQ==