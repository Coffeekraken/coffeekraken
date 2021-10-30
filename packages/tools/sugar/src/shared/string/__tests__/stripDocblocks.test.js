import __stripDocblocks from '../stripDocblocks';
describe('sugar.shared.string.stripDocblocks', () => {
    it('Should remove all docblocks correctly', () => {
        const txt = `
            /**
             * @name            something
             * 
             * Hello world
             * 
             * @param       {String}            something           Hello world
             * 
             * @since       2.0.0
              * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */

            Hello world
        
        `;
        const res = __stripDocblocks(txt);
        expect(res.match(/\/\*\*/)).toBeNull();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBEb2NibG9ja3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0cmlwRG9jYmxvY2tzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZ0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxRQUFRLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFO0lBQ2hELEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7UUFDN0MsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs7Ozs7Ozs7O1NBY1gsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9