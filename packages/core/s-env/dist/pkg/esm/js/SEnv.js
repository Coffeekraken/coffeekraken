import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __queryStringToObject from '@coffeekraken/sugar/shared/url/queryStringToObject';
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
        this._env = document.env;
        return document.env;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8scUJBQXFCLE1BQU0sb0RBQW9ELENBQUM7QUFDdkYsT0FBTyxNQUFNLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxhQUFhO0FBQ2IsTUFBTSxDQUFDLE9BQU8sT0FBTyxJQUFLLFNBQVEsTUFBTTtJQWFwQyxNQUFNLEtBQUssR0FBRztRQUNWLElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFaEMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1QyxNQUFNLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZFLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxDQUFDLFdBQVc7UUFDekMsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2YsUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7U0FDNUI7YUFBTSxJQUNILFNBQVMsQ0FBQyxlQUFlO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sRUFDL0M7WUFDRSxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDbkMsU0FBUyxDQUFDLGVBQWUsQ0FDNUIsRUFBRTtnQkFDQyxJQUFJLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNoRCxRQUFRLEdBQUcsR0FBRyxDQUFDO29CQUNmLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUNQLHdNQUF3TSxFQUN4TSxlQUFlLENBQ2xCLENBQUM7U0FDTDtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1Asb0NBQW9DLFFBQVEsSUFDeEMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLEVBQzVELEVBQUUsRUFDRixVQUNJLFFBQVEsS0FBSyxZQUFZO1lBQ3JCLENBQUMsQ0FBQyxLQUFLO1lBQ1AsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTO2dCQUN4QixDQUFDLENBQUMsTUFBTTtnQkFDUixDQUFDLENBQUMsWUFDVixFQUFFLENBQ0wsQ0FBQztRQUVGLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztRQUNwQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7UUFDNUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDO1FBQzdELElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUN6QixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUM7SUFDeEIsQ0FBQztDQUNKIn0=