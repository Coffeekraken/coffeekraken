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
// import { define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
// import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
// import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
const s_deps_feature_1 = __importStar(require("@coffeekraken/s-deps-feature"));
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
// import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
const s_floating_feature_1 = require("@coffeekraken/s-floating-feature");
const s_form_validate_feature_1 = require("@coffeekraken/s-form-validate-feature");
const s_inline_feature_1 = require("@coffeekraken/s-inline-feature");
const s_page_transition_feature_1 = require("@coffeekraken/s-page-transition-feature");
// import { define as __SRatingComponent } from '@coffeekraken/s-rating-component';
const s_refocus_feature_1 = require("@coffeekraken/s-refocus-feature");
// import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
// import { define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
// import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-panel-component';
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
// import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
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
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const dom_1 = require("@coffeekraken/sugar/dom");
// import __SCssAnimation from '@coffeekraken/s-css-animation';
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
// setup conductor
// __SConductor.setup({
//     log: true,
// });
function asyncComponents() {
    return __awaiter(this, void 0, void 0, function* () {
        // Code example
        const { define: __lazyDefineSCodeExample } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/s-code-example-component/lazy')));
        __lazyDefineSCodeExample();
        // Clipboard copy
        const { define: __lazyDefineSClipboardCopy } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/s-clipboard-copy-component/lazy')));
        __lazyDefineSClipboardCopy();
        // // Slider
        // const { define: __lazyDefineSSliderCopy } = await import(
        //     '@coffeekraken/s-slider-component/lazy'
        // );
        // __lazyDefineSSliderCopy();
        // Color picker
        const { define: __lazyDefineSColorPicker } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/s-color-picker-component/lazy')));
        __lazyDefineSColorPicker();
        // Datetime picker
        const { define: __lazyDefineSDatetimePicker } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/s-datetime-picker-component/lazy')));
        __lazyDefineSDatetimePicker();
        // Filtrable input
        const { define: __lazyDefineSFiltrableInput } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/s-filtrable-input-component/lazy')));
        __lazyDefineSFiltrableInput();
        // Panel
        const { define: __lazyDefineSPanel } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/s-panel-component/lazy')));
        __lazyDefineSPanel();
        // Range
        const { define: __lazyDefineSRange } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/s-range-component/lazy')));
        __lazyDefineSRange();
        // Rating
        const { define: __lazyDefineSRating } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/s-rating-component/lazy')));
        __lazyDefineSRating();
        // Scroll
        const { define: __lazyDefineSScroll } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/s-scroll-component/lazy')));
        __lazyDefineSScroll();
        // Theme switcher
        const { define: __lazyDefineSThemeSwitcher } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/s-theme-switcher-component/lazy')));
        __lazyDefineSThemeSwitcher();
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    s_feature_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    s_lit_component_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    s_lit_component_1.default.setDefaultProps(['ck-search-input', 's-color-picker', 's-datetime-picker'], {
        mountWhen: 'interact',
        // verbose: !__SEnv.is('devsCut'),
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
    // assync components
    asyncComponents();
    (0, dom_1.__querySelectorLive)('[s-template]', ($template) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, dom_1.__whenNearViewport)($template);
        const $content = $template.content;
        const $container = $content.children[0];
        $template.parentNode.insertBefore($content, $template);
        $container === null || $container === void 0 ? void 0 : $container.classList.add('s-template');
        $container === null || $container === void 0 ? void 0 : $container.classList.add('ready');
        $container === null || $container === void 0 ? void 0 : $container.setAttribute('ready', 'true');
        $template.remove();
    }));
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
            sel: 's-datetime-picker',
            css: 'sDatetimePicker',
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
    // __SCodeExampleWebcomponent();
    // __SFiltrableInputComponent();
    // __SSidePanelWebcomponent();
    // __SRatingComponent();
    // __SColorPickerComponent();
    // __SDatetimePickerComponent();
    // __SScrollComponent();
    // __SRangeWebcomponent();
    // __SThemeSwitcherComponent();
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
    // __sAppearFeature();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBZ0Y7QUFDaEYsK0VBQStFO0FBQy9FLGlHQUFpRztBQUNqRyw4RkFBOEY7QUFDOUYsb0dBQW9HO0FBQ3BHLCtFQUVzQztBQUN0Qyx3RUFBaUQ7QUFDakQsb0dBQW9HO0FBQ3BHLHlFQUFnRjtBQUNoRixtRkFBeUY7QUFDekYscUVBQTRFO0FBQzVFLHVGQUE2RjtBQUM3RixtRkFBbUY7QUFDbkYsdUVBQThFO0FBQzlFLG1GQUFtRjtBQUNuRix5RUFHMEM7QUFDMUMsbUVBQTBFO0FBQzFFLGtHQUFrRztBQUVsRyxvRkFBNEQ7QUFDNUQsd0ZBQXdGO0FBQ3hGLG1GQUFtRjtBQUNuRixvRkFBb0Y7QUFFcEYsYUFBYTtBQUNiLHFFQUFxRTtBQUNyRSx3REFBMEU7QUFDMUUsa0VBQW9GO0FBQ3BGLHNFQUF3RjtBQUN4RixxRkFBcUY7QUFDckYsMEVBQTBFO0FBQzFFLG9EQUFzRTtBQUN0RSx3REFBMEU7QUFDMUUseUZBQXlGO0FBQ3pGLHdEQUF3RDtBQUN4RCxvRUFBNkM7QUFFN0MsaURBR2lDO0FBRWpDLCtEQUErRDtBQUUvRCxhQUFhO0FBQ2IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMvRCxhQUFhO0FBQ2IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVoRSxrQkFBa0I7QUFDbEIsdUJBQXVCO0FBQ3ZCLGlCQUFpQjtBQUNqQixNQUFNO0FBRU4sU0FBZSxlQUFlOztRQUM1QixlQUFlO1FBQ2YsTUFBTSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxHQUFHLHdEQUMzQyw2Q0FBNkMsR0FDOUMsQ0FBQztRQUNG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