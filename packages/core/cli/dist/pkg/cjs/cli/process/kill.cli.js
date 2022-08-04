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
                yield (0, fkill_1.default)(`:${params.port}`);
                emit('log', {
                    value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`,
                });
            }
            catch (e) {
                emit('log', {
                    value: `<yellow>[process.kill]</yellow> It seems that no process are running on port <yellow>${params.port}</yellow>`,
                });
            }
        }
        resolve();
    }));
}
exports.default = kill;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsd0VBQWlEO0FBQ2pELGtEQUE0QjtBQUc1QixTQUF3QixJQUFJLENBQUMsTUFBTTtJQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3RELElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUNYLE1BQU0sSUFBQSxlQUFPLEVBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLDZEQUE2RCxNQUFNLENBQUMsRUFBRSx1REFBdUQ7YUFDdkksQ0FBQyxDQUFDO1NBQ047YUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDcEIsSUFBSTtnQkFDQSxNQUFNLElBQUEsZUFBTyxFQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLHlFQUF5RSxNQUFNLENBQUMsSUFBSSx1REFBdUQ7aUJBQ3JKLENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsd0ZBQXdGLE1BQU0sQ0FBQyxJQUFJLFdBQVc7aUJBQ3hILENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBckJELHVCQXFCQyJ9