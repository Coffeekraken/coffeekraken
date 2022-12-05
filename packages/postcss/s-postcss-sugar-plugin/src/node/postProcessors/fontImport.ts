export default function ({ root }) {
    root.walkAtRules((atRule) => {
        if (atRule.name.match(/^import/) && !atRule._fontImportMoved) {
            if (atRule.params.match(/^url\(('|")?https?:\/\//)) {
                atRule._fontImportMoved = true;
                root.nodes.unshift(atRule.clone());
                atRule.remove();
            }
        }
    });
}
