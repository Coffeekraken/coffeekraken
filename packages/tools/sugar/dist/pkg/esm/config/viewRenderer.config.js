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
        get rootDirs() {
            var _a, _b;
            if (api.config.viewRenderer.defaultEngine === 'twig') {
                return [
                    __packageRootDir(),
                    ...((_a = api.parent.rootDirs) !== null && _a !== void 0 ? _a : []),
                    `${__path.resolve(__packageRootDir(__dirname()), 'src/views/twig')}`,
                ];
            }
            return [
                __packageRootDir(),
                ...((_b = api.parent.rootDirs) !== null && _b !== void 0 ? _b : []),
                `${__path.resolve(__packageRootDir(__dirname()), 'src/views/blade')}`,
            ];
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFFBQVE7O1lBQ1IsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLEtBQUssTUFBTSxFQUFFO2dCQUNsRCxPQUFPO29CQUNILGdCQUFnQixFQUFFO29CQUNsQixHQUFHLENBQUMsTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsbUNBQUksRUFBRSxDQUFDO29CQUM5QixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2IsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDN0IsZ0JBQWdCLENBQ25CLEVBQUU7aUJBQ04sQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxnQkFBZ0IsRUFBRTtnQkFDbEIsR0FBRyxDQUFDLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQztnQkFDOUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNiLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzdCLGlCQUFpQixDQUNwQixFQUFFO2FBQ04sQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9