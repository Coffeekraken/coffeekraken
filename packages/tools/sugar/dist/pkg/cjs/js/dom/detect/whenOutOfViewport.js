"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = whenOutOfViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQTJDZCxTQUFTLGlCQUFpQixDQUN0QixHQUFnQixFQUNoQixXQUFnRCxFQUFFO0lBRWxELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsUUFBUSxtQkFDSixNQUFNLEVBQUUsTUFBTSxJQUNYLFFBQVEsQ0FDZCxDQUFDO1FBRUYsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2YsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEI7UUFDTCxDQUFDLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUNyQyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQUUsT0FBTztZQUM1QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNILFlBQVksR0FBRyxLQUFLLENBQUM7YUFDeEI7WUFDRCxHQUFHLEVBQUUsQ0FBQztRQUNWLENBQUMsRUFDRDtZQUNJLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNO1lBQzNCLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDakUsQ0FDSixDQUFDO1FBRUYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxrQkFBZSxpQkFBaUIsQ0FBQyJ9