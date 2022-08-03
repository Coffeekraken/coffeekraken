"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
function whenNearViewport(elm, settings = {}) {
    settings = Object.assign({ offset: `${window.innerHeight}px ${window.innerWidth}px` }, settings);
    let observer, resizeTimeout;
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const options = {
            root: null,
            rootMargin: settings.offset,
            threshold: 1.0, // visible amount of item shown in relation to root
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
                var _a;
                (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                options.rootMargin = `${window.innerHeight}px ${window.innerWidth}px`;
                observer = new IntersectionObserver(onChange, options);
                observer.observe(elm);
            }, 500);
        });
    }));
}
exports.default = whenNearViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7OztBQXFDZCxTQUFTLGdCQUFnQixDQUNyQixHQUFnQixFQUNoQixXQUFnRCxFQUFFO0lBRWxELFFBQVEsbUJBQ0osTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsTUFBTSxNQUFNLENBQUMsVUFBVSxJQUFJLElBQ3JELFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxRQUE4QixFQUFFLGFBQXFCLENBQUM7SUFFMUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sT0FBTyxHQUFHO1lBQ1osSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDM0IsU0FBUyxFQUFFLEdBQUcsRUFBRSxtREFBbUQ7U0FDdEUsQ0FBQztRQUVGLFNBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRO1lBQy9CLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7Z0JBQ3ZCLElBQUksTUFBTSxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtvQkFDOUIsTUFBQSxRQUFRLENBQUMsVUFBVSx3REFBSSxDQUFDO29CQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2hCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3BDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1QixhQUFhLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTs7Z0JBQzVCLE1BQUEsUUFBUSxDQUFDLFVBQVUsd0RBQUksQ0FBQztnQkFDeEIsT0FBTyxDQUFDLFVBQVUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxXQUFXLE1BQU0sTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDO2dCQUN0RSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGtCQUFlLGdCQUFnQixDQUFDIn0=