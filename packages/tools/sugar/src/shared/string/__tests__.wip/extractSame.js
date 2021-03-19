"use strict";
module.exports = (__extractSame) => {
    describe('sugar.js.string.extractSame', () => {
        it('Should process the passed string correctly', (done) => {
            const res = __extractSame(`Hello world how are you?`, `Hello world it's me`, false);
            expect(res).toBe('Hello world ');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdFNhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRyYWN0U2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFFO0lBQ2pDLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7UUFDM0MsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDeEQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUN2QiwwQkFBMEIsRUFDMUIscUJBQXFCLEVBQ3JCLEtBQUssQ0FDTixDQUFDO1lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUVqQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==