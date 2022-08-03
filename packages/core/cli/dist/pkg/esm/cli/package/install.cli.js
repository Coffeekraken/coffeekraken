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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __childProcess from 'child_process';
import __fs from 'fs';
import __SCliPackageInstallParamsInterface from '../../node/package/interface/SCliPackageInstallParamsInterface';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliPackageInstallParamsInterface.apply(stringArgs);
        if (__fs.existsSync(`${process.cwd()}/package.json`)) {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${__SSugarConfig.get('package.manager')}</cyan>...`
            });
            __childProcess.execSync(`${__SSugarConfig.get('package.manager')} install`);
        }
        if (__fs.existsSync(`${process.cwd()}/composer.json`)) {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[install]</yellow> Installing the composer <cyan>vendors</cyan> dependencies...`
            });
            __childProcess.execSync('composer install');
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sbUNBQW1DLE1BQU0sZ0VBQWdFLENBQUM7QUFFakgsZUFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxFQUFFO1FBQzFELE1BQU0sV0FBVyxHQUFHLG1DQUFtQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUxRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsZ0dBQWdHLGNBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsWUFBWTthQUMzSixDQUFDLENBQUM7WUFDSCxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvRTtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsRUFBRTtZQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLHlGQUF5RjthQUNuRyxDQUFDLENBQUM7WUFDSCxjQUFjLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDL0M7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUVkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==