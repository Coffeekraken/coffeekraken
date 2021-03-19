var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../dataset"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dataset_1 = __importDefault(require("../dataset"));
    describe('sugar.js.dom.dataset', function () {
        document.body.innerHTML = "\n      <div id=\"testing\" data-coco=\"hello\"></div>\n      <div id=\"testing1\" data-plop=\"{hello:'coco'}\"></div>\n      \n  ";
        var $testing = document.querySelector('#testing');
        var $testing1 = document.querySelector('#testing1');
        dataset_1.default($testing1, 'json', {
            hello: 'world'
        });
        it('Should get correctly the data-coco value from the attributes', function () {
            expect(dataset_1.default($testing, 'coco')).toBe('hello');
        });
        it('Should get correctly the data "json" value from the dataset stack', function () {
            expect(dataset_1.default($testing1, 'json')).toEqual({
                hello: 'world'
            });
        });
        it('Should get correctly the data "plop" value from the attributes', function () {
            expect(dataset_1.default($testing1, 'plop')).toEqual({
                hello: 'coco'
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YXNldC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsdURBQW1DO0lBRW5DLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUUvQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxvSUFJekIsQ0FBQztRQUNGLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV0RCxpQkFBUyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUU7WUFDM0IsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsOERBQThELEVBQUU7WUFDakUsTUFBTSxDQUFDLGlCQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1FQUFtRSxFQUFFO1lBQ3RFLE1BQU0sQ0FBQyxpQkFBUyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDM0MsS0FBSyxFQUFFLE9BQU87YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRTtZQUNuRSxNQUFNLENBQUMsaUJBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzNDLEtBQUssRUFBRSxNQUFNO2FBQ2QsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQyJ9