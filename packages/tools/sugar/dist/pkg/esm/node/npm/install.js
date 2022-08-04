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
import __commandExists from '../command/commandExists';
import __spawn from '../process/spawn';
import __argsToString from '../../shared/cli/argsToString';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function install(packageNames = '', settings) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ cwd: process.cwd(), manager: __SSugarConfig.get('package.manager'), args: {} }, settings);
        let command;
        if (settings.manager === 'yarn') {
            if (yield __commandExists('yarn')) {
                command = 'yarn add';
                emit('log', {
                    value: `<yellow>[install]</yellow> Using to "<yellow>yarn</yellow>" to install dependencies`,
                });
            }
            else {
                emit('log', {
                    value: `<yellow>[install]</yellow> Sorry but "<yellow>yarn</yellow>" is not available on this system`,
                });
            }
        }
        if (!command) {
            if (yield __commandExists('npm')) {
                command = 'npm install';
                emit('log', {
                    value: `<yellow>[install]</yellow> Using to "<yellow>npm</yellow>" to install dependencies`,
                });
            }
        }
        if (!command) {
            throw new Error(`<red>[install]</red> Sorry but it seems that none of "<yellow>npm</yellow>" or "<yellow>yarn</yellow>" are available...`);
        }
        command += ` ${packageNames} ${__argsToString(settings.args)}`.replace(/\s{2,999}/, ' ');
        const result = yield pipe(__spawn(command, [], {
            cwd: settings.cwd,
        }));
        resolve(result);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sT0FBTyxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sY0FBYyxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBcUMxRCxNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FDM0IsZUFBdUIsRUFBRSxFQUN6QixRQUFzQztJQUV0QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELFFBQVEsbUJBQ0osR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDbEIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFDOUMsSUFBSSxFQUFFLEVBQUUsSUFDTCxRQUFRLENBQ2QsQ0FBQztRQUNGLElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUM3QixJQUFJLE1BQU0sZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixPQUFPLEdBQUcsVUFBVSxDQUFDO2dCQUNyQixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxxRkFBcUY7aUJBQy9GLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDhGQUE4RjtpQkFDeEcsQ0FBQyxDQUFDO2FBQ047U0FDSjtRQUNELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixJQUFJLE1BQU0sZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixPQUFPLEdBQUcsYUFBYSxDQUFDO2dCQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxvRkFBb0Y7aUJBQzlGLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FDWCx5SEFBeUgsQ0FDNUgsQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFJLElBQUksWUFBWSxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQ2xFLFdBQVcsRUFDWCxHQUFHLENBQ04sQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNqQixHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUc7U0FDcEIsQ0FBQyxDQUNMLENBQUM7UUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==