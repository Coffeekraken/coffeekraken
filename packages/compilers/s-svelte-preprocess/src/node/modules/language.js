// @ts-nocheck
import { basename } from 'path';
import { isValidLocalPath } from './utils';
const LANGUAGE_DEFAULTS = {
    sass: {
        indentedSyntax: true,
        stripIndent: true
    },
    pug: {
        stripIndent: true
    },
    coffeescript: {
        stripIndent: true
    },
    stylus: {
        stripIndent: true
    },
    // We need to defer this require to make sugarss an optional dependency.
    sugarss: () => ({
        stripIndent: true,
        // eslint-disable-next-line @typescript-eslint/no-require-imports, node/global-require
        parser: require('sugarss')
    })
};
export const ALIAS_MAP = new Map([
    ['pcss', 'css'],
    ['postcss', 'css'],
    ['sugarss', 'css'],
    ['sass', 'scss'],
    ['styl', 'stylus'],
    ['js', 'javascript'],
    ['coffee', 'coffeescript'],
    ['ts', 'typescript']
]);
export const SOURCE_MAP_PROP_MAP = {
    babel: [['sourceMaps'], true],
    typescript: [['compilerOptions', 'sourceMap'], true],
    scss: [['sourceMap'], true],
    less: [['sourceMap'], {}],
    stylus: [['sourcemap'], true],
    postcss: [['map'], true],
    coffeescript: [['sourceMap'], true],
    globalStyle: [['sourceMap'], true]
};
export function getLanguageDefaults(lang) {
    const defaults = LANGUAGE_DEFAULTS[lang];
    if (!defaults)
        return null;
    if (typeof defaults === 'function') {
        return defaults();
    }
    return defaults;
}
export function addLanguageAlias(entries) {
    return entries.forEach((entry) => ALIAS_MAP.set(...entry));
}
export function getLanguageFromAlias(alias) {
    return ALIAS_MAP.get(alias) || alias;
}
export function isAliasOf(alias, lang) {
    return lang !== alias && getLanguageFromAlias(alias) === lang;
}
export const getLanguage = (attributes) => {
    let alias = null;
    if (attributes.lang) {
        // istanbul ignore if
        if (typeof attributes.lang !== 'string') {
            throw new Error('lang attribute must be string');
        }
        alias = attributes.lang;
    }
    else if (attributes.type) {
        // istanbul ignore if
        if (typeof attributes.type !== 'string') {
            throw new Error('type attribute must be string');
        }
        alias = attributes.type.replace(/^(text|application)\/(.*)$/, '$2');
    }
    else if (typeof attributes.src === 'string' &&
        isValidLocalPath(attributes.src)) {
        const parts = basename(attributes.src).split('.');
        if (parts.length > 1) {
            alias = parts.pop();
        }
    }
    return {
        lang: getLanguageFromAlias(alias),
        alias
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYW5ndWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdoQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFM0MsTUFBTSxpQkFBaUIsR0FBd0I7SUFDN0MsSUFBSSxFQUFFO1FBQ0osY0FBYyxFQUFFLElBQUk7UUFDcEIsV0FBVyxFQUFFLElBQUk7S0FDbEI7SUFDRCxHQUFHLEVBQUU7UUFDSCxXQUFXLEVBQUUsSUFBSTtLQUNsQjtJQUNELFlBQVksRUFBRTtRQUNaLFdBQVcsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sV0FBVyxFQUFFLElBQUk7S0FDbEI7SUFDRCx3RUFBd0U7SUFDeEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDZCxXQUFXLEVBQUUsSUFBSTtRQUNqQixzRkFBc0Y7UUFDdEYsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDM0IsQ0FBQztDQUNILENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDL0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0lBQ2YsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO0lBQ2xCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztJQUNsQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDaEIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO0lBQ2xCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQztJQUNwQixDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUM7SUFDMUIsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDO0NBQ3JCLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFvQztJQUNsRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQztJQUM3QixVQUFVLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNwRCxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUMzQixJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN6QixNQUFNLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUM3QixPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQztJQUN4QixZQUFZLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNuQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQztDQUNuQyxDQUFDO0FBRUYsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQVk7SUFDOUMsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFekMsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLElBQUksQ0FBQztJQUMzQixJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtRQUNsQyxPQUFPLFFBQVEsRUFBRSxDQUFDO0tBQ25CO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxPQUFnQztJQUMvRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsS0FBb0I7SUFDdkQsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQztBQUN2QyxDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxLQUFhLEVBQUUsSUFBWTtJQUNuRCxPQUFPLElBQUksS0FBSyxLQUFLLElBQUksb0JBQW9CLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDO0FBQ2hFLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxVQUEwQyxFQUFFLEVBQUU7SUFDeEUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBRWpCLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtRQUNuQixxQkFBcUI7UUFDckIsSUFBSSxPQUFPLFVBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNsRDtRQUVELEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO0tBQ3pCO1NBQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFO1FBQzFCLHFCQUFxQjtRQUNyQixJQUFJLE9BQU8sVUFBVSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3JFO1NBQU0sSUFDTCxPQUFPLFVBQVUsQ0FBQyxHQUFHLEtBQUssUUFBUTtRQUNsQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQ2hDO1FBQ0EsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEQsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO0tBQ0Y7SUFFRCxPQUFPO1FBQ0wsSUFBSSxFQUFFLG9CQUFvQixDQUFDLEtBQUssQ0FBQztRQUNqQyxLQUFLO0tBQ04sQ0FBQztBQUNKLENBQUMsQ0FBQyJ9