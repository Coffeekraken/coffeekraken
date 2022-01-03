// @ts-nocheck
function whenOutOfViewport(elm, settings = {}) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({ offset: '10px' }, settings);
        let isInViewport = false;
        const _cb = () => {
            if (!isInViewport) {
                observer.disconnect();
                resolve(elm);
            }
        };
        const observer = new IntersectionObserver((entries, observer) => {
            if (!entries.length)
                return;
            const entry = entries[0];
            if (entry.intersectionRatio > 0) {
                isInViewport = true;
            }
            else {
                isInViewport = false;
            }
            _cb();
        }, {
            root: null,
            rootMargin: settings.offset,
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        });
        observer.observe(elm);
    });
}
export default whenOutOfViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbk91dE9mVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuT3V0T2ZWaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBMkNkLFNBQVMsaUJBQWlCLENBQ3RCLEdBQWdCLEVBQ2hCLFdBQWdELEVBQUU7SUFFbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxRQUFRLG1CQUNKLE1BQU0sRUFBRSxNQUFNLElBQ1gsUUFBUSxDQUNkLENBQUM7UUFFRixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekIsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQ3JDLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFBRSxPQUFPO1lBQzVCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUN4QjtZQUNELEdBQUcsRUFBRSxDQUFDO1FBQ1YsQ0FBQyxFQUNEO1lBQ0ksSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDM0IsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNqRSxDQUNKLENBQUM7UUFFRixRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsaUJBQWlCLENBQUMifQ==