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
        if ((0, inViewport_1.default)(elm)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGtFQUE4QztBQXFDOUMsU0FBd0Isa0JBQWtCLENBQ3RDLEdBQWdCLEVBQ2hCLFdBQWtELEVBQUU7SUFFcEQsTUFBTSxNQUFNLEdBQUcsa0JBQWtCLENBQUM7SUFFbEMsUUFBUSxtQkFDSixNQUFNLElBQ0gsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLFFBQThCLEVBQUUsYUFBcUIsQ0FBQztJQUUxRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsTUFBTSxPQUFPLEdBQUc7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTTtZQUMzQixTQUFTLEVBQUUsQ0FBQyxFQUFFLG1EQUFtRDtTQUNwRSxDQUFDO1FBRUYsSUFBSSxJQUFBLG9CQUFjLEVBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFFRCxTQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUTtZQUMvQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7O2dCQUN2QixJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7b0JBQzlCLE1BQUEsUUFBUSxDQUFDLFVBQVUsd0RBQUksQ0FBQztvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNwQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUIsYUFBYSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7O2dCQUM1QixNQUFBLFFBQVEsQ0FBQyxVQUFVLHdEQUFJLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDckMsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUE5Q0QscUNBOENDIn0=