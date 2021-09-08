import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-request-component';
import { webcomponent as __SCodeExampleWebcomponent, } from '@coffeekraken/s-code-example-component';
import { webcomponent as __SConfigExplorerWebcomponent, } from '@coffeekraken/s-config-explorer-component';
import { webcomponent as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
import { define as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { define as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { define as __DocNavComponent } from './components/docNav';
import { define as __VersionSelector } from './components/VersionSelector';
import { define as __CkSettingsWebcomponent } from './components/CkSettings';
import { register as __sActivateFeature } from '@coffeekraken/s-activate-feature';
// generic
// import "./generic/docShortcut";
// internal components
__DocNavComponent();
__VersionSelector();
__CkSettingsWebcomponent();
__SLitComponent.setDefaultProps('*', {
    mountWhen: 'inViewport',
    // mountWhen: 'directly',
    defaultStyle: true,
});
// __SLitComponent.setDefaultProps(['s-side-panel', 'ck-settings'], {
//   mountWhen: 'direct'
// });
__SLitComponent.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyleClasses: {
        main: 's-tabs',
    },
});
// webcomponents
__SCodeExampleWebcomponent();
__SConfigExplorerWebcomponent();
__SSidePanelWebcomponent();
__SColorPickerWebcomponent();
__SDatePickerWebcomponent();
__SRangeWebcomponent();
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
__sActivateFeature();
__smoothScroll({
    scroll: {
        offset: 188,
    },
});
__linksStateAttributes();
// document.addEventListener('scroll', (e) => {
//     if (document.body.scrollTop >= 10) {
//         document.body.classList.add('scrolled');
//     } else {
//         document.body.classList.remove('scrolled');
//     }
// });
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sbUNBQW1DLENBQUM7QUFDM0MsT0FBZ0MsRUFDNUIsWUFBWSxJQUFJLDBCQUEwQixHQUM3QyxNQUFNLHdDQUF3QyxDQUFDO0FBRWhELE9BQTBCLEVBQ3RCLFlBQVksSUFBSSw2QkFBNkIsR0FDaEQsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRCxPQUFxQixFQUFFLFlBQVksSUFBSSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlHLE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM1RixPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDOUYsT0FBTyxFQUFFLE1BQU0sSUFBSSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2pGLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8saUNBQWlDLE1BQU0sNkRBQTZELENBQUM7QUFFNUcsT0FBTyxFQUFFLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFN0UsT0FBTyxFQUFFLFFBQVEsSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRWxGLFVBQVU7QUFDVixrQ0FBa0M7QUFFbEMsc0JBQXNCO0FBQ3RCLGlCQUFpQixFQUFFLENBQUM7QUFDcEIsaUJBQWlCLEVBQUUsQ0FBQztBQUNwQix3QkFBd0IsRUFBRSxDQUFDO0FBRTNCLGVBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO0lBQ2pDLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLHlCQUF5QjtJQUN6QixZQUFZLEVBQUUsSUFBSTtDQUNyQixDQUFDLENBQUM7QUFDSCxxRUFBcUU7QUFDckUsd0JBQXdCO0FBQ3hCLE1BQU07QUFDTixlQUFlLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFO0lBQzlDLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLG1CQUFtQixFQUFFO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2pCO0NBQ0osQ0FBQyxDQUFDO0FBRUgsZ0JBQWdCO0FBQ2hCLDBCQUEwQixFQUFFLENBQUM7QUFDN0IsNkJBQTZCLEVBQUUsQ0FBQztBQUNoQyx3QkFBd0IsRUFBRSxDQUFDO0FBQzNCLDBCQUEwQixFQUFFLENBQUM7QUFDN0IseUJBQXlCLEVBQUUsQ0FBQztBQUM1QixvQkFBb0IsRUFBRSxDQUFDO0FBRXZCLFdBQVc7QUFDWCxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLHNCQUFzQixNQUFNLHFEQUFxRCxDQUFDO0FBRXpGLGtCQUFrQixFQUFFLENBQUM7QUFFckIsY0FBYyxDQUFDO0lBQ1gsTUFBTSxFQUFFO1FBQ0osTUFBTSxFQUFFLEdBQUc7S0FDZDtDQUNKLENBQUMsQ0FBQztBQUNILHNCQUFzQixFQUFFLENBQUM7QUFFekIsK0NBQStDO0FBQy9DLDJDQUEyQztBQUMzQyxtREFBbUQ7QUFDbkQsZUFBZTtBQUNmLHNEQUFzRDtBQUN0RCxRQUFRO0FBQ1IsTUFBTTtBQUVOLGlDQUFpQyxFQUFFLENBQUMifQ==