import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        namespaces: {
            'sugar.views': [`./node_modules/@coffeekraken/sugar/src/views`],
            'sugar.blade': [
                `./node_modules/@coffeekraken/sugar/src/views/blade/@sugar`,
            ],
            'sugar.twig': [`./node_modules/@coffeekraken/sugar/src/views/twig`],
            sections: [
                `./${__path.relative(__packageRootDir(), api.config.storage.src.viewsDir)}/sections`,
            ],
            components: [
                `./${__path.relative(__packageRootDir(), api.config.storage.src.viewsDir)}/components`,
            ],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsYUFBYSxFQUFFLENBQUMsOENBQThDLENBQUM7WUFDL0QsYUFBYSxFQUFFO2dCQUNYLDJEQUEyRDthQUM5RDtZQUNELFlBQVksRUFBRSxDQUFDLG1EQUFtRCxDQUFDO1lBQ25FLFFBQVEsRUFBRTtnQkFDTixLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQ2hCLGdCQUFnQixFQUFFLEVBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQ2xDLFdBQVc7YUFDZjtZQUNELFVBQVUsRUFBRTtnQkFDUixLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQ2hCLGdCQUFnQixFQUFFLEVBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQ2xDLGFBQWE7YUFDakI7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=