var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import { __whenAnimationEnd, __whenDomReady, __whenEntersViewport, __whenInteract, __whenInViewport, __whenNearViewport, __whenOutOfViewport, __whenStylesheetsReady, __whenVisible, } from '@coffeekraken/sugar/dom';
export const triggers = [
    'direct',
    'directly',
    'inViewport',
    'nearViewport',
    'enterViewport',
    'outOfViewport',
    'interact',
    'visible',
    'stylesheetsReady',
    'domReady',
    'animationEnd',
];
export default function __when($elm, trigger, settings) {
    const finalSettings = Object.assign({ whenInViewport: {}, whenNearViewport: {}, whenOutOfViewport: {}, whenInteract: {}, whenVisible: {}, whenStylesheetsReady: {} }, (settings !== null && settings !== void 0 ? settings : {}));
    return new __SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
        // ensure we work with an array of time(s)
        if (!Array.isArray(trigger))
            trigger = trigger.split(',').map((t) => t.trim());
        const promises = [];
        // adding watchers
        trigger.forEach((t) => {
            switch (t) {
                case 'inViewport':
                    promises.push(__whenInViewport($elm, finalSettings.whenInViewport));
                    break;
                case 'nearViewport':
                    promises.push(__whenNearViewport($elm, finalSettings.whenNearViewport));
                    break;
                case 'entersViewport':
                    promises.push(__whenEntersViewport($elm, finalSettings.whenEntersViewport));
                    break;
                case 'outOfViewport':
                    promises.push(__whenOutOfViewport($elm, finalSettings.whenOutOfViewport));
                    break;
                case 'interact':
                    promises.push(__whenInteract($elm, finalSettings.whenInteract));
                    break;
                case 'visible':
                    promises.push(__whenVisible($elm, finalSettings.whenVisible));
                    break;
                case 'domReady':
                    promises.push(__whenDomReady());
                    break;
                case 'stylesheetsReady':
                    promises.push(__whenStylesheetsReady($elm ? [$elm] : null));
                    break;
                case 'animationEnd':
                    promises.push(__whenAnimationEnd($elm));
                    break;
            }
        });
        // if no times setted, execute directly
        if (!trigger.length ||
            trigger.includes('direct') ||
            trigger.includes('directly')) {
            resolve($elm);
            return;
        }
        // listen for at least 1 promise resolved
        yield Promise.race(promises);
        resolve($elm);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQVVqRCxPQUFPLEVBQ0gsa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLHNCQUFzQixFQUN0QixhQUFhLEdBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUErRGpDLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRztJQUNwQixRQUFRO0lBQ1IsVUFBVTtJQUNWLFlBQVk7SUFDWixjQUFjO0lBQ2QsZUFBZTtJQUNmLGVBQWU7SUFDZixVQUFVO0lBQ1YsU0FBUztJQUNULGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsY0FBYztDQUNqQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQzFCLElBQWlCLEVBQ2pCLE9BQXVCLEVBQ3ZCLFFBQXdCO0lBRXhCLE1BQU0sYUFBYSxtQkFDZixjQUFjLEVBQUUsRUFBRSxFQUNsQixnQkFBZ0IsRUFBRSxFQUFFLEVBQ3BCLGlCQUFpQixFQUFFLEVBQUUsRUFDckIsWUFBWSxFQUFFLEVBQUUsRUFDaEIsV0FBVyxFQUFFLEVBQUUsRUFDZixvQkFBb0IsRUFBRSxFQUFFLElBQ3JCLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNoRCwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3ZCLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFdEQsTUFBTSxRQUFRLEdBQVksRUFBRSxDQUFDO1FBRTdCLGtCQUFrQjtRQUNsQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbEIsUUFBUSxDQUFDLEVBQUU7Z0JBQ1AsS0FBSyxZQUFZO29CQUNiLFFBQVEsQ0FBQyxJQUFJLENBQ1QsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FDdkQsQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssY0FBYztvQkFDZixRQUFRLENBQUMsSUFBSSxDQUNULGtCQUFrQixDQUNkLElBQUksRUFDSixhQUFhLENBQUMsZ0JBQWdCLENBQ2pDLENBQ0osQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssZ0JBQWdCO29CQUNqQixRQUFRLENBQUMsSUFBSSxDQUNULG9CQUFvQixDQUNoQixJQUFJLEVBQ0osYUFBYSxDQUFDLGtCQUFrQixDQUNuQyxDQUNKLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLGVBQWU7b0JBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQ1QsbUJBQW1CLENBQ2YsSUFBSSxFQUNKLGFBQWEsQ0FBQyxpQkFBaUIsQ0FDbEMsQ0FDSixDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxVQUFVO29CQUNYLFFBQVEsQ0FBQyxJQUFJLENBQ1QsY0FBYyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWSxDQUFDLENBQ25ELENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFNBQVM7b0JBQ1YsUUFBUSxDQUFDLElBQUksQ0FDVCxhQUFhLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FDakQsQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssVUFBVTtvQkFDWCxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQ2hDLE1BQU07Z0JBQ1YsS0FBSyxrQkFBa0I7b0JBQ25CLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxNQUFNO2dCQUNWLEtBQUssY0FBYztvQkFDZixRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLE1BQU07YUFDYjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsdUNBQXVDO1FBQ3ZDLElBQ0ksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUNmLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQzlCO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2QsT0FBTztTQUNWO1FBRUQseUNBQXlDO1FBQ3pDLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==