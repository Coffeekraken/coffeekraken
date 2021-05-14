// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import postcss from 'postcss';
function process({ options: { plugins = [], parser, syntax } = {}, content, filename, sourceMap }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { css, map, messages } = yield postcss(plugins).process(content, {
            from: filename,
            map: { prev: sourceMap, inline: false },
            parser,
            syntax
        });
        const dependencies = messages.reduce((acc, msg) => {
            // istanbul ignore if
            if (msg.type !== 'dependency')
                return acc;
            acc.push(msg.file);
            return acc;
        }, []);
        return { code: css, map, dependencies };
    });
}
function getConfigFromFile(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /** If not, look for a postcss config file */
            const { default: postcssLoadConfig } = yield import(`postcss-load-config`);
            const loadedConfig = yield postcssLoadConfig(options, options === null || options === void 0 ? void 0 : options.configFilePath);
            return {
                error: null,
                config: Object.assign({ plugins: loadedConfig.plugins }, loadedConfig.options)
            };
        }
        catch (e) {
            return {
                config: null,
                error: e
            };
        }
    });
}
/** Adapted from https://github.com/TehShrike/svelte-preprocess-postcss */
const transformer = ({ content, filename, options = {}, map }) => __awaiter(void 0, void 0, void 0, function* () {
    let fileConfig;
    if (!options.plugins) {
        fileConfig = yield getConfigFromFile(options);
        options = Object.assign(Object.assign({}, options), fileConfig.config);
    }
    if (options.plugins || options.syntax || options.parser) {
        return process({ options, content, filename, sourceMap: map });
    }
    if (fileConfig.error !== null) {
        console.error(`[svelte-preprocess] PostCSS configuration was not passed or is invalid. If you expect to load it from a file make sure to install "postcss-load-config" and try again.\n\n${fileConfig.error}`);
    }
    return { code: content, map, dependencies: [] };
});
export { transformer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvc3Rjc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUk5QixTQUFlLE9BQU8sQ0FBQyxFQUNyQixPQUFPLEVBQUUsRUFBRSxPQUFPLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQzlDLE9BQU8sRUFDUCxRQUFRLEVBQ1IsU0FBUyxFQU1WOztRQUNDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDckUsSUFBSSxFQUFFLFFBQVE7WUFDZCxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDdkMsTUFBTTtZQUNOLE1BQU07U0FDUCxDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2hELHFCQUFxQjtZQUNyQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssWUFBWTtnQkFBRSxPQUFPLEdBQUcsQ0FBQztZQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVuQixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVQLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0NBQUE7QUFFRCxTQUFlLGlCQUFpQixDQUM5QixPQUF3Qjs7UUFFeEIsSUFBSTtZQUNGLDZDQUE2QztZQUM3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUMzRSxNQUFNLFlBQVksR0FBRyxNQUFNLGlCQUFpQixDQUMxQyxPQUFPLEVBQ1AsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLGNBQWMsQ0FDeEIsQ0FBQztZQUVGLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTSxrQkFDSixPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU8sSUFFMUIsWUFBWSxDQUFDLE9BQU8sQ0FDeEI7YUFDRixDQUFDO1NBQ0g7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0NBQUE7QUFFRCwwRUFBMEU7QUFDMUUsTUFBTSxXQUFXLEdBQWlDLENBQU8sRUFDdkQsT0FBTyxFQUNQLFFBQVEsRUFDUixPQUFPLEdBQUcsRUFBRSxFQUNaLEdBQUcsRUFDSixFQUFFLEVBQUU7SUFDSCxJQUFJLFVBQXNELENBQUM7SUFFM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7UUFDcEIsVUFBVSxHQUFHLE1BQU0saUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxtQ0FBUSxPQUFPLEdBQUssVUFBVSxDQUFDLE1BQU0sQ0FBRSxDQUFDO0tBQ2hEO0lBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtRQUN2RCxPQUFPLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtRQUM3QixPQUFPLENBQUMsS0FBSyxDQUNYLDZLQUE2SyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQ2hNLENBQUM7S0FDSDtJQUVELE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsRUFBVyxFQUFFLENBQUM7QUFDM0QsQ0FBQyxDQUFBLENBQUM7QUFFRixPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMifQ==