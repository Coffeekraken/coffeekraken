// @ts-nocheck
function whenInViewport(elm, settings = {}) {
    settings = Object.assign({ offset: 50 }, settings);
    return new Promise((resolve) => {
        const options = {
            root: null,
            rootMargin: `${settings.offset}px`,
            threshold: 1.0 // visible amount of item shown in relation to root
        };
        function onChange(changes, observer) {
            changes.forEach(change => {
                if (change.intersectionRatio > 0) {
                    // your observer logic
                    observer.disconnect();
                    resolve(elm);
                }
            });
        }
        const observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
    });
}
export default whenInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkluVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuSW5WaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBd0NkLFNBQVMsY0FBYyxDQUFDLEdBQWdCLEVBQUUsV0FBOEMsRUFBRTtJQUV4RixRQUFRLG1CQUNOLE1BQU0sRUFBRSxFQUFFLElBQ1AsUUFBUSxDQUNaLENBQUM7SUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFFN0IsTUFBTSxPQUFPLEdBQUc7WUFDZCxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUk7WUFDbEMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxtREFBbUQ7U0FDbkUsQ0FBQztRQUVGLFNBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRO1lBQ2pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksTUFBTSxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtvQkFDOUIsc0JBQXNCO29CQUN0QixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEI7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU3RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXhCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsY0FBYyxDQUFDIn0=