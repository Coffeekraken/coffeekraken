var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../backgroundImageLoaded", "../dispatchEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var backgroundImageLoaded_1 = __importDefault(require("../backgroundImageLoaded"));
    var dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
    describe('sugar.js.dom.backgroundImageLoaded', function () {
        document.body.innerHTML = "\n    <style>\n      .testing {\n        background-image: url('/test.jpg');\n      }\n    </style>\n    <div id=\"testing\" class=\"testing\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        var isLoaded = false, isError = false;
        var promise = backgroundImageLoaded_1.default($elm)
            .then(function () {
            isLoaded = true;
        })
            .catch(function (e) {
            isError = true;
        });
        dispatchEvent_1.default(promise.__$img, 'load');
        it('Should detect the background image loading complete state', function () {
            setTimeout(function () {
                expect(isLoaded).toBe(true);
                expect(isError).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZEltYWdlTG9hZGVkLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWNrZ3JvdW5kSW1hZ2VMb2FkZWQudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLG1GQUErRDtJQUMvRCxtRUFBK0M7SUFFL0MsUUFBUSxDQUFDLG9DQUFvQyxFQUFFO1FBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLDJKQU96QixDQUFDO1FBQ0YsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVoRCxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQ2xCLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFbEIsSUFBTSxPQUFPLEdBQUcsK0JBQXVCLENBQUMsSUFBSSxDQUFDO2FBQzFDLElBQUksQ0FBQztZQUNKLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDbEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsQ0FBQztZQUNQLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFFTCx1QkFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFeEMsRUFBRSxDQUFDLDJEQUEyRCxFQUFFO1lBQzlELFVBQVUsQ0FBQztnQkFDVCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyJ9