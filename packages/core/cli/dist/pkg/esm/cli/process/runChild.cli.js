// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __parseArgs from '../../shared/cli/parseArgs';
import __SProcess from '@coffeekraken/s-process';
export default (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const args = __parseArgs(stringArgs);
    if (!args.processPath) {
        throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
    }
    const { default: ProcessClass } = yield import(args.processPath);
    if (ProcessClass.prototype instanceof __SProcess) {
        const processInstance = new ProcessClass();
        processInstance.run(stringArgs);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFdBQVcsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQU1qRCxlQUFlLENBQU8sVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sSUFBSSxHQUE0QixXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDckIsTUFBTSwyRkFBMkYsQ0FBQztLQUNuRztJQUNELE1BQU0sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pFLElBQUksWUFBWSxDQUFDLFNBQVMsWUFBWSxVQUFVLEVBQUU7UUFDaEQsTUFBTSxlQUFlLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0gsQ0FBQyxDQUFBLENBQUMifQ==