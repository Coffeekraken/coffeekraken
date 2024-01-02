export default function ({ root, sharedData, settings, cacheDir }) {
    const usedVars: string[] = [];

    root.walkRules((rule) => {
        if (!rule.nodes?.length) {
            rule.remove();
            return;
        }
    });

    if (settings.clean?.variables) {
        root.walkDecls((decl) => {
            if (!decl.value) return;
            const varsMatches = decl.value.match(/var\((--[a-zA-Z0-9_-]+)/);
            if (!varsMatches || !varsMatches[1]) return;
            if (usedVars.includes(varsMatches[1])) return;
            usedVars.push(varsMatches[1]);
        });

        root.walkDecls(/^--/, (decl) => {
            if (!usedVars.includes(decl.prop)) {
                decl.remove();
            }
        });
    }
}
