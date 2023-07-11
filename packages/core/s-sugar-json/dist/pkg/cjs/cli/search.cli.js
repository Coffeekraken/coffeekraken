"use strict";
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
// @ts-nocheck
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = __importDefault(require("path"));
const SSugarJson_js_1 = __importDefault(require("../node/SSugarJson.js"));
exports.default = (stringArgs = '') => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`<yellow>[search]</yellow> Searching for <yellow>sugar.json</yellow> files that are used in your <magenta>current context</magenta>...`);
        const sugarJson = new SSugarJson_js_1.default();
        const list = yield sugarJson.search();
        list.forEach((path) => {
            console.log(`<yellow>[file]</yellow> <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), path)}</cyan>`);
        });
        console.log(`<green>[success]</green> <magenta>${list.length}</magenta> file(s) found`);
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLG1EQUE0RDtBQUM1RCxnREFBMEI7QUFDMUIsMEVBQWlEO0FBRWpELGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUNQLHVJQUF1SSxDQUMxSSxDQUFDO1FBQ0YsTUFBTSxTQUFTLEdBQUcsSUFBSSx1QkFBWSxFQUFFLENBQUM7UUFDckMsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsaUNBQWlDLGNBQU0sQ0FBQyxRQUFRLENBQzVDLElBQUEsdUJBQWdCLEdBQUUsRUFDbEIsSUFBSSxDQUNQLFNBQVMsQ0FDYixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUNQLHFDQUFxQyxJQUFJLENBQUMsTUFBTSwwQkFBMEIsQ0FDN0UsQ0FBQztRQUNGLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9