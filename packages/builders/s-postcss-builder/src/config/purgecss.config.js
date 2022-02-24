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
export function preprocess(env, rawPurgecssConfig, rawConfig) {
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2Vjc3MuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHVyZ2Vjc3MuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sZ0RBQWdELENBQUM7QUFDOUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsTUFBTSxVQUFnQixVQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLFNBQVM7OztRQUM5RCxNQUFNLE1BQU0sR0FBRyxNQUFBLENBQUMsTUFBTSxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUNwRSxPQUFPLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7Q0FDakQ7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWix5Q0FBeUM7WUFDekMsMENBQTBDO1lBQzFDLDJDQUEyQztZQUMzQywwQ0FBMEM7WUFDMUMsMkNBQTJDO1lBQzNDLDZDQUE2QztZQUM3Qyw2Q0FBNkM7WUFDN0Msd0NBQXdDO1NBQzNDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==