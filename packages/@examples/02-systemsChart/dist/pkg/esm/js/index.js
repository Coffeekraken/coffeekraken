var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFront from '@coffeekraken/s-front';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';
import { __reloadStylesheets } from '@coffeekraken/sugar/dom';
import __SFeature from '@coffeekraken/s-feature';
import __SLitComponent from '@coffeekraken/s-lit-component';
// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');
if (import.meta.hot) {
    import.meta.hot.on('sugar.update.css', (data) => {
        console.log('RELOAD', data);
        // perform custom update
        __reloadStylesheets();
    });
}
// Init script
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Set some features defaults
    __SFeature.setDefaultProps('*', {});
    // Set some components defaults
    __SLitComponent.setDefaultProps('*', {});
    // Front
    __SFront.init({});
    // Essentials
    __SPackEssentials();
    // Features
    // ...
    // Project related components
    // ...
    // Components
    // ...
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFOUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFFNUQsZ0JBQWdCO0FBQ2hCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFL0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1Qix3QkFBd0I7UUFDeEIsbUJBQW1CLEVBQUUsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FBQztDQUNKO0FBRUQsY0FBYztBQUNkLENBQUMsR0FBUyxFQUFFO0lBQ1YsNkJBQTZCO0lBQzdCLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXBDLCtCQUErQjtJQUMvQixlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV6QyxRQUFRO0lBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVsQixhQUFhO0lBQ2IsaUJBQWlCLEVBQUUsQ0FBQztJQUVwQixXQUFXO0lBQ1gsTUFBTTtJQUVOLDZCQUE2QjtJQUM3QixNQUFNO0lBRU4sYUFBYTtJQUNiLE1BQU07QUFDUixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==