var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../sugar", "../registerFolder"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const sugar_1 = __importDefault(require("../sugar"));
    const registerFolder_1 = __importDefault(require("../registerFolder"));
    registerFolder_1.default(__dirname + '/config');
    describe('sugar.shared.config.sugar', () => {
        it('Should load a default config correctly', (done) => {
            const value = sugar_1.default('npm.rootDir');
            expect(value.match(/\/node_modules$/).length).toBe(1);
            done();
        });
        it('Should load a registered folder config correctly', (done) => {
            const value = sugar_1.default('coco.something');
            expect(value).toBe('Hello world');
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1Z2FyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSxxREFBK0I7SUFDL0IsdUVBQWlEO0lBRWpELHdCQUFnQixDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUV4QyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO1FBQ3pDLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BELE1BQU0sS0FBSyxHQUFHLGVBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUQsTUFBTSxLQUFLLEdBQUcsZUFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUMifQ==