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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const SCliPackageInstallParamsInterface_1 = __importDefault(require("../../node/package/interface/SCliPackageInstallParamsInterface"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = SCliPackageInstallParamsInterface_1.default.apply(stringArgs);
        if (fs_1.default.existsSync(`${process.cwd()}/package.json`)) {
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${s_sugar_config_1.default.get('package.manager')}</cyan>...`
            });
            child_process_1.default.execSync(`${s_sugar_config_1.default.get('package.manager')} install`);
        }
        if (fs_1.default.existsSync(`${process.cwd()}/composer.json`)) {
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[install]</yellow> Installing the composer <cyan>vendors</cyan> dependencies...`
            });
            child_process_1.default.execSync('composer install');
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELGtFQUEyQztBQUMzQyw0Q0FBc0I7QUFDdEIsdUlBQWlIO0FBRWpILGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxFQUFFO1FBQzFELE1BQU0sV0FBVyxHQUFHLDJDQUFtQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUxRSxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsZ0dBQWdHLHdCQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFlBQVk7YUFDM0osQ0FBQyxDQUFDO1lBQ0gsdUJBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvRTtRQUVELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsRUFBRTtZQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLHlGQUF5RjthQUNuRyxDQUFDLENBQUM7WUFDSCx1QkFBYyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFFZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=