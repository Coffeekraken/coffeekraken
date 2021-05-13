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
}
MyInterface.definition = {
    param1: {
        type: 'String',
        default: 'Hello'
    },
    param2: {
        type: 'Boolean',
        default: true
    },
    crash: {
        type: 'Boolean',
        default: false
    },
    crashTimeout: {
        type: 'Number',
        default: 100
    }
};
// @ts-ignore
export default class MyProcess extends __SProcess {
    constructor(initialParams, settings = {}) {
        super(initialParams, settings);
    }
    process(params, settings = {}) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                value: `Hello world ${__isChildProcess() ? 'from child process' : ''}`
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
    params: MyInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTXlQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBRTFELE1BQU0sV0FBWSxTQUFRLFlBQVk7O0FBQzdCLHNCQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsT0FBTztLQUNqQjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLEdBQUc7S0FDYjtDQUNGLENBQUM7QUFHSixhQUFhO0FBQ2IsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFVLFNBQVEsVUFBVTtJQUsvQyxZQUFZLGFBQWMsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN2QyxLQUFLLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzNCLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxlQUFlLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7YUFDdkUsQ0FBQyxDQUFDO1lBQ0gsYUFBYTtZQUNiLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDaEIsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QixrQkFBa0I7YUFDbkI7aUJBQU07Z0JBQ0wsT0FBTyxpQ0FDRixNQUFNLEtBQ1QsY0FBYyxFQUFFLGdCQUFnQixFQUFFLElBQ2xDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXpCTSxvQkFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRSxXQUFXO0NBQ3BCLENBQUMifQ==