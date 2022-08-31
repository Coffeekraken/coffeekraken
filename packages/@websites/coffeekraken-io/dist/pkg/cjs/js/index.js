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
        verbose: true,
    });
    s_lit_component_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        verbose: true,
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
    // // exported css
    // // if (__SEnv.is('production')) {
    // __querySelectorLive("[css]", async ($elm) => {
    //   await __whenNearViewport($elm);
    //   const path = $elm.getAttribute("css");
    //   const $link = document.createElement("link");
    //   $link.setAttribute("rel", "stylesheet");
    //   $link.setAttribute("id", path);
    //   $link.setAttribute("href", `/dist/css/partials/${path}.css`);
    //   document.head.appendChild($link);
    // });
    // // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBZ0Y7QUFDaEYscUVBQTRFO0FBQzVFLHFGQUE4RjtBQUM5RixxRkFBMkY7QUFDM0YsMkZBQWlHO0FBQ2pHLCtFQUVzQztBQUN0Qyx3RUFBaUQ7QUFDakQsMkZBQWlHO0FBQ2pHLHlFQUFnRjtBQUNoRixtRkFBeUY7QUFDekYscUVBQTRFO0FBQzVFLHVGQUE2RjtBQUM3Rix5RUFBZ0Y7QUFDaEYsdUVBQThFO0FBQzlFLHlFQUFnRjtBQUNoRix5RUFHMEM7QUFDMUMsbUVBQTBFO0FBQzFFLHlGQUErRjtBQUUvRixvRkFBNEQ7QUFDNUQsdUVBQXFGO0FBQ3JGLG1GQUFtRjtBQUNuRix1RUFBaUY7QUFFakYsYUFBYTtBQUNiLHFFQUFxRTtBQUNyRSx3REFBMEU7QUFDMUUsa0VBQW9GO0FBQ3BGLHNFQUF3RjtBQUN4RixnRUFBa0Y7QUFDbEYsb0RBQXVFO0FBQ3ZFLG9EQUFzRTtBQUN0RSx3REFBMEU7QUFDMUUsb0VBQXNGO0FBRXRGLDhFQUE4RTtBQUU5RSxTQUFTO0FBQ1QsNEVBQXFEO0FBQ3JELHdEQUF3RDtBQUN4RCxvRUFBNkM7QUFFN0MsK0RBQStEO0FBRS9ELGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQy9ELGFBQWE7QUFDYixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWhFLGtCQUFrQjtBQUNsQixxQkFBWSxDQUFDLEtBQUssQ0FBQztJQUNqQixHQUFHLEVBQUUsSUFBSTtDQUNWLENBQUMsQ0FBQztBQUVILENBQUMsR0FBUyxFQUFFO0lBQ1YsbUJBQVUsQ0FBQyxlQUFlLENBQUMsR0FB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