import __SPromise from '@coffeekraken/s-promise';
import __easeInOutQuart from '../easing/easeInOutQuart.js';
export default function __easeInterval(duration, cb, settings = {}) {
    let cleared = false, animationFrame;
    const pro = new __SPromise(({ resolve, reject, emit, on }) => {
        settings = Object.assign({ interval: 1000 / 25, easing: __easeInOutQuart, from: 0, to: 100, onEnd: undefined }, settings);
        const startTime = Date.now();
        on('cancel', () => {
            cleared = true;
            cancelAnimationFrame(animationFrame);
        });
        function animate() {
            var _a;
            if (cleared)
                return;
            const percent = (100 / duration) * (Date.now() - startTime);
            // @ts-ignore
            const easedPercent = settings.easing(percent / 100) * 100;
            // emit('interval', easedPercent);
            cb(easedPercent);
            if (percent < 100) {
                if (cleared)
                    return;
                animationFrame = requestAnimationFrame(animate);
            }
            else {
                (_a = settings.onEnd) === null || _a === void 0 ? void 0 : _a.call(settings);
                resolve(easedPercent);
            }
        }
        animate();
    });
    return pro;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZ0JBQWdCLE1BQU0sNkJBQTZCLENBQUM7QUFvRDNELE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUNsQyxRQUFnQixFQUNoQixFQUFZLEVBQ1osV0FBMkMsRUFBRTtJQUU3QyxJQUFJLE9BQU8sR0FBRyxLQUFLLEVBQ2YsY0FBYyxDQUFDO0lBRW5CLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ3pELFFBQVEsbUJBQ0osUUFBUSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQ25CLE1BQU0sRUFBRSxnQkFBZ0IsRUFDeEIsSUFBSSxFQUFFLENBQUMsRUFDUCxFQUFFLEVBQUUsR0FBRyxFQUNQLEtBQUssRUFBRSxTQUFTLElBQ2IsUUFBUSxDQUNkLENBQUM7UUFDRixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFN0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDZCxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ2Ysb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFSCxTQUFTLE9BQU87O1lBQ1osSUFBSSxPQUFPO2dCQUFFLE9BQU87WUFDcEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDNUQsYUFBYTtZQUNiLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMxRCxrQ0FBa0M7WUFDbEMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pCLElBQUksT0FBTyxHQUFHLEdBQUcsRUFBRTtnQkFDZixJQUFJLE9BQU87b0JBQUUsT0FBTztnQkFDcEIsY0FBYyxHQUFHLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNILE1BQUEsUUFBUSxDQUFDLEtBQUssd0RBQUksQ0FBQztnQkFDbkIsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMifQ==