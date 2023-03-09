export default function ({
    root,
    sharedData,
    postcssApi,
    settings,
    cacheDir,
    classmap,
}) {
    root.walkRules(/\& \> \*/, (rule) => {
        if (!rule.selector) {
            return;
        }

        let higherRule = rule.parent;
        while (true) {
            if (higherRule.parent?.type === 'root') {
                break;
            }
            higherRule = higherRule.parent;
        }

        let parentWithSelector = rule.parent;
        while (true) {
            if (parentWithSelector.parent?.type === 'root') {
                break;
            }
            parentWithSelector = parentWithSelector.parent;
        }

        const newSelectors: string[] = [];
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
