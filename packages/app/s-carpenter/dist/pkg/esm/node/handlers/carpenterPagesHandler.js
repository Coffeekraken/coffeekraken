var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
                    uid: req.body.uid,
                    name: req.body.name,
                    slug: req.body.slug,
                    scope: req.body.scope,
                    nodes: req.body.nodes,
                };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFhMUIsU0FBUyxpQkFBaUIsQ0FBQyxLQUFhOztJQUNwQyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEQsT0FBTyxNQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsMENBQUUsT0FBTyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLEdBQVc7SUFDbEMsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RELEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGVBQWUsRUFBRTtZQUM5QyxHQUFHLEVBQUUsUUFBUSxDQUFDLE9BQU87U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTztnQkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FDWixJQUFJLENBQUMsWUFBWSxDQUNiLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDbEMsT0FBTyxDQUNWLENBQ0o7YUFDSixDQUFDO1NBQ0w7S0FDSjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxVQUFnQixxQkFBcUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7O1FBQzVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDaEIsS0FBSyxNQUFNO2dCQUNQLElBQUksUUFBUSxHQUFHO29CQUNYLElBQUksRUFBRSxNQUFNO29CQUNaLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ2pCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQ25CLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQ25CLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7b0JBQ3JCLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7aUJBQ3hCLENBQUM7Z0JBRUYsc0NBQXNDO2dCQUN0Qyx3REFBd0Q7Z0JBQ3hELHNCQUFzQjtnQkFDdEIsdUJBQXVCO2dCQUN2QixvQ0FBb0M7Z0JBQ3BDLGlCQUFpQjtnQkFDakIsMERBQTBEO2dCQUMxRCxvREFBb0Q7Z0JBQ3BELHdCQUF3QjtnQkFDeEIsbUNBQW1DO2dCQUNuQyxpQkFBaUI7Z0JBQ2pCLGNBQWM7Z0JBQ2QsVUFBVTtnQkFDVixJQUFJO2dCQUVKLGNBQWM7Z0JBQ2QsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDWCxNQUFNLElBQUksS0FBSyxDQUNYLDBDQUEwQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssNEJBQTRCLENBQ3ZGLENBQUM7aUJBQ0w7Z0JBRUQsb0JBQW9CO2dCQUNwQixJQUFJLENBQUMsYUFBYSxDQUNkLEdBQUcsUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLEVBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDcEMsQ0FBQztnQkFFRixzQkFBc0I7Z0JBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFaEMsTUFBTTtTQUNiO1FBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQUEifQ==