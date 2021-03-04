"use strict";
module.exports = function (__replaceTags) {
    describe('sugar.js.html.replaceTags', function () {
        var html = "\n  <div>\n    <bold>Hello world</bold>\n    <h1>\n      How are you?\n    </h1>\n  </div>\n";
        var res = __replaceTags(html, {
            bold: function (tag, content) { return "<yop>" + content + "</yop>"; },
            h1: function (tag, content) { return content; }
        });
        it('Should have replace the tags correctly', function () {
            expect(res.replace(/\s/g, '')).toBe("\n<div>\n<yop>Hello world</yop>\n\n  How are you?\n\n</div>\n".replace(/\s/g, ''));
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBsYWNlVGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFDLGFBQWE7SUFFN0IsUUFBUSxDQUFDLDJCQUEyQixFQUFFO1FBRXBDLElBQU0sSUFBSSxHQUFHLDhGQU9oQixDQUFDO1FBRUUsSUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRTtZQUM5QixJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsVUFBUSxPQUFPLFdBQVEsRUFBdkIsQ0FBdUI7WUFDL0MsRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLE9BQU8sRUFBUCxDQUFPO1NBQzlCLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtZQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsK0RBT3pDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==