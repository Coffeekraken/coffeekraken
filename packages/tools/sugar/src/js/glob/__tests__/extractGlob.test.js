var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../extractGlob"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var extractGlob_1 = __importDefault(require("../extractGlob"));
    describe('sugar.js.glob.extractGlob', function () {
        it('Should extract none glob part correctly', function () {
            expect(extractGlob_1.default('/Users/olivierbossel/data/web/coffeekraken/coffeekraken/toolkits/sugar/src/js/**/*.js')).toBe('**/*.js');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEdsb2IudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RHbG9iLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSwrREFBMkM7SUFFM0MsUUFBUSxDQUFDLDJCQUEyQixFQUFFO1FBQ3BDLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTtZQUM1QyxNQUFNLENBQ0oscUJBQWEsQ0FDWCx1RkFBdUYsQ0FDeEYsQ0FDRixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDIn0=