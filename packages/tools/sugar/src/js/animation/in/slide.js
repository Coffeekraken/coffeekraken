// @ts-nocheck
import __uniqid from '../../../shared/string/uniqid';
import __parseArgs from '../../../shared/string/parseArgs';
import __querySelectorLive from '../../dom/querySelectorLive';
/**
 * @todo        documentation
 */
export default (() => {
    __querySelectorLive('[slide-in]', ($item) => {
        // generate a unique id for this node
        const uniqClass = `slide-in-${__uniqid()}`;
        $item.classList.add(uniqClass);
        // parse the slide-in value
        const slideInValue = $item.getAttribute('slide-in');
        const args = __parseArgs(slideInValue, {
            x: 'Number -x --x "0"',
            y: 'Number -y --y "0"',
            duration: 'Number -d --duration "500"',
            delay: 'Number --delay "0"',
            when: 'String -w --when "inViewport"'
        });
        // generate the animation css
        const css = `
      [slide-in].${uniqClass} {
        opacity: 0;
        transform: translate(${args.x.value || 0}px, ${args.y.value || 0}px);

      }
    `;
        const cssIn = `
      [slide-in].${uniqClass}.in {
        transition: all ${args.duration.value / 1000 || '0.5'}s;
        opacity: 1;
        transform: translate(0, 0);
      }
    `;
        // append the css into the section
        document.head.innerHTML += `
      <style id="${uniqClass}">
        ${css}
      </style>
    `;
        setTimeout(() => {
            document.head.innerHTML += `
        <style id="${uniqClass}-in">
          ${cssIn}
        </style>
      `;
        }, 100);
        // add the "in" class
        setTimeout(() => {
            $item.classList.add('in');
        }, args.delay.value);
        setTimeout(() => {
            const $style = document.querySelector(`style#${uniqClass}`);
            if ($style)
                $style.parentNode.removeChild($style);
            const $styleIn = document.querySelector(`style#${uniqClass}-in`);
            if ($styleIn)
                $styleIn.parentNode.removeChild($styleIn);
        }, args.delay.value + args.duration.value);
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sK0JBQStCLENBQUM7QUFDckQsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxtQkFBbUIsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RDs7R0FFRztBQUVILGVBQWUsQ0FBQyxHQUFHLEVBQUU7SUFDbkIsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDMUMscUNBQXFDO1FBQ3JDLE1BQU0sU0FBUyxHQUFHLFlBQVksUUFBUSxFQUFFLEVBQUUsQ0FBQztRQUMzQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUvQiwyQkFBMkI7UUFDM0IsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsWUFBWSxFQUFFO1lBQ3JDLENBQUMsRUFBRSxtQkFBbUI7WUFDdEIsQ0FBQyxFQUFFLG1CQUFtQjtZQUN0QixRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsSUFBSSxFQUFFLCtCQUErQjtTQUN0QyxDQUFDLENBQUM7UUFFSCw2QkFBNkI7UUFDN0IsTUFBTSxHQUFHLEdBQUc7bUJBQ0csU0FBUzs7K0JBRUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7OztLQUduRSxDQUFDO1FBQ0YsTUFBTSxLQUFLLEdBQUc7bUJBQ0MsU0FBUzswQkFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSzs7OztLQUl4RCxDQUFDO1FBRUYsa0NBQWtDO1FBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJO21CQUNaLFNBQVM7VUFDbEIsR0FBRzs7S0FFUixDQUFDO1FBQ0YsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJO3FCQUNaLFNBQVM7WUFDbEIsS0FBSzs7T0FFVixDQUFDO1FBQ0osQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVIscUJBQXFCO1FBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDNUQsSUFBSSxNQUFNO2dCQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxTQUFTLEtBQUssQ0FBQyxDQUFDO1lBQ2pFLElBQUksUUFBUTtnQkFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxFQUFFLENBQUMifQ==