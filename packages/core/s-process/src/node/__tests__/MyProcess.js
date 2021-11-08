var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SProcess from '../SProcess';
import __SPromise from '@coffeekraken/s-promise';
import __SInterface from '@coffeekraken/s-interface';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __wait from '@coffeekraken/sugar/shared/time/wait';
class MyInterface extends __SInterface {
    static get _definition() {
        return {
            param1: {
                type: 'String',
                default: 'Hello',
            },
            param2: {
                type: 'Boolean',
                default: true,
            },
            crash: {
                type: 'Boolean',
                default: false,
            },
            crashTimeout: {
                type: 'Number',
                default: 100,
            },
        };
    }
}
// @ts-ignore
export default class MyProcess extends __SProcess {
    constructor(initialParams, settings = {}) {
        super(initialParams, settings);
    }
    process(params, settings = {}) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                value: `Hello world ${__isChildProcess() ? 'from child process' : ''}`,
            });
            // @ts-ignore
            if (params.crash) {
                yield __wait(params.crashTimeout);
                throw new Error('COCO');
                // reject(params);
            }
            else {
                resolve(Object.assign(Object.assign({}, params), { isChildProcess: __isChildProcess() }));
            }
        }));
    }
}
MyProcess.interfaces = {
    params: MyInterface,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTXlQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBRzFELE1BQU0sV0FBWSxTQUFRLFlBQVk7SUFDbEMsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsT0FBTzthQUNuQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsR0FBRzthQUNmO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGFBQWE7QUFDYixNQUFNLENBQUMsT0FBTyxPQUFPLFNBQVUsU0FBUSxVQUFVO0lBSzdDLFlBQVksYUFBYyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3JDLEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDekIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3RELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLGVBQ0gsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQ2hELEVBQUU7YUFDTCxDQUFDLENBQUM7WUFFSCxhQUFhO1lBQ2IsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNkLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEIsa0JBQWtCO2FBQ3JCO2lCQUFNO2dCQUNILE9BQU8saUNBQ0EsTUFBTSxLQUNULGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxJQUNwQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUE1Qk0sb0JBQVUsR0FBRztJQUNoQixNQUFNLEVBQUUsV0FBVztDQUN0QixDQUFDIn0=