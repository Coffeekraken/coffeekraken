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
import __whenAnimationEnd from './whenAnimationEnd';
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
    'animationEnd',
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
                case 'animationEnd':
                    promises.push(__whenAnimationEnd($elm));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUdqRCxPQUFPLGdCQUFnQixNQUFNLGtCQUFrQixDQUFDO0FBR2hELE9BQU8sa0JBQWtCLE1BQU0sb0JBQW9CLENBQUM7QUFHcEQsT0FBTyxvQkFBb0IsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxPQUFPLG1CQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBR3RELE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBRzVDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUcxQyxPQUFPLHNCQUFzQixNQUFNLHdCQUF3QixDQUFDO0FBRTVELE9BQU8sa0JBQWtCLE1BQU0sb0JBQW9CLENBQUM7QUFzRHBELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRztJQUNwQixRQUFRO0lBQ1IsVUFBVTtJQUNWLFlBQVk7SUFDWixjQUFjO0lBQ2QsZUFBZTtJQUNmLGVBQWU7SUFDZixVQUFVO0lBQ1YsU0FBUztJQUNULGtCQUFrQjtJQUNsQixjQUFjO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLElBQUksQ0FDeEIsSUFBaUIsRUFDakIsT0FBdUIsRUFDdkIsUUFBd0I7SUFFeEIsTUFBTSxhQUFhLG1CQUNmLGNBQWMsRUFBRSxFQUFFLEVBQ2xCLGdCQUFnQixFQUFFLEVBQUUsRUFDcEIsaUJBQWlCLEVBQUUsRUFBRSxFQUNyQixZQUFZLEVBQUUsRUFBRSxFQUNoQixXQUFXLEVBQUUsRUFBRSxFQUNmLG9CQUFvQixFQUFFLEVBQUUsSUFDckIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLE9BQU8sSUFBSSxVQUFVLENBQUMs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