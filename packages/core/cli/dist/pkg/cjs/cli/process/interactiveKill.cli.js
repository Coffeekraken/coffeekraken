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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const process_1 = require("@coffeekraken/sugar/process");
const replaceCommandTokens_js_1 = __importDefault(require("../replaceCommandTokens.js"));
function interactiveKill(params) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
                command = (0, replaceCommandTokens_js_1.default)(`sugar process.kill --id ${res}`);
                emit('log', {
                    value: `> Running command: <yellow>${command}</yellow>`,
                });
                pipe((0, process_1.__spawn)(command));
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
                command = (0, replaceCommandTokens_js_1.default)(`sugar process.kill --port ${res}`);
                emit('log', {
                    value: `> Running command: <yellow>${command}</yellow>`,
                });
                pipe((0, process_1.__spawn)(command));
                break;
        }
    }), {
        metas: {
            id: 'process.kill',
        },
    });
}
exports.default = interactiveKill;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELHlEQUFzRDtBQUN0RCx5RkFBZ0U7QUFFaEUsU0FBd0IsZUFBZSxDQUFDLE1BQU07SUFDMUMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3RDLElBQUksR0FBRyxDQUFDO1FBRVIsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSwwQ0FBMEM7WUFDbkQsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztTQUNoQyxDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sQ0FBQztRQUVaLFFBQVEsR0FBRyxFQUFFO1lBQ1QsS0FBSyxPQUFPO2dCQUNSLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFBRSx5Q0FBeUM7b0JBQ2xELFFBQVEsQ0FBQyxHQUFHLElBQUk7d0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDOzRCQUMxQixPQUFPLCtCQUErQixDQUFDO3dCQUMzQyxPQUFPLElBQUksQ0FBQztvQkFDaEIsQ0FBQztpQkFDSixDQUFDLENBQUM7Z0JBRUgsT0FBTyxHQUFHLElBQUEsaUNBQXNCLEVBQzVCLDJCQUEyQixHQUFHLEVBQUUsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw4QkFBOEIsT0FBTyxXQUFXO2lCQUMxRCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLElBQUEsaUJBQU8sRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNO1lBQ1YsS0FBSyxTQUFTO2dCQUNWLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFDSCxtRUFBbUU7b0JBQ3ZFLFFBQVEsQ0FBQyxHQUFHLElBQUk7d0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDOzRCQUMxQixPQUFPLCtCQUErQixDQUFDO3dCQUMzQyxPQUFPLElBQUksQ0FBQztvQkFDaEIsQ0FBQztpQkFDSixDQUFDLENBQUM7Z0JBRUgsT0FBTyxHQUFHLElBQUEsaUNBQXNCLEVBQzVCLDZCQUE2QixHQUFHLEVBQUUsQ0FDckMsQ0FBQztnQkFDRixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw4QkFBOEIsT0FBTyxXQUFXO2lCQUMxRCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLElBQUEsaUJBQU8sRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNO1NBQ2I7SUFDTCxDQUFDLENBQUEsRUFDRDtRQUNJLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxjQUFjO1NBQ3JCO0tBQ0osQ0FDSixDQUFDO0FBQ04sQ0FBQztBQTdERCxrQ0E2REMifQ==