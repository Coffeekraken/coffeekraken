import __uniqid from '../../string/uniqid';
export default function reloadStylesheets(settings) {
    var _a;
    const finalSettings = Object.assign({ $root: document }, (settings !== null && settings !== void 0 ? settings : {}));
    // loop on all stylesheetgs link and add the timestamp in
    Array.from((_a = finalSettings.$root.querySelectorAll('link[rel=stylesheet]')) !== null && _a !== void 0 ? _a : []).forEach(($link) => {
        var _a;
        const id = (_a = $link.id) !== null && _a !== void 0 ? _a : __uniqid();
        // clone the link element
        const $newLink = $link.cloneNode();
        $newLink.href = $link.href.replace(/\?.*|$/, '?' + Date.now());
        // listen when fully loaded
        $newLink.addEventListener('load', (e) => {
            var _a;
            // remove old css's
            Array.from((_a = finalSettings.$root.querySelectorAll(`link[id="${id}"]`)) !== null && _a !== void 0 ? _a : []).forEach(($remove) => {
                if ($remove === $newLink)
                    return;
                $remove.remove();
            });
        });
        // add the new link after the one to reload
        $link.after($newLink);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBNkIzQyxNQUFNLENBQUMsT0FBTyxVQUFVLGlCQUFpQixDQUNyQyxRQUE4Qzs7SUFFOUMsTUFBTSxhQUFhLG1CQUNmLEtBQUssRUFBRSxRQUFRLElBQ1osQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUNGLHlEQUF5RDtJQUN6RCxLQUFLLENBQUMsSUFBSSxDQUNOLE1BQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxtQ0FBSSxFQUFFLENBQ3JFLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7O1FBQ2hCLE1BQU0sRUFBRSxHQUFHLE1BQUEsS0FBSyxDQUFDLEVBQUUsbUNBQUksUUFBUSxFQUFFLENBQUM7UUFFbEMseUJBQXlCO1FBQ3pCLE1BQU0sUUFBUSxHQUFvQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEQsUUFBUSxDQUFDLElBQUksR0FBcUIsS0FBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQ2pELFFBQVEsRUFDUixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUNuQixDQUFDO1FBQ0YsMkJBQTJCO1FBQzNCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7WUFDcEMsbUJBQW1CO1lBQ25CLEtBQUssQ0FBQyxJQUFJLENBQ04sTUFBQSxhQUFhLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsbUNBQUksRUFBRSxDQUNqRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNsQixJQUFJLE9BQU8sS0FBSyxRQUFRO29CQUFFLE9BQU87Z0JBQ2pDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsMkNBQTJDO1FBQzNDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=