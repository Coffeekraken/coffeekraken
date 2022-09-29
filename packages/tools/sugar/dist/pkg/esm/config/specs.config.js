import { __dirname } from '@coffeekraken/sugar/fs';
import __path from 'path';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        namespaces: {
            'sugar.views': [
                __path.resolve(__dirname(), '../../../../src/views/_specs'),
            ],
            'sugar.blade': [
                __path.resolve(__dirname(), '../../../../src/views/blade/@sugar'),
            ],
            'sugar.twig': [
                __path.resolve(__dirname(), '../../../../src/views/twig'),
            ],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNILFVBQVUsRUFBRTtZQUNSLGFBQWEsRUFBRTtnQkFDWCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLDhCQUE4QixDQUFDO2FBQzlEO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxPQUFPLENBQ1YsU0FBUyxFQUFFLEVBQ1gsb0NBQW9DLENBQ3ZDO2FBQ0o7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSw0QkFBNEIsQ0FBQzthQUM1RDtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==