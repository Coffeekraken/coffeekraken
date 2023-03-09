"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ root, sharedData, postcssApi, settings, cacheDir, classmap, }) {
    root.walkRules(/\& \> \*/, (rule) => {
        var _a, _b;
        if (!rule.selector) {
            return;
        }
        let higherRule = rule.parent;
        while (true) {
            if (((_a = higherRule.parent) === null || _a === void 0 ? void 0 : _a.type) === 'root') {
                break;
            }
            higherRule = higherRule.parent;
        }
        let parentWithSelector = rule.parent;
        while (true) {
            if (((_b = parentWithSelector.parent) === null || _b === void 0 ? void 0 : _b.type) === 'root') {
                break;
            }
            parentWithSelector = parentWithSelector.parent;
        }
        const newSelectors = [];
        parentWithSelector.selector.split(',').forEach((parentSel) => {
            if (typeof rule.selector !== 'string') {
                return;
            }
            rule.selector = rule.selector.split(',').forEach((sel) => {
                newSelectors.push(sel.replace(/\&/gm, parentSel));
            });
        });
        rule.selector = newSelectors.join(',');
        if (rule.selector.includes('section-heading')) {
            global._console.log(higherRule.type);
        }
        if (higherRule.type === 'atrule') {
            return;
        }
        higherRule.parent.insertAfter(higherRule, rule);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEVBQ3JCLElBQUksRUFDSixVQUFVLEVBQ1YsVUFBVSxFQUNWLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxHQUNYO0lBQ0csSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsT0FBTztTQUNWO1FBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3QixPQUFPLElBQUksRUFBRTtZQUNULElBQUksQ0FBQSxNQUFBLFVBQVUsQ0FBQyxNQUFNLDBDQUFFLElBQUksTUFBSyxNQUFNLEVBQUU7Z0JBQ3BDLE1BQU07YUFDVDtZQUNELFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxFQUFFO1lBQ1QsSUFBSSxDQUFBLE1BQUEsa0JBQWtCLENBQUMsTUFBTSwwQ0FBRSxJQUFJLE1BQUssTUFBTSxFQUFFO2dCQUM1QyxNQUFNO2FBQ1Q7WUFDRCxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7U0FDbEQ7UUFFRCxNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7UUFDbEMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUN6RCxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQ25DLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3JELFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUMzQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzlCLE9BQU87U0FDVjtRQUVELFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFqREQsNEJBaURDIn0=