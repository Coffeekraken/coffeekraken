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
// @ts-nocheck
const closestScrollable_1 = __importDefault(require("../query/closestScrollable"));
function whenNearViewport(elm, settings = {}) {
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
    const $closest = (0, closestScrollable_1.default)(elm);
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
exports.default = whenNearViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLG1GQUE2RDtBQXFDN0QsU0FBd0IsZ0JBQWdCLENBQ3BDLEdBQWdCLEVBQ2hCLFdBQWdELEVBQUU7SUFFbEQsU0FBUyxhQUFhO1FBQ2xCLE9BQU87WUFDSCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSTtZQUMzQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSTtZQUMxQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSTtZQUMzQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSTtTQUM3QyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUSxtQkFDSixNQUFNLEVBQUUsYUFBYSxFQUFFLElBQ3BCLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxRQUE4QixFQUFFLGFBQXFCLENBQUM7SUFFMUQsTUFBTSxRQUFRLEdBQUcsSUFBQSwyQkFBbUIsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUUxQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssTUFBTSxFQUFFO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sT0FBTyxHQUFHO1lBQ1osSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxtREFBbUQ7U0FDcEUsQ0FBQztRQUVGLFNBQWUsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFROztnQkFDckMsb0NBQW9DO2dCQUVwQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7O29CQUN2QixJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssTUFBTSxFQUFFO3dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUN2QjtvQkFDRCxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7d0JBQzlCLE1BQUEsUUFBUSxDQUFDLFVBQVUsd0RBQUksQ0FBQzt3QkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNoQjtnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7U0FBQTtRQUVELFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNwQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUIsYUFBYSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7O2dCQUM1QixNQUFBLFFBQVEsQ0FBQyxVQUFVLHdEQUFJLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsYUFBYSxFQUFFLENBQUM7Z0JBQ3JDLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDdkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBNURELG1DQTREQyJ9