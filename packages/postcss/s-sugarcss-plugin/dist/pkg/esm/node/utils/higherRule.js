export default function (fromNode) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsUUFBUTs7SUFDN0IsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNqQyxPQUFPLElBQUksRUFBRTtRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQ3BCLE1BQU07U0FDVDtRQUNELElBQUksQ0FBQSxNQUFBLFVBQVUsQ0FBQyxNQUFNLDBDQUFFLElBQUksTUFBSyxNQUFNLEVBQUU7WUFDcEMsTUFBTTtTQUNUO1FBQ0QsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7S0FDbEM7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDIn0=