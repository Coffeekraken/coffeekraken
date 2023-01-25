export default function ({ root, sharedData, settings, cacheDir, classmap }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFOztJQUN2RSxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsS0FBSywwQ0FBRSxTQUFTLENBQUEsRUFBRTtRQUM1QixPQUFPO0tBQ1Y7SUFFRCxnQkFBZ0I7SUFDaEIsbUNBQW1DO0lBQ25DLDZFQUE2RTtJQUM3RSxNQUFNO0lBRU4sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFDeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9