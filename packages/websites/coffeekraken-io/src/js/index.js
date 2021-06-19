import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import "@coffeekraken/s-code-example-component";
import "@coffeekraken/s-opengraph-viewer-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
// generic
import "./generic/docShortcut";
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
// features
__smoothScroll({
    scroll: {
        offset: 150
    }
});
__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyle: true,
    defaultStyleClasses: {
        main: 's-tabs s-tabs--gradient'
    }
});
__querySelectorLive('[class*="s-"][class*=":"]', ($elm) => {
    $elm.classList.forEach((cls) => {
        if (!cls.includes(':'))
            return;
        const parts = cls.split(":");
        const startCls = parts[0];
        $elm.classList.add(startCls);
        parts.forEach((p, i) => {
            if (i <= 0)
                return;
            $elm.classList.add(`${startCls}--${p}`);
        });
        $elm.classList.remove(cls);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sb0NBQW9DLENBQUM7QUFDNUMsT0FBTywyQ0FBMkMsQ0FBQztBQUNuRCxPQUFPLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sd0NBQXdDLENBQUM7QUFDaEQsT0FBTyw0Q0FBNEMsQ0FBQztBQUNwRCxPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sbUJBQW1CLE1BQU0sb0RBQW9ELENBQUM7QUFFckYsVUFBVTtBQUNWLE9BQU8sdUJBQXVCLENBQUM7QUFFL0IsV0FBVztBQUNYLE9BQU8sY0FBYyxNQUFNLDZDQUE2QyxDQUFDO0FBRXpFLFdBQVc7QUFDWCxjQUFjLENBQUM7SUFDYixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUUsR0FBRztLQUNaO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFO0lBQ2hELGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLG1CQUFtQixFQUFFO1FBQ2pCLElBQUksRUFBRSx5QkFBeUI7S0FDbEM7Q0FDSixDQUFDLENBQUM7QUFFSCxtQkFBbUIsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFFOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTztRQUMvQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsT0FBTztZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9