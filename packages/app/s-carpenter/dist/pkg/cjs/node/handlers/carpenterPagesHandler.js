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
                let pageJson = Object.assign({ type: 'page' }, req.body);
                // // check if the page already exists
                // const existingPage = _getPageJsonByUid(req.body.uid);
                // if (existingPage) {
                //     res.status(406);
                //     res.type('application/json');
                //     res.send({
                //         error: __i18n('The page "%s" already exists', {
                //             id: 's-carpenter.page.alreadyExists',
                //             tokens: {
                //                 s: req.body.uid,
                //             },
                //         }),
                //     });
                // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELDRDQUFzQjtBQUN0QixnREFBMEI7QUFhMUIsU0FBUyxpQkFBaUIsQ0FBQyxLQUFhOztJQUNwQyxNQUFNLE1BQU0sR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sTUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLDBDQUFFLE9BQU8sQ0FBQztBQUNsQyxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxHQUFXO0lBQ2xDLE1BQU0sTUFBTSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEQsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbEQsTUFBTSxNQUFNLEdBQUcsY0FBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBZSxFQUFFO1lBQzlDLEdBQUcsRUFBRSxRQUFRLENBQUMsT0FBTztTQUN4QixDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPO2dCQUNILElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUNaLFlBQUksQ0FBQyxZQUFZLENBQ2IsR0FBRyxRQUFRLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUNsQyxPQUFPLENBQ1YsQ0FDSjthQUNKLENBQUM7U0FDTDtLQUNKO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQThCLHFCQUFxQixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTs7UUFDNUQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNoQixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxRQUFRLG1CQUNSLElBQUksRUFBRSxNQUFNLElBQ1QsR0FBRyxDQUFDLElBQUksQ0FDZCxDQUFDO2dCQUVGLHNDQUFzQztnQkFDdEMsd0RBQXdEO2dCQUN4RCxzQkFBc0I7Z0JBQ3RCLHVCQUF1QjtnQkFDdkIsb0NBQW9DO2dCQUNwQyxpQkFBaUI7Z0JBQ2pCLDBEQUEwRDtnQkFDMUQsb0RBQW9EO2dCQUNwRCx3QkFBd0I7Z0JBQ3hCLG1DQUFtQztnQkFDbkMsaUJBQWlCO2dCQUNqQixjQUFjO2dCQUNkLFVBQVU7Z0JBQ1YsSUFBSTtnQkFFSixjQUFjO2dCQUNkLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FDWCwwQ0FBMEMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLDRCQUE0QixDQUN2RixDQUFDO2lCQUNMO2dCQUVELG9CQUFvQjtnQkFDcEIsWUFBSSxDQUFDLGFBQWEsQ0FDZCxHQUFHLFFBQVEsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxFQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQ3BDLENBQUM7Z0JBRUYsc0JBQXNCO2dCQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWhDLE1BQU07U0FDYjtRQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQztDQUFBO0FBaERELHdDQWdEQyJ9