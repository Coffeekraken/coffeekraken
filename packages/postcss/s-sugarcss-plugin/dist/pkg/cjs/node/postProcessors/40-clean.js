"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ root, sharedData, settings, cacheDir }) {
    var _a;
    const usedVars = [];
    root.walkRules((rule) => {
        var _a;
        if (!((_a = rule.nodes) === null || _a === void 0 ? void 0 : _a.length)) {
            rule.remove();
            return;
        }
    });
    if ((_a = settings.clean) === null || _a === void 0 ? void 0 : _a.variables) {
        root.walkDecls((decl) => {
            if (!decl.value)
                return;
            const varsMatches = decl.value.match(/var\((--[a-zA-Z0-9_-]+)/);
            if (!varsMatches || !varsMatches[1])
                return;
            if (usedVars.includes(varsMatches[1]))
                return;
            usedVars.push(varsMatches[1]);
        });
        root.walkDecls(/^--/, (decl) => {
            if (!usedVars.includes(decl.prop)) {
                decl.remove();
            }
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFOztJQUM3RCxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOztRQUNwQixJQUFJLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLE1BQU0sQ0FBQSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLE9BQU87U0FDVjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxNQUFBLFFBQVEsQ0FBQyxLQUFLLDBDQUFFLFNBQVMsRUFBRTtRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU87WUFDeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQzVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTztZQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNqQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ047QUFDTCxDQUFDO0FBekJELDRCQXlCQyJ9