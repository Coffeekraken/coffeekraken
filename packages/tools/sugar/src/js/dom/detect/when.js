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
import __whenOutOfViewport from './whenOutOfViewport';
import __whenInteract from './whenInteract';
import __whenDomReady from './whenDomReady';
import __whenVisible from './whenVisible';
import __whenStylesheetsReady from './whenStylesheetsReady';
export const triggers = ['direct', 'directly', 'inViewport', 'nearViewport', 'outOfViewport', 'interact', 'visible', 'stylesheetsReady'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZ0JBQTZDLE1BQU0sa0JBQWtCLENBQUM7QUFDN0UsT0FBTyxrQkFBaUQsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRixPQUFPLG1CQUFtRCxNQUFNLHFCQUFxQixDQUFDO0FBQ3RGLE9BQU8sY0FBeUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLGNBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLGFBQXVDLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sc0JBQXlELE1BQU0sd0JBQXdCLENBQUM7QUEyQy9GLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBRXpJLE1BQU0sQ0FBQyxPQUFPLFVBQVUsSUFBSSxDQUN4QixJQUFpQixFQUNqQixPQUF1QixFQUN2QixRQUF3QjtJQUV4QixNQUFNLGFBQWEsbUJBQ2YsY0FBYyxFQUFFLEVBQUUsRUFDbEIsZ0JBQWdCLEVBQUUsRUFBRSxFQUNwQixpQkFBaUIsRUFBRSxFQUFFLEVBQ3JCLFlBQVksRUFBRSxFQUFFLEVBQ2hCLFdBQVcsRUFBRSxFQUFFLEVBQ2Ysb0JBQW9CLEVBQUUsRUFBRSxJQUNyQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDaEQsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN2QixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXRELE1BQU0sUUFBUSxHQUFZLEVBQUUsQ0FBQztRQUU3QixrQkFBa0I7UUFDbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xCLFFBQVEsQ0FBQyxFQUFFO2dCQUNQLEtBQUssWUFBWTtvQkFDYixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDcEUsTUFBTTtnQkFDVixLQUFLLGNBQWM7b0JBQ2YsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztvQkFDeEUsTUFBTTtnQkFDVixLQUFLLGVBQWU7b0JBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQzFFLE1BQU07Z0JBQ1YsS0FBSyxVQUFVO29CQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsTUFBTTtnQkFDVixLQUFLLFNBQVM7b0JBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUM5RCxNQUFNO2dCQUNWLEtBQUssVUFBVTtvQkFDWCxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQ2hDLE1BQU07Z0JBQ1YsS0FBSyxrQkFBa0I7b0JBQ25CLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILHVDQUF1QztRQUN2QyxJQUNJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDZixPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUMxQixPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUM5QjtZQUNFLE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTztTQUNWO1FBRUQseUNBQXlDO1FBQ3pDLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3QixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=