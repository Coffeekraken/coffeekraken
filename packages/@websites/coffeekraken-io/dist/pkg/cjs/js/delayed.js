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
Object.defineProperty(exports, "__esModule", { value: true });
// Components
// import { define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
const s_clipboard_copy_component_1 = require("@coffeekraken/s-clipboard-copy-component");
const s_color_picker_component_1 = require("@coffeekraken/s-color-picker-component");
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
const s_rating_component_1 = require("@coffeekraken/s-rating-component");
const s_scroll_component_1 = require("@coffeekraken/s-scroll-component");
const s_theme_switcher_component_1 = require("@coffeekraken/s-theme-switcher-component");
// Features
const s_floating_feature_1 = require("@coffeekraken/s-floating-feature");
const s_form_validate_feature_1 = require("@coffeekraken/s-form-validate-feature");
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
// Website specific
const s_range_component_1 = require("@coffeekraken/s-range-component");
// import { define as __CKBlobComponent } from './components/CkBlob';
const CKDiscover_1 = require("./components/CKDiscover");
const CKDiscoverTabed_1 = require("./components/CKDiscoverTabed");
// import { define as __CKDocSubNavComponent } from './components/CKDocSubNav/CKDocSubNav';
// import { define as __CkFallingStarsComponent } from './components/CkFallingStars';
// import { define as __CKRatingsComponent } from './components/CKRating';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
// import __SDashboard from '@coffeekraken/s-dashboard';
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Components
    // __CKRatingsComponent();
    (0, s_clipboard_copy_component_1.define)();
    (0, s_rating_component_1.define)();
    (0, s_color_picker_component_1.define)();
    (0, s_datetime_picker_component_1.define)();
    (0, s_scroll_component_1.define)();
    (0, s_range_component_1.define)();
    (0, s_theme_switcher_component_1.define)();
    // Features
    (0, s_floating_feature_1.define)();
    // __sAppearFeature();
    // __sParallaxFeature();
    (0, s_form_validate_feature_1.define)({
        customValidations: {
            coffeekraken: (value, helpers) => {
                if (value === 'coffeekraken') {
                    return helpers.message('Are you sure? Krakens are dangerous...');
                }
                return value;
            },
        },
    });
    // Website specific
    (0, CKDiscover_1.define)();
    (0, CKDiscoverTabed_1.define)();
    // __CkFallingStarsComponent();
    // __CKWelcomeRatingsComponent();
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsYUFBYTtBQUNiLCtFQUErRTtBQUMvRSx5RkFBK0Y7QUFDL0YscUZBQTJGO0FBQzNGLDJGQUFpRztBQUNqRyx5RUFBZ0Y7QUFDaEYseUVBQWdGO0FBQ2hGLHlGQUErRjtBQUUvRixXQUFXO0FBQ1gseUVBQWdGO0FBQ2hGLG1GQUF5RjtBQUN6RixtRkFBbUY7QUFFbkYsbUJBQW1CO0FBQ25CLHVFQUE4RTtBQUM5RSxxRUFBcUU7QUFDckUsd0RBQTBFO0FBQzFFLGtFQUFvRjtBQUNwRiwyRkFBMkY7QUFDM0YscUZBQXFGO0FBQ3JGLDBFQUEwRTtBQUMxRSx5RkFBeUY7QUFDekYsd0RBQXdEO0FBRXhELENBQUMsR0FBUyxFQUFFO0lBQ1IsYUFBYTtJQUNiLDBCQUEwQjtJQUMxQixJQUFBLG1DQUF5QixHQUFFLENBQUM7SUFDNUIsSUFBQSwyQkFBa0IsR0FBRSxDQUFDO0lBQ3JCLElBQUEsaUNBQXVCLEdBQUUsQ0FBQztJQUMxQixJQUFBLG9DQUEwQixHQUFFLENBQUM7SUFDN0IsSUFBQSwyQkFBa0IsR0FBRSxDQUFDO0lBQ3JCLElBQUEsMEJBQWlCLEdBQUUsQ0FBQztJQUNwQixJQUFBLG1DQUF5QixHQUFFLENBQUM7SUFFNUIsV0FBVztJQUNYLElBQUEsMkJBQWtCLEdBQUUsQ0FBQztJQUNyQixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLElBQUEsZ0NBQXNCLEVBQUM7UUFDbkIsaUJBQWlCLEVBQUU7WUFDZixZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksS0FBSyxLQUFLLGNBQWMsRUFBRTtvQkFDMUIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUNsQix3Q0FBd0MsQ0FDM0MsQ0FBQztpQkFDTDtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDO1NBQ0o7S0FDSixDQUFDLENBQUM7SUFFSCxtQkFBbUI7SUFDbkIsSUFBQSxtQkFBcUIsR0FBRSxDQUFDO0lBQ3hCLElBQUEsd0JBQTBCLEdBQUUsQ0FBQztJQUM3QiwrQkFBK0I7SUFDL0IsaUNBQWlDO0FBQ3JDLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9