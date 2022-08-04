import __SFile from '@coffeekraken/s-file';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __stripSourcemap from '@coffeekraken/sugar/shared/string/stripSourcemap';
/**
 * @name            configFiles
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get the SFile object representation of each config files that correspond to the passed configId
 *
 * @param       {String}        configId            The config id like "frontendServer", etc...
 * @return      {String}                    The .config.js filename
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function configFiles(configId, simplify = false) {
    const paths = __SSugarConfig.filesPaths
        .filter((path) => {
        return path.includes(`/${configId}.config.js`);
    })
        .map((path) => {
        const obj = __SFile.new(path).toObject();
        if (simplify) {
            // obj.content = __stripDocblocks(obj.content);
            obj.content = __stripSourcemap(obj.content);
        }
        return obj;
    });
    return paths;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE9BQU8sZ0JBQWdCLE1BQU0sa0RBQWtELENBQUM7QUFFaEY7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsUUFBZ0IsRUFBRSxRQUFRLEdBQUcsS0FBSztJQUNsRSxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsVUFBVTtTQUNsQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsWUFBWSxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDO1NBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLElBQUksUUFBUSxFQUFFO1lBQ1YsK0NBQStDO1lBQy9DLEdBQUcsQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMifQ==