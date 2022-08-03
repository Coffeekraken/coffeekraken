import __stripSourcemap from '../stripSourcemap';
describe('sugar.shared.string.stripSourcemap', () => {
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
              * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */

            Hello world
        
            //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzQnVpbGRlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZXNCdWlsZGVyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxrQ0FBa0M7UUFFeEM7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSw2QkFBNkI7UUFFcEM7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSw4QkFBOEI7UUFFdEM7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxFQUFFO1FBRVg7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxJQUFJO1FBRVg7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxJQUFJO1FBRVo7Ozs7Ozs7Ozs7V0FVRztRQUNILFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbEI7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxJQUFJO1FBRVg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBb0JHO1FBQ0gsY0FBYyxFQUFFLEVBQUU7S0FDckIsQ0FBQztBQUNOLENBQUMifQ==</olivier.bossel@gmail.com></string,></olivier.bossel@gmail.com></olivier.bossel@gmail.com></integer></olivier.bossel@gmail.com></olivier.bossel@gmail.com></olivier.bossel@gmail.com></olivier.bossel@gmail.com></olivier.bossel@gmail.com></olivier.bossel@gmail.com></olivier.bossel@gmail.com>

        `;
        const res = __stripSourcemap(txt);
        expect(res.match(/\/\/ sourceMappingURL=/)).toBeNull();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsUUFBUSxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsRUFBRTtJQUNoRCxFQUFFLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO1FBQzdDLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O1NBZ0JYLENBQUM7UUFFRixNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9