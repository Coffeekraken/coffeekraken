// @ts-nocheck
export default function __whenOutOfViewport(elm, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFxQ2QsTUFBTSxDQUFDLE9BQU8sVUFBVSxtQkFBbUIsQ0FDdkMsR0FBZ0IsRUFDaEIsV0FBZ0QsRUFBRTtJQUVsRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsbUJBQ0osTUFBTSxFQUFFLE1BQU0sSUFDWCxRQUFRLENBQ2QsQ0FBQztRQUVGLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDYixJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNmLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FDckMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUFFLE9BQU87WUFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtnQkFDN0IsWUFBWSxHQUFHLElBQUksQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1lBQ0QsR0FBRyxFQUFFLENBQUM7UUFDVixDQUFDLEVBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTTtZQUMzQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ2pFLENBQ0osQ0FBQztRQUVGLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=