"use strict";
module.exports = (__extractValues) => {
    describe('sugar.js.object.extractValues', () => {
        it('Should extract correctly the values from an array ob objects', (done) => {
            const array = [
                {
                    hello: 'world',
                    plop: 'wijwoeijfewf'
                },
                {
                    hello: 'something',
                    plop: 'wijfjjfjfjf'
                },
                {
                    plop: 'something else'
                }
            ];
            expect(__extractValues(array, 'hello')).toEqual(['world', 'something']);
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdFZhbHVlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RWYWx1ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRTtJQUNuQyxRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO1FBQzdDLEVBQUUsQ0FBQyw4REFBOEQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFFLE1BQU0sS0FBSyxHQUFHO2dCQUNaO29CQUNFLEtBQUssRUFBRSxPQUFPO29CQUNkLElBQUksRUFBRSxjQUFjO2lCQUNyQjtnQkFDRDtvQkFDRSxLQUFLLEVBQUUsV0FBVztvQkFDbEIsSUFBSSxFQUFFLGFBQWE7aUJBQ3BCO2dCQUNEO29CQUNFLElBQUksRUFBRSxnQkFBZ0I7aUJBQ3ZCO2FBQ0YsQ0FBQztZQUVGLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFeEUsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=