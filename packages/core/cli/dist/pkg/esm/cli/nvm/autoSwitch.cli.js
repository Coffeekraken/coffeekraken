var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __dirname } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
import __os from 'os';
import __SCliNvmAutoSwitchParamsInterface from '../../node/nvm/interface/SCliNvmAutoSwitchParamsInterface.js';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliNvmAutoSwitchParamsInterface.apply(stringArgs);
        function appendToFile(filePath, text) {
            const content = __fs.readFileSync(filePath, 'utf-8').toString();
            if (content.includes('@coffeekraken.cli.nvm.autoSwitch')) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `It seems that this feature has already been installed in your <cyan>${filePath}</cyan> file...`,
                });
                return false;
            }
            __fs.writeFileSync(filePath, [content, text].join('\n\n'));
            return true;
        }
        if (!finalParams.install && !finalParams.uninstall) {
            emit('log', {
                type: __SLog.TYPE_WARN,
                value: `Please pass at least the <yellow>-i</yellow> argument to install, or the <magenta>-u</magenta> argument to uninstall...`,
            });
            return resolve();
        }
        const homeDir = __os.homedir(), script = __fs.readFileSync(`${__dirname()}/../../../../../src/cli/nvm/nvmAutoSwitch.sh`, 'utf-8');
        const zshPath = `${homeDir}/.zshrc`, bashPath = `${homeDir}/.bashrc`;
        if (finalParams.install) {
            if (__fs.existsSync(zshPath) &&
                (yield emit('ask', {
                    type: 'confirm',
                    message: `A <cyan>${zshPath}</cyan> file has been found. Would you like to install this feature for <magenta>ZSH</magenta>?`,
                    default: true,
                }))) {
                if (appendToFile(zshPath, script)) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[nvmAutoSwitch]</green> The nvmAutoSwitch feature has been installed <green>successfully</green> for <magenta>ZSH</magenta>`,
                    });
                }
            }
            if (__fs.existsSync(bashPath) &&
                (yield emit('ask', {
                    type: 'confirm',
                    message: `A <cyan>${bashPath}</cyan> file has been found. Would you like to install this feature for <magenta>bash</magenta>?`,
                    default: true,
                }))) {
                if (appendToFile(bashPath, script)) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGtDQUFrQyxNQUFNLDhEQUE4RCxDQUFDO0FBRTlHLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEMsTUFBTSxXQUFXLEdBQ2Isa0NBQWtDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXpELFNBQVMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJO1lBQ2hDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWhFLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQyxFQUFFO2dCQUN0RCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztvQkFDdEIsS0FBSyxFQUFFLHVFQUF1RSxRQUFRLGlCQUFpQjtpQkFDMUcsQ0FBQyxDQUFDO2dCQUNILE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFM0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTtZQUNoRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLHlIQUF5SDthQUNuSSxDQUFDLENBQUM7WUFDSCxPQUFPLE9BQU8sRUFBRSxDQUFDO1NBQ3BCO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUMxQixNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FDdEIsR0FBRyxTQUFTLEVBQUUsOENBQThDLEVBQzVELE9BQU8sQ0FDVixDQUFDO1FBRU4sTUFBTSxPQUFPLEdBQUcsR0FBRyxPQUFPLFNBQVMsRUFDL0IsUUFBUSxHQUFHLEdBQUcsT0FBTyxVQUFVLENBQUM7UUFFcEMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3JCLElBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNmLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXLE9BQU8saUdBQWlHO29CQUM1SCxPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDLEVBQ0w7Z0JBQ0UsSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFO29CQUMvQixJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLG9JQUFvSTtxQkFDOUksQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7WUFFRCxJQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO2dCQUN6QixDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDZixJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVyxRQUFRLGtHQUFrRztvQkFDOUgsT0FBTyxFQUFFLElBQUk7aUJBQ2hCLENBQUMsQ0FBQyxFQUNMO2dCQUNFLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7d0JBQ3RCLEtBQUssRUFBRSxxSUFBcUk7cUJBQy9JLENBQUMsQ0FBQztpQkFDTjthQUNKO1NBQ0o7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxFQUNEO1FBQ0ksWUFBWSxFQUFFO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxzQkFBc0I7YUFDN0I7U0FDSjtLQUNKLENBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9