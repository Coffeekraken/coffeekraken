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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmNsdWRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFO0lBRTlCLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7UUFHeEMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBRXRELE1BQU0sQ0FBQyxVQUFVLENBQUMsb0VBQW9FLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDdkgsV0FBVztnQkFDWCxPQUFPO2FBQ1IsQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=