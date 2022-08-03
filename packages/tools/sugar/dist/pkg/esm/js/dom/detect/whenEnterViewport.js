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
function whenEntersViewport(elm, settings = {}) {
    const offset = `-${window.innerHeight / 3}px -${window.innerWidth / 3}px`;
    settings = Object.assign({ offset }, settings);
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
                options.rootMargin = offset;
                observer = new IntersectionObserver(onChange, options);
                observer.observe(elm);
            }, 500);
        });
    }));
}
export default whenEntersViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFxQ2QsU0FBUyxrQkFBa0IsQ0FDdkIsR0FBZ0IsRUFDaEIsV0FBa0QsRUFBRTtJQUVwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFFMUUsUUFBUSxtQkFDSixNQUFNLElBQ0gsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLFFBQThCLEVBQUUsYUFBcUIsQ0FBQztJQUUxRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsTUFBTSxPQUFPLEdBQUc7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTTtZQUMzQixTQUFTLEVBQUUsR0FBRyxFQUFFLG1EQUFtRDtTQUN0RSxDQUFDO1FBRUYsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVE7WUFDL0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztnQkFDdkIsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUM5QixNQUFBLFFBQVEsQ0FBQyxVQUFVLHdEQUFJLENBQUM7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEI7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVCLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFOztnQkFDNUIsTUFBQSxRQUFRLENBQUMsVUFBVSx3REFBSSxDQUFDO2dCQUN4QixPQUFPLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztnQkFDNUIsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxlQUFlLGtCQUFrQixDQUFDIn0=