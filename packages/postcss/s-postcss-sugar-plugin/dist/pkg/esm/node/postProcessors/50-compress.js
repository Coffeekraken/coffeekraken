import __STheme from '@coffeekraken/s-theme';
export default function ({ root, sharedData, postcssApi, settings, cacheDir, classmap, }) {
    var _a;
    if (!((_a = settings.compress) === null || _a === void 0 ? void 0 : _a.variables)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsSUFBSSxFQUNKLFVBQVUsRUFDVixVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEdBQ1g7O0lBQ0csSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsUUFBUSwwQ0FBRSxTQUFTLENBQUEsRUFBRTtRQUMvQixPQUFPO0tBQ1Y7SUFFRCxnQkFBZ0I7SUFDaEIsbUNBQW1DO0lBQ25DLDRFQUE0RTtJQUM1RSxNQUFNO0lBRU4sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9