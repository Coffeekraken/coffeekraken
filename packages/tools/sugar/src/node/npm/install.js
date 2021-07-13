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
export default function install(settings) {
    return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ cwd: process.cwd(), yarn: true, args: {} }, settings);
        let command;
        if (settings.yarn) {
            if (yield __commandExists('yarn')) {
                command = 'yarn install';
                emit('log', {
                    value: `<yellow>[install]</yellow> Using to "<yellow>yarn</yellow>" to install dependencies`
                });
            }
            else {
                emit('log', {
                    value: `<yellow>[install]</yellow> Sorry but "<yellow>yarn</yellow>" is not available on this system`
                });
            }
        }
        if (!command) {
            if (yield __commandExists('npm')) {
                command = 'npm install';
                emit('log', {
                    value: `<yellow>[install]</yellow> Using to "<yellow>npm</yellow>" to install dependencies`
                });
            }
        }
        if (!command) {
            throw new Error(`<red>[install]</red> Sorry but it seems that none of "<yellow>npm</yellow>" or "<yellow>yarn</yellow>" are available...`);
        }
        command += ` ${__argsToString(settings.args)}`;
        const result = yield __spawn(command, [], {
            cwd: settings.cwd
        });
        resolve(result);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxlQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxPQUFPLE1BQU0sa0JBQWtCLENBQUM7QUFDdkMsT0FBTyxjQUFjLE1BQU0sK0JBQStCLENBQUM7QUF3QzNELE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUFDLFFBQXNDO0lBQ2xFLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRTtRQUNwRCxRQUFRLG1CQUNKLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2xCLElBQUksRUFBRSxJQUFJLEVBQ1YsSUFBSSxFQUFFLEVBQUUsSUFDTCxRQUFRLENBQ2QsQ0FBQTtRQUNELElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2YsSUFBSSxNQUFNLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDL0IsT0FBTyxHQUFHLGNBQWMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUscUZBQXFGO2lCQUMvRixDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw4RkFBOEY7aUJBQ3hHLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsSUFBSSxNQUFNLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxHQUFHLGFBQWEsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsb0ZBQW9GO2lCQUM5RixDQUFDLENBQUM7YUFDTjtTQUNKO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMseUhBQXlILENBQUMsQ0FBQztTQUM5STtRQUVELE9BQU8sSUFBSSxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUUvQyxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRztTQUNwQixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==