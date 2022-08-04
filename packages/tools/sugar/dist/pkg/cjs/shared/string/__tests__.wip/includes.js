"use strict";
module.exports = (__includes) => {
    describe('sugar.js.string.includes', () => {
        it('Should process the passed string correctly', done => {
            expect(__includes("something wfijweoifjw fwoj foijwef hello ifwjefoiw world wifjweoif", 'something,world,coco')).toEqual([
                'something',
                'world'
            ]);
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUU7SUFFOUIsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtRQUd4QyxFQUFFLENBQUMsNENBQTRDLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFFdEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxvRUFBb0UsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN2SCxXQUFXO2dCQUNYLE9BQU87YUFDUixDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==