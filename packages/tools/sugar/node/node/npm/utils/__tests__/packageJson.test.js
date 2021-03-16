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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9ub2RlL25wbS91dGlscy9fX3Rlc3RzX18vcGFja2FnZUpzb24udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlFQUEyQztBQUMzQyw0RUFBc0Q7QUFFdEQsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUNoRCxFQUFFLENBQUMsb0RBQW9ELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNoRSxNQUFNLElBQUksR0FBRyxxQkFBYSxDQUFDLFVBQVUsRUFBRTtZQUNyQyxPQUFPLEVBQUUscUJBQWEsQ0FBQyxTQUFTLENBQUM7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=