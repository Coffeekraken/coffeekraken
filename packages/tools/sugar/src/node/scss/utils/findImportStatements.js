"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
function findImportStatements(string, settings) {
    const set = deepMerge_1.default({
        use: true,
        import: true
    }, settings || {});
    // split lines
    const lines = string.split('\n');
    const reg = /^(\s+)?@(use|import)\s*['"](.*?)['"](\sas\s([a-zA-Z0-9-_]+))?/g;
    const statements = [];
    // loop on each lines
    lines.forEach((line, index) => {
        const matches = line.match(reg);
        if (!matches)
            return;
        matches.forEach((match) => {
            match = match.trim();
            const raw = match + ';';
            let type = 'use', path, as = undefined, line = index;
            if (match.match(/^@import\s/)) {
                type = 'import';
            }
            match = match.replace(/^@import\s/, '').replace(/^@use\s/, '');
            if (type === 'use' && match.match(/\sas\s/)) {
                const parts = match.split(' as ');
                path = parts[0];
                as = parts[1];
            }
            else {
                path = match;
            }
            path = path.slice(1, -1);
            const statementObj = {
                raw,
                type,
                path,
                as,
                line
            };
            if (set.use && type === 'use') {
                statements.push(statementObj);
            }
            else if (set.import && statementObj.type === 'import') {
                statements.push(statementObj);
            }
        });
    });
    return statements;
}
exports.default = findImportStatements;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEltcG9ydFN0YXRlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaW5kSW1wb3J0U3RhdGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVFQUFpRDtBQXFEakQsU0FBUyxvQkFBb0IsQ0FDM0IsTUFBYyxFQUNkLFFBQWlEO0lBRWpELE1BQU0sR0FBRyxHQUFrQyxtQkFBVyxDQUNwRDtRQUNFLEdBQUcsRUFBRSxJQUFJO1FBQ1QsTUFBTSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLGNBQWM7SUFDZCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpDLE1BQU0sR0FBRyxHQUFHLGdFQUFnRSxDQUFDO0lBRTdFLE1BQU0sVUFBVSxHQUErQixFQUFFLENBQUM7SUFFbEQscUJBQXFCO0lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU87UUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3hCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFckIsTUFBTSxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksR0FBVyxLQUFLLEVBQ3RCLElBQVksRUFDWixFQUFFLEdBQXVCLFNBQVMsRUFDbEMsSUFBSSxHQUFXLEtBQUssQ0FBQztZQUN2QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksR0FBRyxRQUFRLENBQUM7YUFDakI7WUFDRCxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMvRCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDM0MsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLElBQUksR0FBRyxLQUFLLENBQUM7YUFDZDtZQUNELElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXpCLE1BQU0sWUFBWSxHQUE2QjtnQkFDN0MsR0FBRztnQkFDSCxJQUFJO2dCQUNKLElBQUk7Z0JBQ0osRUFBRTtnQkFDRixJQUFJO2FBQ0wsQ0FBQztZQUVGLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUM3QixVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQy9CO2lCQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDdkQsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMvQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBQ0Qsa0JBQWUsb0JBQW9CLENBQUMifQ==