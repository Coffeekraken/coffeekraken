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
const child_process_1 = __importDefault(require("child_process"));
const fkill_1 = __importDefault(require("fkill"));
function kill(params) {
    return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        if (params.id) {
            yield (0, fkill_1.default)(params.id);
            emit('log', {
                value: `<green>[process.kill]</green> The process with id <yellow>${params.id}</yellow> has been <green>successfully</green> killed`,
            });
        }
        else if (params.port) {
            try {
                child_process_1.default.execSync(`npx kill-port ${params.port}`);
                // __childProcess.execSync(`kill -9 $(lsof -ti:${params.port})`);
                emit('log', {
                    value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`,
                });
                return resolve();
            }
            catch (e) { }
            try {
                yield (0, fkill_1.default)(`:${params.port}`);
                emit('log', {
                    value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`,
                });
                return resolve();
            }
            catch (e) { }
            emit('log', {
                value: `<yellow>[process.kill]</yellow> It seems that no process are running on port <yellow>${params.port}</yellow>`,
            });
        }
        resolve();
    }));
}
exports.default = kill;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELGtFQUEyQztBQUMzQyxrREFBNEI7QUFFNUIsU0FBd0IsSUFBSSxDQUFDLE1BQU07SUFDL0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0RCxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDWCxNQUFNLElBQUEsZUFBTyxFQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSw2REFBNkQsTUFBTSxDQUFDLEVBQUUsdURBQXVEO2FBQ3ZJLENBQUMsQ0FBQztTQUNOO2FBQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3BCLElBQUk7Z0JBQ0EsdUJBQWMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxpRUFBaUU7Z0JBQ2pFLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLHlFQUF5RSxNQUFNLENBQUMsSUFBSSx1REFBdUQ7aUJBQ3JKLENBQUMsQ0FBQztnQkFDSCxPQUFPLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtZQUVkLElBQUk7Z0JBQ0EsTUFBTSxJQUFBLGVBQU8sRUFBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSx5RUFBeUUsTUFBTSxDQUFDLElBQUksdURBQXVEO2lCQUNySixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxPQUFPLEVBQUUsQ0FBQzthQUNwQjtZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7WUFFZCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSx3RkFBd0YsTUFBTSxDQUFDLElBQUksV0FBVzthQUN4SCxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUEvQkQsdUJBK0JDIn0=