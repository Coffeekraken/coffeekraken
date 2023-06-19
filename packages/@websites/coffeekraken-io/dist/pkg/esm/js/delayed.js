var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Components
// import { __define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
import { __define as __SClipboardCopyComponent } from '@coffeekraken/s-clipboard-copy-component';
import { __define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
import { __define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
import { __define as __SRatingComponent } from '@coffeekraken/s-rating-component';
import { __define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import { __define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';
// Features
import { __define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { __define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { __define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { __define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
// Website specific
import { __define as __SRangeComponent } from '@coffeekraken/s-range-component';
// import { __define as __CKBlobComponent } from './components/CkBlob';
import { __define as __CKDiscoverComponent } from './components/CKDiscover';
import { __define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed';
// import { __define as __CKDocSubNavComponent } from './components/CKDocSubNav/CKDocSubNav';
// import { __define as __CkFallingStarsComponent } from './components/CkFallingStars';
// import { __define as __CKRatingsComponent } from './components/CKRating';
// import { __define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
// import __SDashboard from '@coffeekraken/s-dashboard';
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Components
    // __CKRatingsComponent();
    __SClipboardCopyComponent();
    __SRatingComponent();
    __SColorPickerComponent();
    __SDatetimePickerComponent();
    __SScrollComponent();
    __SRangeComponent();
    __SThemeSwitcherComponent();
    // Features
    __sFloatingFeature();
    __sInlineFeature();
    // __sAppearFeature();
    // __sParallaxFeature();
    __sFormValidateFeature({
        customValidations: {
            coffeekraken: (value, helpers) => {
                if (value === 'coffeekraken') {
                    return helpers.message('Are you sure? Krakens are dangerous...');
                }
                return value;
            },
        },
    });
    // Website specific
    __CKDiscoverComponent();
    __CKDiscoverTabedComponent();
    // __CkFallingStarsComponent();
    // __CKWelcomeRatingsComponent();
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGFBQWE7QUFDYixpRkFBaUY7QUFDakYsT0FBTyxFQUFFLFFBQVEsSUFBSSx5QkFBeUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxRQUFRLElBQUksdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RixPQUFPLEVBQUUsUUFBUSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkcsT0FBTyxFQUFFLFFBQVEsSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxRQUFRLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsUUFBUSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFakcsV0FBVztBQUNYLE9BQU8sRUFBRSxRQUFRLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsUUFBUSxJQUFJLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDM0YsT0FBTyxFQUFFLFFBQVEsSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLHFGQUFxRjtBQUVyRixtQkFBbUI7QUFDbkIsT0FBTyxFQUFFLFFBQVEsSUFBSSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hGLHVFQUF1RTtBQUN2RSxPQUFPLEVBQUUsUUFBUSxJQUFJLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFFBQVEsSUFBSSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RGLDZGQUE2RjtBQUM3Rix1RkFBdUY7QUFDdkYsNEVBQTRFO0FBQzVFLDJGQUEyRjtBQUMzRix3REFBd0Q7QUFFeEQsQ0FBQyxHQUFTLEVBQUU7SUFDUixhQUFhO0lBQ2IsMEJBQTBCO0lBQzFCLHlCQUF5QixFQUFFLENBQUM7SUFDNUIsa0JBQWtCLEVBQUUsQ0FBQztJQUNyQix1QkFBdUIsRUFBRSxDQUFDO0lBQzFCLDBCQUEwQixFQUFFLENBQUM7SUFDN0Isa0JBQWtCLEVBQUUsQ0FBQztJQUNyQixpQkFBaUIsRUFBRSxDQUFDO0lBQ3BCLHlCQUF5QixFQUFFLENBQUM7SUFFNUIsV0FBVztJQUNYLGtCQUFrQixFQUFFLENBQUM7SUFDckIsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLHNCQUFzQixDQUFDO1FBQ25CLGlCQUFpQixFQUFFO1lBQ2YsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO2dCQUM3QixJQUFJLEtBQUssS0FBSyxjQUFjLEVBQUU7b0JBQzFCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FDbEIsd0NBQXdDLENBQzNDLENBQUM7aUJBQ0w7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKO0tBQ0osQ0FBQyxDQUFDO0lBRUgsbUJBQW1CO0lBQ25CLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsMEJBQTBCLEVBQUUsQ0FBQztJQUM3QiwrQkFBK0I7SUFDL0IsaUNBQWlDO0FBQ3JDLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9