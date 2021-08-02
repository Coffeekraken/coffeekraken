import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __fs from 'fs';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
export function prepare(config) {
    const potentialFrontspecJsonFilePath = `${__packageRoot()}/frontspec.json`;
    if (!__fs.existsSync(potentialFrontspecJsonFilePath))
        return config;
    const json = __readJsonSync(potentialFrontspecJsonFilePath);
    return __deepMerge(config, json);
}
export default {
    /**
     * @name      head
     * @namespace     config.frontspec.default
     * @type      Object
     *
     * Specify some items you want to integrate to the head tag. It can be everything you want
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    head: {
        '@dev': {
            viteClient: `
          <script>
            document.addEventListener("DOMContentLoaded", function() {
              var $script = document.createElement("script");
              var ip = "${__ipAddress()}";
              $script.setAttribute("type", "module");
              $script.setAttribute("src", "[config.vite.server.hostname]/@vite/client");
              document.body.appendChild($script);
            });
          </script>
        `
        }
    },
    /**
     * @name      assets
     * @namespace     config.frontspec.default
     * @type      Object
     * @default       [config.assets]
     *
     * Specify the default assets available in the current working directory like js, css, etc...
     *
     * @todo      Types
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    assets: '[config.assets]'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlYy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sa0RBQWtELENBQUM7QUFDM0UsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBRXRFLE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBTTtJQUM1QixNQUFNLDhCQUE4QixHQUFHLEdBQUcsYUFBYSxFQUFFLGlCQUFpQixDQUFDO0lBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFDcEUsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDNUQsT0FBTyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCxlQUFlO0lBQ1g7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxFQUFFO1FBRUosTUFBTSxFQUFFO1lBRU4sVUFBVSxFQUFFOzs7OzBCQUlNLFdBQVcsRUFBRTs7Ozs7O1NBTTlCO1NBQ0Y7S0FDRjtJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sRUFBRSxpQkFBaUI7Q0FDNUIsQ0FBQyJ9