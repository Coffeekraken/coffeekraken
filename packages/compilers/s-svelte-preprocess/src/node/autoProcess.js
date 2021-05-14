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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { hasDepInstalled, concat, setProp } from './modules/utils';
import { getTagInfo } from './modules/tagInfo';
import { addLanguageAlias, getLanguageFromAlias, SOURCE_MAP_PROP_MAP, getLanguage, getLanguageDefaults, isAliasOf } from './modules/language';
import { prepareContent } from './modules/prepareContent';
import { transformMarkup } from './modules/markup';
export const transform = (name, options, { content, map, filename, attributes }) => __awaiter(void 0, void 0, void 0, function* () {
    if (options === false) {
        return { code: content };
    }
    if (typeof options === 'function') {
        return options({ content, map, filename, attributes });
    }
    // todo: maybe add a try-catch here looking for module-not-found errors
    const { transformer } = yield import(`./transformers/${name}`);
    return transformer({
        content,
        filename,
        map,
        attributes,
        options: typeof options === 'boolean' ? null : options
    });
});
export function sveltePreprocess(_a) {
    var _b, _c;
    var _d = _a === void 0 ? {} : _a, { aliases, markupTagName = 'template', preserve = [], defaults, sourceMap = (_c = ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.NODE_ENV) === 'development') !== null && _c !== void 0 ? _c : false } = _d, rest = __rest(_d, ["aliases", "markupTagName", "preserve", "defaults", "sourceMap"]);
    const defaultLanguages = Object.freeze(Object.assign({ markup: 'html', style: 'css', script: 'javascript' }, defaults));
    const transformers = rest;
    if (aliases === null || aliases === void 0 ? void 0 : aliases.length) {
        addLanguageAlias(aliases);
    }
    function resolveLanguageArgs(name, alias) {
        const { [name]: nameOpts, [alias]: aliasOpts } = transformers;
        const opts = {};
        if (typeof nameOpts === 'object') {
            Object.assign(opts, nameOpts);
        }
        Object.assign(opts, getLanguageDefaults(name), getLanguageDefaults(alias));
        if (name !== alias && typeof aliasOpts === 'object') {
            Object.assign(opts, aliasOpts);
        }
        if (sourceMap && name in SOURCE_MAP_PROP_MAP) {
            const [path, value] = SOURCE_MAP_PROP_MAP[name];
            setProp(opts, path, value);
        }
        return opts;
    }
    function getTransformerOptions(lang, alias, { ignoreAliasOverride } = {}) {
        const { [lang]: langOpts, [alias]: aliasOpts } = transformers;
        if (!ignoreAliasOverride && typeof aliasOpts === 'function') {
            return aliasOpts;
        }
        if (typeof langOpts === 'function')
            return langOpts;
        if (aliasOpts === false || langOpts === false)
            return false;
        return resolveLanguageArgs(lang, alias);
    }
    const getTransformerTo = (type, targetLanguage) => (svelteFile) => __awaiter(this, void 0, void 0, function* () {
        let { content, filename, lang, alias, dependencies, attributes } = yield getTagInfo(svelteFile);
        if (lang == null || alias == null) {
            alias = defaultLanguages[type];
            lang = getLanguageFromAlias(alias);
        }
        if (preserve.includes(lang) || preserve.includes(alias)) {
            return { code: content };
        }
        const transformerOptions = getTransformerOptions(lang, alias);
        content = prepareContent({
            options: transformerOptions,
            content
        });
        if (lang === targetLanguage) {
            // has override method for alias
            // example: sugarss override should work apart from postcss
            if (typeof transformerOptions === 'function' && alias !== lang) {
                return transformerOptions({ content, filename, attributes });
            }
            // otherwise, we're done here
            return { code: content, dependencies };
        }
        const transformed = yield transform(lang, transformerOptions, {
            content,
            filename,
            attributes
        });
        return Object.assign(Object.assign({}, transformed), { dependencies: concat(dependencies, transformed.dependencies) });
    });
    const scriptTransformer = getTransformerTo('script', 'javascript');
    const cssTransformer = getTransformerTo('style', 'css');
    const markupTransformer = getTransformerTo('markup', 'html');
    const markup = ({ content, filename }) => __awaiter(this, void 0, void 0, function* () {
        if (transformers.replace) {
            const transformed = yield transform('replace', transformers.replace, {
                content,
                filename
            });
            content = transformed.code;
        }
        return transformMarkup({ content, filename }, markupTransformer, {
            // we only pass the markupTagName because the rest of options
            // is fetched internally by the `markupTransformer`
            markupTagName
        });
    });
    const script = ({ content, attributes, filename }) => __awaiter(this, void 0, void 0, function* () {
        const transformResult = yield scriptTransformer({
            content,
            attributes,
            filename
        });
        let { code, map, dependencies, diagnostics } = transformResult;
        if (transformers.babel) {
            const transformed = yield transform('babel', getTransformerOptions('babel'), { content: code, map, filename, attributes });
            code = transformed.code;
            map = transformed.map;
            dependencies = concat(dependencies, transformed.dependencies);
            diagnostics = concat(diagnostics, transformed.diagnostics);
        }
        return { code, map, dependencies, diagnostics };
    });
    const style = ({ content, attributes, filename }) => __awaiter(this, void 0, void 0, function* () {
        const transformResult = yield cssTransformer({
            content,
            attributes,
            filename
        });
        let { code, map, dependencies } = transformResult;
        const hasPostcss = yield hasDepInstalled('postcss');
        // istanbul ignore else
        if (hasPostcss) {
            if (transformers.postcss) {
                const { alias, lang } = getLanguage(attributes);
                const postcssOptions = getTransformerOptions('postcss', isAliasOf(alias, lang) ? alias : null, 
                // todo: this seems wrong and ugly
                { ignoreAliasOverride: true });
                const transformed = yield transform('postcss', postcssOptions, {
                    content: code,
                    map,
                    filename,
                    attributes
                });
                code = transformed.code;
                map = transformed.map;
                dependencies = concat(dependencies, transformed.dependencies);
            }
            const transformed = yield transform('globalStyle', getTransformerOptions('globalStyle'), { content: code, map, filename, attributes });
            code = transformed.code;
            map = transformed.map;
        }
        else if ('global' in attributes) {
            console.warn(`[svelte-preprocess] 'global' attribute found, but 'postcss' is not installed. 'postcss' is used to walk through the CSS and transform any necessary selector.`);
        }
        return { code, map, dependencies };
    });
    return {
        defaultLanguages,
        markup,
        script,
        style
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRvUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZZCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixvQkFBb0IsRUFDcEIsbUJBQW1CLEVBQ25CLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsU0FBUyxFQUNWLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVuRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsQ0FDdkIsSUFBWSxFQUNaLE9BQTJCLEVBQzNCLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUF3QixFQUN4QyxFQUFFO0lBQ3RCLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtRQUNyQixPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO0tBQzFCO0lBRUQsSUFBSSxPQUFPLE9BQU8sS0FBSyxVQUFVLEVBQUU7UUFDakMsT0FBTyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsdUVBQXVFO0lBQ3ZFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUUvRCxPQUFPLFdBQVcsQ0FBQztRQUNqQixPQUFPO1FBQ1AsUUFBUTtRQUNSLEdBQUc7UUFDSCxVQUFVO1FBQ1YsT0FBTyxF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