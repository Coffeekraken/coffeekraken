import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
export default function ({ env, config }) {
    if (env.platform !== 'node')
        return;
    return {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTtJQUNwQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNILFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRTtnQkFDRixLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQ2hCLGdCQUFnQixFQUFFLEVBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDOUIsRUFBRTtnQkFDSCxtREFBbUQ7YUFDdEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxNQUFNLENBQUMsUUFBUSxDQUNoQixnQkFBZ0IsRUFBRSxFQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQzlCLEVBQUU7Z0JBQ0gsb0RBQW9EO2FBQ3ZEO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9