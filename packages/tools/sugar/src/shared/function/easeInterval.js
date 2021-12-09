import __easeInOutQuart from '../easing/easeInOutQuart';
import __SPromise from '@coffeekraken/s-promise';
export default function (duration, cb, settings = {}) {
    return new __SPromise(({ resolve, reject, emit }) => {
        settings = Object.assign({ interval: 1000 / 25, easing: __easeInOutQuart, from: 0, to: 100 }, settings);
        // @ts-ignore
        const intervalCounts = Math.round(duration / settings.interval);
        let currentInterval = 0;
        let timer = setInterval(function () {
            currentInterval++;
            const percent = (100 / intervalCounts) * currentInterval;
            // @ts-ignore
            const easedPercent = settings.easing(percent / 100) * 100;
            emit('interval', easedPercent);
            cb(easedPercent);
            if (percent >= 100) {
                clearInterval(timer);
                resolve(easedPercent);
            }
        }, settings.interval);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzZUludGVydmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWFzZUludGVydmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUE0Q2pELE1BQU0sQ0FBQyxPQUFPLFdBQ1YsUUFBZ0IsRUFDaEIsRUFBWSxFQUNaLFdBQTJDLEVBQUU7SUFFN0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ2hELFFBQVEsbUJBQ0osUUFBUSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQ25CLE1BQU0sRUFBRSxnQkFBZ0IsRUFDeEIsSUFBSSxFQUFFLENBQUMsRUFDUCxFQUFFLEVBQUUsR0FBRyxJQUNKLFFBQVEsQ0FDZCxDQUFDO1FBRUYsYUFBYTtRQUNiLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRSxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDO1lBQ3BCLGVBQWUsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLGVBQWUsQ0FBQztZQUN6RCxhQUFhO1lBQ2IsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzFELElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pCLElBQUksT0FBTyxJQUFJLEdBQUcsRUFBRTtnQkFDaEIsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9