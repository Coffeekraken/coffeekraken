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
    settings = Object.assign({ offset: getRootMargin() }, settings);
    let observer, resizeTimeout;
    const $closest = __closestScrollable(elm);
    if (elm.id === 'coco') {
        console.log('CLOSEST', $closest);
    }
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const options = {
            root: $closest,
            rootMargin: settings.offset,
            threshold: 0, // visible amount of item shown in relation to root
        };
        function onChange(changes, observer) {
            return __awaiter(this, void 0, void 0, function* () {
                // if (!__isInViewport(elm)) return;
                changes.forEach((change) => {
                    var _a;
                    if (elm.id === 'coco') {
                        console.log(change);
                    }
                    if (change.intersectionRatio > 0) {
                        (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                        resolve(elm);
                    }
                });
            });
        }
        observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
        window.addEventListener('resize', (e) => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                var _a;
                (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                options.rootMargin = getRootMargin();
                observer = new IntersectionObserver(onChange, options);
                observer.observe(elm);
            }, 500);
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLG1CQUFtQixNQUFNLDRCQUE0QixDQUFDO0FBcUM3RCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUNwQyxHQUFnQixFQUNoQixXQUFnRCxFQUFFO0lBRWxELFNBQVMsYUFBYTtRQUNsQixPQUFPO1lBQ0gsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUk7WUFDM0MsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUk7WUFDMUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUk7WUFDM0MsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUk7U0FDN0MsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVEsbUJBQ0osTUFBTSxFQUFFLGFBQWEsRUFBRSxJQUNwQixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksUUFBOEIsRUFBRSxhQUFxQixDQUFDO0lBRTFELE1BQU0sUUFBUSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTFDLElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSyxNQUFNLEVBQUU7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDcEM7SUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsTUFBTSxPQUFPLEdBQUc7WUFDWixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTTtZQUMzQixTQUFTLEVBQUUsQ0FBQyxFQUFFLG1EQUFtRDtTQUNwRSxDQUFDO1FBRUYsU0FBZSxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVE7O2dCQUNyQyxvQ0FBb0M7Z0JBRXBDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7b0JBQ3ZCLElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSyxNQUFNLEVBQUU7d0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3ZCO29CQUNELElBQUksTUFBTSxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTt3QkFDOUIsTUFBQSxRQUFRLENBQUMsVUFBVSx3REFBSSxDQUFDO3dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2hCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztTQUFBO1FBRUQsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3BDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1QixhQUFhLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTs7Z0JBQzVCLE1BQUEsUUFBUSxDQUFDLFVBQVUsd0RBQUksQ0FBQztnQkFDeEIsT0FBTyxDQUFDLFVBQVUsR0FBRyxhQUFhLEVBQUUsQ0FBQztnQkFDckMsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==