"use strict";
module.exports = (__toQueryString) => {
    describe('sugar.js.object.toQueryString', () => {
        it('Should transformt the object into a correctly formatted query string', done => {
            const obj = {
                param1: 'hello',
                param2: 'world coco'
            };
            expect(__toQueryString(obj)).toBe('?param1=hello&param2=world%20coco');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9RdWVyeVN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvUXVlcnlTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRTtJQUVuQyxRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO1FBRTdDLEVBQUUsQ0FBQyxzRUFBc0UsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUVoRixNQUFNLEdBQUcsR0FBRztnQkFDVixNQUFNLEVBQUUsT0FBTztnQkFDZixNQUFNLEVBQUUsWUFBWTthQUNyQixDQUFBO1lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBRXZFLElBQUksRUFBRSxDQUFDO1FBRVQsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUdMLENBQUMsQ0FBQSJ9