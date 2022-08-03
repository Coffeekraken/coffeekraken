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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHdDQUF3QyxDQUFDO0FBRTdELE9BQU8sc0JBQXNCLE1BQU0seUJBQXlCLENBQUM7QUFFN0QsTUFBTSxDQUFDLE9BQU8sVUFBVSxlQUFlLENBQUMsTUFBTTtJQUMxQyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0QyxJQUFJLEdBQUcsQ0FBQztRQUVSLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsMENBQTBDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxPQUFPLENBQUM7UUFFWixRQUFRLEdBQUcsRUFBRTtZQUNULEtBQUssT0FBTztnQkFDUixHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNwQixJQUFJLEVBQUUsT0FBTztvQkFDYixPQUFPLEVBQUUseUNBQXlDO29CQUNsRCxRQUFRLENBQUMsR0FBRyxJQUFJO3dCQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs0QkFDMUIsT0FBTywrQkFBK0IsQ0FBQzt3QkFDM0MsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2dCQUVILE9BQU8sR0FBRyxzQkFBc0IsQ0FDNUIsMkJBQTJCLEdBQUcsRUFBRSxDQUNuQyxDQUFDO2dCQUNGLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDhCQUE4QixPQUFPLFdBQVc7aUJBQzFELENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDcEIsSUFBSSxFQUFFLE9BQU87b0JBQ2IsT0FBTyxFQUNILG1FQUFtRTtvQkFDdkUsUUFBUSxDQUFDLEdBQUcsSUFBSTt3QkFDWixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7NEJBQzFCLE9BQU8sK0JBQStCLENBQUM7d0JBQzNDLE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDO2lCQUNKLENBQUMsQ0FBQztnQkFFSCxPQUFPLEdBQUcsc0JBQXNCLENBQzVCLDZCQUE2QixHQUFHLEVBQUUsQ0FDckMsQ0FBQztnQkFDRixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw4QkFBOEIsT0FBTyxXQUFXO2lCQUMxRCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNO1NBQ2I7SUFDTCxDQUFDLENBQUEsRUFDRDtRQUNJLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxjQUFjO1NBQ3JCO0tBQ0osQ0FDSixDQUFDO0FBQ04sQ0FBQyJ9