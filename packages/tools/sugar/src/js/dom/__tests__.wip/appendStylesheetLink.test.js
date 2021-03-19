"use strict";
var __appendStylesheetLink = require('../appendStylesheetLink');
describe('sugar.js.dom.appendStylesheetLink', function () {
    __appendStylesheetLink('hello.css');
    it('Should append the style link correctly', function () {
        var $elm = document.querySelector('style');
        expect(typeof $elm).toBe('object');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU3R5bGVzaGVldExpbmsudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcGVuZFN0eWxlc2hlZXRMaW5rLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFFbEUsUUFBUSxDQUFDLG1DQUFtQyxFQUFFO0lBRTVDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXBDLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtRQUUzQyxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVyQyxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=