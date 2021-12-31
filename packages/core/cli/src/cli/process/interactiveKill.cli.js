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
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __SSugarCli from '@coffeekraken/cli';
export default function interactiveKill(params) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        let res;
        res = yield emit('ask', {
            type: 'select',
            message: 'How would you like to kill your process?',
            choices: ['by id', 'by port'],
        });
        let command;
        switch (res) {
            case 'by id':
                res = yield emit('ask', {
                    type: 'input',
                    message: 'Specify the process id you want to kill',
                    validate(...args) {
                        if (!args[0].match(/^[0-9]+$/))
                            return `Process id must be an integer`;
                        return true;
                    },
                });
                command = __SSugarCli.replaceTokens(`%sugar process.kill --id ${res}`);
                emit('log', {
                    value: `> Running command: <yellow>${command}</yellow>`,
                });
                pipe(__spawn(command));
                break;
            case 'by port':
                res = yield emit('ask', {
                    type: 'input',
                    message: 'Specify the port on which the process you want to kill is running',
                    validate(...args) {
                        if (!args[0].match(/^[0-9]+$/))
                            return `Process id must be an integer`;
                        return true;
                    },
                });
                command = __SSugarCli.replaceTokens(`%sugar process.kill --port ${res}`);
                emit('log', {
                    value: `> Running command: <yellow>${command}</yellow>`,
                });
                pipe(__spawn(command));
                break;
        }
    }), {
        metas: {
            id: 'process.kill',
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmVLaWxsLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVyYWN0aXZlS2lsbC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxPQUFPLE1BQU0sd0NBQXdDLENBQUM7QUFDN0QsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsTUFBTSxDQUFDLE9BQU8sVUFBVSxlQUFlLENBQUMsTUFBTTtJQUMxQyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0QyxJQUFJLEdBQUcsQ0FBQztRQUVSLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsMENBQTBDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxPQUFPLENBQUM7UUFFWixRQUFRLEdBQUcsRUFBRTtZQUNULEtBQUssT0FBTztnQkFDUixHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNwQixJQUFJLEVBQUUsT0FBTztvQkFDYixPQUFPLEVBQUUseUNBQXlDO29CQUNsRCxRQUFRLENBQUMsR0FBRyxJQUFJO3dCQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs0QkFDMUIsT0FBTywrQkFBK0IsQ0FBQzt3QkFDM0MsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2dCQUVILE9BQU8sR0FBRyxXQUFXLENBQUMsYUFBYSxDQUMvQiw0QkFBNEIsR0FBRyxFQUFFLENBQ3BDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsOEJBQThCLE9BQU8sV0FBVztpQkFDMUQsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNwQixJQUFJLEVBQUUsT0FBTztvQkFDYixPQUFPLEVBQ0gsbUVBQW1FO29CQUN2RSxRQUFRLENBQUMsR0FBRyxJQUFJO3dCQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs0QkFDMUIsT0FBTywrQkFBK0IsQ0FBQzt3QkFDM0MsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2dCQUVILE9BQU8sR0FBRyxXQUFXLENBQUMsYUFBYSxDQUMvQiw4QkFBOEIsR0FBRyxFQUFFLENBQ3RDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsOEJBQThCLE9BQU8sV0FBVztpQkFDMUQsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTTtTQUNiO0lBQ0wsQ0FBQyxDQUFBLEVBQ0Q7UUFDSSxLQUFLLEVBQUU7WUFDSCxFQUFFLEVBQUUsY0FBYztTQUNyQjtLQUNKLENBQ0osQ0FBQztBQUNOLENBQUMifQ==