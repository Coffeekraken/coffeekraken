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
const lazy_1 = require("@coffeekraken/s-code-example-component/lazy");
const s_deps_feature_1 = __importStar(require("@coffeekraken/s-deps-feature"));
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_inline_feature_1 = require("@coffeekraken/s-inline-feature");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_page_transition_feature_1 = require("@coffeekraken/s-page-transition-feature");
const s_panel_component_1 = require("@coffeekraken/s-panel-component");
const s_refocus_feature_1 = require("@coffeekraken/s-refocus-feature");
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
const s_template_feature_1 = require("@coffeekraken/s-template-feature");
// Website specific
const CKSearch_1 = require("./components/CKSearch");
const CkSettings_1 = require("./components/CkSettings");
// Libs
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// For doc specific
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
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
    // init theme
    s_theme_1.default.init({
        variant: 'dark',
    });
    // dependencies
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
            sel: '.s-platform',
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
    (0, lazy_1.define)();
    (0, s_filtrable_input_component_1.define)();
    (0, s_panel_component_1.define)();
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
    (0, s_refocus_feature_1.define)();
    (0, s_inline_feature_1.define)();
    // internal components
    (0, CKSearch_1.define)();
    (0, CkSettings_1.define)();
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
    // Load delayed features
    // 2s after
    let delayedLoaded = false;
    function load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (delayedLoaded)
                return;
            delayedLoaded = true;
            console.log('MOVED');
            document.removeEventListener('pointermove', load);
            yield (0, datetime_1.__wait)(1000);
            Promise.resolve().then(() => __importStar(require('./delayed')));
        });
    }
    document.addEventListener('pointermove', load);
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBZ0Y7QUFDaEYsc0VBQWdHO0FBQ2hHLCtFQUVzQztBQUN0Qyx3RUFBaUQ7QUFDakQsMkZBQWlHO0FBRWpHLHFFQUE0RTtBQUM1RSxvRkFBNEQ7QUFDNUQsdUZBQTZGO0FBQzdGLHVFQUFrRjtBQUNsRix1RUFBOEU7QUFDOUUseUVBRzBDO0FBQzFDLG1FQUEwRTtBQUMxRSx5RUFBZ0Y7QUFFaEYsbUJBQW1CO0FBQ25CLG9EQUFzRTtBQUN0RSx3REFBMEU7QUFFMUUsT0FBTztBQUNQLG9FQUE2QztBQUM3QywyREFBc0Q7QUFFdEQsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELG1CQUFtQjtBQUNuQixhQUFhO0FBQ2IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVoRSxDQUFDLEdBQVMsRUFBRTtJQUNSLG1CQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUM1QixTQUFTLEVBQUUsY0FBYztRQUN6QixrQ0FBa0M7S0FDckMsQ0FBQyxDQUFDO0lBQ0gseUJBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQ2pDLFNBQVMsRUFBRSxjQUFjO1FBQ3pCLGtDQUFrQztLQUNyQyxDQUFDLENBQUM7SUFDSCx5QkFBZSxDQUFDLGVBQWUsQ0FDM0IsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxFQUMxRDtRQUNJLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLGtDQUFrQztLQUNyQyxDQUNKLENBQUM7SUFDRix5QkFBZSxDQUFDLGVBQWUsQ0FBQyxD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