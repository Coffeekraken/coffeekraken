// @ts-nocheck
export default function __viewportEvents($elm, settings) {
    let observer, status = 'out';
    if ($elm._viewportEventsInited) {
        return $elm;
    }
    $elm._viewportEventsInited = true;
    settings = Object.assign({ offset: '25px', once: false }, (settings !== null && settings !== void 0 ? settings : {}));
    observer = new IntersectionObserver((entries, observer) => {
        if (!entries.length)
            return;
        const entry = entries.pop();
        if (entry.intersectionRatio > 0) {
            if (status === 'in') {
                return;
            }
            status = 'in';
            $elm.dispatchEvent(new CustomEvent('viewport.in', {
                bubbles: true,
            }));
            if (settings === null || settings === void 0 ? void 0 : settings.once) {
                observer.disconnect();
            }
        }
        else {
            if (status === 'out') {
                return;
            }
            status = 'out';
            $elm.dispatchEvent(new CustomEvent('viewport.out', {
                bubbles: true,
            }));
        }
    }, {
        root: null,
        rootMargin: settings.offset,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    });
    observer.observe($elm);
    return $elm;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUEyQ2QsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FDcEMsSUFBaUIsRUFDakIsUUFBMkM7SUFFM0MsSUFBSSxRQUFRLEVBQ1IsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUVuQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtRQUM1QixPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztJQUVsQyxRQUFRLG1CQUNKLE1BQU0sRUFBRSxNQUFNLEVBQ2QsSUFBSSxFQUFFLEtBQUssSUFDUixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQy9CLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtZQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE9BQU87YUFDVjtZQUNELE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUNkLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRTtnQkFDM0IsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUNMLENBQUM7WUFDRixJQUFJLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLEVBQUU7Z0JBQ2hCLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUN6QjtTQUNKO2FBQU07WUFDSCxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7Z0JBQ2xCLE9BQU87YUFDVjtZQUNELE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDZixJQUFJLENBQUMsYUFBYSxDQUNkLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRTtnQkFDNUIsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUNMLENBQUM7U0FDTDtJQUNMLENBQUMsRUFDRDtRQUNJLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNO1FBQzNCLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDakUsQ0FDSixDQUFDO0lBRUYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV2QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=