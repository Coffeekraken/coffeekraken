import __STheme from '@coffeekraken/s-theme';

export default function ({
    root,
    sharedData,
    postcssApi,
    settings,
    cacheDir,
    classmap,
}) {
    if (!settings.compress?.variables) {
        return;
    }

    // console.log({
    //     group: 'postcssSugarPlugin',
    //     value: `<yellow>[postcssSugarPlugin]</yellow> Compressing variables`,
    // });

    root.walkDecls(/^--s\-/, (decl) => {
        decl.prop = __STheme.compressVarName(decl.prop);
    });
}
