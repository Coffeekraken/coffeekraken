var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __i18n } from '@coffeekraken/s-i18n';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __glob from 'glob';
function _getScopeRootPath(scope) {
    var _a;
    const scopes = __SSugarConfig.get('carpenter.scopes');
    return (_a = scopes[scope]) === null || _a === void 0 ? void 0 : _a.rootDir;
}
function _getPageJsonByUid(uid) {
    const scopes = __SSugarConfig.get('carpenter.scopes');
    for (let [scope, scopeObj] of Object.entries(scopes)) {
        const pathes = __glob.sync(`${uid}.{json,ts,js}`, {
            cwd: scopeObj.rootDir,
        });
        if (pathes.length) {
            return {
                path: pathes[0],
                json: JSON.parse(__fs.readFileSync(`${scopeObj.rootDir}/${pathes[0]}`, 'utf-8')),
            };
        }
    }
    return false;
}
export default function carpenterPagesHandler({ req, res }) {
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
                        error: __i18n('The page "%s" already exists', {
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
                __fs.writeFileSync(`${rootPath}/${req.body.uid}.json`, JSON.stringify(pageJson, null, 4));
                // set the result json
                Object.assign(result, req.body);
                break;
        }
        res.status(200);
        res.type('application/json');
        res.send(result);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBYTFCLFNBQVMsaUJBQWlCLENBQUMsS0FBYTs7SUFDcEMsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sTUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLDBDQUFFLE9BQU8sQ0FBQztBQUNsQyxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxHQUFXO0lBQ2xDLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN0RCxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNsRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxlQUFlLEVBQUU7WUFDOUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1NBQ3hCLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQ1osSUFBSSxDQUFDLFlBQVksQ0FDYixHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ2xDLE9BQU8sQ0FDVixDQUNKO2FBQ0osQ0FBQztTQUNMO0tBQ0o7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sVUFBZ0IscUJBQXFCLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFOztRQUM1RCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ2hCLEtBQUssTUFBTTtnQkFDUCxJQUFJLFFBQVEsR0FBRztvQkFDWCxJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO29CQUNuQixHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO29CQUNqQixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDdEIsS0FBSyxFQUFFLEVBQUU7aUJBQ1osQ0FBQztnQkFFRixtQ0FBbUM7Z0JBQ25DLE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JELElBQUksWUFBWSxFQUFFO29CQUNkLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztvQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQzt3QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLDhCQUE4QixFQUFFOzRCQUMxQyxFQUFFLEVBQUUsZ0NBQWdDOzRCQUNwQyxNQUFNLEVBQUU7Z0NBQ0osQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRzs2QkFDbEI7eUJBQ0osQ0FBQztxQkFDTCxDQUFDLENBQUM7aUJBQ047Z0JBRUQsY0FBYztnQkFDZCxNQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNYLE1BQU0sSUFBSSxLQUFLLENBQ1gsMENBQTBDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyw0QkFBNEIsQ0FDdkYsQ0FBQztpQkFDTDtnQkFFRCxvQkFBb0I7Z0JBQ3BCLElBQUksQ0FBQyxhQUFhLENBQ2QsR0FBRyxRQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sRUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUNwQyxDQUFDO2dCQUVGLHNCQUFzQjtnQkFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVoQyxNQUFNO1NBQ2I7UUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLENBQUM7Q0FBQSJ9