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
                pattern: '^[a-zA-Z0-9_@-]+$'
            });
        }
        finalParams.folder = yield emit('ask', {
            type: 'confirm',
            message: 'Do you want to rename the folder as well ?',
            default: true
        });
        // rename package
        emit('log', {
            value: `<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`
        });
        __renamePackage(finalParams.name);
        if (finalParams.folder) {
            emit('log', {
                value: `<yellow>[rename]</yellow> Renaming the folder with "<cyan>${finalParams.name}</cyan>"`
            });
            const newPath = `${process.cwd().split('/').slice(0, -1).join('/')}/${finalParams.name}`;
            __fs.renameSync(process.cwd(), newPath);
            process.chdir(newPath);
            emit('chdir', newPath);
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuYW1lLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbmFtZS5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLE9BQU8sa0NBQWtDLE1BQU0sK0RBQStELENBQUM7QUFDL0csT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxlQUFlLE1BQU0sZ0RBQWdELENBQUM7QUFDN0UsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRTtRQUMxRCxNQUFNLFdBQVcsR0FBRyxrQ0FBa0MsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDbkIsV0FBVyxDQUFDLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pDLElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRSw0Q0FBNEM7Z0JBQ3JELE9BQU8sRUFBRSxtQkFBbUI7YUFDL0IsQ0FBQyxDQUFDO1NBQ047UUFFRCxXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNuQyxJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRSw0Q0FBNEM7WUFDckQsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEVBQUUsOERBQThELFdBQVcsQ0FBQyxJQUFJLFVBQVU7U0FDbEcsQ0FBQyxDQUFDO1FBQ0gsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUCxLQUFLLEVBQUUsNkRBQTZELFdBQVcsQ0FBQyxJQUFJLFVBQVU7YUFDakcsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hGLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMxQjtRQUVELE9BQU8sRUFBRSxDQUFDO0lBRWQsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9