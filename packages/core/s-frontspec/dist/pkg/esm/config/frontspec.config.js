var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __readJson from '@coffeekraken/sugar/node/fs/readJson';
import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
export function prepare(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const potentialFrontspecJsonFilePath = `${__packageRoot()}/frontspec.json`;
        if (!__fs.existsSync(potentialFrontspecJsonFilePath))
            return config;
        const json = yield __readJson(potentialFrontspecJsonFilePath);
        return __deepMerge(config, json);
    });
}
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        assets: {
            /**
             * @name      viteClient
             * @namespace     config.frontspec.assets
             * @type      Object
             * @default     vite client script
             *
             * Specify some items you want to integrate to the head tag. It can be everything you want
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            viteClient: {
                get src() {
                    return api.env.env === 'development'
                        ? `
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var $script = document.createElement("script");
            var ip = "${__ipAddress()}";
            $script.setAttribute("type", "module");
            $script.setAttribute("src", "${api.config.vite.server.hostname}/@vite/client");
            document.body.appendChild($script);
          });
        </script>
      `
                        : '';
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBQzNFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixNQUFNLFVBQWdCLE9BQU8sQ0FBQyxNQUFNOztRQUNoQyxNQUFNLDhCQUE4QixHQUFHLEdBQUcsYUFBYSxFQUFFLGlCQUFpQixDQUFDO1FBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDO1lBQUUsT0FBTyxNQUFNLENBQUM7UUFDcEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM5RCxPQUFPLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTztRQUNILE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxHQUFHO29CQUNILE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssYUFBYTt3QkFDaEMsQ0FBQyxDQUFDOzs7O3dCQUlGLFdBQVcsRUFBRTs7MkNBR3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUMzQjs7OztPQUlMO3dCQUNpQixDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNiLENBQUM7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==