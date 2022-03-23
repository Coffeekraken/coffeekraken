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
        define(["require", "exports", "@coffeekraken/s-log", "@coffeekraken/s-promise", "@coffeekraken/s-sugar-config", "child_process", "fs", "../../node/package/interface/SCliPackageInstallParamsInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnN0YWxsLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLGNBQWM7SUFDZCxnRUFBeUM7SUFDekMsd0VBQWlEO0lBQ2pELGtGQUEwRDtJQUMxRCxrRUFBMkM7SUFDM0MsNENBQXNCO0lBQ3RCLHVJQUFpSDtJQUVqSCxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRTtZQUMxRCxNQUFNLFdBQVcsR0FBRywyQ0FBbUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFMUUsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7b0JBQ3RCLEtBQUssRUFBRSxnR0FBZ0csd0JBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsWUFBWTtpQkFDM0osQ0FBQyxDQUFDO2dCQUNILHVCQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDL0U7WUFFRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUseUZBQXlGO2lCQUNuRyxDQUFDLENBQUM7Z0JBQ0gsdUJBQWMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUMvQztZQUVELE9BQU8sRUFBRSxDQUFDO1FBRWQsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyJ9