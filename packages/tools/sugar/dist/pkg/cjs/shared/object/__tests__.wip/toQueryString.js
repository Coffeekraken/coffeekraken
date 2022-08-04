"use strict";
module.exports = (__toQueryString) => {
    describe('sugar.shared.object.toQueryString', () => {
        it('Should transformt the object into a correctly formatted query string', (done) => {
            const obj = {
                param1: 'hello',
                param2: 'world coco',
            };
            expect(__toQueryString(obj)).toBe('?param1=hello&param2=world%20coco');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7SUFDakMsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtRQUMvQyxFQUFFLENBQUMsc0VBQXNFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoRixNQUFNLEdBQUcsR0FBRztnQkFDUixNQUFNLEVBQUUsT0FBTztnQkFDZixNQUFNLEVBQUUsWUFBWTthQUN2QixDQUFDO1lBRUYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDN0IsbUNBQW1DLENBQ3RDLENBQUM7WUFFRixJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==