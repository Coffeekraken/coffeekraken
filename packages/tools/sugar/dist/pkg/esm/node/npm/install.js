var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __argsToString from '../../shared/cli/argsToString';
import __isCommandExists from '../is/isCommandExists';
import __spawn from '../process/spawn';
export default function install(packageNames = '', settings) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ cwd: process.cwd(), manager: __SSugarConfig.get('package.manager'), args: {} }, settings);
        let command;
        if (settings.manager === 'yarn') {
            if (yield __isCommandExists('yarn')) {
                command = 'yarn add';
            }
            else {
                emit('log', {
                    value: `<yellow>[install]</yellow> Sorry but "<magenta>yarn</magenta>" is not available on this system`,
                });
            }
        }
        if (!command) {
            if (yield __isCommandExists('npm')) {
                command = 'npm install';
            }
        }
        if (!command) {
            throw new Error(`<red>[install]</red> Sorry but it seems that none of "<magenta>npm</magenta>" or "<yellow>yarn</yellow>" are available...`);
        }
        let packagesStr = packageNames;
        if (packageNames) {
            if (!Array.isArray(packagesStr)) {
                packagesStr = [packagesStr];
            }
        }
        // @ts-ignore
        command += ` ${packagesStr.join(' ')} ${__argsToString(settings.args)}`.replace(/\s{2,999}/, ' ');
        const result = yield pipe(__spawn(command, [], {
            cwd: settings.cwd,
        }));
        resolve(result);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sY0FBYyxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8saUJBQWlCLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxPQUFPLE1BQU0sa0JBQWtCLENBQUM7QUEwQ3ZDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUMzQixlQUFrQyxFQUFFLEVBQ3BDLFFBQXNDO0lBRXRDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsUUFBUSxtQkFDSixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNsQixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUM5QyxJQUFJLEVBQUUsRUFBRSxJQUNMLFFBQVEsQ0FDZCxDQUFDO1FBQ0YsSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQzdCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDakMsT0FBTyxHQUFHLFVBQVUsQ0FBQzthQUN4QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxnR0FBZ0c7aUJBQzFHLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNoQyxPQUFPLEdBQUcsYUFBYSxDQUFDO2FBQzNCO1NBQ0o7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FDWCwySEFBMkgsQ0FDOUgsQ0FBQztTQUNMO1FBRUQsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDO1FBQy9CLElBQUksWUFBWSxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzdCLFdBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7UUFFRCxhQUFhO1FBQ2IsT0FBTyxJQUFJLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxjQUFjLENBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQ2hCLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNqQixHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUc7U0FDcEIsQ0FBQyxDQUNMLENBQUM7UUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==