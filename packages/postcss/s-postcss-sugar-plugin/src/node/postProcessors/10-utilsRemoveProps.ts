export default async function ({
    root,
    sharedData,
    settings,
    cacheDir,
    classmap,
}) {
    root.walkAtRules('sugar.utils.removeprops', (atRule) => {
        const props = atRule.params
            .replace(/^\'/, '')
            .replace(/\'$/, '')
            .split(',')
            .map((p) => p.trim());

        // loop on each prop to remove
        props.forEach((prop) => {
            let propSelector = prop;

            // handle regexp
            if (prop.startsWith('^') || prop.endsWith('$')) {
                propSelector = new RegExp(prop);
            }

            // remove decls
            atRule.walkDecls(propSelector, (toRemoveDecl) => {
                toRemoveDecl.remove?.();
            });
        });

        atRule.replaceWith(atRule.nodes);
    });
}
