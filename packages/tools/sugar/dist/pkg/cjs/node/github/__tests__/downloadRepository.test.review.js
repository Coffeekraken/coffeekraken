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
const downloadRepository_js_1 = __importDefault(require("../downloadRepository.js"));
describe('sugar.node.github.downloadRepository', () => {
    it('Should download a repository successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const repo = yield (0, downloadRepository_js_1.default)('Coffeekraken/download-test-repo', {
            branch: 'main',
        });
        expect(repo).toEqual({
            dest: `${(0, systemTmpDir_js_1.default)()}/downloads/coffeekraken-download-test-repo-main.zip`,
        });
    }), 999999);
    it('Should download a repository and unzip it successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const repo = yield (0, downloadRepository_js_1.default)('Coffeekraken/download-test-repo', {
            branch: 'main',
            unzip: true,
        });
        expect(repo).toEqual({
            dest: `${(0, systemTmpDir_js_1.default)()}/downloads/coffeekraken-download-test-repo-main`,
        });
    }), 999999);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUZBQWtEO0FBQ2xELHFGQUE0RDtBQUU1RCxRQUFRLENBQUMsc0NBQXNDLEVBQUUsR0FBRyxFQUFFO0lBQ2xELEVBQUUsQ0FBQywyQ0FBMkMsRUFBRSxHQUFTLEVBQUU7UUFDdkQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLCtCQUFvQixFQUNuQyxpQ0FBaUMsRUFDakM7WUFDSSxNQUFNLEVBQUUsTUFBTTtTQUNqQixDQUNKLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2pCLElBQUksRUFBRSxHQUFHLElBQUEseUJBQVEsR0FBRSxxREFBcUQ7U0FDM0UsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFWCxFQUFFLENBQUMsd0RBQXdELEVBQUUsR0FBUyxFQUFFO1FBQ3BFLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSwrQkFBb0IsRUFDbkMsaUNBQWlDLEVBQ2pDO1lBQ0ksTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQ0osQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDakIsSUFBSSxFQUFFLEdBQUcsSUFBQSx5QkFBUSxHQUFFLGlEQUFpRDtTQUN2RSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDIn0=