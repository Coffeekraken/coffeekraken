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
import __whenInViewport from './whenInViewport';
import __whenNearViewport from './whenNearViewport';
import __whenEntersViewport from './whenEntersViewport';
import __whenOutOfViewport from './whenOutOfViewport';
import __whenInteract from './whenInteract';
import __whenDomReady from './whenDomReady';
import __whenVisible from './whenVisible';
import __whenStylesheetsReady from './whenStylesheetsReady';
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
];
export default function when($elm, trigger, settings) {
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
            }
        });
        // if no times setted, execute directly
        if (!trigger.length ||
            trigger.includes('direct') ||
            trigger.includes('directly')) {
            resolve();
            return;
        }
        // listen for at least 1 promise resolved
        yield Promise.race(promises);
        resolve();
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUdqRCxPQUFPLGdCQUFnQixNQUFNLGtCQUFrQixDQUFDO0FBR2hELE9BQU8sa0JBQWtCLE1BQU0sb0JBQW9CLENBQUM7QUFHcEQsT0FBTyxvQkFBb0IsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxPQUFPLG1CQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBR3RELE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBRzVDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUcxQyxPQUFPLHNCQUFzQixNQUFNLHdCQUF3QixDQUFDO0FBcUQ1RCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUc7SUFDcEIsUUFBUTtJQUNSLFVBQVU7SUFDVixZQUFZO0lBQ1osY0FBYztJQUNkLGVBQWU7SUFDZixlQUFlO0lBQ2YsVUFBVTtJQUNWLFNBQVM7SUFDVCxrQkFBa0I7Q0FDckIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsSUFBSSxDQUN4QixJQUFpQixFQUNqQixPQUF1QixFQUN2QixRQUF3QjtJQUV4QixNQUFNLGFBQWEsbUJBQ2YsY0FBYyxFQUFFLEVBQUUsRUFDbEIsZ0JBQWdCLEVBQUUsRUFBRSxFQUNwQixpQkFBaUIsRUFBRSxFQUFFLEVBQ3JCLFlBQVksRUFBRSxFQUFFLEVBQ2hCLFdBQVcsRUFBRSxFQUFFLEVBQ2Ysb0JBQW9CLEVBQUUsRUFBRSxJQUNyQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDaEQsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN2QixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXRELE1BQU0sUUFBUSxHQUFZLEVBQUUsQ0FBQztRQUU3QixrQkFBa0I7UUFDbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xCLFFBQVEsQ0FBQyxFQUFFO2dCQUNQLEtBQUssWUFBWTtvQkFDYixRQUFRLENBQUMsSUFBSSxDQUNULGdCQUFnQixDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLENBQ3ZELENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLGNBQWM7b0JBQ2YsUUFBUSxDQUFDLElBQUksQ0FDVCxrQkFBa0IsQ0FDZCxJQUFJLEVBQ0osYUFBYSxDQUFDLGdCQUFnQixDQUNqQyxDQUNKLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLGdCQUFnQjtvQkFDakIsUUFBUSxDQUFDLElBQUksQ0FDVCxvQkFBb0IsQ0FDaEIsSUFBSSxFQUNKLGFBQWEsQ0FBQyxrQkFBa0IsQ0FDbkMsQ0FDSixDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxlQUFlO29CQUNoQixRQUFRLENBQUMsSUFBSSxDQUNULG1CQUFtQixDQUNmLElBQUksRUFDSixhQUFhLENBQUMsaUJBQWlCLENBQ2xDLENBQ0osQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssVUFBVTtvQkFDWCxRQUFRLENBQUMsSUFBSSxDQUNULGNBQWMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUNuRCxDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxTQUFTO29CQUNWLFFBQVEsQ0FBQyxJQUFJLENBQ1QsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLENBQ2pELENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFVBQVU7b0JBQ1gsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUNoQyxNQUFNO2dCQUNWLEtBQUssa0JBQWtCO29CQUNuQixRQUFRLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDNUQsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCx1Q0FBdUM7UUFDdkMsSUFDSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ2YsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDMUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFDOUI7WUFDRSxPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU87U0FDVjtRQUVELHlDQUF5QztRQUN6QyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0IsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9