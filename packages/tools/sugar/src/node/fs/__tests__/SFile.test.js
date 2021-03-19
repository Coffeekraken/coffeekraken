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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGaWxlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBMEI7QUFDMUIscURBQStCO0FBRS9CLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7SUFDbkMsRUFBRSxDQUFDLDZEQUE2RCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDekUsTUFBTSxJQUFJLEdBQUcsSUFBSSxlQUFPLENBQ3RCLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLDJDQUEyQyxDQUFDLENBQ3ZFLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FDaEIsdUVBQXVFLENBQ3hFLENBQ0YsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDcEUsSUFBSSxDQUNMLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=