"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
function __inputAdditionalEvents(settings = {}) {
    settings = Object.assign({ enter: true, escape: true }, settings);
    function handleInputAttributes(e) {
        const field = e.target ? e.target : e;
        if (!field || !field.tagName)
            return;
        switch (field.tagName) {
            case 'INPUT':
            case 'TEXTAREA':
                if (e.keyCode) {
                    switch (e.keyCode) {
                        case 13: // enter
                            if (settings.enter) {
                                (0, dom_1.__dispatchEvent)(field, 'enter');
                            }
                            break;
                        case 27: // escape
                            if (settings.escape) {
                                (0, dom_1.__dispatchEvent)(field, 'escape');
                            }
                            break;
                    }
                }
                break;
        }
    }
    document.addEventListener('change', handleInputAttributes);
    document.addEventListener('keyup', handleInputAttributes);
}
exports.default = __inputAdditionalEvents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUEwRDtBQXlDMUQsU0FBd0IsdUJBQXVCLENBQzNDLFdBQW9ELEVBQUU7SUFFdEQsUUFBUSxtQkFDSixLQUFLLEVBQUUsSUFBSSxFQUNYLE1BQU0sRUFBRSxJQUFJLElBQ1QsUUFBUSxDQUNkLENBQUM7SUFFRixTQUFTLHFCQUFxQixDQUFDLENBQUM7UUFDNUIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUFFLE9BQU87UUFDckMsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25CLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDWCxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7d0JBQ2YsS0FBSyxFQUFFLEVBQUUsUUFBUTs0QkFDYixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0NBQ2hCLElBQUEscUJBQWUsRUFBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7NkJBQ25DOzRCQUNELE1BQU07d0JBQ1YsS0FBSyxFQUFFLEVBQUUsU0FBUzs0QkFDZCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0NBQ2pCLElBQUEscUJBQWUsRUFBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7NkJBQ3BDOzRCQUNELE1BQU07cUJBQ2I7aUJBQ0o7Z0JBQ0QsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUMzRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDOUQsQ0FBQztBQW5DRCwwQ0FtQ0MifQ==