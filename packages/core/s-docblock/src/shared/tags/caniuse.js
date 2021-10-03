import __downloadGithubDirectory from 'github-download-directory';
import __cacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __fs from 'fs';
/**
 * @name              caniuse
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the caniuse tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @contributor 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function caniuse(data, blockSettings) {
    data = Array.from(data);
    const properties = [];
    for (let j = 0; j < data.length; j++) {
        const d = data[j];
        const props = d.value.split(/(,|\s)/).filter((l) => l.trim() !== '');
        if (!__fs.existsSync(`${__cacheDir()}/mdn/css`)) {
            console.log('download');
            __downloadGithubDirectory
                .download('mdn', 'browser-compat-data')
                .then(console.log, console.error);
        }
        // for (let i = 0; i < props.length; i++) {
        //     const prop = props[i];
        //     const support = __caniuse.find(prop);
        //     console.log('s', support);
        // }
    }
    return properties;
}
export default caniuse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuaXVzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhbml1c2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyx5QkFBeUIsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLFVBQVUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN2RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDaEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEIsTUFBTSxVQUFVLEdBQVUsRUFBRSxDQUFDO0lBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUVyRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRTtZQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hCLHlCQUF5QjtpQkFDcEIsUUFBUSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQztpQkFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsMkNBQTJDO1FBQzNDLDZCQUE2QjtRQUM3Qiw0Q0FBNEM7UUFDNUMsaUNBQWlDO1FBQ2pDLElBQUk7S0FDUDtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFDRCxlQUFlLE9BQU8sQ0FBQyJ9