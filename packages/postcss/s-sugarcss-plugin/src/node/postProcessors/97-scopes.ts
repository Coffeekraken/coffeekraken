export default async function ({ root, sharedData, settings, cacheDir }) {
    root.walkAtRules((atRule) => {
        if (atRule.params?.startsWith('s-scope')) {
            atRule.replaceWith(atRule.nodes);
        }
    });
}
