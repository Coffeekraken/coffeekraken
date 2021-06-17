import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
// search shortcut
__hotkey('cmd+p').on('press', (e) => {
    // prevent behavior
    e.cancelBubble = true;
    e.preventDefault();
    e.stopImmediatePropagation();
    // svcroll to top
    __scrollTo(document.body);
    // focus in search input
    // @ts-ignore
    document.querySelector('#search-input > input').focus();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jU2hvcnRjdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb2NTaG9ydGN1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RCxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUVwRSxrQkFBa0I7QUFDbEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNoQyxtQkFBbUI7SUFDbkIsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQzdCLGlCQUFpQjtJQUNqQixVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLHdCQUF3QjtJQUN4QixhQUFhO0lBQ2IsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzVELENBQUMsQ0FBQyxDQUFDIn0=