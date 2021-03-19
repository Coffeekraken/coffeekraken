"use strict";
module.exports = (__replaceTokens) => {
    describe('sugar.js.string.replaceTokens', () => {
        it('Should replace tokens correctly', (done) => {
            const string = __replaceTokens('hello [world] how [are] you?', {
                world: 'coco',
                are: 'plop'
            });
            expect(string).toBe('hello coco how plop you?');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcGxhY2VUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRTtJQUNuQyxRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO1FBQzdDLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdDLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyw4QkFBOEIsRUFBRTtnQkFDN0QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsR0FBRyxFQUFFLE1BQU07YUFDWixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFFaEQsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=