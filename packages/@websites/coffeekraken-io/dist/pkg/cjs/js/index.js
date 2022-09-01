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
const s_template_feature_1 = require("@coffeekraken/s-template-feature");
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
// import { define as __VersionSelector } from './components/VersionSelector';
// others
const s_conductor_1 = __importDefault(require("@coffeekraken/s-conductor"));
// import __SDashboard from '@coffeekraken/s-dashboard';
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
// import __SCssAnimation from '@coffeekraken/s-css-animation';
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
// setup conductor
s_conductor_1.default.setup({
    log: true,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    s_feature_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        verbose: !s_env_1.default.is('devsCut'),
    });
    s_lit_component_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        verbose: !s_env_1.default.is('devsCut'),
    });
    s_lit_component_1.default.setDefaultProps(['s-panel', 'ck-settings'], {
        mountWhen: 'direct',
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
    (0, s_template_feature_1.define)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBZ0Y7QUFDaEYscUVBQTRFO0FBQzVFLHFGQUE4RjtBQUM5RixxRkFBMkY7QUFDM0YsMkZBQWlHO0FBQ2pHLCtFQUVzQztBQUN0Qyx3RUFBaUQ7QUFDakQsMkZBQWlHO0FBQ2pHLHlFQUFnRjtBQUNoRixtRkFBeUY7QUFDekYscUVBQTRFO0FBQzVFLHVGQUE2RjtBQUM3Rix5RUFBZ0Y7QUFDaEYsdUVBQThFO0FBQzlFLHlFQUFnRjtBQUNoRix5RUFHMEM7QUFDMUMsbUVBQTBFO0FBQzFFLHlFQUFnRjtBQUNoRix5RkFBK0Y7QUFFL0Ysb0ZBQTREO0FBQzVELHVFQUFxRjtBQUNyRixtRkFBbUY7QUFDbkYsdUVBQWlGO0FBRWpGLGFBQWE7QUFDYixxRUFBcUU7QUFDckUsd0RBQTBFO0FBQzFFLGtFQUFvRjtBQUNwRixzRUFBd0Y7QUFDeEYscUZBQXFGO0FBQ3JGLDBFQUEwRTtBQUMxRSxvREFBc0U7QUFDdEUsd0RBQTBFO0FBQzFFLHlGQUF5RjtBQUV6Riw4RUFBOEU7QUFFOUUsU0FBUztBQUNULDRFQUFxRDtBQUNyRCx3REFBd0Q7QUFDeEQsZ0VBQXlDO0FBQ3pDLG9FQUE2QztBQUU3QywrREFBK0Q7QUFFL0QsYUFBYTtBQUNiLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDL0QsYUFBYTtBQUNiLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFaEUsa0JBQWtCO0FBQ2xCLHFCQUFZLENBQUMsS0FBSyxDQUFDO0lBQ2YsR0FBRyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7QUFFSCxDQUFDLEdBQVMsRUFBRTtJQUNS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