"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageJson_1 = __importDefault(require("../packageJson"));
const packageRoot_1 = __importDefault(require("../../../path/packageRoot"));
describe('sugar.node.npm.utils.packageJson', () => {
    it('Should fetch the "chokidar" package.json correctly', (done) => {
        const json = packageJson_1.default('chokidar', {
            rootDir: packageRoot_1.default(__dirname)
        });
        expect(json.name).toBe('chokidar');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhY2thZ2VKc29uLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpRUFBMkM7QUFDM0MsNEVBQXNEO0FBRXRELFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDaEQsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDaEUsTUFBTSxJQUFJLEdBQUcscUJBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDckMsT0FBTyxFQUFFLHFCQUFhLENBQUMsU0FBUyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9