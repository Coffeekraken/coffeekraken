"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(fromNode) {
    var _a;
    let higherRule = fromNode.parent;
    while (true) {
        if (!higherRule.parent) {
            break;
        }
        if (((_a = higherRule.parent) === null || _a === void 0 ? void 0 : _a.type) === 'root') {
            break;
        }
        higherRule = higherRule.parent;
    }
    return higherRule;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsbUJBQXlCLFFBQVE7O0lBQzdCLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDakMsT0FBTyxJQUFJLEVBQUU7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUNwQixNQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUEsTUFBQSxVQUFVLENBQUMsTUFBTSwwQ0FBRSxJQUFJLE1BQUssTUFBTSxFQUFFO1lBQ3BDLE1BQU07U0FDVDtRQUNELFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0tBQ2xDO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQVpELDRCQVlDIn0=