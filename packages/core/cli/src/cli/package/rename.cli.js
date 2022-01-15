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
        console.log(finalParams);
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuYW1lLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbmFtZS5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLE9BQU8sa0NBQWtDLE1BQU0sK0RBQStELENBQUM7QUFDL0csT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQsZUFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxFQUFFO1FBQzFELE1BQU0sV0FBVyxHQUFHLGtDQUFrQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtZQUNuQixXQUFXLENBQUMsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDakMsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsT0FBTyxFQUFFLDRDQUE0QztnQkFDckQsT0FBTyxFQUFFLG1CQUFtQjthQUMvQixDQUFDLENBQUM7U0FDTjtRQUVELFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ25DLElBQUksRUFBRSxTQUFTO1lBQ2YsT0FBTyxFQUFFLDRDQUE0QztZQUNyRCxPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRTdCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==