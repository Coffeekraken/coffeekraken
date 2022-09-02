"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const s_appear_feature_1 = require("@coffeekraken/s-appear-feature");
const s_code_example_component_1 = require("@coffeekraken/s-code-example-component");
const s_color_picker_component_1 = require("@coffeekraken/s-color-picker-component");
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
const s_deps_feature_1 = __importStar(require("@coffeekraken/s-deps-feature"));
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
// import { define as __CkFallingStarsComponent } from './components/CkFallingStars';
// import { define as __CKRatingsComponent } from './components/CKRating';
const CKSearch_1 = require("./components/CKSearch");
const CkSettings_1 = require("./components/CkSettings");
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
// import __SDashboard from '@coffeekraken/s-dashboard';
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
// import __SCssAnimation from '@coffeekraken/s-css-animation';
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
// setup conductor
// __SConductor.setup({
//     log: true,
// });
(() => __awaiter(void 0, void 0, void 0, function* () {
    s_feature_1.default.setDefaultProps('*', {
        // mountWhen: 'nearViewport',
        verbose: !s_env_1.default.is('devsCut'),
    });
    s_lit_component_1.default.setDefaultProps('*', {
        // mountWhen: 'nearViewport',
        verbose: !s_env_1.default.is('devsCut'),
    });
    s_lit_component_1.default.setDefaultProps(['s-panel', 'ck-settings'], {
    // mountWhen: 'direct',
    });
    s_lit_component_1.default.setDefaultProps(['s-code-example'], {
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
        variant: 'dark',
    });
    [
        {
            sel: '.icon-card',
            css: 'iconCard',
        },
        {
            sel: 's-code-example',
            css: 'sCodeExample',
        },
        {
            sel: '.sidemenu',
            css: 'sidemenu',
        },
        {
            sel: '.code-example-section',
            css: 'codeExampleSection',
        },
        {
            sel: '.s-filtrable-input',
            css: 'sFiltrableInput',
        },
        {
            sel: 's-color-picker',
            css: 'sColorPicker',
        },
        {
            sel: 's-rating',
            css: 'sRating',
        },
        {
            sel: 's-slider',
            css: 'sSlider',
        },
        {
            sel: 's-theme-switcher',
            css: 'sThemeSwitcher',
        },
        {
            sel: '.s-plaform',
            css: 'sPlatform',
        },
    ].forEach((dep) => {
        s_deps_feature_1.default.registerDeps(dep.sel, {
            css: dep.css,
        });
    });
    // features
    (0, s_deps_feature_1.define)();
    (0, s_activate_feature_1.define)();
    (0, s_page_transition_feature_1.define)();
    // __STemplateFeature();
    // components
    // __CKRatingsComponent();
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
        },
    });
    // features
    (0, s_sugar_feature_1.define)();
    (0, s_floating_feature_1.define)();
    (0, s_appear_feature_1.define)();
    (0, s_refocus_feature_1.define)();
    (0, s_inline_feature_1.define)();
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
    // internal components
    // __VersionSelector();
    (0, CKSearch_1.define)();
    (0, CKDiscover_1.define)();
    (0, CKDiscoverTabed_1.define)();
    (0, CkSettings_1.define)();
    (0, CKDocSubNav_1.define)();
    // __CkFallingStarsComponent();
    // __CKWelcomeRatingsComponent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBZ0Y7QUFDaEYscUVBQTRFO0FBQzVFLHFGQUE4RjtBQUM5RixxRkFBMkY7QUFDM0YsMkZBQWlHO0FBQ2pHLCtFQUVzQztBQUN0Qyx3RUFBaUQ7QUFDakQsMkZBQWlHO0FBQ2pHLHlFQUFnRjtBQUNoRixtRkFBeUY7QUFDekYscUVBQTRFO0FBQzVFLHVGQUE2RjtBQUM3Rix5RUFBZ0Y7QUFDaEYsdUVBQThFO0FBQzlFLHlFQUFnRjtBQUNoRix5RUFHMEM7QUFDMUMsbUVBQTBFO0FBQzFFLHlGQUErRjtBQUUvRixvRkFBNEQ7QUFDNUQsdUVBQXFGO0FBQ3JGLG1GQUFtRjtBQUNuRix1RUFBaUY7QUFFakYsYUFBYTtBQUNiLHFFQUFxRTtBQUNyRSx3REFBMEU7QUFDMUUsa0VBQW9GO0FBQ3BGLHNFQUF3RjtBQUN4RixxRkFBcUY7QUFDckYsMEVBQTBFO0FBQzFFLG9EQUFzRTtBQUN0RSx3REFBMEU7QUFDMUUseUZBQXlGO0FBQ3pGLHdEQUF3RDtBQUN4RCxnRUFBeUM7QUFDekMsb0VBQTZDO0FBRTdDLCtEQUErRDtBQUUvRCxhQUFhO0FBQ2IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMvRCxhQUFhO0FBQ2IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVoRSxrQkFBa0I7QUFDbEIsdUJBQXVCO0FBQ3ZCLGlCQUFpQjtBQUNqQixNQUFNO0FBRU4sQ0FBQyxHQUFTLEVBQUU7SUFDVixtQkFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDOUIsNkJBQTZCO1FBQzdCLE9BQU8sRUFBRSxDQUFDLGVBQU0sQ0FB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