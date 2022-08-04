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
// @ts-nocheck
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const packageRootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRootDir"));
const path_1 = __importDefault(require("path"));
const SSugarJson_1 = __importDefault(require("../node/SSugarJson"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        emit('log', {
            type: s_log_1.default.TYPE_INFO,
            value: '<yellow>[search]</yellow> Searching for <yellow>sugar.json</yellow> files that are used in your <magenta>current context</magenta>...'
        });
        const sugarJson = new SSugarJson_1.default();
        const list = sugarJson.search();
        list.forEach((path) => {
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[file]</yellow> <cyan>${path_1.default.relative((0, packageRootDir_1.default)(), path)}</cyan>`
            });
        });
        emit('log', {
            type: s_log_1.default.TYPE_INFO,
            value: `<green>[success]</green> <magenta>${list.length}</magenta> file(s) found`
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0dBQTRFO0FBQzVFLGdEQUEwQjtBQUMxQixvRUFBOEM7QUFFOUMsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDakMsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFFOUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUztZQUN0QixLQUFLLEVBQ0gsdUlBQXVJO1NBQzFJLENBQUMsQ0FBQztRQUNILE1BQU0sU0FBUyxHQUFHLElBQUksb0JBQVksRUFBRSxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSxpQ0FBaUMsY0FBTSxDQUFDLFFBQVEsQ0FDckQsSUFBQSx3QkFBZ0IsR0FBRSxFQUNsQixJQUFJLENBQ0wsU0FBUzthQUNYLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUztZQUN0QixLQUFLLEVBQUUscUNBQ0wsSUFBSSxDQUFDLE1BQ1AsMEJBQTBCO1NBQzNCLENBQUMsQ0FBQztRQUNILE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9