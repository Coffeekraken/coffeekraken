var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../scriptLoaded"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var scriptLoaded_1 = __importDefault(require("../scriptLoaded"));
    describe('sugar.js.dom.scriptLoaded', function () {
        document.head.innerHTML = "\n    <script type=\"text/javascript\" src=\"src/data/tests/testing.js\"></script>\n  ";
        var $elm = document.head.querySelector('script');
        var isLoaded = false, isError = false;
        scriptLoaded_1.default($elm)
            .then(function () {
            isLoaded = true;
        })
            .catch(function (e) {
            isError = true;
        });
        it('Should detect the script loading complete state', function () {
            $elm.onload();
            setTimeout(function () {
                expect(isLoaded).toBe(true);
                expect(isError).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0TG9hZGVkLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JpcHRMb2FkZWQudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLGlFQUE2QztJQUc3QyxRQUFRLENBQUMsMkJBQTJCLEVBQUU7UUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsd0ZBRXpCLENBQUM7UUFDRixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuRCxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQ2xCLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFbEIsc0JBQWMsQ0FBQyxJQUFJLENBQUM7YUFDakIsSUFBSSxDQUFDO1lBQ0osUUFBUSxHQUFHLElBQUksQ0FBQztRQUNsQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxDQUFDO1lBQ1AsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVMLEVBQUUsQ0FBQyxpREFBaUQsRUFBRTtZQUNwRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxVQUFVLENBQUM7Z0JBQ1QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUMifQ==