"use strict";
module.exports = function (__toString) {
    describe('sugar.js.html.toString', function () {
        var html = "\n  <div>\n    <bold>Hello world</bold>\n    <h1>\n      How are you?\n    </h1>\n  </div>\n";
        document.body.innerHTML = html;
        var $elm = document.querySelector('bold');
        var res = __toString($elm);
        it('Should have transform the dom element to a string correctly', function () {
            expect(res).toBe('<bold>Hello world</bold>');
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFDLFVBQVU7SUFFMUIsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1FBRWpDLElBQU0sSUFBSSxHQUFHLDhGQU9oQixDQUFDO1FBQ0UsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRS9CLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUMsSUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdCLEVBQUUsQ0FBQyw2REFBNkQsRUFBRTtZQUNoRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9