// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
export default function inViewportStatusChange($elm, settings) {
    let status = 'out', observer, isInViewport = false;
    settings = Object.assign({ offset: '10px' }, (settings !== null && settings !== void 0 ? settings : {}));
    return new __SPromise(({ emit }) => {
        const _cb = () => {
            if (!isInViewport && status === 'in') {
                status = 'out';
                emit('leave', $elm);
            }
            else if (isInViewport && status === 'out') {
                status = 'in';
                emit('enter', $elm);
            }
        };
        observer = new IntersectionObserver((entries, observer) => {
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
            threshold: [
                0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
            ],
        });
        observer.observe($elm);
    }, {
        id: 'inViewportStatisChange',
    }).on('cancel', () => {
        var _a;
        (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQTJDakQsTUFBTSxDQUFDLE9BQU8sVUFBVSxzQkFBc0IsQ0FDMUMsSUFBaUIsRUFDakIsUUFBbUQ7SUFFbkQsSUFBSSxNQUFNLEdBQUcsS0FBSyxFQUNkLFFBQVEsRUFDUixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBRXpCLFFBQVEsbUJBQ0osTUFBTSxFQUFFLE1BQU0sSUFDWCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDVCxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDYixJQUFJLENBQUMsWUFBWSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0JBQ2xDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QjtpQkFBTSxJQUFJLFlBQVksSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO2dCQUN6QyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNkLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkI7UUFDTCxDQUFDLENBQUM7UUFFRixRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FDL0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUFFLE9BQU87WUFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtnQkFDN0IsWUFBWSxHQUFHLElBQUksQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1lBQ0QsR0FBRyxFQUFFLENBQUM7UUFDVixDQUFDLEVBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTTtZQUMzQixTQUFTLEVBQUU7Z0JBQ1AsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDcEQ7U0FDSixDQUNKLENBQUM7UUFFRixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUMsRUFDRDtRQUNJLEVBQUUsRUFBRSx3QkFBd0I7S0FDL0IsQ0FDSixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFOztRQUNoQixNQUFBLFFBQVEsQ0FBQyxVQUFVLHdEQUFJLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=