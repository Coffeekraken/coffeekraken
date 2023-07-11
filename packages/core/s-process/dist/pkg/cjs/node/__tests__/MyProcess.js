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
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const is_1 = require("@coffeekraken/sugar/is");
const SProcess_js_1 = __importDefault(require("../SProcess.js"));
class MyInterface extends s_interface_1.default {
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
class MyProcess extends SProcess_js_1.default {
    constructor(initialParams, settings = {}) {
        super(initialParams, settings);
    }
    process(params, settings = {}) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                value: `Hello world ${(0, is_1.__isChildProcess)() ? 'from child process' : ''}`,
            });
            // @ts-ignore
            if (params.crash) {
                yield (0, datetime_1.__wait)(params.crashTimeout);
                reject(params);
            }
            else {
                resolve(Object.assign(Object.assign({}, params), { isChildProcess: (0, is_1.__isChildProcess)() }));
            }
        }));
    }
}
exports.default = MyProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELHdFQUFpRDtBQUNqRCwyREFBc0Q7QUFDdEQsK0NBQTBEO0FBQzFELGlFQUF3QztBQUV4QyxNQUFNLFdBQVksU0FBUSxxQkFBWTtJQUNsQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxHQUFHO2FBQ2Y7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsYUFBYTtBQUNiLE1BQXFCLFNBQVUsU0FBUSxxQkFBVTtJQUM3QyxZQUFZLGFBQWMsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNyQyxLQUFLLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3pCLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsZUFDSCxJQUFBLHFCQUFnQixHQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUNoRCxFQUFFO2FBQ0wsQ0FBQyxDQUFDO1lBRUgsYUFBYTtZQUNiLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDZCxNQUFNLElBQUEsaUJBQU0sRUFBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNsQjtpQkFBTTtnQkFDSCxPQUFPLGlDQUNBLE1BQU0sS0FDVCxjQUFjLEVBQUUsSUFBQSxxQkFBZ0IsR0FBRSxJQUNwQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBekJELDRCQXlCQyJ9