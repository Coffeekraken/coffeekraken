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
const is_1 = require("@coffeekraken/sugar/is");
const argsToString_1 = __importDefault(require("../../shared/cli/argsToString"));
const spawn_1 = __importDefault(require("../process/spawn"));
function install(packageNames = '', settings) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ cwd: process.cwd(), manager: s_sugar_config_1.default.get('package.manager'), args: {} }, settings);
        let command;
        if (settings.manager === 'yarn') {
            if (yield (0, is_1.__isCommandExists)('yarn')) {
                command = 'yarn add';
            }
            else {
                emit('log', {
                    value: `<yellow>[install]</yellow> Sorry but "<magenta>yarn</magenta>" is not available on this system`,
                });
            }
        }
        if (!command) {
            if (yield (0, is_1.__isCommandExists)('npm')) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCwrQ0FBMkQ7QUFDM0QsaUZBQTJEO0FBQzNELDZEQUF1QztBQTBDdkMsU0FBd0IsT0FBTyxDQUMzQixlQUFrQyxFQUFFLEVBQ3BDLFFBQXNDO0lBRXRDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELFFBQVEsbUJBQ0osR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDbEIsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQzlDLElBQUksRUFBRSxFQUFFLElBQ0wsUUFBUSxDQUNkLENBQUM7UUFDRixJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxNQUFNLElBQUEsc0JBQWlCLEVBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2pDLE9BQU8sR0FBRyxVQUFVLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsZ0dBQWdHO2lCQUMxRyxDQUFDLENBQUM7YUFDTjtTQUNKO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLElBQUksTUFBTSxJQUFBLHNCQUFpQixFQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNoQyxPQUFPLEdBQUcsYUFBYSxDQUFDO2FBQzNCO1NBQ0o7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FDWCwySEFBMkgsQ0FDOUgsQ0FBQztTQUNMO1FBRUQsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDO1FBQy9CLElBQUksWUFBWSxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzdCLFdBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7UUFFRCxhQUFhO1FBQ2IsT0FBTyxJQUFJLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFBLHNCQUFjLEVBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQ2hCLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUNyQixJQUFBLGVBQU8sRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ2pCLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRztTQUNwQixDQUFDLENBQ0wsQ0FBQztRQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXBERCwwQkFvREMifQ==