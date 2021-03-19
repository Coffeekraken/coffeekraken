"use strict";
var __inViewportPercentage = require('../inViewportPercentage');
describe('sugar.js.dom.inViewportPercentage', function () {
    document.body.innerHTML = "\n    <style>\n      #testing {\n        display: block;\n        width: 100px; height: 100px;\n        background: red;\n        position: absolute;\n        top:0; left: -50px;\n      }\n    </style>\n    <div id=\"testing\"></div>\n  ";
    var $elm = document.querySelector('#testing');
    $elm.getBoundingClientRect = jest.fn(function () { return ({
        x: -50,
        y: 0,
        width: 100,
        height: 100,
        top: 0,
        right: 50,
        bottom: 100,
        left: -50,
    }); });
    var percentage = __inViewportPercentage($elm);
    it('Should get the percentage in the viewport correctly', function () {
        expect(percentage).toBe(50);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFBlcmNlbnRhZ2UudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluVmlld3BvcnRQZXJjZW50YWdlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFFbEUsUUFBUSxDQUFDLG1DQUFtQyxFQUFFO0lBRTVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLCtPQVd6QixDQUFDO0lBQ0YsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFNLE9BQUEsQ0FBQztRQUMxQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ04sQ0FBQyxFQUFFLENBQUM7UUFDSixLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUM7UUFDTixLQUFLLEVBQUUsRUFBRTtRQUNULE1BQU0sRUFBRSxHQUFHO1FBQ1gsSUFBSSxFQUFFLENBQUMsRUFBRTtLQUNWLENBQUMsRUFUeUMsQ0FTekMsQ0FBQyxDQUFDO0lBRUosSUFBTSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFaEQsRUFBRSxDQUFDLHFEQUFxRCxFQUFFO1FBQ3hELE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyJ9