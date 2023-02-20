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
const s_pack_essentials_1 = __importDefault(require("@coffeekraken/s-pack-essentials"));
const s_front_1 = __importDefault(require("@coffeekraken/s-front"));
const s_code_example_component_1 = require("@coffeekraken/s-code-example-component");
const s_color_picker_component_1 = require("@coffeekraken/s-color-picker-component");
// import __SDashboard from '@coffeekraken/s-dashboard';
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_google_map_component_1 = require("@coffeekraken/s-google-map-component");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_panel_component_1 = require("@coffeekraken/s-panel-component");
const s_rating_component_1 = require("@coffeekraken/s-rating-component");
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
const s_theme_switcher_component_1 = require("@coffeekraken/s-theme-switcher-component");
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
// import { define as __SGlitchFeatureDefine } from '@coffeekraken/s-glitch-feature';
const s_highlight_feature_1 = require("@coffeekraken/s-highlight-feature");
const s_lazy_feature_1 = require("@coffeekraken/s-lazy-feature");
const s_page_transition_feature_1 = require("@coffeekraken/s-page-transition-feature");
const s_parallax_feature_1 = require("@coffeekraken/s-parallax-feature");
// Website specific
const CKDiscover_1 = require("./components/CKDiscover");
const CKDiscoverTabed_1 = require("./components/CKDiscoverTabed");
const CKDiscoverWelcome_1 = require("./components/CKDiscoverWelcome");
const CKDocSubNav_1 = require("./components/CKDocSubNav");
const CKSearch_1 = require("./components/CKSearch");
const CkSettings_1 = require("./components/CkSettings");
const CKVersionSelector_1 = require("./components/CKVersionSelector");
// import { define as __CKRatingsComponent } from './components/CKRating';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
// import { __isMobile } from '@coffeekraken/sugar/is';
const dom_1 = require("@coffeekraken/sugar/dom");
// Libs
// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// For doc specific
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
if (import.meta.hot) {
    import.meta.hot.on('sugar.update.css', (data) => {
        // perform custom update
        (0, dom_1.__reloadStylesheets)();
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    s_feature_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    s_feature_1.default.setDefaultProps(['s-highlight'], {
        opacity: 0.3,
        lod: 4,
    });
    s_feature_1.default.setDefaultProps('s-refocus', {
        trigger: ['event:actual', 'anchor', 'history'],
        offsetY: 400,
    });
    s_feature_1.default.setDefaultProps(['s-parallax', 's-appear'], {
        lod: 3,
    });
    s_feature_1.default.setDefaultProps(['s-form-validate'], {
        customValidations: {
            coffeekraken: (value, helpers) => {
                if (value === 'coffeekraken') {
                    return helpers.message('Are you sure? Krakens are dangerous...');
                }
                return value;
            },
        },
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
    s_front_1.default.init({});
    // essentials
    (0, s_pack_essentials_1.default)();
    // features
    (0, s_page_transition_feature_1.define)();
    (0, s_lazy_feature_1.define)();
    (0, s_parallax_feature_1.define)();
    (0, s_highlight_feature_1.define)();
    // __SGlitchFeatureDefine();
    // components
    (0, s_code_example_component_1.define)();
    (0, s_slider_component_1.define)();
    (0, s_filtrable_input_component_1.define)();
    (0, s_panel_component_1.define)();
    (0, s_rating_component_1.define)();
    (0, s_color_picker_component_1.define)();
    (0, s_datetime_picker_component_1.define)();
    (0, s_google_map_component_1.define)();
    (0, s_theme_switcher_component_1.define)();
    // Website specific
    // __CKRatingsComponent();
    // __CKWelcomeRatingsComponent();
    (0, CKSearch_1.define)();
    (0, CkSettings_1.define)();
    (0, CKDiscover_1.define)();
    (0, CKDiscoverWelcome_1.define)();
    (0, CKDiscoverTabed_1.define)();
    (0, CKVersionSelector_1.define)();
    (0, CKDocSubNav_1.define)();
    // dashboard
    // const dashboard = new __SDashboard({
    //   dashboard: {
    //     components: {
    //       's-dashboard-pages': {
    //         onSelect: (page) => {
    //           dashboard.close();
    //           document.dispatchEvent(
    //             new CustomEvent('location.href', {
    //               detail: page.item.loc,
    //               bubbles: true,
    //             })
    //           );
    //         },
    //       },
    //     },
    //   },
    // });
    // code example highlight
    (0, dom_1.__querySelectorLive)('.s-code-example_content', ($elm) => {
        $elm.setAttribute('intensity', '0.3');
        $elm.setAttribute('s-highlight', 'light');
    });
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0ZBQWdFO0FBRWhFLG9FQUE2QztBQUU3QyxxRkFBaUc7QUFDakcscUZBQWlHO0FBQ2pHLHdEQUF3RDtBQUN4RCwyRkFBdUc7QUFDdkcsMkZBQXVHO0FBQ3ZHLGlGQUE2RjtBQUM3RixvRkFBNEQ7QUFDNUQsdUVBQXdGO0FBQ3hGLHlFQUFzRjtBQUN0Rix5RUFBc0Y7QUFDdEYseUZBQXFHO0FBRXJHLHdFQUFpRDtBQUNqRCxxRkFBcUY7QUFDckYsMkVBQXdGO0FBQ3hGLGlFQUE4RTtBQUM5RSx1RkFBbUc7QUFDbkcseUVBQXNGO0FBRXRGLG1CQUFtQjtBQUNuQix3REFBMEU7QUFDMUUsa0VBQW9GO0FBQ3BGLHNFQUF3RjtBQUN4RiwwREFBeUU7QUFDekUsb0RBQXNFO0FBQ3RFLHdEQUEwRTtBQUMxRSxzRUFBK0U7QUFDL0UsMEVBQTBFO0FBQzFFLHlGQUF5RjtBQUV6Rix1REFBdUQ7QUFFdkQsaURBR2lDO0FBRWpDLE9BQU87QUFFUCxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFL0QsbUJBQW1CO0FBQ25CLGFBQWE7QUFDYixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWhFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDNUMsd0JBQXdCO1FBQ3hCLElBQUEseUJBQW1CLEdBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztDQUNOO0FBRUQsQ0FBQyxH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