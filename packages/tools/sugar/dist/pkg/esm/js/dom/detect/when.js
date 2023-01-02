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
import { __whenAnimationEnd, __whenDomReady, __whenEntersViewport, __whenInteract, __whenInViewport, __whenLod, __whenNearViewport, __whenOutOfViewport, __whenStylesheetsReady, __whenVisible, } from '@coffeekraken/sugar/dom';
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
    'lod:0',
    'lod:1',
    'lod:2',
    'lod:3',
    'lod:4',
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
            // lod (level of defails)
            const lodMatches = t.match(/^lod\:([0-9]{1,2})/);
            if (lodMatches && lodMatches[1]) {
                const level = parseInt(lodMatches[1]);
                promises.push(__whenLod(level));
                return;
            }
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
                    promises.push(__whenVisible($elm, {
                        whenVisible: finalSettings.whenVisible,
                        once: true,
                    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQVVqRCxPQUFPLEVBQ0gsa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsYUFBYSxHQUNoQixNQUFNLHlCQUF5QixDQUFDO0FBb0VqQyxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUc7SUFDcEIsUUFBUTtJQUNSLFVBQVU7SUFDVixZQUFZO0lBQ1osY0FBYztJQUNkLGVBQWU7SUFDZixlQUFlO0lBQ2YsVUFBVTtJQUNWLFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGNBQWM7SUFDZCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztDQUNWLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sQ0FDMUIsSUFBaUIsRUFDakIsT0FBdUIsRUFDdkIsUUFBd0I7SUFFeEIsTUFBTSxhQUFhLG1CQUNmLGNBQWMsRUFBRSxFQUFFLEVBQ2xCLGdCQUFnQixFQUFFLEVBQUUsRUFDcEIsaUJBQWlCLEVBQUUsRUFBRSxFQUNyQixZQUFZLEVBQUUsRUFBRSxFQUNoQixXQUFXLEVBQUUsRUFBRSxFQUNmLG9CQUFvQixFQUFFLEVBQUUsSUFDckIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ2hELDBDQUEwQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENB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