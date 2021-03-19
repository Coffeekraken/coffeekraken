var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../imageLoaded", "../dispatchEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var imageLoaded_1 = __importDefault(require("../imageLoaded"));
    var dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
    describe('sugar.js.dom.imageLoaded', function () {
        document.head.innerHTML = "\n    <img src=\"src/data/tests/testing.jpg\" />\n  ";
        var $elm = document.head.querySelector('img');
        var isLoaded = false, isError = false;
        imageLoaded_1.default($elm)
            .then(function () {
            isLoaded = true;
        })
            .catch(function (e) {
            isError = true;
        });
        dispatchEvent_1.default($elm, 'load');
        it('Should detect the image loading complete state', function () {
            setTimeout(function () {
                expect(isLoaded).toBe(true);
                expect(isError).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VMb2FkZWQudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlTG9hZGVkLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSwrREFBMkM7SUFDM0MsbUVBQStDO0lBRS9DLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtRQUNuQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxzREFFekIsQ0FBQztRQUNGLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELElBQUksUUFBUSxHQUFHLEtBQUssRUFDbEIsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVsQixxQkFBYSxDQUFDLElBQUksQ0FBQzthQUNoQixJQUFJLENBQUM7WUFDSixRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLENBQUM7WUFDUCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUwsdUJBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFOUIsRUFBRSxDQUFDLGdEQUFnRCxFQUFFO1lBQ25ELFVBQVUsQ0FBQztnQkFDVCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyJ9