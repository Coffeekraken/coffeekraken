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
                    ...((_a = api.parent.rootDirs) !== null && _a !== void 0 ? _a : []),
                    `${__path.resolve(__packageRootDir(__dirname()), 'src/views/twig')}`,
                ];
            }
            return [
                ...((_b = api.parent.rootDirs) !== null && _b !== void 0 ? _b : []),
                `${__path.resolve(__packageRootDir(__dirname()), 'src/views/blade')}`,
            ];
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFFBQVE7O1lBQ1IsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLEtBQUssTUFBTSxFQUFFO2dCQUNsRCxPQUFPO29CQUNILEdBQUcsQ0FBQyxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUM7b0JBQzlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDYixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3QixnQkFBZ0IsQ0FDbkIsRUFBRTtpQkFDTixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILEdBQUcsQ0FBQyxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUM7Z0JBQzlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDYixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3QixpQkFBaUIsQ0FDcEIsRUFBRTthQUNOLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==