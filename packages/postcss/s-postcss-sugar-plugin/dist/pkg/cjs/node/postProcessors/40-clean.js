"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ root, sharedData, settings, cacheDir, classmap }) {
    var _a;
    const usedVars = [];
    if (!((_a = settings.clean) === null || _a === void 0 ? void 0 : _a.variables)) {
        return;
    }
    // console.log({
    //     group: 'postcssSugarPlugin',
    //     value: `<yellow>[postcssSugarPlugin]</yellow> Clean unused variables`,
    // });
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTs7SUFDdkUsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO0lBRTlCLElBQUksQ0FBQyxDQUFBLE1BQUEsUUFBUSxDQUFDLEtBQUssMENBQUUsU0FBUyxDQUFBLEVBQUU7UUFDNUIsT0FBTztLQUNWO0lBRUQsZ0JBQWdCO0lBQ2hCLG1DQUFtQztJQUNuQyw2RUFBNkU7SUFDN0UsTUFBTTtJQUVOLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQ3hCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQzVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUF6QkQsNEJBeUJDIn0=