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
import __commandExists from '../command/commandExists';
import __spawn from '../process/spawn';
export default function install(packageNames = '', settings) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ cwd: process.cwd(), manager: __SSugarConfig.get('package.manager'), args: {} }, settings);
        let command;
        if (settings.manager === 'yarn') {
            if (yield __commandExists('yarn')) {
                command = 'yarn add';
            }
            else {
                emit('log', {
                    value: `<yellow>[install]</yellow> Sorry but "<magenta>yarn</magenta>" is not available on this system`,
                });
            }
        }
        if (!command) {
            if (yield __commandExists('npm')) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sY0FBYyxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sZUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sT0FBTyxNQUFNLGtCQUFrQixDQUFDO0FBc0N2QyxNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FDM0IsZUFBa0MsRUFBRSxFQUNwQyxRQUFzQztJQUV0QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELFFBQVEsbUJBQ0osR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDbEIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFDOUMsSUFBSSxFQUFFLEVBQUUsSUFDTCxRQUFRLENBQ2QsQ0FBQztRQUNGLElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUM3QixJQUFJLE1BQU0sZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixPQUFPLEdBQUcsVUFBVSxDQUFDO2FBQ3hCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLGdHQUFnRztpQkFDMUcsQ0FBQyxDQUFDO2FBQ047U0FDSjtRQUNELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixJQUFJLE1BQU0sZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixPQUFPLEdBQUcsYUFBYSxDQUFDO2FBQzNCO1NBQ0o7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FDWCwySEFBMkgsQ0FDOUgsQ0FBQztTQUNMO1FBRUQsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDO1FBQy9CLElBQUksWUFBWSxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzdCLFdBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7UUFFRCxhQUFhO1FBQ2IsT0FBTyxJQUFJLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxjQUFjLENBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQ2hCLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNqQixHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUc7U0FDcEIsQ0FBQyxDQUNMLENBQUM7UUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==