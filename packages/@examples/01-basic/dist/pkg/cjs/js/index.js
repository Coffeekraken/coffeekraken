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
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
// import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
// import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
// import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
// import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
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
    (0, s_slider_component_1.define)({
    // behaviors: {
    //   slideable: {
    //     class: SSliderSlideableBehavior,
    //     settings: {},
    //   },
    // },
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQWlCO0FBQ2pCLHNCQUFzQjtBQUN0Qiw0RUFBcUQ7QUFDckQsd0RBQXdEO0FBQ3hELG9FQUE2QztBQUU3Qyx3QkFBd0I7QUFDeEIseUVBQWdGO0FBQ2hGLHFFQUE0RTtBQUM1RSxtRkFBbUY7QUFDbkYsbUZBQXlGO0FBQ3pGLCtFQUErRTtBQUMvRSxnR0FBZ0c7QUFDaEcsaUZBQWlGO0FBQ2pGLHdFQUFpRDtBQUVqRCwwQkFBMEI7QUFDMUIsb0ZBQTREO0FBQzVELGlHQUFpRztBQUNqRyw4RkFBOEY7QUFDOUYsb0dBQW9HO0FBQ3BHLG9HQUFvRztBQUNwRyxtRkFBbUY7QUFDbkYseUVBQWdGO0FBQ2hGLHdGQUF3RjtBQUN4RixvRkFBb0Y7QUFFcEYsMkJBQTJCO0FBQzNCLE1BQU07QUFFTixnQkFBZ0I7QUFDaEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUvRCxrQkFBa0I7QUFDbEIscUJBQVksQ0FBQyxLQUFLLENBQUM7SUFDakIsR0FBRyxFQUFFLElBQUk7Q0FDVixDQUFDLENBQUM7QUFFSCxjQUFjO0FBQ2QsQ0FBQyxHQUFTLEVBQUU7SUFDViw2QkFBNkI7SUFDN0IsbUJBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXBDLCtCQUErQjtJQUMvQix5QkFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFekMsYUFBYTtJQUNiLGlCQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEIsV0FBVztJQUNYLElBQUEsMkJBQWtCLEdBQUUsQ0FBQztJQUNyQixJQUFBLHlCQUFnQixHQUFFLENBQUM7SUFDbkIsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLElBQUEsZ0NBQXNCLEVBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsOEJBQThCO0lBRTlCLDZCQUE2QjtJQUM3QixNQUFNO0lBRU4sYUFBYTtJQUNiLGdDQUFnQztJQUNoQyxnQ0FBZ0M7SUFDaEMsOEJBQThCO0lBQzlCLDZCQUE2QjtJQUM3QixnQ0FBZ0M7SUFDaEMsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQixJQUFBLDJCQUFrQixFQUFDO0lBQ2pCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsdUNBQXVDO0lBQ3ZDLG9CQUFvQjtJQUNwQixPQUFPO0lBQ1AsS0FBSztLQUNOLENBQUMsQ0FBQztJQUVILFlBQVk7SUFDWixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4QixxQ0FBcUM7SUFDckMsd0NBQXdDO0lBQ3hDLDhEQUE4RDtJQUM5RCxxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixTQUFTO0lBQ1QsTUFBTTtBQUNSLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9