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
            'sugar.views.bare': [
                ...((_d = (_c = api.config.specs.namespaces) === null || _c === void 0 ? void 0 : _c['sugar.views.bare']) !== null && _d !== void 0 ? _d : []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/bare`,
            ],
            'sugar.views.sections': [
                ...((_f = (_e = api.config.specs.namespaces) === null || _e === void 0 ? void 0 : _e['sugar.views.sections']) !== null && _f !== void 0 ? _f : []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/sections`,
            ],
            'sugar.views.components': [
                ...((_h = (_g = api.config.specs.namespaces) === null || _g === void 0 ? void 0 : _g['sugar.views.components']) !== null && _h !== void 0 ? _h : []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/components`,
            ],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRzs7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsYUFBYSxFQUFFO2dCQUNYLEdBQUcsQ0FBQyxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSwwQ0FBRyxhQUFhLENBQUMsbUNBQUksRUFBRSxDQUFDO2dCQUN2RCxxREFBcUQ7YUFDeEQ7WUFDRCxrQkFBa0IsRUFBRTtnQkFDaEIsR0FBRyxDQUFDLE1BQUEsTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLDBDQUFHLGtCQUFrQixDQUFDLG1DQUFJLEVBQUUsQ0FBQztnQkFDNUQsMERBQTBEO2FBQzdEO1lBQ0Qsc0JBQXNCLEVBQUU7Z0JBQ3BCLEdBQUcsQ0FBQyxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSwwQ0FBRyxzQkFBc0IsQ0FBQyxtQ0FDckQsRUFBRSxDQUFDO2dCQUNQLDhEQUE4RDthQUNqRTtZQUNELHdCQUF3QixFQUFFO2dCQUN0QixHQUFHLENBQUMsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsMENBQUcsd0JBQXdCLENBQUMsbUNBQ3ZELEVBQUUsQ0FBQztnQkFDUCxnRUFBZ0U7YUFDbkU7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=