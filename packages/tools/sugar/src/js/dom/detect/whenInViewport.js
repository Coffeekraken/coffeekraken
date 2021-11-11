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
    settings = Object.assign({ offset: 10 }, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkluVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuSW5WaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBMENkLFNBQVMsY0FBYyxDQUNuQixHQUFnQixFQUNoQixXQUE4QyxFQUFFO0lBRWhELFFBQVEsbUJBQ0osTUFBTSxFQUFFLEVBQUUsSUFDUCxRQUFRLENBQ2QsQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLE9BQU8sR0FBRztZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sSUFBSTtZQUNsQyxTQUFTLEVBQUUsR0FBRyxFQUFFLG1EQUFtRDtTQUN0RSxDQUFDO1FBRUYsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVE7WUFDL0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUN2QixJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7b0JBQzlCLHNCQUFzQjtvQkFDdEIsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2hCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFN0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsY0FBYyxDQUFDIn0=