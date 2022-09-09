import { __hotkey } from '@coffeekraken/sugar/keyboard';
// search shortcut
__hotkey('cmd+p').on('press', (e) => {
    // prevent behavior
    e.cancelBubble = true;
    e.preventDefault();
    e.stopImmediatePropagation();
    // svcroll to top
    // __scrollTo(document.body);
    // focus in search input
    // @ts-ignore
    document.querySelector('#search-input > input').focus();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUd4RCxrQkFBa0I7QUFDbEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNsQyxtQkFBbUI7SUFDbkIsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQzdCLGlCQUFpQjtJQUNqQiw2QkFBNkI7SUFDN0Isd0JBQXdCO0lBQ3hCLGFBQWE7SUFDYixRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDMUQsQ0FBQyxDQUFDLENBQUMifQ==