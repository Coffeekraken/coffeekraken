export default function (api) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (api.env.platform !== 'node')
        return;
    return {
        namespaces: {
            'sugar.views': [
                ...((_b = (_a = api.config.specs.namespaces) === null || _a === void 0 ? void 0 : _a['sugar.views']) !== null && _b !== void 0 ? _b : []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs`,
            ],
            'sugar.bare': [
                ...((_d = (_c = api.config.specs.namespaces) === null || _c === void 0 ? void 0 : _c['sugar.bare']) !== null && _d !== void 0 ? _d : []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/bare`,
            ],
            'sugar.sections': [
                ...((_f = (_e = api.config.specs.namespaces) === null || _e === void 0 ? void 0 : _e['sugar.sections']) !== null && _f !== void 0 ? _f : []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/sections`,
            ],
            'sugar.components': [
                ...((_h = (_g = api.config.specs.namespaces) === null || _g === void 0 ? void 0 : _g['sugar.components']) !== null && _h !== void 0 ? _h : []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/components`,
            ],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRzs7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsYUFBYSxFQUFFO2dCQUNYLEdBQUcsQ0FBQyxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSwwQ0FBRyxhQUFhLENBQUMsbUNBQUksRUFBRSxDQUFDO2dCQUN2RCxxREFBcUQ7YUFDeEQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsR0FBRyxDQUFDLE1BQUEsTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLDBDQUFHLFlBQVksQ0FBQyxtQ0FBSSxFQUFFLENBQUM7Z0JBQ3RELDBEQUEwRDthQUM3RDtZQUNELGdCQUFnQixFQUFFO2dCQUNkLEdBQUcsQ0FBQyxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSwwQ0FBRyxnQkFBZ0IsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7Z0JBQzFELDhEQUE4RDthQUNqRTtZQUNELGtCQUFrQixFQUFFO2dCQUNoQixHQUFHLENBQUMsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsMENBQUcsa0JBQWtCLENBQUMsbUNBQUksRUFBRSxDQUFDO2dCQUM1RCxnRUFBZ0U7YUFDbkU7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=