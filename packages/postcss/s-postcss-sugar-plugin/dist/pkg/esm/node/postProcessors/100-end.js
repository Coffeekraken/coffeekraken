export default function ({ root, sharedData, postcssApi, settings, cacheDir, classmap, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsSUFBSSxFQUNKLFVBQVUsRUFDVixVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEdBQ1g7SUFDRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdCLE9BQU8sSUFBSSxFQUFFO1lBQ1QsSUFBSSxDQUFBLE1BQUEsVUFBVSxDQUFDLE1BQU0sMENBQUUsSUFBSSxNQUFLLE1BQU0sRUFBRTtnQkFDcEMsTUFBTTthQUNUO1lBQ0QsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7U0FDbEM7UUFFRCxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckMsT0FBTyxJQUFJLEVBQUU7WUFDVCxJQUFJLENBQUEsTUFBQSxrQkFBa0IsQ0FBQyxNQUFNLDBDQUFFLElBQUksTUFBSyxNQUFNLEVBQUU7Z0JBQzVDLE1BQU07YUFDVDtZQUNELGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztTQUNsRDtRQUVELE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztRQUNsQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3pELElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFDbkMsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDckQsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksVUFBVSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDOUIsT0FBTztTQUNWO1FBRUQsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9