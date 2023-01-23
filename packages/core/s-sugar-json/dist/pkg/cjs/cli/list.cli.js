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
const packageRootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRootDir"));
const path_1 = __importDefault(require("path"));
const SSugarJson_1 = __importDefault(require("../node/SSugarJson"));
exports.default = (stringArgs = '') => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`<yellow>[search]</yellow> Searching for <yellow>sugar.json</yellow> files that are used in your <magenta>current context</magenta>...`);
        const sugarJson = new SSugarJson_1.default();
        const list = yield sugarJson.search();
        list.forEach((path) => {
            console.log(`<yellow>[file]</yellow> <cyan>${path_1.default.relative((0, packageRootDir_1.default)(), path)}</cyan>`);
        });
        console.log(`<green>[success]</green> <magenta>${list.length}</magenta> file(s) found`);
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGtHQUE0RTtBQUM1RSxnREFBMEI7QUFDMUIsb0VBQThDO0FBRTlDLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVJQUF1SSxDQUFDLENBQUM7UUFDckosTUFBTSxTQUFTLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7UUFDckMsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLGNBQU0sQ0FBQyxRQUFRLENBQ3BELElBQUEsd0JBQWdCLEdBQUUsRUFDbEIsSUFBSSxDQUNQLFNBQVMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsSUFBSSxDQUFDLE1BQU0sMEJBQTBCLENBQUMsQ0FBQztRQUN4RixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==