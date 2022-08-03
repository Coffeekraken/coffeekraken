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
const unzip_1 = __importDefault(require("../unzip"));
const systemTmpDir_1 = __importDefault(require("../../path/systemTmpDir"));
describe('sugar.node.zip.unzip', () => {
    it('Should unzip a simple file correctly at the same destination folder', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, unzip_1.default)(`${__dirname}/data/coffeekraken-new-logo.zip`, {
            dest: (0, systemTmpDir_1.default)() + '/downloads',
        });
        expect(result.dest).toBe(`${(0, systemTmpDir_1.default)()}/downloads/coffeekraken-new-logo`);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQStCO0FBQy9CLDJFQUErQztBQUUvQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLEVBQUUsQ0FBQyxxRUFBcUUsRUFBRSxHQUFTLEVBQUU7UUFDakYsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGVBQU8sRUFDeEIsR0FBRyxTQUFTLGlDQUFpQyxFQUM3QztZQUNJLElBQUksRUFBRSxJQUFBLHNCQUFRLEdBQUUsR0FBRyxZQUFZO1NBQ2xDLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNwQixHQUFHLElBQUEsc0JBQVEsR0FBRSxrQ0FBa0MsQ0FDbEQsQ0FBQztJQUNOLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9