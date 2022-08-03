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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __fs from 'fs';
import __os from 'os';
import __SCliNvmAutoSwitchParamsInterface from '../../node/nvm/interface/SCliNvmAutoSwitchParamsInterface';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sa0NBQWtDLE1BQU0sMkRBQTJELENBQUM7QUFFM0csZUFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFdBQVcsR0FBRyxrQ0FBa0MsQ0FBQyxLQUFLLENBQ3hELFVBQVUsQ0FDYixDQUFDO1FBRUYsU0FBUyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUk7WUFDaEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFaEUsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUsdUVBQXVFLFFBQVEsaUJBQWlCO2lCQUMxRyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUUzRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQ2hELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUseUhBQXlIO2FBQ25JLENBQUMsQ0FBQztZQUNILE9BQU8sT0FBTyxFQUFFLENBQUM7U0FDcEI7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQzFCLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUN0QixHQUFHLFNBQVMsRUFBRSw4Q0FBOEMsRUFDNUQsT0FBTyxDQUNWLENBQUM7UUFFTixNQUFNLE9BQU8sR0FBRyxHQUFHLE9BQU8sU0FBUyxFQUMvQixRQUFRLEdBQUcsR0FBRyxPQUFPLFVBQVUsQ0FBQztRQUVwQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsSUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDeEIsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVcsT0FBTyxpR0FBaUc7b0JBQzVILE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUMsRUFDTDtnQkFDRSxJQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO3dCQUN0QixLQUFLLEVBQUUsb0lBQW9JO3FCQUM5SSxDQUFDLENBQUM7aUJBQ047YUFDSjtZQUVELElBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3pCLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNmLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXLFFBQVEsa0dBQWtHO29CQUM5SCxPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDLEVBQ0w7Z0JBQ0UsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO29CQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLHFJQUFxSTtxQkFDL0ksQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7U0FDSjtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLEVBQ0Q7UUFDSSxZQUFZLEVBQUU7WUFDVixLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLHNCQUFzQjthQUM3QjtTQUNKO0tBQ0osQ0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=