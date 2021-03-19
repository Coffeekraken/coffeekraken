"use strict";
module.exports = (__crop) => {
    describe('sugar.js.string.crop', () => {
        it('Should process the passed string correctly', done => {
            expect(__crop("<span>Lorem Ipsum is</span> simply dummy text of the printing and typesetting industry.", 28, {
                splitWords: true
            })).toBe('<span>Lorem Ipsum is</span> simply dum...');
            expect(__crop("<span>Lorem Ipsum is</span> simply dummy text of the printing and typesetting industry.", 28, {
                splitWords: false,
                chars: '_-_'
            })).toBe('<span>Lorem Ipsum is</span> simply_-_');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUUxQixRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO1FBR3BDLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUV0RCxNQUFNLENBQUMsTUFBTSxDQUFDLHlGQUF5RixFQUFFLEVBQUUsRUFBRTtnQkFDM0csVUFBVSxFQUFFLElBQUk7YUFDakIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7WUFFdEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyx5RkFBeUYsRUFBRSxFQUFFLEVBQUU7Z0JBQzNHLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixLQUFLLEVBQUUsS0FBSzthQUNiLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBRWxELElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9