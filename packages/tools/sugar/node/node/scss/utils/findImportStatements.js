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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEltcG9ydFN0YXRlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9zY3NzL3V0aWxzL2ZpbmRJbXBvcnRTdGF0ZW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUVBQWlEO0FBcURqRCxTQUFTLG9CQUFvQixDQUMzQixNQUFjLEVBQ2QsUUFBaUQ7SUFFakQsTUFBTSxHQUFHLEdBQWtDLG1CQUFXLENBQ3BEO1FBQ0UsR0FBRyxFQUFFLElBQUk7UUFDVCxNQUFNLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUFDO0lBRUYsY0FBYztJQUNkLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFakMsTUFBTSxHQUFHLEdBQUcsZ0VBQWdFLENBQUM7SUFFN0UsTUFBTSxVQUFVLEdBQStCLEVBQUUsQ0FBQztJQUVsRCxxQkFBcUI7SUFDckIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM1QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVyQixNQUFNLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ3hCLElBQUksSUFBSSxHQUFXLEtBQUssRUFDdEIsSUFBWSxFQUNaLEVBQUUsR0FBdUIsU0FBUyxFQUNsQyxJQUFJLEdBQVcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUNqQjtZQUNELEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELElBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMzQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0wsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUNkO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekIsTUFBTSxZQUFZLEdBQTZCO2dCQUM3QyxHQUFHO2dCQUNILElBQUk7Z0JBQ0osSUFBSTtnQkFDSixFQUFFO2dCQUNGLElBQUk7YUFDTCxDQUFDO1lBRUYsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQzdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDL0I7aUJBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUN2RCxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQy9CO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFDRCxrQkFBZSxvQkFBb0IsQ0FBQyJ9