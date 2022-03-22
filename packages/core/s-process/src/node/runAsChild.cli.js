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
    var _a, _b, _c;
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
    delete args['0'];
    delete args._settings;
    const pro = yield __SProcess.from(processPath, {
        process: Object.assign(Object.assign({}, settings), { runAsChild: false }),
    });
    if (pro && pro.run) {
        const proPromise = pro.run(args);
        const res = yield proPromise;
        try {
            console.log(JSON.stringify(res.value));
        }
        catch (e) {
            console.log((_c = (_b = (_a = res.value) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : res.value);
        }
        process.exit(0);
    }
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQXNDaGlsZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Bc0NoaWxkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFNMUQsQ0FBQyxHQUFTLEVBQUU7O0lBQ1IsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFNUIsTUFBTSxVQUFVLEdBQ1osT0FBTyxDQUFDLElBQUk7U0FDUCxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ1IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDVCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDckQsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLE1BQU0sSUFBSSxHQUE0QixXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUQsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7UUFDN0IsTUFBTSw0RkFBNEYsQ0FBQztLQUN0RztJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBQ3pDLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQztJQUM1QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFFdEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUMzQyxPQUFPLGtDQUNBLFFBQVEsS0FDWCxVQUFVLEVBQUUsS0FBSyxHQUNwQjtLQUNKLENBQUMsQ0FBQztJQUVILElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUU7UUFDaEIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQztRQUU3QixJQUFJO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQUEsTUFBQSxNQUFBLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLFFBQVEsa0RBQUksbUNBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjtBQUNMLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9