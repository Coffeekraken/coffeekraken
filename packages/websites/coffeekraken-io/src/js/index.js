import '@coffeekraken/s-inline-svg-component';
import "@coffeekraken/s-request-component";
import { webcomponent as __SCodeExampleWebcomponent } from "@coffeekraken/s-code-example-component";
import { webcomponent as __SActivateWebcomponent } from "@coffeekraken/s-activate-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { webcomponent as __DocNavComponent } from './components/docNav';
import { webcomponent as __VersionSelector } from './components/VersionSelector';
// generic
// import "./generic/docShortcut";
// internal components
__DocNavComponent();
__VersionSelector();
__SComponentUtils.setDefaultProps('*', {
    mountWhen: 'inViewport'
});
__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyle: true,
    adoptStyles: ['main'],
    defaultStyleClasses: {
        main: 's-tabs'
    }
});
// webcomponents
__SCodeExampleWebcomponent();
__SActivateWebcomponent();
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
// features
__smoothScroll({
    scroll: {
        offset: 188
    }
});
__linksStateAttributes();
document.addEventListener('scroll', (e) => {
    if (document.body.scrollTop >= 10) {
        document.body.classList.add('scrolled');
    }
    else {
        document.body.classList.remove('scrolled');
    }
});
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sbUNBQW1DLENBQUM7QUFDM0MsT0FBZ0MsRUFBRSxZQUFZLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3SCxPQUE2QixFQUFFLFlBQVksSUFBSSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25ILE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxpQ0FBaUMsTUFBTSw2REFBNkQsQ0FBQztBQUU1RyxPQUFPLEVBQUUsWUFBWSxJQUFJLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksSUFBSSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWpGLFVBQVU7QUFDVixrQ0FBa0M7QUFFbEMsc0JBQXNCO0FBQ3RCLGlCQUFpQixFQUFFLENBQUM7QUFDcEIsaUJBQWlCLEVBQUUsQ0FBQztBQUVwQixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO0lBQ3JDLFNBQVMsRUFBRSxZQUFZO0NBQ3hCLENBQUMsQ0FBQztBQUNILGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRTtJQUNoRCxlQUFlLEVBQUUsS0FBSztJQUN0QixZQUFZLEVBQUUsSUFBSTtJQUNsQixXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckIsbUJBQW1CLEVBQUU7UUFDakIsSUFBSSxFQUFFLFFBQVE7S0FDakI7Q0FDSixDQUFDLENBQUM7QUFFSCxnQkFBZ0I7QUFDaEIsMEJBQTBCLEVBQUUsQ0FBQztBQUM3Qix1QkFBdUIsRUFBRSxDQUFDO0FBRTFCLFdBQVc7QUFDWCxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLHNCQUFzQixNQUFNLHFEQUFxRCxDQUFDO0FBRXpGLFdBQVc7QUFDWCxjQUFjLENBQUM7SUFDYixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUUsR0FBRztLQUNaO0NBQ0YsQ0FBQyxDQUFDO0FBQ0gsc0JBQXNCLEVBQUUsQ0FBQztBQUV6QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDeEMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLEVBQUU7UUFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3pDO1NBQU07UUFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILGlDQUFpQyxFQUFFLENBQUMifQ==