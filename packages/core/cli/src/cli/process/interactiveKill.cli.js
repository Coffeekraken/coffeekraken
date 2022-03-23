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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-promise", "@coffeekraken/sugar/node/process/spawn", "@coffeekraken/cli"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const spawn_1 = __importDefault(require("@coffeekraken/sugar/node/process/spawn"));
    const cli_1 = __importDefault(require("@coffeekraken/cli"));
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
                    command = cli_1.default.replaceTokens(`%sugar process.kill --id ${res}`);
                    emit('log', {
                        value: `> Running command: <yellow>${command}</yellow>`,
                    });
                    pipe((0, spawn_1.default)(command));
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
                    command = cli_1.default.replaceTokens(`%sugar process.kill --port ${res}`);
                    emit('log', {
                        value: `> Running command: <yellow>${command}</yellow>`,
                    });
                    pipe((0, spawn_1.default)(command));
                    break;
            }
        }), {
            metas: {
                id: 'process.kill',
            },
        });
    }
    exports.default = interactiveKill;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmVLaWxsLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVyYWN0aXZlS2lsbC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx3RUFBaUQ7SUFDakQsbUZBQTZEO0lBQzdELDREQUE0QztJQUU1QyxTQUF3QixlQUFlLENBQUMsTUFBTTtRQUMxQyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxHQUFHLENBQUM7WUFFUixHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNwQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsMENBQTBDO2dCQUNuRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO2FBQ2hDLENBQUMsQ0FBQztZQUVILElBQUksT0FBTyxDQUFDO1lBRVosUUFBUSxHQUFHLEVBQUU7Z0JBQ1QsS0FBSyxPQUFPO29CQUNSLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSx5Q0FBeUM7d0JBQ2xELFFBQVEsQ0FBQyxHQUFHLElBQUk7NEJBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2dDQUMxQixPQUFPLCtCQUErQixDQUFDOzRCQUMzQyxPQUFPLElBQUksQ0FBQzt3QkFDaEIsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBRUgsT0FBTyxHQUFHLGFBQVcsQ0FBQyxhQUFhLENBQy9CLDRCQUE0QixHQUFHLEVBQUUsQ0FDcEMsQ0FBQztvQkFDRixJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLEtBQUssRUFBRSw4QkFBOEIsT0FBTyxXQUFXO3FCQUMxRCxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLElBQUEsZUFBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLE1BQU07Z0JBQ1YsS0FBSyxTQUFTO29CQUNWLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFDSCxtRUFBbUU7d0JBQ3ZFLFFBQVEsQ0FBQyxHQUFHLElBQUk7NEJBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2dDQUMxQixPQUFPLCtCQUErQixDQUFDOzRCQUMzQyxPQUFPLElBQUksQ0FBQzt3QkFDaEIsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBRUgsT0FBTyxHQUFHLGFBQVcsQ0FBQyxhQUFhLENBQy9CLDhCQUE4QixHQUFHLEVBQUUsQ0FDdEMsQ0FBQztvQkFDRixJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLEtBQUssRUFBRSw4QkFBOEIsT0FBTyxXQUFXO3FCQUMxRCxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLElBQUEsZUFBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLE1BQU07YUFDYjtRQUNMLENBQUMsQ0FBQSxFQUNEO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxjQUFjO2FBQ3JCO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQTdERCxrQ0E2REMifQ==