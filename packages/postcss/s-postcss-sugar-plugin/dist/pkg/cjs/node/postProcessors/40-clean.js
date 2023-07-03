"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ root, sharedData, settings, cacheDir, classmap }) {
    var _a;
    const usedVars = [];
    if (!((_a = settings.clean) === null || _a === void 0 ? void 0 : _a.variables)) {
        return;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTs7SUFDdkUsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO0lBRTlCLElBQUksQ0FBQyxDQUFBLE1BQUEsUUFBUSxDQUFDLEtBQUssMENBQUUsU0FBUyxDQUFBLEVBQUU7UUFDNUIsT0FBTztLQUNWO0lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFDeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXBCRCw0QkFvQkMifQ==