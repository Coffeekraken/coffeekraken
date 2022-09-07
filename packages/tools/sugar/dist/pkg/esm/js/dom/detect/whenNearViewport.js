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
import { __closestScrollable } from '@coffeekraken/sugar/dom';
export default function __whenNearViewport(elm, settings = {}) {
    function getRootMargin() {
        return [
            `${Math.round(window.innerHeight * 0.5)}px`,
            `${Math.round(window.innerWidth * 0.5)}px`,
            `${Math.round(window.innerHeight * 0.5)}px`,
            `${Math.round(window.innerWidth * 0.5)}px`,
        ].join(' ');
    }
    settings = Object.assign({}, settings);
    let observer, resizeTimeout;
    let $closest = __closestScrollable(elm);
    if (($closest === null || $closest === void 0 ? void 0 : $closest.tagName) === 'HTML')
        $closest = null;
    return new __SPromise(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const options = {
            root: $closest,
            rootMargin: (_a = settings.offset) !== null && _a !== void 0 ? _a : getRootMargin(),
            threshold: 0, // visible amount of item shown in relation to root
        };
        function onChange(changes, observer) {
            changes.forEach((change) => {
                var _a;
                if (change.intersectionRatio > 0) {
                    (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                    resolve(elm);
                }
            });
        }
        observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
        window.addEventListener('resize', (e) => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                var _a, _b;
                (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                options.rootMargin = (_b = settings.offset) !== null && _b !== void 0 ? _b : getRootMargin();
                observer = new IntersectionObserver(onChange, options);
                observer.observe(elm);
            }, 500);
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQXFDOUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FDdEMsR0FBZ0IsRUFDaEIsV0FBZ0QsRUFBRTtJQUVsRCxTQUFTLGFBQWE7UUFDbEIsT0FBTztZQUNILEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJO1lBQzNDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJO1lBQzFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJO1lBQzNDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJO1NBQzdDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRLHFCQUNELFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxRQUE4QixFQUFFLGFBQXFCLENBQUM7SUFFMUQsSUFBSSxRQUFRLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLE1BQUssTUFBTTtRQUFFLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFbEQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTs7UUFDeEMsTUFBTSxPQUFPLEdBQUc7WUFDWixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRSxNQUFBLFFBQVEsQ0FBQyxNQUFNLG1DQUFJLGFBQWEsRUFBRTtZQUM5QyxTQUFTLEVBQUUsQ0FBQyxFQUFFLG1EQUFtRDtTQUNwRSxDQUFDO1FBRUYsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVE7WUFDL0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztnQkFDdkIsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUM5QixNQUFBLFFBQVEsQ0FBQyxVQUFVLHdEQUFJLENBQUM7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEI7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVCLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFOztnQkFDNUIsTUFBQSxRQUFRLENBQUMsVUFBVSx3REFBSSxDQUFDO2dCQUN4QixPQUFPLENBQUMsVUFBVSxHQUFHLE1BQUEsUUFBUSxDQUFDLE1BQU0sbUNBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ3hELFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDdkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=