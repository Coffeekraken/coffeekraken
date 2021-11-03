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
export function preprocess(rawPurgecssConfig, rawConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield __loadConfigFile('purgecss.config.js'))) !== null && _a !== void 0 ? _a : {};
        return __deepMerge(rawPurgecssConfig, config);
    });
}
export default function (env, config) {
    if (env.platform !== 'node')
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        content: [
            'index.html',
            '[config.storage.src.rootDir]/ ** / *.js',
            '[config.storage.src.rootDir]/ ** / *.jsx',
            '[config.storage.src.rootDir]/ ** / *.html',
            '[config.storage.src.rootDir]/ ** / *.vue',
            '[config.storage.src.rootDir]/ ** / *.riot',
            '[config.storage.src.rootDir]/ ** / *.svelte',
            '[config.storage.src.rootDir]/**/*.blade.php',
            '[config.storage.src.rootDir]/**/*.twig',
        ],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2Vjc3MuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHVyZ2Vjc3MuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sZ0RBQWdELENBQUM7QUFDOUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsTUFBTSxVQUFnQixVQUFVLENBQUMsaUJBQWlCLEVBQUUsU0FBUzs7O1FBQ3pELE1BQU0sTUFBTSxHQUFHLE1BQUEsQ0FBQyxNQUFNLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ3BFLE9BQU8sV0FBVyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOztDQUNqRDtBQUVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3BDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLHlDQUF5QztZQUN6QywwQ0FBMEM7WUFDMUMsMkNBQTJDO1lBQzNDLDBDQUEwQztZQUMxQywyQ0FBMkM7WUFDM0MsNkNBQTZDO1lBQzdDLDZDQUE2QztZQUM3Qyx3Q0FBd0M7U0FDM0M7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9