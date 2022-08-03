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
const listNodeModulesPackages_1 = __importDefault(require("../listNodeModulesPackages"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
describe('sugar.node.npm.utils.listNodeModulesPackages', () => {
    it('Should list the sugar node_modules packages correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield s_sugar_config_1.default.load();
        const modules = (0, listNodeModulesPackages_1.default)({
            monorepo: true,
        });
        expect(Object.keys(modules).length).toBeGreaterThan(0);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUZBQW1FO0FBQ25FLGtGQUEwRDtBQUUxRCxRQUFRLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO0lBQzFELEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxHQUFTLEVBQUU7UUFDbkUsTUFBTSx3QkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLE1BQU0sT0FBTyxHQUFHLElBQUEsaUNBQXlCLEVBQUM7WUFDdEMsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9