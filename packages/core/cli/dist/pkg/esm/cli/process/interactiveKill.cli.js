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
import { __spawn } from '@coffeekraken/sugar/process';
import __replaceCommandTokens from '../replaceCommandTokens';
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
                command = __replaceCommandTokens(`sugar process.kill --id ${res}`);
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
                command = __replaceCommandTokens(`sugar process.kill --port ${res}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV0RCxPQUFPLHNCQUFzQixNQUFNLHlCQUF5QixDQUFDO0FBRTdELE1BQU0sQ0FBQyxPQUFPLFVBQVUsZUFBZSxDQUFDLE1BQU07SUFDMUMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEMsSUFBSSxHQUFHLENBQUM7UUFFUixHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLDBDQUEwQztZQUNuRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1NBQ2hDLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxDQUFDO1FBRVosUUFBUSxHQUFHLEVBQUU7WUFDVCxLQUFLLE9BQU87Z0JBQ1IsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDcEIsSUFBSSxFQUFFLE9BQU87b0JBQ2IsT0FBTyxFQUFFLHlDQUF5QztvQkFDbEQsUUFBUSxDQUFDLEdBQUcsSUFBSTt3QkFDWixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7NEJBQzFCLE9BQU8sK0JBQStCLENBQUM7d0JBQzNDLE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDO2lCQUNKLENBQUMsQ0FBQztnQkFFSCxPQUFPLEdBQUcsc0JBQXNCLENBQzVCLDJCQUEyQixHQUFHLEVBQUUsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw4QkFBOEIsT0FBTyxXQUFXO2lCQUMxRCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNO1lBQ1YsS0FBSyxTQUFTO2dCQUNWLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFDSCxtRUFBbUU7b0JBQ3ZFLFFBQVEsQ0FBQyxHQUFHLElBQUk7d0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDOzRCQUMxQixPQUFPLCtCQUErQixDQUFDO3dCQUMzQyxPQUFPLElBQUksQ0FBQztvQkFDaEIsQ0FBQztpQkFDSixDQUFDLENBQUM7Z0JBRUgsT0FBTyxHQUFHLHNCQUFzQixDQUM1Qiw2QkFBNkIsR0FBRyxFQUFFLENBQ3JDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsOEJBQThCLE9BQU8sV0FBVztpQkFDMUQsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTTtTQUNiO0lBQ0wsQ0FBQyxDQUFBLEVBQ0Q7UUFDSSxLQUFLLEVBQUU7WUFDSCxFQUFFLEVBQUUsY0FBYztTQUNyQjtLQUNKLENBQ0osQ0FBQztBQUNOLENBQUMifQ==