"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const parseArgs_1 = __importDefault(require("@coffeekraken/sugar/shared/cli/parseArgs"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield s_sugar_config_1.default.load();
    const stringArgs = process.argv
        .slice(1)
        .map((arg) => {
        if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
            return `"${arg}"`;
        }
        return arg;
    })
        .join(' ') || '';
    const args = (0, parseArgs_1.default)(stringArgs);
    delete args[-1];
    if (!args.settings.processPath) {
        throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
    }
    const settings = Object.assign({}, args.settings);
    const processPath = settings.processPath;
    delete settings.processPath;
    delete args['0'];
    delete args.settings;
    const pro = yield s_process_1.default.from(processPath, Object.assign(Object.assign({}, settings), { runAsChild: false }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQseUZBQW1FO0FBTW5FLENBQUMsR0FBUyxFQUFFO0lBQ1IsTUFBTSx3QkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTVCLE1BQU0sVUFBVSxHQUNaLE9BQU8sQ0FBQyxJQUFJO1NBQ1AsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNSLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1QsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ3JELE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUNyQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixNQUFNLElBQUksR0FBNEIsSUFBQSxtQkFBVyxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQzVCLE1BQU0sNEZBQTRGLENBQUM7S0FDdEc7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztJQUN6QyxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDNUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBRXJCLE1BQU0sR0FBRyxHQUFHLE1BQU0sbUJBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxrQ0FDdEMsUUFBUSxLQUNYLFVBQVUsRUFBRSxLQUFLLElBQ25CLENBQUM7SUFFSCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFO1FBQ2hCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUM7UUFFN0IsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJO1lBQ0EsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUVkLElBQUksSUFBSSxFQUFFO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjtRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkI7QUFDTCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==