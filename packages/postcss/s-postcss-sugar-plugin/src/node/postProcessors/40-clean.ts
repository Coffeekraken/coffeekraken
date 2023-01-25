export default function ({ root, sharedData, settings, cacheDir, classmap }) {
    const usedVars: string[] = [];

    if (!settings.clean?.variables) {
        return;
    }

    // console.log({
    //     group: 'postcssSugarPlugin',
    //     value: `<yellow>[postcssSugarPlugin]</yellow> Clean unused variables`,
    // });

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
