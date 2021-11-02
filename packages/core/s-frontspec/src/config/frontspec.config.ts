import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __fs from 'fs';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __readJson from '@coffeekraken/sugar/node/fs/readJson';

export async function prepare(config) {
    const potentialFrontspecJsonFilePath = `${__packageRoot()}/frontspec.json`;
    if (!__fs.existsSync(potentialFrontspecJsonFilePath)) return config;
    const json = await __readJson(potentialFrontspecJsonFilePath);
    return __deepMerge(config, json);
}

export default function (env, config) {
    if (env.platform !== 'node') return;
    return {
        head: {
            '@dev': {
                /**
                 * @name      viteClient
                 * @namespace     config.frontspec.head.@dev
                 * @type      Object
                 * @default     vite client script
                 *
                 * Specify some items you want to integrate to the head tag. It can be everything you want
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
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
        `,
            },
        },
    };
}
