var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFeature from '@coffeekraken/s-feature';
import __SFront from '@coffeekraken/s-front';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';
// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// Init script
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Set some features defaults
    __SFeature.setDefaultProps('*', {});
    // Set some components defaults
    __SLitComponent.setDefaultProps('*', {});
    // Init front (theme, etc...)
    __SFront.init({});
    // Essentials
    __SPackEssentials();
    // Features
    // ...
    // Components
    // ...
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsZ0JBQWdCO0FBQ2hCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFL0QsY0FBYztBQUNkLENBQUMsR0FBUyxFQUFFO0lBQ1IsNkJBQTZCO0lBQzdCLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXBDLCtCQUErQjtJQUMvQixlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV6Qyw2QkFBNkI7SUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVsQixhQUFhO0lBQ2IsaUJBQWlCLEVBQUUsQ0FBQztJQUVwQixXQUFXO0lBQ1gsTUFBTTtJQUVOLGFBQWE7SUFDYixNQUFNO0FBQ1YsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=