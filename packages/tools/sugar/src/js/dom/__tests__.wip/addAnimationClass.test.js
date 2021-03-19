"use strict";
var __addAnimationClass = require('../addAnimationClass');
var __dispatchEvent = require('../dispatchEvent');
describe('sugar.js.dom.addAnimationClass', function () {
    document.body.innerHTML = "\n      <div id=\"testing\">Hello World</div>\n  ";
    var $elm = document.querySelector('#testing');
    it('Should add the animation class to the element', function () {
        __addAnimationClass($elm, 'test');
        expect($elm.className).toBe('test');
    });
    it('Should have the animation class on the elements after 0.5s', function (done) {
        setTimeout(function () {
            expect($elm.className).toBe('test');
            done();
        }, 500);
    });
    it('Should not have the animation class anymore on the elements after 1.2s', function (done) {
        __dispatchEvent($elm, 'animationend');
        setTimeout(function () {
            expect($elm.className).toBe('');
            done();
        }, 1000);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkQW5pbWF0aW9uQ2xhc3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZEFuaW1hdGlvbkNsYXNzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDNUQsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFcEQsUUFBUSxDQUFDLGdDQUFnQyxFQUFFO0lBRXpDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLG1EQUV6QixDQUFDO0lBQ0YsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxFQUFFLENBQUMsK0NBQStDLEVBQUU7UUFDbEQsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDREQUE0RCxFQUFFLFVBQUEsSUFBSTtRQUNuRSxVQUFVLENBQUM7WUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHdFQUF3RSxFQUFFLFVBQUEsSUFBSTtRQUMvRSxlQUFlLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3RDLFVBQVUsQ0FBQztZQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFJTCxDQUFDLENBQUMsQ0FBQyJ9