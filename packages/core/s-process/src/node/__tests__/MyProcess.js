"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../SProcess"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const childProcess_1 = __importDefault(require("@coffeekraken/sugar/node/is/childProcess"));
class MyInterface extends s_interface_1.default {
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
    }
};
// @ts-ignore
class MyProcess extends SProcess_1.default {
    constructor(initialParams, settings = {}) {
        super(initialParams, settings);
    }
    process(params, settings = {}) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                value: `Hello world ${childProcess_1.default() ? 'from child process' : ''}`
            });
            // setTimeout(async () => {
            // @ts-ignore
            if (params.crash) {
                // await __wait(200);
                throw new Error('COCO');
                // reject(params);
            }
            else {
                resolve(params);
            }
            // }, 100);
        }));
    }
}
exports.default = MyProcess;
MyProcess.interfaces = {
    params: MyInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTXlQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXFDO0FBQ3JDLHdFQUFpRDtBQUNqRCw0RUFBcUQ7QUFDckQsNEZBQXdFO0FBR3hFLE1BQU0sV0FBWSxTQUFRLHFCQUFZOztBQUM3QixzQkFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLE9BQU87S0FDakI7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBR0osYUFBYTtBQUNiLE1BQXFCLFNBQVUsU0FBUSxrQkFBVTtJQUsvQyxZQUFZLGFBQWMsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN2QyxLQUFLLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzNCLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUsZUFBZSxzQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2FBQ3ZFLENBQUMsQ0FBQztZQUNILDJCQUEyQjtZQUMzQixhQUFhO1lBQ2IsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNoQixxQkFBcUI7Z0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hCLGtCQUFrQjthQUNuQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDakI7WUFDRCxXQUFXO1FBQ2IsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBekJILDRCQTBCQztBQXpCUSxvQkFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRSxXQUFXO0NBQ3BCLENBQUMifQ==