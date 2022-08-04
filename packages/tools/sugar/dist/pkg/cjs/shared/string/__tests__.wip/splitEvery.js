"use strict";
module.exports = (__splitEvery) => {
    describe('sugar.js.string.splitEvery', () => {
        it('Should process the passed string correctly', done => {
            expect(__splitEvery('aaaaaaaaaaaaaaaaaaaaa', 3, true)).toEqual([
                'aaa',
                'aaa',
                'aaa',
                'aaa',
                'aaa',
                'aaa',
                'aaa',
            ]);
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUU7SUFFaEMsUUFBUSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtRQUUxQyxFQUFFLENBQUMsNENBQTRDLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFFdEQsTUFBTSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzdELEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7YUFDTixDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==