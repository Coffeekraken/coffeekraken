var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __downloadGithubDirectory from '@coffeekraken/sugar/node/github/downloadRepository';
import __cacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
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
    return __awaiter(this, void 0, void 0, function* () {
        data = Array.from(data);
        throw new Error('Sorry but the caniuse docblock tag is not supported for now...');
        const properties = [];
        for (let j = 0; j < data.length; j++) {
            const d = data[j];
            const props = d.value.split(/(,|\s)/).filter((l) => l.trim() !== '');
            const dest = `${__cacheDir()}/mdn/browser-compat-data`;
            // if (!__fs.existsSync(dest)) {
            console.log('download');
            yield __downloadGithubDirectory('mdn/browser-compat-data', {
                dest,
                unzip: true,
            });
            // }
            // for (let i = 0; i < props.length; i++) {
            //     const prop = props[i];
            //     const support = __caniuse.find(prop);
            //     console.log('s', support);
            // }
        }
        return properties;
    });
}
export default caniuse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuaXVzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhbml1c2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEsT0FBTyx5QkFBeUIsTUFBTSxvREFBb0QsQ0FBQztBQUMzRixPQUFPLFVBQVUsTUFBTSwrQ0FBK0MsQ0FBQztBQUd2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxTQUFlLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYTs7UUFDdEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRUFBZ0UsQ0FDbkUsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFVLEVBQUUsQ0FBQztRQUU3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDckUsTUFBTSxJQUFJLEdBQUcsR0FBRyxVQUFVLEVBQUUsMEJBQTBCLENBQUM7WUFDdkQsZ0NBQWdDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEIsTUFBTSx5QkFBeUIsQ0FBQyx5QkFBeUIsRUFBRTtnQkFDdkQsSUFBSTtnQkFDSixLQUFLLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQztZQUNILElBQUk7WUFFSiwyQ0FBMkM7WUFDM0MsNkJBQTZCO1lBQzdCLDRDQUE0QztZQUM1QyxpQ0FBaUM7WUFDakMsSUFBSTtTQUNQO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztDQUFBO0FBQ0QsZUFBZSxPQUFPLENBQUMifQ==