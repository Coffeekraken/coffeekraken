// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
function inViewportStatusChange($elm, settings) {
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
export default inViewportStatusChange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQXdDakQsU0FBUyxzQkFBc0IsQ0FDM0IsSUFBSSxFQUNKLFFBQW1EO0lBRW5ELElBQUksTUFBTSxHQUFHLEtBQUssRUFDZCxRQUFRLEVBQ1IsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUV6QixRQUFRLG1CQUNKLE1BQU0sRUFBRSxNQUFNLElBQ1gsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ1QsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFlBQVksSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUNsQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNmLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkI7aUJBQU0sSUFBSSxZQUFZLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtnQkFDekMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQy9CLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFBRSxPQUFPO1lBQzVCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUN4QjtZQUNELEdBQUcsRUFBRSxDQUFDO1FBQ1YsQ0FBQyxFQUNEO1lBQ0ksSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDM0IsU0FBUyxFQUFFO2dCQUNQLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO2FBQ3BEO1NBQ0osQ0FDSixDQUFDO1FBRUYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsd0JBQXdCO0tBQy9CLENBQ0osQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTs7UUFDaEIsTUFBQSxRQUFRLENBQUMsVUFBVSx3REFBSSxDQUFDO0lBQzVCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsc0JBQXNCLENBQUMifQ==