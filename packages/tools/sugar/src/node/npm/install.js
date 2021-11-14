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
        command += ` ${__argsToString(settings.args)}`;
        const result = yield __spawn(command, [], {
            cwd: settings.cwd,
        });
        resolve(result);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxlQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxPQUFPLE1BQU0sa0JBQWtCLENBQUM7QUFDdkMsT0FBTyxjQUFjLE1BQU0sK0JBQStCLENBQUM7QUFxQzNELE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUMzQixRQUFzQztJQUV0QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEQsUUFBUSxtQkFDSixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNsQixJQUFJLEVBQUUsSUFBSSxFQUNWLElBQUksRUFBRSxFQUFFLElBQ0wsUUFBUSxDQUNkLENBQUM7UUFDRixJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtZQUNmLElBQUksTUFBTSxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQy9CLE9BQU8sR0FBRyxjQUFjLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLHFGQUFxRjtpQkFDL0YsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsOEZBQThGO2lCQUN4RyxDQUFDLENBQUM7YUFDTjtTQUNKO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLElBQUksTUFBTSxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sR0FBRyxhQUFhLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLG9GQUFvRjtpQkFDOUYsQ0FBQyxDQUFDO2FBQ047U0FDSjtRQUNELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUNYLHlIQUF5SCxDQUM1SCxDQUFDO1NBQ0w7UUFFRCxPQUFPLElBQUksSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFFL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUN0QyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUc7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=