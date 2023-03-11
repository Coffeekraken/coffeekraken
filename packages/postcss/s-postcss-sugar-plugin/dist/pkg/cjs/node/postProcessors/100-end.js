"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ root, sharedData, postcssApi, settings, cacheDir, classmap, }) {
    return;
    root.walkRules(/\& \> \*/, (rule) => {
        var _a, _b;
        if (!rule.selector) {
            return;
        }
        let needToMoveAtRoot = true;
        let higherRule = rule.parent;
        while (true) {
            if (((_a = higherRule.parent) === null || _a === void 0 ? void 0 : _a.type) === 'root') {
                break;
            }
            higherRule = higherRule.parent;
            if (higherRule.type === 'atrule') {
                needToMoveAtRoot = false;
            }
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
        if (needToMoveAtRoot) {
            higherRule.parent.insertBefore(higherRule, rule);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEVBQ3JCLElBQUksRUFDSixVQUFVLEVBQ1YsVUFBVSxFQUNWLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxHQUNYO0lBQ0csT0FBTztJQUVQLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7O1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLE9BQU87U0FDVjtRQUVELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRTVCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0IsT0FBTyxJQUFJLEVBQUU7WUFDVCxJQUFJLENBQUEsTUFBQSxVQUFVLENBQUMsTUFBTSwwQ0FBRSxJQUFJLE1BQUssTUFBTSxFQUFFO2dCQUNwQyxNQUFNO2FBQ1Q7WUFDRCxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUMvQixJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM5QixnQkFBZ0IsR0FBRyxLQUFLLENBQUM7YUFDNUI7U0FDSjtRQUVELElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQyxPQUFPLElBQUksRUFBRTtZQUNULElBQUksQ0FBQSxNQUFBLGtCQUFrQixDQUFDLE1BQU0sMENBQUUsSUFBSSxNQUFLLE1BQU0sRUFBRTtnQkFDNUMsTUFBTTthQUNUO1lBQ0Qsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1NBQ2xEO1FBRUQsTUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO1FBQ2xDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDekQsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUNuQyxPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNyRCxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2QyxJQUFJLGdCQUFnQixFQUFFO1lBQ2xCLFVBQVUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwRDtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQW5ERCw0QkFtREMifQ==