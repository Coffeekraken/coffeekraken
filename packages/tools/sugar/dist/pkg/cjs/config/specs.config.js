"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7O0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNILFVBQVUsRUFBRTtZQUNSLGFBQWEsRUFBRTtnQkFDWCxHQUFHLENBQUMsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsMENBQUcsYUFBYSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztnQkFDdkQscURBQXFEO2FBQ3hEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLEdBQUcsQ0FBQyxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSwwQ0FBRyxZQUFZLENBQUMsbUNBQUksRUFBRSxDQUFDO2dCQUN0RCwwREFBMEQ7YUFDN0Q7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxHQUFHLENBQUMsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsMENBQUcsZ0JBQWdCLENBQUMsbUNBQUksRUFBRSxDQUFDO2dCQUMxRCw4REFBOEQ7YUFDakU7WUFDRCxrQkFBa0IsRUFBRTtnQkFDaEIsR0FBRyxDQUFDLE1BQUEsTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLDBDQUFHLGtCQUFrQixDQUFDLG1DQUFJLEVBQUUsQ0FBQztnQkFDNUQsZ0VBQWdFO2FBQ25FO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXZCRCw0QkF1QkMifQ==