var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __loadConfigFile from '@coffeekraken/sugar/node/config/loadConfigFile';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export function preprocess(api) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield __loadConfigFile('purgecss.config.js'))) !== null && _a !== void 0 ? _a : {};
        return __deepMerge(api.this, config);
    });
}
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            content
         * @namespace       config.purgecss
         * @type            String[]
         * @default         ['index.html','[config.storage.src.rootDir]/ ** / *.js','[config.storage.src.rootDir]/ ** / *.jsx','[config.storage.src.rootDir]/ ** / *.html','[config.storage.src.rootDir]/ ** / *.vue','[config.storage.src.rootDir]/ ** / *.riot','[config.storage.src.rootDir]/ ** / *.svelte','[config.storage.src.rootDir]/ ** / *.blade.php','[config.storage.src.rootDir]/ ** / *.twig']
         *
         * Specify the content files to take in consideration to purge your css
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get content() {
            return [
                'index.html',
                `${api.config.storage.package.rootDir}/**/*.js`,
                `${api.config.storage.package.rootDir}/**/*.jsx`,
                `${api.config.storage.package.rootDir}/**/*.html`,
                `${api.config.storage.package.rootDir}/**/*.vue`,
                `${api.config.storage.package.rootDir}/**/*.riot`,
                `${api.config.storage.package.rootDir}/**/*.svelte`,
                `${api.config.storage.package.rootDir}/*/*.ladephp`,
                `${api.config.storage.package.rootDir}/*/*.wi`,
            ];
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sZ0RBQWdELENBQUM7QUFDOUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsTUFBTSxVQUFnQixVQUFVLENBQUMsR0FBRzs7O1FBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQUEsQ0FBQyxNQUFNLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ3BFLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7O0NBQ3hDO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPO2dCQUNILFlBQVk7Z0JBQ1osR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxVQUFVO2dCQUMvQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFdBQVc7Z0JBQ2hELEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sWUFBWTtnQkFDakQsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxXQUFXO2dCQUNoRCxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFlBQVk7Z0JBQ2pELEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sY0FBYztnQkFDbkQsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxjQUFjO2dCQUNuRCxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFNBQVM7YUFDakQsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9