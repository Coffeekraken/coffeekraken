"use strict";
module.exports = (__decodeHtmlEntities) => {
    describe('sugar.js.string.decodeHtmlEntities', () => {
        it('Should process the passed string correctly', done => {
            expect(__decodeHtmlEntities('&#111;&#108;&#105;&#118;&#105;&#101;&#114;&#046;&#098;&#111;&#115;&#115;&#101;&#108;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;')).toBe('olivier.bossel@gmail.com');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2RlSHRtbEVudGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVjb2RlSHRtbEVudGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsRUFBRTtJQUV4QyxRQUFRLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFO1FBR2xELEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUV0RCxNQUFNLENBQUMsb0JBQW9CLENBQUMsa0pBQWtKLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBRWxOLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9