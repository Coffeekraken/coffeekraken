import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
export default function ({ env, config }) {
    if (env.platform !== 'node')
        return;
    return {
        layouts: {
            main: {
                name: 'Default (main)',
                viewDotPath: 'layouts.main',
            },
        },
        rootDirs: [
            `./${__path.relative(__packageRootDir(), config.storage.src.viewsDir)}`,
            `./node_modules/@coffeekraken/s-views/src/views`,
        ],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTtJQUNwQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNILE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixXQUFXLEVBQUUsY0FBYzthQUM5QjtTQUNKO1FBQ0QsUUFBUSxFQUFFO1lBQ04sS0FBSyxNQUFNLENBQUMsUUFBUSxDQUNoQixnQkFBZ0IsRUFBRSxFQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQzlCLEVBQUU7WUFDSCxnREFBZ0Q7U0FDbkQ7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9