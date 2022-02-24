var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __fs from 'fs';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __readJson from '@coffeekraken/sugar/node/fs/readJson';
export function prepare(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const potentialFrontspecJsonFilePath = `${__packageRoot()}/frontspec.json`;
        if (!__fs.existsSync(potentialFrontspecJsonFilePath))
            return config;
        const json = yield __readJson(potentialFrontspecJsonFilePath);
        return __deepMerge(config, json);
    });
}
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        head: {
            /**
             * @name      viteClient
             * @namespace     config.frontspec.head
             * @type      Object
             * @default     vite client script
             *
             * Specify some items you want to integrate to the head tag. It can be everything you want
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            viteClient: env.env === 'development' ? `
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var $script = document.createElement("script");
            var ip = "${__ipAddress()}";
            $script.setAttribute("type", "module");
            $script.setAttribute("src", "[config.vite.server.hostname]/@vite/client");
            document.body.appendChild($script);
          });
        </script>
      ` : '',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlYy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxXQUFXLE1BQU0sa0RBQWtELENBQUM7QUFDM0UsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBRTlELE1BQU0sVUFBZ0IsT0FBTyxDQUFDLE1BQU07O1FBQ2hDLE1BQU0sOEJBQThCLEdBQUcsR0FBRyxhQUFhLEVBQUUsaUJBQWlCLENBQUM7UUFDM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUM7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNwRSxNQUFNLElBQUksR0FBRyxNQUFNLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzlELE9BQU8sV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNwQyxPQUFPO1FBQ0gsSUFBSSxFQUFFO1lBQ0E7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQVUsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7Ozs7d0JBSTlCLFdBQVcsRUFBRTs7Ozs7O09BTTlCLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDSDtLQUNKLENBQUM7QUFDTixDQUFDIn0=