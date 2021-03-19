var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../observeMutations"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var observeMutations_1 = __importDefault(require("../observeMutations"));
    describe('sugar.js.dom.observeMutations', function () {
        document.body.innerHTML = "\n      <div id=\"testing\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        var mutationsCount = 0;
        observeMutations_1.default($elm).then(function (mutation) {
            if (mutation.attributeName === 'plop' ||
                mutation.attributeName === 'hello') {
                mutationsCount++;
            }
        });
        $elm.setAttribute('plop', 'coco');
        $elm.setAttribute('hello', 'world');
        it('Should have detect all the mutations done on the $elm', function () {
            setTimeout(function () {
                expect(mutationsCount).toBe(2);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZU11dGF0aW9ucy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2JzZXJ2ZU11dGF0aW9ucy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEseUVBQXFEO0lBRXJELFFBQVEsQ0FBQywrQkFBK0IsRUFBRTtRQUN4QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxnREFHekIsQ0FBQztRQUNGLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLDBCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7WUFDckMsSUFDRSxRQUFRLENBQUMsYUFBYSxLQUFLLE1BQU07Z0JBQ2pDLFFBQVEsQ0FBQyxhQUFhLEtBQUssT0FBTyxFQUNsQztnQkFDQSxjQUFjLEVBQUUsQ0FBQzthQUNsQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFcEMsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO1lBQzFELFVBQVUsQ0FBQztnQkFDVCxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyJ9