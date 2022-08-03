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
import __SCliPackageRenameParamsInterface from '../../node/package/interface/SCliPackageRenameParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __renamePackage from '@coffeekraken/sugar/node/package/renamePackage';
import __fs from 'fs';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliPackageRenameParamsInterface.apply(stringArgs);
        if (!finalParams.name) {
            finalParams.name = yield emit('ask', {
                type: 'input',
                message: 'Please enter the new name for your package',
                pattern: '^[a-zA-Z0-9_@/-]+$',
            });
        }
        if (finalParams.folder === undefined) {
            finalParams.folder = yield emit('ask', {
                type: 'confirm',
                message: 'Do you want to rename the folder as well ?',
                default: true,
            });
        }
        // rename package
        emit('log', {
            value: `<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`,
        });
        __renamePackage(finalParams.name);
        if (finalParams.folder) {
            const folderName = finalParams.name.split('/').pop();
            emit('log', {
                value: `<yellow>[rename]</yellow> Renaming the folder with "<cyan>${folderName}</cyan>"`,
            });
            const newPath = `${process
                .cwd()
                .split('/')
                .slice(0, -1)
                .join('/')}/${folderName}`;
            __fs.renameSync(process.cwd(), newPath);
            process.chdir(newPath);
            emit('chdir', newPath);
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLGtDQUFrQyxNQUFNLCtEQUErRCxDQUFDO0FBQy9HLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBQzdFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxXQUFXLEdBQUcsa0NBQWtDLENBQUMsS0FBSyxDQUN4RCxVQUFVLENBQ2IsQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ25CLFdBQVcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNqQyxJQUFJLEVBQUUsT0FBTztnQkFDYixPQUFPLEVBQUUsNENBQTRDO2dCQUNyRCxPQUFPLEVBQUUsb0JBQW9CO2FBQ2hDLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUNsQyxXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDbkMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLDRDQUE0QztnQkFDckQsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1NBQ047UUFFRCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSw4REFBOEQsV0FBVyxDQUFDLElBQUksVUFBVTtTQUNsRyxDQUFDLENBQUM7UUFDSCxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUNwQixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSw2REFBNkQsVUFBVSxVQUFVO2FBQzNGLENBQUMsQ0FBQztZQUNILE1BQU0sT0FBTyxHQUFHLEdBQUcsT0FBTztpQkFDckIsR0FBRyxFQUFFO2lCQUNMLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDWixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=