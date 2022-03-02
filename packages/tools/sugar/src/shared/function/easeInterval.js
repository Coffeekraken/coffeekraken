import __easeInOutQuart from '../easing/easeInOutQuart';
import __SPromise from '@coffeekraken/s-promise';
export default function (duration, cb, settings = {}) {
    return new __SPromise(({ resolve, reject, emit, on }) => {
        settings = Object.assign({ interval: 1000 / 25, easing: __easeInOutQuart, from: 0, to: 100, onEnd: undefined }, settings);
        let cleared = false;
        on('cancel', () => {
            cleared = true;
        });
        const startTime = Date.now();
        function animate() {
            var _a;
            if (cleared)
                return;
            const percent = 100 / duration * (Date.now() - startTime);
            // @ts-ignore
            const easedPercent = settings.easing(percent / 100) * 100;
            // emit('interval', easedPercent);
            cb(easedPercent);
            if (percent < 100) {
                if (cleared)
                    return;
                requestAnimationFrame(animate);
            }
            else {
                (_a = settings.onEnd) === null || _a === void 0 ? void 0 : _a.call(settings);
                resolve(easedPercent);
            }
        }
        animate();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzZUludGVydmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWFzZUludGVydmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUE2Q2pELE1BQU0sQ0FBQyxPQUFPLFdBQ1YsUUFBZ0IsRUFDaEIsRUFBWSxFQUNaLFdBQTJDLEVBQUU7SUFFN0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNwRCxRQUFRLG1CQUNKLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUNuQixNQUFNLEVBQUUsZ0JBQWdCLEVBQ3hCLElBQUksRUFBRSxDQUFDLEVBQ1AsRUFBRSxFQUFFLEdBQUcsRUFDUCxLQUFLLEVBQUUsU0FBUyxJQUNiLFFBQVEsQ0FDZCxDQUFDO1FBRUYsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUU3QixTQUFTLE9BQU87O1lBQ1osSUFBSSxPQUFPO2dCQUFFLE9BQU87WUFDcEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUMxRCxhQUFhO1lBQ2IsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzFELGtDQUFrQztZQUNsQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDakIsSUFBSSxPQUFPLEdBQUcsR0FBRyxFQUFFO2dCQUNmLElBQUksT0FBTztvQkFBRSxPQUFPO2dCQUNwQixxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsQztpQkFBTTtnQkFDSCxNQUFBLFFBQVEsQ0FBQyxLQUFLLCtDQUFkLFFBQVEsQ0FBVSxDQUFDO2dCQUNuQixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==