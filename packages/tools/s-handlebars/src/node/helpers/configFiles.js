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
 * @param       {String}        configId            The config id like "frontendServer", etc...
 * @return      {String}                    The .config.js filename
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnRmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWdGaWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLGdCQUFnQixNQUFNLGtEQUFrRCxDQUFDO0FBRWhGOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLFFBQWdCLEVBQUUsUUFBUSxHQUFHLEtBQUs7SUFDbEUsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLFVBQVU7U0FDbEMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLFlBQVksQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQztTQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1YsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN6QyxJQUFJLFFBQVEsRUFBRTtZQUNWLCtDQUErQztZQUMvQyxHQUFHLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDIn0=