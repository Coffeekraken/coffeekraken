import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            rootDirs
         * @namespace       config.viewRenderer
         * @type            string[]
         * @default          ['[config.storage.src.rootDir]/views']
         *
         * Specify the roots views directories
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        rootDirs: {
            get sugar() {
                switch (api.config.viewRenderer.defaultEngine) {
                    case 'blade':
                        return `${__path.resolve(__packageRootDir(__dirname()), 'src/views/blade')}`;
                        break;
                    case 'twig':
                    default:
                        return `${__path.resolve(__packageRootDir(__dirname()), 'src/views/twig')}`;
                        break;
                }
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUU7WUFDTixJQUFJLEtBQUs7Z0JBQ0wsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7b0JBQzNDLEtBQUssT0FBTzt3QkFDUixPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDcEIsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDN0IsaUJBQWlCLENBQ3BCLEVBQUUsQ0FBQzt3QkFDSixNQUFNO29CQUNWLEtBQUssTUFBTSxDQUFDO29CQUNaO3dCQUNJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNwQixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3QixnQkFBZ0IsQ0FDbkIsRUFBRSxDQUFDO3dCQUNKLE1BQU07aUJBQ2I7WUFDTCxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9