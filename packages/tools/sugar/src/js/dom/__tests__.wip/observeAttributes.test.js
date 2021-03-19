"use strict";
var __observeAttributes = require('../observeAttributes');
describe('sugar.js.dom.observeAttributes', function () {
    document.body.innerHTML = "\n    <div id=\"testing\"></div>\n  ";
    var $elm = document.querySelector('#testing');
    var isMutated = false;
    __observeAttributes($elm).then(function (mutation) {
        isMutated = true;
    });
    $elm.setAttribute('hello', 'world');
    it('Should observe the attributes updates correctly', function () {
        setTimeout(function () {
            expect(isMutated).toBe(true);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZUF0dHJpYnV0ZXMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9ic2VydmVBdHRyaWJ1dGVzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFNUQsUUFBUSxDQUFDLGdDQUFnQyxFQUFFO0lBQ3pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLHNDQUV6QixDQUFDO0lBQ0YsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFdEIsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtRQUN0QyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFcEMsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO1FBQ3BELFVBQVUsQ0FBQztZQUNULE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=