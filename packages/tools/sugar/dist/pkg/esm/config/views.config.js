import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
export default function ({ env, config }) {
    if (env.platform !== 'node')
        return;
    return {
        layouts: {
            main: {
                name: 'Default (main)',
                viewPath: {
                    twig: 'layouts/main.twig',
                    blade: null,
                },
            },
        },
        rootDirs: {
            twig: [
                `./${__path.relative(__packageRootDir(), config.storage.src.viewsDir)}`,
                `./node_modules/@coffeekraken/sugar/src/views/twig`,
            ],
            blade: [
                `./${__path.relative(__packageRootDir(), config.storage.src.viewsDir)}`,
                `./node_modules/@coffeekraken/sugar/src/views/blade`,
            ],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTtJQUNwQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNILE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixRQUFRLEVBQUU7b0JBQ04sSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSjtTQUNKO1FBQ0QsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFO2dCQUNGLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FDaEIsZ0JBQWdCLEVBQUUsRUFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUM5QixFQUFFO2dCQUNILG1EQUFtRDthQUN0RDtZQUNELEtBQUssRUFBRTtnQkFDSCxLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQ2hCLGdCQUFnQixFQUFFLEVBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDOUIsRUFBRTtnQkFDSCxvREFBb0Q7YUFDdkQ7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=