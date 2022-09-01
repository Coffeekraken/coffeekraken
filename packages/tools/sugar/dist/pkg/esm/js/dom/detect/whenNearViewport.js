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
import __closestScrollable from '../query/closestScrollable';
export default function whenNearViewport(elm, settings = {}) {
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
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLG1CQUFtQixNQUFNLDRCQUE0QixDQUFDO0FBcUM3RCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUNwQyxHQUFnQixFQUNoQixXQUFnRCxFQUFFO0lBRWxELFNBQVMsYUFBYTtRQUNsQixPQUFPO1lBQ0gsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUk7WUFDM0MsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUk7WUFDMUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUk7WUFDM0MsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUk7U0FDN0MsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLFFBQThCLEVBQUUsYUFBcUIsQ0FBQztJQUUxRCxJQUFJLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QyxJQUFJLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sTUFBSyxNQUFNO1FBQUUsUUFBUSxHQUFHLElBQUksQ0FBQztJQUVsRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1FBQ2pDLE1BQU0sT0FBTyxHQUFHO1lBQ1osSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUUsTUFBQSxRQUFRLENBQUMsTUFBTSxtQ0FBSSxhQUFhLEVBQUU7WUFDOUMsU0FBUyxFQUFFLENBQUMsRUFBRSxtREFBbUQ7U0FDcEUsQ0FBQztRQUVGLFNBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRO1lBQy9CLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7Z0JBQ3ZCLElBQUksTUFBTSxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtvQkFDOUIsTUFBQSxRQUFRLENBQUMsVUFBVSx3REFBSSxDQUFDO29CQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2hCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3BDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1QixhQUFhLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTs7Z0JBQzVCLE1BQUEsUUFBUSxDQUFDLFVBQVUsd0RBQUksQ0FBQztnQkFDeEIsT0FBTyxDQUFDLFVBQVUsR0FBRyxNQUFBLFFBQVEsQ0FBQyxNQUFNLG1DQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUN4RCxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9