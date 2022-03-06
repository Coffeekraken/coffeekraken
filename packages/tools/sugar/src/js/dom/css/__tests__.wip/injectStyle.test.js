"use strict";
var __injectStyle = require('../injectStyle');
describe('sugar.js.css.injectStyle', function () {
    it('Should inject the string style properly', function () {
        __injectStyle('a { color: red; }');
        expect(document.head.querySelector('style').innerHTML).toBe('a { color: red; }');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0U3R5bGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluamVjdFN0eWxlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRWhELFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtJQUVuQyxFQUFFLENBQUMseUNBQXlDLEVBQUU7UUFDNUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ25GLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMifQ==