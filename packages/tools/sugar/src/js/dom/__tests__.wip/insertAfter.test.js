"use strict";
var __insertAfter = require('../insertAfter');
describe('sugar.js.dom.insertAfter', function () {
    document.body.innerHTML = "\n    <div id=\"testing\"></div>\n  ";
    var $elm = document.querySelector('#testing');
    var $add = document.createElement('a');
    __insertAfter($add, $elm);
    it('Should append the new element tag correctly', function () {
        expect($elm.nextSibling).toEqual($add);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0QWZ0ZXIudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluc2VydEFmdGVyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRWhELFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtJQUVuQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxzQ0FFekIsQ0FBQztJQUNGLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV6QyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTFCLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtRQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=