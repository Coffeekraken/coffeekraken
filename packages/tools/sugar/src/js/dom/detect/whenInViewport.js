// @ts-nocheck
function whenInViewport(elm, settings = {}) {
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
export default whenInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkluVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuSW5WaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBeUNkLFNBQVMsY0FBYyxDQUNuQixHQUFnQixFQUNoQixXQUE4QyxFQUFFO0lBRWhELFFBQVEsbUJBQ0osTUFBTSxFQUFFLE1BQU0sSUFDWCxRQUFRLENBQ2QsQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMzQixNQUFNLE9BQU8sR0FBRztZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNO1lBQzNCLFNBQVMsRUFBRSxHQUFHLEVBQUUsbURBQW1EO1NBQ3RFLENBQUM7UUFFRixTQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUTtZQUMvQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7O2dCQUN2QixJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7b0JBQzlCLHNCQUFzQjtvQkFDdEIsTUFBQSxRQUFRLENBQUMsVUFBVSwrQ0FBbkIsUUFBUSxDQUFlLENBQUM7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEI7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU3RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsY0FBYyxDQUFDIn0=