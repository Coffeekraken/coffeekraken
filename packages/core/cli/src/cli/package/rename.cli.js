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
                pattern: '^[a-zA-Z0-9_@\/-]+$'
            });
        }
        if (finalParams.folder === undefined) {
            finalParams.folder = yield emit('ask', {
                type: 'confirm',
                message: 'Do you want to rename the folder as well ?',
                default: true
            });
        }
        // rename package
        emit('log', {
            value: `<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`
        });
        __renamePackage(finalParams.name);
        if (finalParams.folder) {
            const folderName = finalParams.name.split('/').pop();
            emit('log', {
                value: `<yellow>[rename]</yellow> Renaming the folder with "<cyan>${folderName}</cyan>"`
            });
            const newPath = `${process.cwd().split('/').slice(0, -1).join('/')}/${folderName}`;
            __fs.renameSync(process.cwd(), newPath);
            process.chdir(newPath);
            emit('chdir', newPath);
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuYW1lLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbmFtZS5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLE9BQU8sa0NBQWtDLE1BQU0sK0RBQStELENBQUM7QUFDL0csT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxlQUFlLE1BQU0sZ0RBQWdELENBQUM7QUFDN0UsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRTtRQUMxRCxNQUFNLFdBQVcsR0FBRyxrQ0FBa0MsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDbkIsV0FBVyxDQUFDLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pDLElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRSw0Q0FBNEM7Z0JBQ3JELE9BQU8sRUFBRSxxQkFBcUI7YUFDakMsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ2xDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNuQyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsNENBQTRDO2dCQUNyRCxPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQUM7U0FDTjtRQUVELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLDhEQUE4RCxXQUFXLENBQUMsSUFBSSxVQUFVO1NBQ2xHLENBQUMsQ0FBQztRQUNILGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEMsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3BCLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3JELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLDZEQUE2RCxVQUFVLFVBQVU7YUFDM0YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUM7WUFDbEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFFZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=