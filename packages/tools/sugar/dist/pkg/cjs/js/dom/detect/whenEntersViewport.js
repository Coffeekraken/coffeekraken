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
const inViewport_1 = __importDefault(require("../is/inViewport"));
function whenEntersViewport(elm, settings = {}) {
    const offset = `0px 0px -25% 0px`;
    settings = Object.assign({ offset }, settings);
    let observer, resizeTimeout;
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const options = {
            root: null,
            rootMargin: settings.offset,
            threshold: 0, // visible amount of item shown in relation to root
        };
        if (yield (0, inViewport_1.default)(elm)) {
            return resolve(elm);
        }
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
                options.rootMargin = settings.offset;
                observer = new IntersectionObserver(onChange, options);
                observer.observe(elm);
            }, 500);
        });
    }));
}
exports.default = whenEntersViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGtFQUE4QztBQXFDOUMsU0FBUyxrQkFBa0IsQ0FDdkIsR0FBZ0IsRUFDaEIsV0FBa0QsRUFBRTtJQUVwRCxNQUFNLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQztJQUVsQyxRQUFRLG1CQUNKLE1BQU0sSUFDSCxRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksUUFBOEIsRUFBRSxhQUFxQixDQUFDO0lBRTFELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLE9BQU8sR0FBRztZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNO1lBQzNCLFNBQVMsRUFBRSxDQUFDLEVBQUUsbURBQW1EO1NBQ3BFLENBQUM7UUFFRixJQUFJLE1BQU0sSUFBQSxvQkFBYyxFQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO1FBRUQsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVE7WUFDL0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztnQkFDdkIsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUM5QixNQUFBLFFBQVEsQ0FBQyxVQUFVLHdEQUFJLENBQUM7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEI7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVCLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFOztnQkFDNUIsTUFBQSxRQUFRLENBQUMsVUFBVSx3REFBSSxDQUFDO2dCQUN4QixPQUFPLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQ3JDLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDdkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Qsa0JBQWUsa0JBQWtCLENBQUMifQ==