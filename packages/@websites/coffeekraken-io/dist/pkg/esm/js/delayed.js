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
// import { define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
import { define as __SClipboardCopyComponent } from '@coffeekraken/s-clipboard-copy-component';
import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
import { define as __SRatingComponent } from '@coffeekraken/s-rating-component';
import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import { define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';
// Features
import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
// Website specific
import { define as __SRangeComponent } from '@coffeekraken/s-range-component';
// import { define as __CKBlobComponent } from './components/CkBlob';
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed';
// import { define as __CKDocSubNavComponent } from './components/CKDocSubNav/CKDocSubNav';
// import { define as __CkFallingStarsComponent } from './components/CkFallingStars';
// import { define as __CKRatingsComponent } from './components/CKRating';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGFBQWE7QUFDYiwrRUFBK0U7QUFDL0UsT0FBTyxFQUFFLE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFL0YsV0FBVztBQUNYLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekYsbUZBQW1GO0FBRW5GLG1CQUFtQjtBQUNuQixPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUscUVBQXFFO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLElBQUkscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDcEYsMkZBQTJGO0FBQzNGLHFGQUFxRjtBQUNyRiwwRUFBMEU7QUFDMUUseUZBQXlGO0FBQ3pGLHdEQUF3RDtBQUV4RCxDQUFDLEdBQVMsRUFBRTtJQUNSLGFBQWE7SUFDYiwwQkFBMEI7SUFDMUIseUJBQXlCLEVBQUUsQ0FBQztJQUM1QixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLHVCQUF1QixFQUFFLENBQUM7SUFDMUIsMEJBQTBCLEVBQUUsQ0FBQztJQUM3QixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLGlCQUFpQixFQUFFLENBQUM7SUFDcEIseUJBQXlCLEVBQUUsQ0FBQztJQUU1QixXQUFXO0lBQ1gsa0JBQWtCLEVBQUUsQ0FBQztJQUNyQixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLHNCQUFzQixDQUFDO1FBQ25CLGlCQUFpQixFQUFFO1lBQ2YsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO2dCQUM3QixJQUFJLEtBQUssS0FBSyxjQUFjLEVBQUU7b0JBQzFCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FDbEIsd0NBQXdDLENBQzNDLENBQUM7aUJBQ0w7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKO0tBQ0osQ0FBQyxDQUFDO0lBRUgsbUJBQW1CO0lBQ25CLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsMEJBQTBCLEVBQUUsQ0FBQztJQUM3QiwrQkFBK0I7SUFDL0IsaUNBQWlDO0FBQ3JDLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9