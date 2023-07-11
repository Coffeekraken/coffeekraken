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
const systemTmpDir_js_1 = __importDefault(require("../../path/systemTmpDir.js"));
const unzip_js_1 = __importDefault(require("../unzip.js"));
describe('sugar.node.zip.unzip', () => {
    it('Should unzip a simple file correctly at the same destination folder', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, unzip_js_1.default)(`${__dirname}/data/coffeekraken-new-logo.zip`, {
            dest: (0, systemTmpDir_js_1.default)() + '/downloads',
        });
        expect(result.dest).toBe(`${(0, systemTmpDir_js_1.default)()}/downloads/coffeekraken-new-logo`);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUZBQWtEO0FBQ2xELDJEQUFrQztBQUVsQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLEVBQUUsQ0FBQyxxRUFBcUUsRUFBRSxHQUFTLEVBQUU7UUFDakYsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGtCQUFPLEVBQ3hCLEdBQUcsU0FBUyxpQ0FBaUMsRUFDN0M7WUFDSSxJQUFJLEVBQUUsSUFBQSx5QkFBUSxHQUFFLEdBQUcsWUFBWTtTQUNsQyxDQUNKLENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDcEIsR0FBRyxJQUFBLHlCQUFRLEdBQUUsa0NBQWtDLENBQ2xELENBQUM7SUFDTixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==