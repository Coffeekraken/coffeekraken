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
            $elm.dispatchEvent(new CustomEvent('viewport.enter', {
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
            $elm.dispatchEvent(new CustomEvent('viewport.exit', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUEyQ2QsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FDcEMsSUFBaUIsRUFDakIsUUFBMkM7SUFFM0MsSUFBSSxRQUFRLEVBQ1IsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUVuQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtRQUM1QixPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztJQUVsQyxRQUFRLG1CQUNKLE1BQU0sRUFBRSxNQUFNLEVBQ2QsSUFBSSxFQUFFLEtBQUssSUFDUixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQy9CLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtZQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE9BQU87YUFDVjtZQUNELE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUNkLElBQUksV0FBVyxDQUFDLGdCQUFnQixFQUFFO2dCQUM5QixPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQ0wsQ0FBQztZQUNGLElBQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksRUFBRTtnQkFDaEIsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3pCO1NBQ0o7YUFBTTtZQUNILElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtnQkFDbEIsT0FBTzthQUNWO1lBQ0QsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNmLElBQUksQ0FBQyxhQUFhLENBQ2QsSUFBSSxXQUFXLENBQUMsZUFBZSxFQUFFO2dCQUM3QixPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQ0wsQ0FBQztTQUNMO0lBQ0wsQ0FBQyxFQUNEO1FBQ0ksSUFBSSxFQUFFLElBQUk7UUFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU07UUFDM0IsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUNqRSxDQUNKLENBQUM7SUFFRixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXZCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==