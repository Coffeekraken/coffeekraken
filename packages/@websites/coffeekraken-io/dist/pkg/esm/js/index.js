var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define as __sActivateFeature } from "@coffeekraken/s-activate-feature";
import { define as __sAppearFeature } from "@coffeekraken/s-appear-feature";
import { define as __SCodeExampleWebcomponent } from "@coffeekraken/s-code-example-component";
import { define as __SColorPickerComponent } from "@coffeekraken/s-color-picker-component";
import { define as __SDatetimePickerComponent } from "@coffeekraken/s-datetime-picker-component";
import __SFeature from "@coffeekraken/s-feature";
import { define as __SFiltrableInputComponent } from "@coffeekraken/s-filtrable-input-component";
import { define as __sFloatingFeature } from "@coffeekraken/s-floating-feature";
import { define as __sFormValidateFeature } from "@coffeekraken/s-form-validate-feature";
import { define as __sInlineFeature } from "@coffeekraken/s-inline-feature";
import { define as __sPageTransitionFeature } from "@coffeekraken/s-page-transition-feature";
import { define as __SRatingComponent } from "@coffeekraken/s-rating-component";
import { define as __sRefocusFeature } from "@coffeekraken/s-refocus-feature";
import { define as __SScrollComponent } from "@coffeekraken/s-scroll-component";
import { define as __SSliderComponent, SSliderSlideableBehavior, } from "@coffeekraken/s-slider-component";
import { define as __sSugarFeature } from "@coffeekraken/s-sugar-feature";
import { define as __SThemeSwitcherComponent } from "@coffeekraken/s-theme-switcher-component";
import __SLitComponent from "@coffeekraken/s-lit-component";
import { define as __SSidePanelWebcomponent } from "@coffeekraken/s-panel-component";
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
import { define as __SRangeWebcomponent } from "@coffeekraken/s-range-component";
// Components
// import { define as __CKBlobComponent } from './components/CkBlob';
import { define as __CKDiscoverComponent } from "./components/CKDiscover";
import { define as __CKDiscoverTabedComponent } from "./components/CKDiscoverTabed";
import { define as __CKDocSubNavComponent } from "./components/CKDocSubNav/CKDocSubNav";
import { define as __CkFallingStarsComponent } from "./components/CkFallingStars";
import { define as __CKRatingsComponent } from "./components/CKRating";
import { define as __CKSearchComponent } from "./components/CKSearch";
import { define as __CKSettingsComponent } from "./components/CkSettings";
import { define as __CKWelcomeRatingsComponent } from "./components/CKWelcomeRatings";
// import { define as __VersionSelector } from './components/VersionSelector';
// others
import __SConductor from "@coffeekraken/s-conductor";
// import __SDashboard from '@coffeekraken/s-dashboard';
import __STheme from "@coffeekraken/s-theme";
// import __SCssAnimation from '@coffeekraken/s-css-animation';
// @ts-ignore
const viewsRelated = import.meta.globEager("../views/**/*.ts");
// @ts-ignore
const forDocRelated = import.meta.globEager("./forDoc/**/*.ts");
// setup conductor
__SConductor.setup({
    log: true,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    __SFeature.setDefaultProps("*", {
        mountWhen: "nearViewport",
    });
    __SLitComponent.setDefaultProps("*", {
        mountWhen: "nearViewport",
    });
    __SLitComponent.setDefaultProps(["s-panel", "ck-settings"], {
        mountWhen: "direct",
    });
    __SLitComponent.setDefaultProps(["s-code-example"], {
        scrollToSettings: {
            offset: 100,
        },
    });
    // init theme
    __STheme.init();
    // features
    __sActivateFeature();
    __sPageTransitionFeature();
    // internal components
    // __VersionSelector();
    __CKSearchComponent();
    __CkFallingStarsComponent();
    __CKWelcomeRatingsComponent();
    // components
    __CKDiscoverComponent();
    __CKDiscoverTabedComponent();
    __CKSettingsComponent();
    __CKRatingsComponent();
    __CKDocSubNavComponent();
    __SCodeExampleWebcomponent();
    __SFiltrableInputComponent();
    __SSidePanelWebcomponent();
    __SRatingComponent();
    __SColorPickerComponent();
    __SDatetimePickerComponent();
    __SScrollComponent();
    __SRangeWebcomponent();
    __SThemeSwitcherComponent();
    __SSliderComponent({
        behaviors: {
            slideable: {
                class: SSliderSlideableBehavior,
                settings: {},
            },
            // cssAnimation: {
            //     class: SSliderCssAnimationBehavior,
            //     settings: {},
            // },
        },
    });
    // features
    __sSugarFeature();
    __sFloatingFeature();
    __sAppearFeature();
    __sRefocusFeature();
    __sInlineFeature();
    // __sParallaxFeature();
    __sFormValidateFeature({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakcsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekYsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RixPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQ0wsTUFBTSxJQUFJLGtCQUFrQixFQUM1Qix3QkFBd0IsR0FD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