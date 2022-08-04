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
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQU10RSxDQUFDLEdBQVMsRUFBRTtJQUNSLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTVCLE1BQU0sVUFBVSxHQUNaLE9BQU8sQ0FBQyxJQUFJO1NBQ1AsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNSLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1QsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ3JELE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUNyQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixNQUFNLElBQUksR0FBNEIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQzVCLE1BQU0sNEZBQTRGLENBQUM7S0FDdEc7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztJQUN6QyxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDNUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBRXJCLE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLGtDQUN0QyxRQUFRLEtBQ1gsVUFBVSxFQUFFLEtBQUssSUFDbkIsQ0FBQztJQUVILElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUU7UUFDaEIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQztRQUU3QixJQUFJLElBQUksQ0FBQztRQUVULElBQUk7WUFDQSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1FBRWQsSUFBSSxJQUFJLEVBQUU7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjtBQUNMLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9