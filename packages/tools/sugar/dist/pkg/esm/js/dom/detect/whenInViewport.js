// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import { __uniqid } from '@coffeekraken/sugar/string';
export default function __whenInViewport($elm, settings = {}) {
    settings = Object.assign({ offset: '10px', once: true, whenIn: null, whenOut: null }, settings);
    let observer;
    // generate a uniqid for this listener
    const id = __uniqid();
    const pro = new __SPromise(({ resolve, emit }) => {
        const options = {
            root: null,
            rootMargin: settings.offset,
            threshold: 0, // visible amount of item shown in relation to root
        };
        // store status for all listeners
        if (!$elm._whenInViewportStatus) {
            $elm._whenInViewportStatus = {};
        }
        function onChange(changes) {
            changes.forEach((change) => {
                var _a, _b;
                if (change.intersectionRatio === 0) {
                    // prevent from triggering multiple times the callback
                    // for this listener if already invisible
                    if (!$elm._whenInViewportStatus[id]) {
                        return;
                    }
                    // set the listener status on the element
                    $elm._whenInViewportStatus[id] = false;
                    // process callbacks
                    (_a = settings.whenOut) === null || _a === void 0 ? void 0 : _a.call(settings, $elm);
                    // event
                    emit('out', $elm);
                }
                else {
                    // "once" settings support
                    if (settings.once) {
                        observer.disconnect();
                    }
                    // prevent from triggering multiple times the callback
                    // for this listener if already visible
                    if ($elm._whenInViewportStatus[id]) {
                        return;
                    }
                    // set the listener status on the element
                    $elm._whenInViewportStatus[id] = true;
                    // process callbacks
                    (_b = settings.whenIn) === null || _b === void 0 ? void 0 : _b.call(settings, $elm);
                    // event
                    emit('in', $elm);
                    // resolve the promise only if the "once"
                    // setting is true
                    if (settings.once) {
                        resolve($elm);
                    }
                }
            });
        }
        observer = new IntersectionObserver(onChange, options);
        observer.observe($elm);
    });
    pro.on('cancel', () => {
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
    });
    return pro;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUErQ3RELE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQ3BDLElBQWlCLEVBQ2pCLFdBQThDLEVBQUU7SUFFaEQsUUFBUSxtQkFDSixNQUFNLEVBQUUsTUFBTSxFQUNkLElBQUksRUFBRSxJQUFJLEVBQ1YsTUFBTSxFQUFFLElBQUksRUFDWixPQUFPLEVBQUUsSUFBSSxJQUNWLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUM7SUFFYixzQ0FBc0M7SUFDdEMsTUFBTSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFFdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzdDLE1BQU0sT0FBTyxHQUFHO1lBQ1osSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxtREFBbUQ7U0FDcEUsQ0FBQztRQUVGLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzdCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7U0FDbkM7UUFFRCxTQUFTLFFBQVEsQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7Z0JBQ3ZCLElBQUksTUFBTSxDQUFDLGlCQUFpQixLQUFLLENBQUMsRUFBRTtvQkFDaEMsc0RBQXNEO29CQUN0RCx5Q0FBeUM7b0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ2pDLE9BQU87cUJBQ1Y7b0JBRUQseUNBQXlDO29CQUN6QyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUV2QyxvQkFBb0I7b0JBQ3BCLE1BQUEsUUFBUSxDQUFDLE9BQU8seURBQUcsSUFBSSxDQUFDLENBQUM7b0JBRXpCLFFBQVE7b0JBQ1IsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDckI7cUJBQU07b0JBQ0gsMEJBQTBCO29CQUMxQixJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7d0JBQ2YsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO3FCQUN6QjtvQkFFRCxzREFBc0Q7b0JBQ3RELHVDQUF1QztvQkFDdkMsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ2hDLE9BQU87cUJBQ1Y7b0JBRUQseUNBQXlDO29CQUN6QyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUV0QyxvQkFBb0I7b0JBQ3BCLE1BQUEsUUFBUSxDQUFDLE1BQU0seURBQUcsSUFBSSxDQUFDLENBQUM7b0JBRXhCLFFBQVE7b0JBQ1IsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFakIseUNBQXlDO29CQUN6QyxrQkFBa0I7b0JBQ2xCLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTt3QkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2pCO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7UUFDbEIsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFVBQVUsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDIn0=