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
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
function dynamic(express, settings, config) {
    return __awaiter(this, void 0, void 0, function* () {
        // register handler
        config.handlers['404'] = {
            description: 'Handle the 404 page',
            path: `${(0, dirname_1.default)()}/404Handler`,
            settings: {},
        };
        return true;
    });
}
exports.default = dynamic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTREO0FBRTVELFNBQThCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07O1FBQzNELG1CQUFtQjtRQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHO1lBQ3JCLFdBQVcsRUFBRSxxQkFBcUI7WUFDbEMsSUFBSSxFQUFFLEdBQUcsSUFBQSxpQkFBUyxHQUFFLGFBQWE7WUFDakMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUFBO0FBVEQsMEJBU0MifQ==