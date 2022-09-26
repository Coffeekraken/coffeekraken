var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SInterface from '@coffeekraken/s-interface';
import __SPromise from '@coffeekraken/s-promise';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __isChildProcess } from '@coffeekraken/sugar/is';
import __SProcess from '../SProcess';
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
                reject(params);
            }
            else {
                resolve(Object.assign(Object.assign({}, params), { isChildProcess: __isChildProcess() }));
            }
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLFVBQVUsTUFBTSxhQUFhLENBQUM7QUFFckMsTUFBTSxXQUFZLFNBQVEsWUFBWTtJQUNsQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxHQUFHO2FBQ2Y7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsYUFBYTtBQUNiLE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLFVBQVU7SUFDN0MsWUFBWSxhQUFjLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDckMsS0FBSyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN6QixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsZUFDSCxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFDaEQsRUFBRTthQUNMLENBQUMsQ0FBQztZQUVILGFBQWE7WUFDYixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0gsT0FBTyxpQ0FDQSxNQUFNLEtBQ1QsY0FBYyxFQUFFLGdCQUFnQixFQUFFLElBQ3BDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oifQ==