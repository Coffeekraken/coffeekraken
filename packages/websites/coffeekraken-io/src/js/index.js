import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import { define as __SCodeExampleComponentDefine } from "@coffeekraken/s-code-example-component";
import "@coffeekraken/s-handlebars-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import './components/docNav.riot';
// generic
import "./generic/docShortcut";
__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyle: true,
    defaultStyleClasses: {
        main: 's-tabs'
    }
});
// webcomponents
__SCodeExampleComponentDefine();
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
// features
__smoothScroll({
    scroll: {
        offset: 188
    }
});
document.addEventListener('scroll', (e) => {
    if (document.body.scrollTop >= 10) {
        document.body.classList.add('scrolled');
    }
    else {
        document.body.classList.remove('scrolled');
    }
});
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sb0NBQW9DLENBQUM7QUFDNUMsT0FBTywyQ0FBMkMsQ0FBQztBQUNuRCxPQUFPLG1DQUFtQyxDQUFDO0FBQzNDLE9BQWdDLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUgsT0FBTyxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8saUNBQWlDLE1BQU0sNkRBQTZELENBQUM7QUFFNUcsT0FBTywwQkFBMEIsQ0FBQztBQUVsQyxVQUFVO0FBQ1YsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUU7SUFDaEQsZUFBZSxFQUFFLEtBQUs7SUFDdEIsWUFBWSxFQUFFLElBQUk7SUFDbEIsbUJBQW1CLEVBQUU7UUFDakIsSUFBSSxFQUFFLFFBQVE7S0FDakI7Q0FDSixDQUFDLENBQUM7QUFHSCxnQkFBZ0I7QUFDaEIsNkJBQTZCLEVBQUUsQ0FBQztBQUVoQyxXQUFXO0FBQ1gsT0FBTyxjQUFjLE1BQU0sNkNBQTZDLENBQUM7QUFFekUsV0FBVztBQUNYLGNBQWMsQ0FBQztJQUNiLE1BQU0sRUFBRTtRQUNOLE1BQU0sRUFBRSxHQUFHO0tBQ1o7Q0FDRixDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDeEMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLEVBQUU7UUFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3pDO1NBQU07UUFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILGlDQUFpQyxFQUFFLENBQUMifQ==