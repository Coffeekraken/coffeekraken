"use strict";
module.exports = (__columns) => {
    describe('sugar.node.terminal.columns', () => {
        it('Should generate the columns correctly', () => {
            process.stdout.columns = 30;
            expect(__columns([
                'Hello world',
                'How are you?'
            ])).toBe(`Hello wor      How are y
ld             ou?      `);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbHVtbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRTtJQUU3QixRQUFRLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO1FBRTNDLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7WUFFL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBRTVCLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ2YsYUFBYTtnQkFDYixjQUFjO2FBQ2YsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3lCQUNVLENBQUMsQ0FBQztRQUd2QixDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=