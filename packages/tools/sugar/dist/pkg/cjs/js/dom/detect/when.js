"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggers = void 0;
// @ts-nocheck
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dom_1 = require("@coffeekraken/sugar/dom");
exports.triggers = [
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
function __when($elm, trigger, settings) {
    const finalSettings = Object.assign({ whenInViewport: {}, whenNearViewport: {}, whenOutOfViewport: {}, whenInteract: {}, whenVisible: {}, whenStylesheetsReady: {} }, (settings !== null && settings !== void 0 ? settings : {}));
    return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
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
                promises.push((0, dom_1.__whenLod)(level));
                return;
            }
            switch (t) {
                case 'inViewport':
                    promises.push((0, dom_1.__whenInViewport)($elm, finalSettings.whenInViewport));
                    break;
                case 'nearViewport':
                    promises.push((0, dom_1.__whenNearViewport)($elm, finalSettings.whenNearViewport));
                    break;
                case 'entersViewport':
                    promises.push((0, dom_1.__whenEntersViewport)($elm, finalSettings.whenEntersViewport));
                    break;
                case 'outOfViewport':
                    promises.push((0, dom_1.__whenOutOfViewport)($elm, finalSettings.whenOutOfViewport));
                    break;
                case 'interact':
                    promises.push((0, dom_1.__whenInteract)($elm, finalSettings.whenInteract));
                    break;
                case 'visible':
                    promises.push((0, dom_1.__whenVisible)($elm, {
                        whenVisible: finalSettings.whenVisible,
                        once: true,
                    }));
                    break;
                case 'domReady':
                    promises.push((0, dom_1.__whenDomReady)());
                    break;
                case 'stylesheetsReady':
                    promises.push((0, dom_1.__whenStylesheetsReady)($elm ? [$elm] : null));
                    break;
                case 'animationEnd':
                    promises.push((0, dom_1.__whenAnimationEnd)($elm));
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
exports.default = __when;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCx3RUFBaUQ7QUFVakQsaURBV2lDO0FBb0VwQixRQUFBLFFBQVEsR0FBRztJQUNwQixRQUFRO0lBQ1IsVUFBVTtJQUNWLFlBQVk7SUFDWixjQUFjO0lBQ2QsZUFBZTtJQUNmLGVBQWU7SUFDZixVQUFVO0lBQ1YsU0FBUztJQUNULGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsY0FBYztJQUNkLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0NBQ1YsQ0FBQztBQUVGLFNBQXdCLE1BQU0sQ0FDMUIsSUFBaUIsRUFDakIsT0FBdUIsRUFDdkIsUUFBd0I7SUFFeEIsTUFBTSxhQUFhLG1CQUNmLGNBQWMsRUFBRSxFQUFFLEVBQ2xCLGdCQUFnQixFQUFFLEVBQUUsRUFDcEIsaUJBQWlCLEVBQUUsRUFBRSxFQUNyQixZQUFZLEVBQUUsRUFBRSxFQUNoQixXQUFXLEVBQUUsRUFBRSxFQUNmLG9CQUFvQixFQUFFLEVBQUUsSUFDckIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNoRCwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3ZCLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFdEQsTUFBTSxRQUFRLEdBQVksRUFBRSxDQUFDO1FBRTdCLGtCQUFrQjtRQUNsQixPQUFPLENB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