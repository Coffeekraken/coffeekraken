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
export function preprocess(env, rawViteConfig, rawConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield __loadConfigFile('tsconfig.json'))) !== null && _a !== void 0 ? _a : {};
        return __deepMerge(rawViteConfig, config);
    });
}
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        compilerOptions: {
            incremental: false,
            allowJs: true,
            strict: true,
            inlineSourceMap: true,
            traceResolution: false,
            esModuleInterop: true,
            skipLibCheck: true,
            declaration: true,
            experimentalDecorators: true,
            forceConsistentCasingInFileNames: false,
            noImplicitAny: false,
            noStrictGenericChecks: false,
            allowSyntheticDefaultImports: false,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sZ0RBQWdELENBQUM7QUFDOUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsTUFBTSxVQUFnQixVQUFVLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxTQUFTOzs7UUFDMUQsTUFBTSxNQUFNLEdBQUcsTUFBQSxDQUFDLE1BQU0sZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQy9ELE9BQU8sV0FBVyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQzs7Q0FDN0M7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsZUFBZSxFQUFFO1lBQ2IsV0FBVyxFQUFFLEtBQUs7WUFDbEIsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsSUFBSTtZQUNaLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsZ0NBQWdDLEVBQUUsS0FBSztZQUN2QyxhQUFhLEVBQUUsS0FBSztZQUNwQixxQkFBcUIsRUFBRSxLQUFLO1lBQzVCLDRCQUE0QixFQUFFLEtBQUs7U0FDdEM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9