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
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const SCliNvmAutoSwitchParamsInterface_1 = __importDefault(require("../../node/nvm/interface/SCliNvmAutoSwitchParamsInterface"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = SCliNvmAutoSwitchParamsInterface_1.default.apply(stringArgs);
        function appendToFile(filePath, text) {
            const content = fs_2.default.readFileSync(filePath, 'utf-8').toString();
            if (content.includes('@coffeekraken.cli.nvm.autoSwitch')) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `It seems that this feature has already been installed in your <cyan>${filePath}</cyan> file...`,
                });
                return false;
            }
            fs_2.default.writeFileSync(filePath, [content, text].join('\n\n'));
            return true;
        }
        if (!finalParams.install && !finalParams.uninstall) {
            emit('log', {
                type: s_log_1.default.TYPE_WARN,
                value: `Please pass at least the <yellow>-i</yellow> argument to install, or the <magenta>-u</magenta> argument to uninstall...`,
            });
            return resolve();
        }
        const homeDir = os_1.default.homedir(), script = fs_2.default.readFileSync(`${(0, fs_1.__dirname)()}/../../../../../src/cli/nvm/nvmAutoSwitch.sh`, 'utf-8');
        const zshPath = `${homeDir}/.zshrc`, bashPath = `${homeDir}/.bashrc`;
        if (finalParams.install) {
            if (fs_2.default.existsSync(zshPath) &&
                (yield emit('ask', {
                    type: 'confirm',
                    message: `A <cyan>${zshPath}</cyan> file has been found. Would you like to install this feature for <magenta>ZSH</magenta>?`,
                    default: true,
                }))) {
                if (appendToFile(zshPath, script)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<green>[nvmAutoSwitch]</green> The nvmAutoSwitch feature has been installed <green>successfully</green> for <magenta>ZSH</magenta>`,
                    });
                }
            }
            if (fs_2.default.existsSync(bashPath) &&
                (yield emit('ask', {
                    type: 'confirm',
                    message: `A <cyan>${bashPath}</cyan> file has been found. Would you like to install this feature for <magenta>bash</magenta>?`,
                    default: true,
                }))) {
                if (appendToFile(bashPath, script)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<green>[nvmAutoSwitch]</green> The nvmAutoSwitch feature has been installed <green>successfully</green> for <magenta>bash</magenta>`,
                    });
                }
            }
        }
        resolve();
    }), {
        eventEmitter: {
            metas: {
                id: 'sugar nvm.autoSwitch',
            },
        },
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsK0NBQW1EO0FBQ25ELDRDQUFzQjtBQUN0Qiw0Q0FBc0I7QUFDdEIsaUlBQTJHO0FBRTNHLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFdBQVcsR0FDYiwwQ0FBa0MsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFekQsU0FBUyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUk7WUFDaEMsTUFBTSxPQUFPLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFaEUsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUsdUVBQXVFLFFBQVEsaUJBQWlCO2lCQUMxRyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxZQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUUzRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQ2hELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUseUhBQXlIO2FBQ25JLENBQUMsQ0FBQztZQUNILE9BQU8sT0FBTyxFQUFFLENBQUM7U0FDcEI7UUFFRCxNQUFNLE9BQU8sR0FBRyxZQUFJLENBQUMsT0FBTyxFQUFFLEVBQzFCLE1BQU0sR0FBRyxZQUFJLENBQUMsWUFBWSxDQUN0QixHQUFHLElBQUEsY0FBUyxHQUFFLDhDQUE4QyxFQUM1RCxPQUFPLENBQ1YsQ0FBQztRQUVOLE1BQU0sT0FBTyxHQUFHLEdBQUcsT0FBTyxTQUFTLEVBQy9CLFFBQVEsR0FBRyxHQUFHLE9BQU8sVUFBVSxDQUFDO1FBRXBDLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUNyQixJQUNJLFlBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUN4QixDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDZixJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVyxPQUFPLGlHQUFpRztvQkFDNUgsT0FBTyxFQUFFLElBQUk7aUJBQ2hCLENBQUMsQ0FBQyxFQUNMO2dCQUNFLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7d0JBQ3RCLEtBQUssRUFBRSxvSUFBb0k7cUJBQzlJLENBQUMsQ0FBQztpQkFDTjthQUNKO1lBRUQsSUFDSSxZQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztnQkFDekIsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVcsUUFBUSxrR0FBa0c7b0JBQzlILE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUMsRUFDTDtnQkFDRSxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO3dCQUN0QixLQUFLLEVBQUUscUlBQXFJO3FCQUMvSSxDQUFDLENBQUM7aUJBQ047YUFDSjtTQUNKO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsRUFDRDtRQUNJLFlBQVksRUFBRTtZQUNWLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsc0JBQXNCO2FBQzdCO1NBQ0o7S0FDSixDQUNKLENBQUM7QUFDTixDQUFDLENBQUMifQ==