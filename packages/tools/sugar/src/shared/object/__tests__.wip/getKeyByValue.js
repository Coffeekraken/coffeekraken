"use strict";
module.exports = (__geKeyByValue) => {
    describe('sugar.js.object.geKeyByValue', () => {
        it('Should find the correct key passing a value', done => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                    plop: 'youhou'
                },
                plop: {
                    array: [0, 1, 2]
                }
            };
            expect(__geKeyByValue(obj1.hello, 'hello world')).toBe('world');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0S2V5QnlWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEtleUJ5VmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxjQUFjLEVBQUUsRUFBRTtJQUVsQyxRQUFRLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1FBRTVDLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUV2RCxNQUFNLElBQUksR0FBRztnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDakI7YUFDRixDQUFDO1lBRUYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWhFLElBQUksRUFBRSxDQUFDO1FBRVQsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUdMLENBQUMsQ0FBQSJ9