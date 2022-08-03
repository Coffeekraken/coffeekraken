"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = whenInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQXVDZCxTQUFTLGNBQWMsQ0FDbkIsR0FBZ0IsRUFDaEIsV0FBOEMsRUFBRTtJQUVoRCxRQUFRLG1CQUNKLE1BQU0sRUFBRSxNQUFNLElBQ1gsUUFBUSxDQUNkLENBQUM7SUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDM0IsTUFBTSxPQUFPLEdBQUc7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTTtZQUMzQixTQUFTLEVBQUUsR0FBRyxFQUFFLG1EQUFtRDtTQUN0RSxDQUFDO1FBRUYsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVE7WUFDL0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztnQkFDdkIsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUM5QixzQkFBc0I7b0JBQ3RCLE1BQUEsUUFBUSxDQUFDLFVBQVUsd0RBQUksQ0FBQztvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTdELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Qsa0JBQWUsY0FBYyxDQUFDIn0=