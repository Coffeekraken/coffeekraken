"use strict";
var __appendScriptTag = require('../appendScriptTag');
describe('sugar.js.dom.appendScriptTag', function () {
    __appendScriptTag('hello.js');
    it('Should append the script tag correctly', function () {
        var $elm = document.querySelector('script');
        expect(typeof $elm).toBe('object');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU2NyaXB0VGFnLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBlbmRTY3JpcHRUYWcudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUV4RCxRQUFRLENBQUMsOEJBQThCLEVBQUU7SUFFdkMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFOUIsRUFBRSxDQUFDLHdDQUF3QyxFQUFFO1FBRTNDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXJDLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMifQ==