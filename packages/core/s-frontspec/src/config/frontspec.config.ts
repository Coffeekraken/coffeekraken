import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __fs from 'fs';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';

export function prepare(config) {
  const potentialFrontspecJsonFilePath = `${__packageRoot()}/frontspec.json`;
  if (!__fs.existsSync(potentialFrontspecJsonFilePath)) return config;
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
