"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPath_1 = __importDefault(require("../isPath"));
describe('sugar.node.fs.isPath', () => {
    it('Should detect that a valid path is a valid path', () => {
        expect((0, isPath_1.default)('/my/cool/path.png')).toBe(true);
    });
    it('Should detect that a simple file path is a valid path', () => {
        expect((0, isPath_1.default)('path.png')).toBe(true);
    });
    it('Should return true when checking for a valid path that exists', () => {
        expect((0, isPath_1.default)(`${__dirname}/data/file.jpg`, true)).toBe(true);
    });
    it('Should return false when checking for a valid path that does not exists', () => {
        expect((0, isPath_1.default)(`${__dirname}/data/file22232323.jpg`, true)).toBe(false);
    });
    it('Should detect that passing null is not a valid path', () => {
        expect((0, isPath_1.default)(null)).toBe(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdURBQWlDO0FBQ2pDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLEdBQUcsRUFBRTtRQUN2RCxNQUFNLENBQUMsSUFBQSxnQkFBUSxFQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsdURBQXVELEVBQUUsR0FBRyxFQUFFO1FBQzdELE1BQU0sQ0FBQyxJQUFBLGdCQUFRLEVBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsK0RBQStELEVBQUUsR0FBRyxFQUFFO1FBQ3JFLE1BQU0sQ0FBQyxJQUFBLGdCQUFRLEVBQUMsR0FBRyxTQUFTLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHlFQUF5RSxFQUFFLEdBQUcsRUFBRTtRQUMvRSxNQUFNLENBQUMsSUFBQSxnQkFBUSxFQUFDLEdBQUcsU0FBUyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDN0QsS0FBSyxDQUNSLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxxREFBcUQsRUFBRSxHQUFHLEVBQUU7UUFDM0QsTUFBTSxDQUFDLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=