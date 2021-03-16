"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const SFile_1 = __importDefault(require("../SFile"));
describe('sugar.node.fs.SFile', () => {
    it('Should instanciate and get properties correctly from a file', (done) => {
        const file = new SFile_1.default(path_1.default.resolve(__dirname, 'data/3cb8876846e7c0e13896d23496ff7ac2.gif'));
        expect(file.name).toBe('3cb8876846e7c0e13896d23496ff7ac2.gif');
        expect(file.path.includes('sugar/src/node/fs/__tests__/data/3cb8876846e7c0e13896d23496ff7ac2.gif')).toBe(true);
        expect(file.dirPath.includes('sugar/src/node/fs/__tests__/data')).toBe(true);
        expect(file.extension).toBe('gif');
        expect(file.stats.bytes).toBe(789250);
        expect(file.exists).toBe(true);
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL2ZzL19fdGVzdHNfXy9TRmlsZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBQzFCLHFEQUErQjtBQUUvQixRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLEVBQUUsQ0FBQyw2REFBNkQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3pFLE1BQU0sSUFBSSxHQUFHLElBQUksZUFBTyxDQUN0QixjQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwyQ0FBMkMsQ0FBQyxDQUN2RSxDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQ2hCLHVFQUF1RSxDQUN4RSxDQUNGLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3BFLElBQUksQ0FDTCxDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9CLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9