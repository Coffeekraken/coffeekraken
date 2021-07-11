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
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __SProcess from '@coffeekraken/s-process';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const stringArgs = process.argv
        .slice(1)
        .map((arg) => {
        if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
            return `"${arg}"`;
        }
        return arg;
    })
        .join(' ') || '';
    const args = __parseArgs(stringArgs);
    delete args[-1];
    if (!args._settings.processPath) {
        throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
    }
    const settings = Object.assign({}, args._settings);
    const processPath = settings.processPath;
    delete settings.processPath;
    delete args._settings;
    const pro = yield __SProcess.from(processPath, {
        process: Object.assign(Object.assign({}, settings), { runAsChild: false })
    });
    if (pro && pro.run)
        pro.run(args);
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQXNDaGlsZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Bc0NoaWxkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxXQUFXLE1BQU0sMENBQTBDLENBQUM7QUFDbkUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFNakQsQ0FBQyxHQUFRLEVBQUU7SUFFVCxNQUFNLFVBQVUsR0FDZCxPQUFPLENBQUMsSUFBSTtTQUNULEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDUixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNYLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUN2RCxPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7U0FDbkI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsTUFBTSxJQUFJLEdBQTRCLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUMvQixNQUFNLDRGQUE0RixDQUFDO0tBQ3BHO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDekMsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUV0QixNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQzdDLE9BQU8sa0NBQ0YsUUFBUSxLQUNYLFVBQVUsRUFBRSxLQUFLLEdBQ2xCO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUc7UUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXBDLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9