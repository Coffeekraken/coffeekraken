// @ts-nocheck
import __inViewport from 'in-viewport';
function whenInViewport(elm, settings = {}) {
    settings = Object.assign({ offset: 50 }, settings);
    return new Promise((resolve, reject) => {
        __inViewport(elm, {
            offset: settings.offset
        }, () => {
            resolve(elm);
        });
    });
}
export default whenInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkluVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuSW5WaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBd0N2QyxTQUFTLGNBQWMsQ0FBQyxHQUFnQixFQUFFLFdBQThDLEVBQUU7SUFFeEYsUUFBUSxtQkFDTixNQUFNLEVBQUUsRUFBRSxJQUNQLFFBQVEsQ0FDWixDQUFDO0lBRUYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxZQUFZLENBQ1YsR0FBRyxFQUNIO1lBQ0UsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO1NBQ3hCLEVBQ0QsR0FBRyxFQUFFO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxlQUFlLGNBQWMsQ0FBQyJ9