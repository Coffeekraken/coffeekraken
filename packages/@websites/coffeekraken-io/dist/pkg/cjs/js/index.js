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
    s_feature_1.default.setDefaultProps(['s-parallax'], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0ZBQWdFO0FBRWhFLG9FQUE2QztBQUU3QyxxRkFBaUc7QUFDakcscUZBQWlHO0FBQ2pHLHdEQUF3RDtBQUN4RCwyRkFBdUc7QUFDdkcsMkZBQXVHO0FBQ3ZHLGlGQUE2RjtBQUM3RixvRkFBNEQ7QUFDNUQsdUVBQXdGO0FBQ3hGLHlFQUFzRjtBQUN0Rix5RUFBc0Y7QUFDdEYseUZBQXFHO0FBRXJHLHdFQUFpRDtBQUNqRCxxRkFBcUY7QUFDckYsMkVBQXdGO0FBQ3hGLGlFQUE4RTtBQUM5RSx1RkFBbUc7QUFDbkcseUVBQXNGO0FBRXRGLG1CQUFtQjtBQUNuQix3REFBMEU7QUFDMUUsa0VBQW9GO0FBQ3BGLHNFQUF3RjtBQUN4RiwwREFBeUU7QUFDekUsb0RBQXNFO0FBQ3RFLHdEQUEwRTtBQUMxRSxzRUFBK0U7QUFDL0UsMEVBQTBFO0FBQzFFLHlGQUF5RjtBQUV6Rix1REFBdUQ7QUFFdkQsaURBR2lDO0FBRWpDLE9BQU87QUFFUCxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFL0QsbUJBQW1CO0FBQ25CLGFBQWE7QUFDYixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWhFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDNUMsd0JBQXdCO1FBQ3hCLElBQUEseUJBQW1CLEdBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztDQUNOO0FBRUQsQ0FBQyxHQUFTLEVBQUU7SUFDUixtQkFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDNUIsU0FBUyxFQUFFLGNBQWM7UUFDekIsa0NBQWtDO0tBQ3JDLENBQUMsQ0FBQztJQUNILG1CQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDeEMsT0FBTyxFQUFFLEdBQUc7UUFDWixHQUFHLEVBQUUsQ0FBQztLQUNULENBQUMsQ0FBQztJQUNILG1CQUFVLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRTtRQUNwQyxPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztRQUM5QyxPQUFPLEVBQUUsR0FBRztLQUNmLENBQUMsQ0FBQztJQUNILG1CQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDdkMsR0FBRyxFQUFFLENBQUM7S0FDVCxDQUFDLENBQUM7SUFDSCxtQkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDNUMsaUJBQWlCLEVBQUU7WUFDZixZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksS0FBSyxLQUFLLGNBQWMsRUFBRTtvQkFDMUIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUNsQix3Q0FBd0MsQ0FDM0MsQ0FBQztpQkFDTDtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDO1NBQ0o7S0FDSixDQUFDLENBQUM7SUFDSCx5QkFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDakMsU0FBUyxFQUFFLGNBQWM7UUFDekIsa0NBQWtDO0tBQ3JDLENBQUMsQ0FBQztJQUNILHlCQUFlLENBQUMsZUFBZSxDQUMzQixDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLEVBQzFEO1FBQ0ksU0FBUyxFQUFFLFVBQVU7UUFDckIsa0NBQWtDO0tBQ3JDLENBQ0osQ0FBQztJQUNGLHlCQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxFQUFFO1FBQ3hELFNBQVMsRUFBRSxRQUFRO0tBQ3RCLENBQUMsQ0FBQztJQUNILHlCQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNoRCxnQkFBZ0IsRUFBRTtZQUNkLE1BQU0sRUFBRSxHQUFHO1NBQ2Q7UUFDRCxVQUFVLEVBQUU7WUFDUixNQUFNLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLENBQUM7YUFDWDtTQUNKO0tBQ0osQ0FBQyxDQUFDO0lBRUgsaUJBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbEIsYUFBYTtJQUNiLElBQUEsMkJBQWlCLEdBQUUsQ0FBQztJQUVwQixXQUFXO0lBQ1gsSUFBQSxrQ0FBOEIsR0FBRSxDQUFDO0lBQ2pDLElBQUEsdUJBQW9CLEdBQUUsQ0FBQztJQUN2QixJQUFBLDJCQUF3QixHQUFFLENBQUM7SUFDM0IsSUFBQSw0QkFBeUIsR0FBRSxDQUFDO0lBQzVCLDRCQUE0QjtJQUU1QixhQUFhO0lBQ2IsSUFBQSxpQ0FBNkIsR0FBRSxDQUFDO0lBQ2hDLElBQUEsMkJBQXdCLEdBQUUsQ0FBQztJQUMzQixJQUFBLG9DQUFnQyxHQUFFLENBQUM7SUFDbkMsSUFBQSwwQkFBMkIsR0FBRSxDQUFDO0lBQzlCLElBQUEsMkJBQXdCLEdBQUUsQ0FBQztJQUMzQixJQUFBLGlDQUE2QixHQUFFLENBQUM7SUFDaEMsSUFBQSxvQ0FBZ0MsR0FBRSxDQUFDO0lBQ25DLElBQUEsK0JBQTJCLEdBQUUsQ0FBQztJQUM5QixJQUFBLG1DQUErQixHQUFFLENBQUM7SUFFbEMsbUJBQW1CO0lBQ25CLDBCQUEwQjtJQUMxQixpQ0FBaUM7SUFDakMsSUFBQSxpQkFBbUIsR0FBRSxDQUFDO0lBQ3RCLElBQUEsbUJBQXFCLEdBQUUsQ0FBQztJQUN4QixJQUFBLG1CQUFxQixHQUFFLENBQUM7SUFDeEIsSUFBQSwwQkFBNEIsR0FBRSxDQUFDO0lBQy9CLElBQUEsd0JBQTBCLEdBQUUsQ0FBQztJQUM3QixJQUFBLDBCQUFtQixHQUFFLENBQUM7SUFDdEIsSUFBQSxvQkFBbUIsR0FBRSxDQUFDO0lBRXRCLFlBQVk7SUFDWix1Q0FBdUM7SUFDdkMsaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQiwrQkFBK0I7SUFDL0IsZ0NBQWdDO0lBQ2hDLCtCQUErQjtJQUMvQixvQ0FBb0M7SUFDcEMsaURBQWlEO0lBQ2pELHVDQUF1QztJQUN2QywrQkFBK0I7SUFDL0IsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixhQUFhO0lBQ2IsV0FBVztJQUNYLFNBQVM7SUFDVCxPQUFPO0lBQ1AsTUFBTTtJQUVOLHlCQUF5QjtJQUN6QixJQUFBLHlCQUFtQixFQUFDLHlCQUF5QixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==