"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveGlob_js_1 = __importDefault(require("../resolveGlob.js"));
describe('sugar.node.glob.resolveGlob', () => {
    it('Should resolve the passed glob correctly', (done) => {
        const files = (0, resolveGlob_js_1.default)(`data/**/*`, {
            cwd: __dirname,
        });
        const file = files[0];
        expect(file.path.includes('src/node/glob/__tests__/data/myCoolData.txt')).toBe(true);
        expect(file.cwd.includes('src/node/glob/__tests__')).toBe(true);
        expect(file.relPath).toBe('data/myCoolData.txt');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsdUVBQWtEO0FBRWxELFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7SUFDekMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDcEQsTUFBTSxLQUFLLEdBQUcsSUFBQSx3QkFBaUIsRUFBQyxXQUFXLEVBQUU7WUFDekMsR0FBRyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FDRixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUNwRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDakQsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=