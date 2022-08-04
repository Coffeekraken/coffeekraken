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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFFMUIsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtRQUdwQyxFQUFFLENBQUMsNENBQTRDLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFFdEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyx5RkFBeUYsRUFBRSxFQUFFLEVBQUU7Z0JBQzNHLFVBQVUsRUFBRSxJQUFJO2FBQ2pCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1lBRXRELE1BQU0sQ0FBQyxNQUFNLENBQUMseUZBQXlGLEVBQUUsRUFBRSxFQUFFO2dCQUMzRyxVQUFVLEVBQUUsS0FBSztnQkFDakIsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQztZQUVsRCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==