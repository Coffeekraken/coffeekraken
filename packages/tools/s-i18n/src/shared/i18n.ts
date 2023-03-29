import __SEnv from '@coffeekraken/s-env';
import { __get } from '@coffeekraken/sugar/object';

/**
 * @name            i18n
 * @namespace       shared
 * @type            Function
 * @status          beta
 * @platform        node
 * @platform        browser
 *
 * This function is the one to use to set retreive a translated string
 *
 * @example         js
 * import { __i18n } from '@coffeekraken/s-i18n';
 * console.log(__i18n('myApp.title', 'Hello world'));
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface II18nSettings {
    id: string;
    tokens: Record<string, string>;
}

export default function __i18n(
    str: string,
    settings?: Partial<II18nSettings>,
): string {
    const finalSettings: II18nSettings = {
        tokens: {},
        ...(settings ?? {}),
    };

    const i18n = __SEnv.get('i18n') ?? {};

    let translation;
    if (finalSettings.id) {
        translation = i18n[finalSettings.id] ?? __get(i18n, finalSettings.id);
    }
    if (!translation) {
        translation = i18n[str] ?? str;
    }

    // replace tokens
    for (let [token, value] of Object.entries(finalSettings.tokens)) {
        translation = translation.replace(token, value);
    }

    return translation;
}
