var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../getColorFor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const getColorFor_1 = __importDefault(require("../getColorFor"));
    describe('sugar.shared.dev.color.getColorFor', () => {
        it('Should return me a simple color', () => {
            const color = getColorFor_1.default('this');
            expect(typeof color).toBe('string');
        });
        it('Should return me a simple color every time the same for the passed ref', () => {
            const color = getColorFor_1.default('that');
            const color1 = getColorFor_1.default('that');
            expect(color).toBe(color1);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29sb3JGb3IudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldENvbG9yRm9yLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSxpRUFBMkM7SUFHM0MsUUFBUSxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsRUFBRTtRQUNsRCxFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLE1BQU0sS0FBSyxHQUFHLHFCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHdFQUF3RSxFQUFFLEdBQUcsRUFBRTtZQUNoRixNQUFNLEtBQUssR0FBRyxxQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sTUFBTSxHQUFHLHFCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDIn0=