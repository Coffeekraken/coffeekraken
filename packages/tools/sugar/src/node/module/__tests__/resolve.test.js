"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_1 = __importDefault(require("../resolve"));
const path_1 = __importDefault(require("path"));
describe('sugar.node.module.resolve', () => {
    const settings = {
        dirs: [`${__dirname}`]
    };
    it('Should resolve an existing file correctly', (done) => {
        const res = resolve_1.default('pkg/test/test.js', settings);
        expect(res).toBe(path_1.default.resolve(__dirname, 'pkg/test/test.js'));
        done();
    });
    it('Should resolve a file without extension defined', (done) => {
        const res = resolve_1.default('pkg/test/test', settings);
        expect(res).toBe(path_1.default.resolve(__dirname, 'pkg/test/test.js'));
        done();
    });
    it('Should resolve a module using package.json main field', (done) => {
        const res = resolve_1.default('pkg', settings);
        expect(res).toBe(path_1.default.resolve(__dirname, 'pkg/index.js'));
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb2x2ZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseURBQW1DO0FBQ25DLGdEQUEwQjtBQUUxQixRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0lBQ3pDLE1BQU0sUUFBUSxHQUFHO1FBQ2YsSUFBSSxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQztLQUN2QixDQUFDO0lBRUYsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDdkQsTUFBTSxHQUFHLEdBQUcsaUJBQVMsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDN0QsTUFBTSxHQUFHLEdBQUcsaUJBQVMsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25FLE1BQU0sR0FBRyxHQUFHLGlCQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==