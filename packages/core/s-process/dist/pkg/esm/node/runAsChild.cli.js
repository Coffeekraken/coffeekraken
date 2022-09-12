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
import __SProcess from '@coffeekraken/s-process';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __parseArgs } from '@coffeekraken/sugar/cli';
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
    if (!args.settings.processPath) {
        throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
    }
    const settings = Object.assign({}, args.settings);
    const processPath = settings.processPath;
    delete settings.processPath;
    delete args['0'];
    delete args.settings;
    const pro = yield __SProcess.from(processPath, Object.assign(Object.assign({}, settings), { runAsChild: false }));
    if (pro && pro.run) {
        const proPromise = pro.run(args);
        const res = yield proPromise;
        let json;
        try {
            json = JSON.stringify(res.value);
        }
        catch (e) { }
        if (json) {
            console.log(json);
        }
        process.exit(0);
    }
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFNdEQsQ0FBQyxHQUFTLEVBQUU7SUFDUixNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUU1QixNQUFNLFVBQVUsR0FDWixPQUFPLENBQUMsSUFBSTtTQUNQLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDUixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNULElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNyRCxPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7U0FDckI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsTUFBTSxJQUFJLEdBQTRCLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUM1QixNQUFNLDRGQUE0RixDQUFDO0tBQ3RHO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDekMsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBQzVCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUVyQixNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxrQ0FDdEMsUUFBUSxLQUNYLFVBQVUsRUFBRSxLQUFLLElBQ25CLENBQUM7SUFFSCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFO1FBQ2hCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUM7UUFFN0IsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJO1lBQ0EsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUVkLElBQUksSUFBSSxFQUFFO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjtRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkI7QUFDTCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==