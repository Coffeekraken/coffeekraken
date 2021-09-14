// import '@coffeekraken/s-inline-svg-component';
// import '@coffeekraken/s-request-component';
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import {
//     define as __SConfigExplorerWebcomponent,
// } from '@coffeekraken/s-config-explorer-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
import { define as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { define as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { define as __DocNavComponent } from './components/docNav';
import { define as __VersionSelector } from './components/VersionSelector';
import { define as __CkSettingsWebcomponent } from './components/CkSettings';
import { register as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { register as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
// internal components
__DocNavComponent();
__VersionSelector();
__CkSettingsWebcomponent();
__SLitComponent.setDefaultProps('*', {
    mountWhen: 'inViewport',
    defaultStyle: true,
});
__SLitComponent.setDefaultProps(['s-side-panel', 'ck-settings'], {
    mountWhen: 'direct',
});
// webcomponents
__SCodeExampleWebcomponent();
// __SConfigExplorerWebcomponent();
__SSidePanelWebcomponent();
__SColorPickerWebcomponent();
__SDatePickerWebcomponent();
__SRangeWebcomponent();
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
__sActivateFeature();
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
__smoothScroll({
    scroll: {
        offset: 188,
    },
});
__linksStateAttributes();
// // document.addEventListener('scroll', (e) => {
// //     if (document.body.scrollTop >= 10) {
// //         document.body.classList.add('scrolled');
// //     } else {
// //         document.body.classList.remove('scrolled');
// //     }
// // });
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpREFBaUQ7QUFDakQsOENBQThDO0FBQzlDLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RixXQUFXO0FBQ1gsK0NBQStDO0FBQy9DLHNEQUFzRDtBQUN0RCxPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsTUFBTSxJQUFJLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDakYsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxpQ0FBaUMsTUFBTSw2REFBNkQsQ0FBQztBQUU1RyxPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU3RSxPQUFPLEVBQUUsUUFBUSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEYsT0FBTyxFQUFFLFFBQVEsSUFBSSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTNGLHNCQUFzQjtBQUN0QixpQkFBaUIsRUFBRSxDQUFDO0FBQ3BCLGlCQUFpQixFQUFFLENBQUM7QUFDcEIsd0JBQXdCLEVBQUUsQ0FBQztBQUUzQixlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtJQUNqQyxTQUFTLEVBQUUsWUFBWTtJQUN2QixZQUFZLEVBQUUsSUFBSTtDQUNyQixDQUFDLENBQUM7QUFDSCxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxFQUFFO0lBQzdELFNBQVMsRUFBRSxRQUFRO0NBQ3RCLENBQUMsQ0FBQztBQUVILGdCQUFnQjtBQUNoQiwwQkFBMEIsRUFBRSxDQUFDO0FBQzdCLG1DQUFtQztBQUNuQyx3QkFBd0IsRUFBRSxDQUFDO0FBQzNCLDBCQUEwQixFQUFFLENBQUM7QUFDN0IseUJBQXlCLEVBQUUsQ0FBQztBQUM1QixvQkFBb0IsRUFBRSxDQUFDO0FBRXZCLFdBQVc7QUFDWCxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLHNCQUFzQixNQUFNLHFEQUFxRCxDQUFDO0FBRXpGLGtCQUFrQixFQUFFLENBQUM7QUFDckIsc0JBQXNCLENBQUM7SUFDbkIsaUJBQWlCLEVBQUU7UUFDZixZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxLQUFLLEtBQUssY0FBYyxFQUFFO2dCQUMxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsd0NBQXdDLENBQUMsQ0FBQzthQUNwRTtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7S0FDSjtDQUNKLENBQUMsQ0FBQztBQUVILGNBQWMsQ0FBQztJQUNYLE1BQU0sRUFBRTtRQUNKLE1BQU0sRUFBRSxHQUFHO0tBQ2Q7Q0FDSixDQUFDLENBQUM7QUFDSCxzQkFBc0IsRUFBRSxDQUFDO0FBRXpCLGtEQUFrRDtBQUNsRCw4Q0FBOEM7QUFDOUMsc0RBQXNEO0FBQ3RELGtCQUFrQjtBQUNsQix5REFBeUQ7QUFDekQsV0FBVztBQUNYLFNBQVM7QUFFVCxpQ0FBaUMsRUFBRSxDQUFDIn0=