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
function whenInViewport(elm, settings = {}) {
    settings = Object.assign({ offset: 250 }, settings);
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const options = {
            root: null,
            rootMargin: `${settings.offset}px`,
            threshold: 1.0, // visible amount of item shown in relation to root
        };
        function onChange(changes, observer) {
            changes.forEach((change) => {
                if (change.intersectionRatio > 0) {
                    // your observer logic
                    observer.disconnect();
                    resolve(elm);
                }
            });
        }
        const observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
    }));
}
export default whenInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkluVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuSW5WaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBMENkLFNBQVMsY0FBYyxDQUFDLEdBQWdCLEVBQUUsV0FBOEMsRUFBRTtJQUN0RixRQUFRLG1CQUNKLE1BQU0sRUFBRSxHQUFHLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsTUFBTSxPQUFPLEdBQUc7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUk7WUFDbEMsU0FBUyxFQUFFLEdBQUcsRUFBRSxtREFBbUQ7U0FDdEUsQ0FBQztRQUVGLFNBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRO1lBQy9CLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUM5QixzQkFBc0I7b0JBQ3RCLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTdELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxlQUFlLGNBQWMsQ0FBQyJ9