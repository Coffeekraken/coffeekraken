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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRFdmVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0RXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBRTtJQUVoQyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1FBRTFDLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUV0RCxNQUFNLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDN0QsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSzthQUNOLENBQUMsQ0FBQztZQUVILElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9