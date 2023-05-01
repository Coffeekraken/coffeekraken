"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
function _getScopeRootPath(scope) {
    var _a;
    const scopes = s_sugar_config_1.default.get('carpenter.scopes');
    return (_a = scopes[scope]) === null || _a === void 0 ? void 0 : _a.rootDir;
}
function _getPageJsonByUid(uid) {
    const scopes = s_sugar_config_1.default.get('carpenter.scopes');
    for (let [scope, scopeObj] of Object.entries(scopes)) {
        const pathes = glob_1.default.sync(`${uid}.{json,ts,js}`, {
            cwd: scopeObj.rootDir,
        });
        if (pathes.length) {
            return {
                path: pathes[0],
                json: JSON.parse(fs_1.default.readFileSync(`${scopeObj.rootDir}/${pathes[0]}`, 'utf-8')),
            };
        }
    }
    return false;
}
function carpenterPagesHandler({ req, res }) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = {};
        switch (req.method) {
            case 'POST':
                let pageJson = {
                    type: 'page',
                    name: req.body.name,
                    uid: req.body.uid,
                    slugs: [req.body.slug],
                    nodes: [],
                };
                // check if the page already exists
                const existingPage = _getPageJsonByUid(req.body.uid);
                if (existingPage) {
                    res.status(406);
                    res.type('application/json');
                    res.send({
                        error: (0, s_i18n_1.__i18n)('The page "%s" already exists', {
                            id: 's-carpenter.page.alreadyExists',
                            tokens: {
                                s: req.body.uid,
                            },
                        }),
                    });
                }
                // check scope
                const rootPath = _getScopeRootPath(req.body.scope);
                if (!rootPath) {
                    throw new Error(`<red>[SCarpenter]</red> The requested "${req.body.scope}" scope does not exists...`);
                }
                // save the new page
                fs_1.default.writeFileSync(`${rootPath}/${req.body.uid}.json`, JSON.stringify(pageJson, null, 4));
                // set the result json
                Object.assign(result, req.body);
                break;
        }
        res.status(200);
        res.type('application/json');
        res.send(result);
    });
}
exports.default = carpenterPagesHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQThDO0FBQzlDLGtGQUEwRDtBQUMxRCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBYTFCLFNBQVMsaUJBQWlCLENBQUMsS0FBYTs7SUFDcEMsTUFBTSxNQUFNLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN0RCxPQUFPLE1BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQywwQ0FBRSxPQUFPLENBQUM7QUFDbEMsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsR0FBVztJQUNsQyxNQUFNLE1BQU0sR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RELEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xELE1BQU0sTUFBTSxHQUFHLGNBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGVBQWUsRUFBRTtZQUM5QyxHQUFHLEVBQUUsUUFBUSxDQUFDLE9BQU87U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTztnQkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FDWixZQUFJLENBQUMsWUFBWSxDQUNiLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDbEMsT0FBTyxDQUNWLENBQ0o7YUFDSixDQUFDO1NBQ0w7S0FDSjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUE4QixxQkFBcUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7O1FBQzVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDaEIsS0FBSyxNQUFNO2dCQUNQLElBQUksUUFBUSxHQUFHO29CQUNYLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQ25CLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ2pCLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUN0QixLQUFLLEVBQUUsRUFBRTtpQkFDWixDQUFDO2dCQUVGLG1DQUFtQztnQkFDbkMsTUFBTSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckQsSUFBSSxZQUFZLEVBQUU7b0JBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNMLEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyw4QkFBOEIsRUFBRTs0QkFDMUMsRUFBRSxFQUFFLGdDQUFnQzs0QkFDcEMsTUFBTSxFQUFFO2dDQUNKLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7NkJBQ2xCO3lCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFDO2lCQUNOO2dCQUVELGNBQWM7Z0JBQ2QsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDWCxNQUFNLElBQUksS0FBSyxDQUNYLDBDQUEwQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssNEJBQTRCLENBQ3ZGLENBQUM7aUJBQ0w7Z0JBRUQsb0JBQW9CO2dCQUNwQixZQUFJLENBQUMsYUFBYSxDQUNkLEdBQUcsUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLEVBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDcEMsQ0FBQztnQkFFRixzQkFBc0I7Z0JBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFaEMsTUFBTTtTQUNiO1FBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQUE7QUFuREQsd0NBbURDIn0=