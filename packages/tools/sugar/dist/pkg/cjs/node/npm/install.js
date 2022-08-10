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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const argsToString_1 = __importDefault(require("../../shared/cli/argsToString"));
const commandExists_1 = __importDefault(require("../command/commandExists"));
const spawn_1 = __importDefault(require("../process/spawn"));
function install(packageNames = '', settings) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ cwd: process.cwd(), manager: s_sugar_config_1.default.get('package.manager'), args: {} }, settings);
        let command;
        if (settings.manager === 'yarn') {
            if (yield (0, commandExists_1.default)('yarn')) {
                command = 'yarn add';
            }
            else {
                emit('log', {
                    value: `<yellow>[install]</yellow> Sorry but "<magenta>yarn</magenta>" is not available on this system`,
                });
            }
        }
        if (!command) {
            if (yield (0, commandExists_1.default)('npm')) {
                command = 'npm install';
            }
        }
        if (!command) {
            throw new Error(`<red>[install]</red> Sorry but it seems that none of "<magenta>npm</magenta>" or "<yellow>yarn</yellow>" are available...`);
        }
        let packagesStr = packageNames;
        if (packageNames) {
            if (!Array.isArray(packagesStr)) {
                packagesStr = [packagesStr];
            }
        }
        // @ts-ignore
        command += ` ${packagesStr.join(' ')} ${(0, argsToString_1.default)(settings.args)}`.replace(/\s{2,999}/, ' ');
        const result = yield pipe((0, spawn_1.default)(command, [], {
            cwd: settings.cwd,
        }));
        resolve(result);
    }));
}
exports.default = install;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCxpRkFBMkQ7QUFDM0QsNkVBQXVEO0FBQ3ZELDZEQUF1QztBQXNDdkMsU0FBd0IsT0FBTyxDQUMzQixlQUFrQyxFQUFFLEVBQ3BDLFFBQXNDO0lBRXRDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELFFBQVEsbUJBQ0osR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDbEIsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQzlDLElBQUksRUFBRSxFQUFFLElBQ0wsUUFBUSxDQUNkLENBQUM7UUFDRixJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxNQUFNLElBQUEsdUJBQWUsRUFBQyxNQUFNLENBQUMsRUFBRTtnQkFDL0IsT0FBTyxHQUFHLFVBQVUsQ0FBQzthQUN4QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxnR0FBZ0c7aUJBQzFHLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsSUFBSSxNQUFNLElBQUEsdUJBQWUsRUFBQyxLQUFLLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxHQUFHLGFBQWEsQ0FBQzthQUMzQjtTQUNKO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE1BQU0sSUFBSSxLQUFLLENBQ1gsMkhBQTJILENBQzlILENBQUM7U0FDTDtRQUVELElBQUksV0FBVyxHQUFHLFlBQVksQ0FBQztRQUMvQixJQUFJLFlBQVksRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUM3QixXQUFXLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMvQjtTQUNKO1FBRUQsYUFBYTtRQUNiLE9BQU8sSUFBSSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBQSxzQkFBYyxFQUNsRCxRQUFRLENBQUMsSUFBSSxDQUNoQixFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FDckIsSUFBQSxlQUFPLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNqQixHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUc7U0FDcEIsQ0FBQyxDQUNMLENBQUM7UUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFwREQsMEJBb0RDIn0=