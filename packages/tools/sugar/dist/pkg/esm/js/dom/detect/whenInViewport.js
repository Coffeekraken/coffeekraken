// @ts-nocheck
export default function whenInViewport(elm, settings = {}) {
    settings = Object.assign({ offset: '10px' }, settings);
    return new Promise((resolve) => {
        const options = {
            root: null,
            rootMargin: settings.offset,
            threshold: 1.0, // visible amount of item shown in relation to root
        };
        function onChange(changes, observer) {
            changes.forEach((change) => {
                var _a;
                if (change.intersectionRatio > 0) {
                    // your observer logic
                    (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                    resolve(elm);
                }
            });
        }
        const observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFxQ2QsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQ2xDLEdBQWdCLEVBQ2hCLFdBQThDLEVBQUU7SUFFaEQsUUFBUSxtQkFDSixNQUFNLEVBQUUsTUFBTSxJQUNYLFFBQVEsQ0FDZCxDQUFDO0lBRUYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzNCLE1BQU0sT0FBTyxHQUFHO1lBQ1osSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDM0IsU0FBUyxFQUFFLEdBQUcsRUFBRSxtREFBbUQ7U0FDdEUsQ0FBQztRQUVGLFNBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRO1lBQy9CLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7Z0JBQ3ZCLElBQUksTUFBTSxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtvQkFDOUIsc0JBQXNCO29CQUN0QixNQUFBLFFBQVEsQ0FBQyxVQUFVLHdEQUFJLENBQUM7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEI7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU3RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9