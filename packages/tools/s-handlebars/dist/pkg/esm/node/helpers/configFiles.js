import __SFile from '@coffeekraken/s-file';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __stripSourcemap } from '@coffeekraken/sugar/string';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBb0IsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVoRjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FBQyxRQUFnQixFQUFFLFFBQVEsR0FBRyxLQUFLO0lBQ2xFLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxVQUFVO1NBQ2xDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxZQUFZLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUM7U0FDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNWLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekMsSUFBSSxRQUFRLEVBQUU7WUFDViwrQ0FBK0M7WUFDL0MsR0FBRyxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9