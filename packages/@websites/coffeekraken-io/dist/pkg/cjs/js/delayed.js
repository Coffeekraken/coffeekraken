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
const s_inline_feature_1 = require("@coffeekraken/s-inline-feature");
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
    (0, s_inline_feature_1.define)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsYUFBYTtBQUNiLCtFQUErRTtBQUMvRSx5RkFBK0Y7QUFDL0YscUZBQTJGO0FBQzNGLDJGQUFpRztBQUNqRyx5RUFBZ0Y7QUFDaEYseUVBQWdGO0FBQ2hGLHlGQUErRjtBQUUvRixXQUFXO0FBQ1gseUVBQWdGO0FBQ2hGLG1GQUF5RjtBQUN6RixxRUFBNEU7QUFDNUUsbUZBQW1GO0FBRW5GLG1CQUFtQjtBQUNuQix1RUFBOEU7QUFDOUUscUVBQXFFO0FBQ3JFLHdEQUEwRTtBQUMxRSxrRUFBb0Y7QUFDcEYsMkZBQTJGO0FBQzNGLHFGQUFxRjtBQUNyRiwwRUFBMEU7QUFDMUUseUZBQXlGO0FBQ3pGLHdEQUF3RDtBQUV4RCxDQUFDLEdBQVMsRUFBRTtJQUNWLGFBQWE7SUFDYiwwQkFBMEI7SUFDMUIsSUFBQSxtQ0FBeUIsR0FBRSxDQUFDO0lBQzVCLElBQUEsMkJBQWtCLEdBQUUsQ0FBQztJQUNyQixJQUFBLGlDQUF1QixHQUFFLENBQUM7SUFDMUIsSUFBQSxvQ0FBMEIsR0FBRSxDQUFDO0lBQzdCLElBQUEsMkJBQWtCLEdBQUUsQ0FBQztJQUNyQixJQUFBLDBCQUFpQixHQUFFLENBQUM7SUFDcEIsSUFBQSxtQ0FBeUIsR0FBRSxDQUFDO0lBRTVCLFdBQVc7SUFDWCxJQUFBLDJCQUFrQixHQUFFLENBQUM7SUFDckIsSUFBQSx5QkFBZ0IsR0FBRSxDQUFDO0lBQ25CLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsSUFBQSxnQ0FBc0IsRUFBQztRQUNyQixpQkFBaUIsRUFBRTtZQUNqQixZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7Z0JBQy9CLElBQUksS0FBSyxLQUFLLGNBQWMsRUFBRTtvQkFDNUIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7aUJBQ2xFO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsbUJBQW1CO0lBQ25CLElBQUEsbUJBQXFCLEdBQUUsQ0FBQztJQUN4QixJQUFBLHdCQUEwQixHQUFFLENBQUM7SUFDN0IsK0JBQStCO0lBQy9CLGlDQUFpQztBQUNuQyxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==