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
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
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
    },
    crashTimeout: {
        type: 'Number',
        default: 100
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
            // @ts-ignore
            if (params.crash) {
                yield wait_1.default(params.crashTimeout);
                throw new Error('COCO');
                // reject(params);
            }
            else {
                resolve(Object.assign(Object.assign({}, params), { isChildProcess: childProcess_1.default() }));
            }
        }));
    }
}
exports.default = MyProcess;
MyProcess.interfaces = {
    params: MyInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTXlQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXFDO0FBQ3JDLHdFQUFpRDtBQUNqRCw0RUFBcUQ7QUFDckQsNEZBQXdFO0FBQ3hFLGdGQUEwRDtBQUUxRCxNQUFNLFdBQVksU0FBUSxxQkFBWTs7QUFDN0Isc0JBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtLQUNkO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsR0FBRztLQUNiO0NBQ0YsQ0FBQztBQUdKLGFBQWE7QUFDYixNQUFxQixTQUFVLFNBQVEsa0JBQVU7SUFLL0MsWUFBWSxhQUFjLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDdkMsS0FBSyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMzQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLGVBQWUsc0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTthQUN2RSxDQUFDLENBQUM7WUFDSCxhQUFhO1lBQ2IsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNoQixNQUFNLGNBQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hCLGtCQUFrQjthQUNuQjtpQkFBTTtnQkFDTCxPQUFPLGlDQUNGLE1BQU0sS0FDVCxjQUFjLEVBQUUsc0JBQWdCLEVBQUUsSUFDbEMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBMUJILDRCQTJCQztBQTFCUSxvQkFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRSxXQUFXO0NBQ3BCLENBQUMifQ==