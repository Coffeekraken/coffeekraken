import __SPromise from '@coffeekraken/s-promise';
import __easeInOutQuart from '../easing/easeInOutQuart';
export default function (duration, cb, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZ0JBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUE2Q3hELE1BQU0sQ0FBQyxPQUFPLFdBQ1YsUUFBZ0IsRUFDaEIsRUFBWSxFQUNaLFdBQTJDLEVBQUU7SUFFN0MsSUFBSSxPQUFPLEdBQUcsS0FBSyxFQUNmLGNBQWMsQ0FBQztJQUVuQixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUN6RCxRQUFRLG1CQUNKLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUNuQixNQUFNLEVBQUUsZ0JBQWdCLEVBQ3hCLElBQUksRUFBRSxDQUFDLEVBQ1AsRUFBRSxFQUFFLEdBQUcsRUFDUCxLQUFLLEVBQUUsU0FBUyxJQUNiLFFBQVEsQ0FDZCxDQUFDO1FBQ0YsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNmLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsU0FBUyxPQUFPOztZQUNaLElBQUksT0FBTztnQkFBRSxPQUFPO1lBQ3BCLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQzVELGFBQWE7WUFDYixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDMUQsa0NBQWtDO1lBQ2xDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqQixJQUFJLE9BQU8sR0FBRyxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxPQUFPO29CQUFFLE9BQU87Z0JBQ3BCLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDSCxNQUFBLFFBQVEsQ0FBQyxLQUFLLHdEQUFJLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN6QjtRQUNMLENBQUM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDIn0=