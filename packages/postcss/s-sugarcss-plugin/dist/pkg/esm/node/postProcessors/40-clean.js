export default function ({ root, sharedData, settings, cacheDir }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7O0lBQzdELE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O1FBQ3BCLElBQUksQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsTUFBTSxDQUFBLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsT0FBTztTQUNWO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLE1BQUEsUUFBUSxDQUFDLEtBQUssMENBQUUsU0FBUyxFQUFFO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUN4QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUFFLE9BQU87WUFDNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7S0FDTjtBQUNMLENBQUMifQ==