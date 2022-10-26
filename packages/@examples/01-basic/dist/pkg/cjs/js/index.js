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
require("./sugar");
// Coffeekraken others
const s_conductor_1 = __importDefault(require("@coffeekraken/s-conductor"));
// import __SDashboard from '@coffeekraken/s-dashboard';
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
// Coffeekraken features
const s_activate_feature_1 = require("@coffeekraken/s-activate-feature");
const s_appear_feature_1 = require("@coffeekraken/s-appear-feature");
// import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
const s_form_validate_feature_1 = require("@coffeekraken/s-form-validate-feature");
// import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
// Coffeekraken components
const s_carpenter_1 = require("@coffeekraken/s-carpenter");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
// import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
// import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
// import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
// import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
// import { define as __SSliderComponent } from '@coffeekraken/s-slider-component';
// import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-panel-component';
// import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
// Project level components
// ...
// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// setup conductor
s_conductor_1.default.setup({
    log: true,
});
// Init script
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Set some features defaults
    s_feature_1.default.setDefaultProps('*', {});
    // Set some components defaults
    s_lit_component_1.default.setDefaultProps('*', {});
    // Init theme
    s_theme_1.default.init();
    // features
    (0, s_activate_feature_1.define)();
    (0, s_appear_feature_1.define)();
    // __sFloatingFeature();
    // __sRefocusFeature();
    // __sInlineFeature();
    // __sParallaxFeature();
    (0, s_form_validate_feature_1.define)({});
    // __sPageTransitionFeature();
    // Project related components
    // ...
    // Components
    // __SCodeExampleWebcomponent();
    // __SFiltrableInputComponent();
    // __SSidePanelWebcomponent();
    // __SColorPickerComponent();
    // __SDatetimePickerComponent();
    // __SScrollComponent();
    // __SRangeWebcomponent();
    // __SSliderComponent({
    //   // behaviors: {
    //   //   slideable: {
    //   //     class: SSliderSlideableBehavior,
    //   //     settings: {},
    //   //   },
    //   // },
    // });
    (0, s_carpenter_1.define)();
    // Dashboard
    // new __SDashboard({
    //     dashboard: {
    //         components: {
    //             's-dashboard-pages': {
    //                 onSelect: (page) => {
    //                     document.location.href = page.item.loc;
    //                 },
    //             },
    //         },
    //     },
    // });
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQWlCO0FBQ2pCLHNCQUFzQjtBQUN0Qiw0RUFBcUQ7QUFDckQsd0RBQXdEO0FBQ3hELG9FQUE2QztBQUU3Qyx3QkFBd0I7QUFDeEIseUVBQWdGO0FBQ2hGLHFFQUE0RTtBQUM1RSxtRkFBbUY7QUFDbkYsbUZBQXlGO0FBQ3pGLCtFQUErRTtBQUMvRSxnR0FBZ0c7QUFDaEcsaUZBQWlGO0FBQ2pGLHdFQUFpRDtBQUVqRCwwQkFBMEI7QUFDMUIsMkRBQWtGO0FBQ2xGLG9GQUE0RDtBQUM1RCxpR0FBaUc7QUFDakcsOEZBQThGO0FBQzlGLG9HQUFvRztBQUNwRyxvR0FBb0c7QUFDcEcsbUZBQW1GO0FBQ25GLG1GQUFtRjtBQUNuRix3RkFBd0Y7QUFDeEYsb0ZBQW9GO0FBRXBGLDJCQUEyQjtBQUMzQixNQUFNO0FBRU4sZ0JBQWdCO0FBQ2hCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFL0Qsa0JBQWtCO0FBQ2xCLHFCQUFZLENBQUMsS0FBSyxDQUFDO0lBQ2pCLEdBQUcsRUFBRSxJQUFJO0NBQ1YsQ0FBQyxDQUFDO0FBRUgsY0FBYztBQUNkLENBQUMsR0FBUyxFQUFFO0lBQ1YsNkJBQTZCO0lBQzdCLG1CQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVwQywrQkFBK0I7SUFDL0IseUJBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXpDLGFBQWE7SUFDYixpQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhCLFdBQVc7SUFDWCxJQUFBLDJCQUFrQixHQUFFLENBQUM7SUFDckIsSUFBQSx5QkFBZ0IsR0FBRSxDQUFDO0lBQ25CLHdCQUF3QjtJQUN4Qix1QkFBdUI7SUFDdkIsc0JBQXNCO0lBQ3RCLHdCQUF3QjtJQUN4QixJQUFBLGdDQUFzQixFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLDhCQUE4QjtJQUU5Qiw2QkFBNkI7SUFDN0IsTUFBTTtJQUVOLGFBQWE7SUFDYixnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLDhCQUE4QjtJQUM5Qiw2QkFBNkI7SUFDN0IsZ0NBQWdDO0lBQ2hDLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsdUJBQXVCO0lBQ3ZCLG9CQUFvQjtJQUNwQixzQkFBc0I7SUFDdEIsNENBQTRDO0lBQzVDLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osVUFBVTtJQUNWLE1BQU07SUFDTixJQUFBLG9CQUEyQixHQUFFLENBQUM7SUFFOUIsWUFBWTtJQUNaLHFCQUFxQjtJQUNyQixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHFDQUFxQztJQUNyQyx3Q0FBd0M7SUFDeEMsOERBQThEO0lBQzlELHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLFNBQVM7SUFDVCxNQUFNO0FBQ1IsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=