import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
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
            views: [
                `./${__path.relative(__packageRootDir(), api.config.storage.src.viewsDir)}`,
            ],
            bare: [
                `./${__path.relative(__packageRootDir(), api.config.storage.src.viewsDir)}/bare`,
            ],
            sections: [
                `./${__path.relative(__packageRootDir(), api.config.storage.src.viewsDir)}/sections`,
            ],
            components: [
                `./${__path.relative(__packageRootDir(), api.config.storage.src.viewsDir)}/components`,
            ],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7O0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNILFVBQVUsRUFBRTtZQUNSLGFBQWEsRUFBRTtnQkFDWCxHQUFHLENBQUMsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsMENBQUcsYUFBYSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztnQkFDdkQscURBQXFEO2FBQ3hEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLEdBQUcsQ0FBQyxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSwwQ0FBRyxZQUFZLENBQUMsbUNBQUksRUFBRSxDQUFDO2dCQUN0RCwwREFBMEQ7YUFDN0Q7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxHQUFHLENBQUMsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsMENBQUcsZ0JBQWdCLENBQUMsbUNBQUksRUFBRSxDQUFDO2dCQUMxRCw4REFBOEQ7YUFDakU7WUFDRCxrQkFBa0IsRUFBRTtnQkFDaEIsR0FBRyxDQUFDLE1BQUEsTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLDBDQUFHLGtCQUFrQixDQUFDLG1DQUFJLEVBQUUsQ0FBQztnQkFDNUQsZ0VBQWdFO2FBQ25FO1lBQ0QsS0FBSyxFQUFFO2dCQUNILEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FDaEIsZ0JBQWdCLEVBQUUsRUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDbEMsRUFBRTthQUNOO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FDaEIsZ0JBQWdCLEVBQUUsRUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDbEMsT0FBTzthQUNYO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FDaEIsZ0JBQWdCLEVBQUUsRUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDbEMsV0FBVzthQUNmO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FDaEIsZ0JBQWdCLEVBQUUsRUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDbEMsYUFBYTthQUNqQjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==