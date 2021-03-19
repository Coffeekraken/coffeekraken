"use strict";
module.exports = (__sprintf) => {
    describe('sugar.js.string.sprintf', () => {
        it('Should process the passed string correctly', done => {
            const res1 = __sprintf('Hello %s', 'world'); // => Hello world
            const res2 = __sprintf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
            const res4 = __sprintf('Hello %(first)s, I\'m %(name)s', { first: 'world', name: 'John Doe' }); // Hello world, I'm John Doe
            expect(res1).toBe('Hello world');
            expect(res2).toBe("Hello world, I'm John Doe");
            expect(res4).toBe("Hello world, I'm John Doe");
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaW50Zi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwcmludGYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRTtJQUU3QixRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO1FBRXZDLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUV0RCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsaUJBQWlCO1lBQzlELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7WUFDOUYsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtZQUc1SCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFHL0MsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=