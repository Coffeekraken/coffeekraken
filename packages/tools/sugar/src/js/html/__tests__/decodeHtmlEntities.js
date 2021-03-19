"use strict";
module.exports = function (__decodeHtmlEntities) {
    describe('sugar.js.string.decodeHtmlEntities', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__decodeHtmlEntities('&#111;&#108;&#105;&#118;&#105;&#101;&#114;&#046;&#098;&#111;&#115;&#115;&#101;&#108;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;')).toBe('olivier.bossel@gmail.com');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2RlSHRtbEVudGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVjb2RlSHRtbEVudGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQUMsb0JBQW9CO0lBRXBDLFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRTtRQUc3QyxFQUFFLENBQUMsNENBQTRDLEVBQUUsVUFBQSxJQUFJO1lBRW5ELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxrSkFBa0osQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFFbE4sSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=