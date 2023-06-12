"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("@coffeekraken/sugar/string");
function reloadStylesheets(settings) {
    var _a;
    const finalSettings = Object.assign({ $root: document }, (settings !== null && settings !== void 0 ? settings : {}));
    // loop on all stylesheetgs link and add the timestamp in
    Array.from((_a = finalSettings.$root.querySelectorAll('link[rel=stylesheet]')) !== null && _a !== void 0 ? _a : []).forEach(($link) => {
        var _a;
        const id = (_a = $link.id) !== null && _a !== void 0 ? _a : (0, string_1.__uniqid)();
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
exports.default = reloadStylesheets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXNEO0FBNkJ0RCxTQUF3QixpQkFBaUIsQ0FDckMsUUFBOEM7O0lBRTlDLE1BQU0sYUFBYSxtQkFDZixLQUFLLEVBQUUsUUFBUSxJQUNaLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFDRix5REFBeUQ7SUFDekQsS0FBSyxDQUFDLElBQUksQ0FDTixNQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsbUNBQUksRUFBRSxDQUNyRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOztRQUNoQixNQUFNLEVBQUUsR0FBRyxNQUFBLEtBQUssQ0FBQyxFQUFFLG1DQUFJLElBQUEsaUJBQVEsR0FBRSxDQUFDO1FBRWxDLHlCQUF5QjtRQUN6QixNQUFNLFFBQVEsR0FBb0IsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxJQUFJLEdBQXFCLEtBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUNqRCxRQUFRLEVBQ1IsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FDbkIsQ0FBQztRQUNGLDJCQUEyQjtRQUMzQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1lBQ3BDLG1CQUFtQjtZQUNuQixLQUFLLENBQUMsSUFBSSxDQUNOLE1BQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLG1DQUFJLEVBQUUsQ0FDakUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxPQUFPLEtBQUssUUFBUTtvQkFBRSxPQUFPO2dCQUNqQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILDJDQUEyQztRQUMzQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWhDRCxvQ0FnQ0MifQ==