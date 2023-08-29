import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        namespaces: {
            views: [
                `./${__path.relative(__packageRootDir(), api.config.storage.src.viewsDir)}`,
            ],
            'views.bare': [
                `./${__path.relative(__packageRootDir(), api.config.storage.src.viewsDir)}/bare`,
            ],
            'views.sections': [
                `./${__path.relative(__packageRootDir(), api.config.storage.src.viewsDir)}/sections`,
            ],
            'views.components': [
                `./${__path.relative(__packageRootDir(), api.config.storage.src.viewsDir)}/components`,
            ],
        },
        // get cwd() {
        //     return api.config.storage.package.rootDir;
        // },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsS0FBSyxFQUFFO2dCQUNILEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FDaEIsZ0JBQWdCLEVBQUUsRUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDbEMsRUFBRTthQUNOO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FDaEIsZ0JBQWdCLEVBQUUsRUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDbEMsT0FBTzthQUNYO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsS0FBSyxNQUFNLENBQUMsUUFBUSxDQUNoQixnQkFBZ0IsRUFBRSxFQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNsQyxXQUFXO2FBQ2Y7WUFDRCxrQkFBa0IsRUFBRTtnQkFDaEIsS0FBSyxNQUFNLENBQUMsUUFBUSxDQUNoQixnQkFBZ0IsRUFBRSxFQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNsQyxhQUFhO2FBQ2pCO1NBQ0o7UUFDRCxjQUFjO1FBQ2QsaURBQWlEO1FBQ2pELEtBQUs7S0FDUixDQUFDO0FBQ04sQ0FBQyJ9