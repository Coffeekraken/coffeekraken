import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-request-component';
import { webcomponent as __SCodeExampleWebcomponent, } from '@coffeekraken/s-code-example-component';
import { webcomponent as __SConfigExplorerWebcomponent, } from '@coffeekraken/s-config-explorer-component';
import { webcomponent as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
import { webcomponent as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { webcomponent as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { webcomponent as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { webcomponent as __DocNavComponent } from './components/docNav';
import { webcomponent as __VersionSelector } from './components/VersionSelector';
import { webcomponent as __CkSettingsWebcomponent } from './components/CkSettings';
import { register as __sActivateFeature } from '@coffeekraken/s-activate-feature';
// generic
// import "./generic/docShortcut";
// internal components
__DocNavComponent();
__VersionSelector();
__CkSettingsWebcomponent();
__SComponentUtils.setDefaultProps('*', {
    mountWhen: 'inViewport',
    // mountWhen: 'directly',
    defaultStyle: true,
});
// __SComponentUtils.setDefaultProps(['s-side-panel', 'ck-settings'], {
//   mountWhen: 'direct'
// });
__SComponentUtils.setDefaultProps('s-code-example', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sbUNBQW1DLENBQUM7QUFDM0MsT0FBZ0MsRUFDNUIsWUFBWSxJQUFJLDBCQUEwQixHQUM3QyxNQUFNLHdDQUF3QyxDQUFDO0FBRWhELE9BQTBCLEVBQ3RCLFlBQVksSUFBSSw2QkFBNkIsR0FDaEQsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRCxPQUFxQixFQUFFLFlBQVksSUFBSSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlHLE9BQU8sRUFBRSxZQUFZLElBQUkseUJBQXlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNsRyxPQUFPLEVBQUUsWUFBWSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEcsT0FBTyxFQUFFLFlBQVksSUFBSSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZGLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxpQ0FBaUMsTUFBTSw2REFBNkQsQ0FBQztBQUU1RyxPQUFPLEVBQUUsWUFBWSxJQUFJLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksSUFBSSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxZQUFZLElBQUksd0JBQXdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVuRixPQUFPLEVBQUUsUUFBUSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFbEYsVUFBVTtBQUNWLGtDQUFrQztBQUVsQyxzQkFBc0I7QUFDdEIsaUJBQWlCLEVBQUUsQ0FBQztBQUNwQixpQkFBaUIsRUFBRSxDQUFDO0FBQ3BCLHdCQUF3QixFQUFFLENBQUM7QUFFM0IsaUJBQWlCLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtJQUNuQyxTQUFTLEVBQUUsWUFBWTtJQUN2Qix5QkFBeUI7SUFDekIsWUFBWSxFQUFFLElBQUk7Q0FDckIsQ0FBQyxDQUFDO0FBQ0gsdUVBQXVFO0FBQ3ZFLHdCQUF3QjtBQUN4QixNQUFNO0FBQ04saUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFO0lBQ2hELGVBQWUsRUFBRSxLQUFLO0lBQ3RCLG1CQUFtQixFQUFFO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2pCO0NBQ0osQ0FBQyxDQUFDO0FBRUgsZ0JBQWdCO0FBQ2hCLDBCQUEwQixFQUFFLENBQUM7QUFDN0IsNkJBQTZCLEVBQUUsQ0FBQztBQUNoQyx3QkFBd0IsRUFBRSxDQUFDO0FBQzNCLDBCQUEwQixFQUFFLENBQUM7QUFDN0IseUJBQXlCLEVBQUUsQ0FBQztBQUM1QixvQkFBb0IsRUFBRSxDQUFDO0FBRXZCLFdBQVc7QUFDWCxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLHNCQUFzQixNQUFNLHFEQUFxRCxDQUFDO0FBRXpGLGtCQUFrQixFQUFFLENBQUM7QUFFckIsY0FBYyxDQUFDO0lBQ1gsTUFBTSxFQUFFO1FBQ0osTUFBTSxFQUFFLEdBQUc7S0FDZDtDQUNKLENBQUMsQ0FBQztBQUNILHNCQUFzQixFQUFFLENBQUM7QUFFekIsK0NBQStDO0FBQy9DLDJDQUEyQztBQUMzQyxtREFBbUQ7QUFDbkQsZUFBZTtBQUNmLHNEQUFzRDtBQUN0RCxRQUFRO0FBQ1IsTUFBTTtBQUVOLGlDQUFpQyxFQUFFLENBQUMifQ==