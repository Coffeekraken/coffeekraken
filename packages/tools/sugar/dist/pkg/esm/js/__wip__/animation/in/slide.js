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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRCxPQUFPLG1CQUFtQixNQUFNLDZCQUE2QixDQUFDO0FBRTlEOztHQUVHO0FBRUgsZUFBZSxDQUFDLEdBQUcsRUFBRTtJQUNuQixtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMxQyxxQ0FBcUM7UUFDckMsTUFBTSxTQUFTLEdBQUcsWUFBWSxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQzNDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRS9CLDJCQUEyQjtRQUMzQixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxZQUFZLEVBQUU7WUFDckMsQ0FBQyxFQUFFLG1CQUFtQjtZQUN0QixDQUFDLEVBQUUsbUJBQW1CO1lBQ3RCLFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsS0FBSyxFQUFFLG9CQUFvQjtZQUMzQixJQUFJLEVBQUUsK0JBQStCO1NBQ3RDLENBQUMsQ0FBQztRQUVILDZCQUE2QjtRQUM3QixNQUFNLEdBQUcsR0FBRzttQkFDRyxTQUFTOzsrQkFFRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQzs7O0tBR25FLENBQUM7UUFDRixNQUFNLEtBQUssR0FBRzttQkFDQyxTQUFTOzBCQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLOzs7O0tBSXhELENBQUM7UUFFRixrQ0FBa0M7UUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUk7bUJBQ1osU0FBUztVQUNsQixHQUFHOztLQUVSLENBQUM7UUFDRixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUk7cUJBQ1osU0FBUztZQUNsQixLQUFLOztPQUVWLENBQUM7UUFDSixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFUixxQkFBcUI7UUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUM1RCxJQUFJLE1BQU07Z0JBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLFNBQVMsS0FBSyxDQUFDLENBQUM7WUFDakUsSUFBSSxRQUFRO2dCQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFELENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9