// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __whenAnimationEnd from './whenAnimationEnd.js';
import __whenEntersViewport from './whenEntersViewport.js';
import __whenInteract from './whenInteract.js';
import __whenInViewport from './whenInViewport.js';
import __whenLod from './whenLod.js';
import __whenNearViewport from './whenNearViewport.js';
import __whenOutOfViewport from './whenOutOfViewport.js';
import __whenStylesheetsReady from './whenStylesheetsReady.js';
import __whenVisible from './whenVisible.js';
export const WhenTriggers = [
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
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
            // timeout
            const timeoutMatches = t.match(/^timeout\:([0-9]+)/);
            if (timeoutMatches && timeoutMatches[1]) {
                const timeout = parseInt(timeoutMatches[1]);
                const promise = new Promise((resolve) => {
                    setTimeout(resolve, timeout);
                });
                promises.push(promise);
                return;
            }
            // event
            const eventMatches = t.match(/^event\:[a-zA-Z0-9-_\.]/);
            if (eventMatches && eventMatches[1]) {
                const promise = new Promise((resolve) => {
                    $elm.addEventListener(eventMatches[1], (e) => {
                        resolve();
                    });
                });
                promises.push(promise);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFVZCxPQUFPLGtCQUFrQixNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sb0JBQW9CLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxjQUFjLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxnQkFBZ0IsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLFNBQVMsTUFBTSxjQUFjLENBQUM7QUFDckMsT0FBTyxrQkFBa0IsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLG1CQUFtQixNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sc0JBQXNCLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxhQUFhLE1BQU0sa0JBQWtCLENBQUM7QUF1RjdDLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRztJQUN4QixRQUFRO0lBQ1IsVUFBVTtJQUNWLFlBQVk7SUFDWixjQUFjO0lBQ2QsZUFBZTtJQUNmLGVBQWU7SUFDZixVQUFVO0lBQ1YsU0FBUztJQUNULGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsY0FBYztJQUNkLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0NBQ1YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUMxQixJQUFpQixFQUNqQixPQUF1QixFQUN2QixRQUF3QjtJQUV4QixNQUFNLGFBQWEsbUJBQ2YsY0FBYyxFQUFFLEVBQUUsRUFDbEIsZ0JBQWdCLEVBQUUsRUFBRSxFQUNwQixpQkFBaUIsRUFBRSxFQUFFLEVBQ3JCLFlBQVksRUFBRSxFQUFFLEVBQ2hCLFdBQVcsRUFBRSxFQUFFLEVBQ2Ysb0JBQW9CLEVBQUUsRUFBRSxJQUNyQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFD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