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
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs.js';
import __SProcess from '@coffeekraken/s-process';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield __SSugarConfig.load();
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
        process: Object.assign(Object.assign({}, settings), { runAsChild: false }),
    });
    if (pro && pro.run) {
        const proPromise = pro.run(args);
        const res = yield proPromise;
    }
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQXNDaGlsZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Bc0NoaWxkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFNMUQsQ0FBQyxHQUFTLEVBQUU7SUFDUixNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUU1QixNQUFNLFVBQVUsR0FDWixPQUFPLENBQUMsSUFBSTtTQUNQLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDUixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNULElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNyRCxPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7U0FDckI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsTUFBTSxJQUFJLEdBQTRCLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUM3QixNQUFNLDRGQUE0RixDQUFDO0tBQ3RHO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDekMsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUV0QixNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQzNDLE9BQU8sa0NBQ0EsUUFBUSxLQUNYLFVBQVUsRUFBRSxLQUFLLEdBQ3BCO0tBQ0osQ0FBQyxDQUFDO0lBRUgsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRTtRQUNoQixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDO0tBQ2hDO0FBQ0wsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=