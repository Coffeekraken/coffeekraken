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
const s_activate_feature_1 = require("@coffeekraken/s-activate-feature");
// import { define as __sAppearFeature } from "@coffeekraken/s-appear-feature";
const s_code_example_component_1 = require("@coffeekraken/s-code-example-component");
const s_color_picker_component_1 = require("@coffeekraken/s-color-picker-component");
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_floating_feature_1 = require("@coffeekraken/s-floating-feature");
const s_form_validate_feature_1 = require("@coffeekraken/s-form-validate-feature");
const s_inline_feature_1 = require("@coffeekraken/s-inline-feature");
const s_page_transition_feature_1 = require("@coffeekraken/s-page-transition-feature");
const s_rating_component_1 = require("@coffeekraken/s-rating-component");
const s_refocus_feature_1 = require("@coffeekraken/s-refocus-feature");
const s_scroll_component_1 = require("@coffeekraken/s-scroll-component");
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
const s_theme_switcher_component_1 = require("@coffeekraken/s-theme-switcher-component");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_panel_component_1 = require("@coffeekraken/s-panel-component");
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
const s_range_component_1 = require("@coffeekraken/s-range-component");
// Components
// import { define as __CKBlobComponent } from './components/CkBlob';
const CKDiscover_1 = require("./components/CKDiscover");
const CKDiscoverTabed_1 = require("./components/CKDiscoverTabed");
const CKDocSubNav_1 = require("./components/CKDocSubNav/CKDocSubNav");
const CkFallingStars_1 = require("./components/CkFallingStars");
const CKRating_1 = require("./components/CKRating");
const CKSearch_1 = require("./components/CKSearch");
const CkSettings_1 = require("./components/CkSettings");
const CKWelcomeRatings_1 = require("./components/CKWelcomeRatings");
// import { define as __VersionSelector } from './components/VersionSelector';
// others
const s_conductor_1 = __importDefault(require("@coffeekraken/s-conductor"));
// import __SDashboard from '@coffeekraken/s-dashboard';
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
// import __SCssAnimation from '@coffeekraken/s-css-animation';
// @ts-ignore
const viewsRelated = import.meta.globEager("../views/**/*.ts");
// @ts-ignore
const forDocRelated = import.meta.globEager("./forDoc/**/*.ts");
// setup conductor
s_conductor_1.default.setup({
    log: true,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    s_feature_1.default.setDefaultProps("*", {
        mountWhen: "nearViewport",
    });
    s_lit_component_1.default.setDefaultProps("*", {
        mountWhen: "nearViewport",
    });
    s_lit_component_1.default.setDefaultProps(["s-panel", "ck-settings"], {
        mountWhen: "direct",
    });
    s_lit_component_1.default.setDefaultProps(["s-code-example"], {
        scrollToSettings: {
            offset: 100,
        },
        responsive: {
            mobile: {
                lines: 5,
            },
        },
    });
    // init theme
    s_theme_1.default.init({
        variant: "dark",
    });
    // features
    (0, s_activate_feature_1.define)();
    (0, s_page_transition_feature_1.define)();
    // internal components
    // __VersionSelector();
    (0, CKSearch_1.define)();
    (0, CkFallingStars_1.define)();
    (0, CKWelcomeRatings_1.define)();
    // components
    (0, CKDiscover_1.define)();
    (0, CKDiscoverTabed_1.define)();
    (0, CkSettings_1.define)();
    (0, CKRating_1.define)();
    (0, CKDocSubNav_1.define)();
    (0, s_code_example_component_1.define)();
    (0, s_filtrable_input_component_1.define)();
    (0, s_panel_component_1.define)();
    (0, s_rating_component_1.define)();
    (0, s_color_picker_component_1.define)();
    (0, s_datetime_picker_component_1.define)();
    (0, s_scroll_component_1.define)();
    (0, s_range_component_1.define)();
    (0, s_theme_switcher_component_1.define)();
    (0, s_slider_component_1.define)({
        behaviors: {
            slideable: {
                class: s_slider_component_1.SSliderSlideableBehavior,
                settings: {},
            },
            // cssAnimation: {
            //     class: SSliderCssAnimationBehavior,
            //     settings: {},
            // },
        },
    });
    // features
    (0, s_sugar_feature_1.define)();
    (0, s_floating_feature_1.define)();
    // __sAppearFeature();
    (0, s_refocus_feature_1.define)();
    (0, s_inline_feature_1.define)();
    // __sParallaxFeature();
    (0, s_form_validate_feature_1.define)({
        customValidations: {
            coffeekraken: (value, helpers) => {
                if (value === "coffeekraken") {
                    return helpers.message("Are you sure? Krakens are dangerous...");
                }
                return value;
            },
        },
    });
    // dashboard
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUVBQWdGO0FBQ2hGLCtFQUErRTtBQUMvRSxxRkFBOEY7QUFDOUYscUZBQTJGO0FBQzNGLDJGQUFpRztBQUNqRyx3RUFBaUQ7QUFDakQsMkZBQWlHO0FBQ2pHLHlFQUFnRjtBQUNoRixtRkFBeUY7QUFDekYscUVBQTRFO0FBQzVFLHVGQUE2RjtBQUM3Rix5RUFBZ0Y7QUFDaEYsdUVBQThFO0FBQzlFLHlFQUFnRjtBQUNoRix5RUFHMEM7QUFDMUMsbUVBQTBFO0FBQzFFLHlGQUErRjtBQUUvRixvRkFBNEQ7QUFDNUQsdUVBQXFGO0FBQ3JGLG1GQUFtRjtBQUNuRix1RUFBaUY7QUFFakYsYUFBYTtBQUNiLHFFQUFxRTtBQUNyRSx3REFBMEU7QUFDMUUsa0VBQW9GO0FBQ3BGLHNFQUF3RjtBQUN4RixnRUFBa0Y7QUFDbEYsb0RBQXVFO0FBQ3ZFLG9EQUFzRTtBQUN0RSx3REFBMEU7QUFDMUUsb0VBQXNGO0FBRXRGLDhFQUE4RTtBQUU5RSxTQUFTO0FBQ1QsNEVBQXFEO0FBQ3JELHdEQUF3RDtBQUN4RCxvRUFBNkM7QUFFN0MsK0RBQStEO0FBRS9ELGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQy9ELGFBQWE7QUFDYixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWhFLGtCQUFrQjtBQUNsQixxQkFBWSxDQUFDLEtBQUssQ0FBQztJQUNqQixHQUFHLEVBQUUsSUFBSTtDQUNWLENBQUMsQ0FBQztBQUVILENBQUMsR0FBUyxFQUFFO0lBQ1YsbUJBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQzlCLFNBQVMsRUFBRSxjQUFjO0tBQzFCLENB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