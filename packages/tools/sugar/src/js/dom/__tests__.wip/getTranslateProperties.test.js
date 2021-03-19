var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../getTranslateProperties"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getTranslateProperties_1 = __importDefault(require("../getTranslateProperties"));
    describe('sugar.js.dom.getTranslateProperties', function () {
        document.body.innerHTML = "\n    <style>\n      #testing-matrix {\n        transform: matrix(1.00,0.00,0.00,1.00,10,20);\n      }\n      #testing-matrix3d {\n        transform: matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,10,20,30,1);\n      }\n      #testing-translate3d {\n        transform: translate3d(12px, 50%, 3em);\n      }\n      #testing-translate {\n        transform: translate(20px, 2rem);\n      }\n      #testing-default {\n        transform: translateX(3rem) translateY(10px) translateZ(20%);\n      }\n      </style>\n      <div id=\"testing-matrix\">\n      </div>\n      <div id=\"testing-matrix3d\">\n      </div>\n      <div id=\"testing-translate3d\">\n      </div>\n      <div id=\"testing-translate\">\n      </div>\n      <div id=\"testing-default\">\n      </div>\n  ";
        var $elmMatrix = document.querySelector('#testing-matrix');
        var $elmMatrix3d = document.querySelector('#testing-matrix3d');
        var $elmtranslate3d = document.querySelector('#testing-translate3d');
        var $elmTranslate = document.querySelector('#testing-translate');
        var $elmDefault = document.querySelector('#testing-default');
        it('Should get the translate properties from a matrix css declaration', function () {
            var translate = getTranslateProperties_1.default($elmMatrix);
            expect(translate).toEqual({
                x: 10,
                y: 20,
                z: 0
            });
        });
        it('Should get the translate properties from a matrix3d css declaration', function () {
            var translate = getTranslateProperties_1.default($elmMatrix3d);
            expect(translate).toEqual({
                x: 10,
                y: 20,
                z: 30
            });
        });
        it('Should get the translate properties from a translate3d css declaration', function () {
            var translate = getTranslateProperties_1.default($elmtranslate3d);
            expect(translate).toEqual({
                x: 12,
                y: '50%',
                z: 48
            });
        });
        it('Should get the translate properties from a translate css declaration', function () {
            var translate = getTranslateProperties_1.default($elmTranslate);
            expect(translate).toEqual({
                x: 20,
                y: 32,
                z: 0
            });
        });
        it('Should get the translate properties from a default translateX, translateY and translateZ css declaration', function () {
            var translate = getTranslateProperties_1.default($elmDefault);
            expect(translate).toEqual({
                x: 48,
                y: 10,
                z: '20%'
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNsYXRlUHJvcGVydGllcy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0VHJhbnNsYXRlUHJvcGVydGllcy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEscUZBQWlFO0lBRWpFLFFBQVEsQ0FBQyxxQ0FBcUMsRUFBRTtRQUU5QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyw2dkJBNEJ6QixDQUFDO1FBQ0YsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzdELElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqRSxJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdkUsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ25FLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUUvRCxFQUFFLENBQUMsbUVBQW1FLEVBQUU7WUFDdEUsSUFBTSxTQUFTLEdBQUcsZ0NBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDeEIsQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsQ0FBQyxFQUFFLENBQUM7YUFDTCxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxxRUFBcUUsRUFBRTtZQUN4RSxJQUFNLFNBQVMsR0FBRyxnQ0FBd0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN4QixDQUFDLEVBQUUsRUFBRTtnQkFDTCxDQUFDLEVBQUUsRUFBRTtnQkFDTCxDQUFDLEVBQUUsRUFBRTthQUNOLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHdFQUF3RSxFQUFFO1lBQzNFLElBQU0sU0FBUyxHQUFHLGdDQUF3QixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLENBQUMsRUFBRSxFQUFFO2dCQUNMLENBQUMsRUFBRSxLQUFLO2dCQUNSLENBQUMsRUFBRSxFQUFFO2FBQ04sQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsc0VBQXNFLEVBQUU7WUFDekUsSUFBTSxTQUFTLEdBQUcsZ0NBQXdCLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDeEIsQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsQ0FBQyxFQUFFLENBQUM7YUFDTCxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywwR0FBMEcsRUFBRTtZQUM3RyxJQUFNLFNBQVMsR0FBRyxnQ0FBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN4QixDQUFDLEVBQUUsRUFBRTtnQkFDTCxDQUFDLEVBQUUsRUFBRTtnQkFDTCxDQUFDLEVBQUUsS0FBSzthQUNULENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUMifQ==