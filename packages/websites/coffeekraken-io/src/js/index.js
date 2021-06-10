import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
__SComponentUtils.setDefaultProps('s-filtrable-input', {
    noItemText: 'Yplop'
});
const start = Date.now();
__querySelectorLive('[class*="s-"][class*=":"]', ($elm) => {
    Array.from($elm.classList).forEach((cls) => {
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
console.log("coco", Date.now() - start);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sb0NBQW9DLENBQUM7QUFDNUMsT0FBTywyQ0FBMkMsQ0FBQztBQUNuRCxPQUFPLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxtQkFBbUIsTUFBTSxvREFBb0QsQ0FBQztBQUVyRixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEVBQUU7SUFDbkQsVUFBVSxFQUFFLE9BQU87Q0FDdEIsQ0FBQyxDQUFDO0FBR0gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRXpCLG1CQUFtQixDQUFDLDJCQUEyQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDeEQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTztRQUMvQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsT0FBTztZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyJ9