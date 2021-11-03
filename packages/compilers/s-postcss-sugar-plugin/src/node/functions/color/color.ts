// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __theme from '../../utils/theme';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __minifyVar from '../../utils/minifyVar';

class colorVariantNameInterface extends __SInterface {
    static definition = {
        saturate: {
            type: 'Number|String',
            default: 0,
        },
        desaturate: {
            type: 'Number',
            default: 0,
        },
        darken: {
            type: 'Number',
            default: 0,
        },
        lighten: {
            type: 'Number',
            default: 0,
        },
        spin: {
            type: 'Number',
            default: 0,
        },
        alpha: {
            type: 'Number',
            default: 1,
        },
    };
}

class postcssSugarPluginColorInterface extends __SInterface {
    static definition = {
        color: {
            type: 'String',
            alias: 'c',
        },
        variant: {
            type: 'String',
            alias: 'v',
        },
    };
}
export { postcssSugarPluginColorInterface as interface };

export interface IPostcssSugarPluginColorParams {
    name: string;
    variant: string;
}

export default function color({
    params,
}: {
    params: Partial<IPostcssSugarPluginColorParams>;
}) {
    const finalParams: IPostcssSugarPluginColorParams = {
        color: '',
        variant: undefined,
        ...params,
    };

    if (finalParams.color.match(/^(hsla?|rgba?|hsv)\(/))
        return finalParams.color;
    if (finalParams.color.match(/^var\(--/)) return finalParams.color;

    let colorName = finalParams.color;
    let colorVariantName = finalParams.variant ? finalParams.variant : '';
    let colorStateName = '';

    const nameParts = finalParams.color.split(':');

    if (nameParts.length === 2) {
        colorName = nameParts[0];
        colorStateName = nameParts[1];
    }

    let modifierParams = {};
    if (finalParams.variant && finalParams.variant.match(/^--/)) {
        modifierParams = colorVariantNameInterface.apply(finalParams.variant);
    } else if (
        finalParams.variant &&
        finalParams.variant.trim().match(/[a-zA-Z0-9_-]+/)
    ) {
        colorVariantName = finalParams.variant;
    }

    if (__isColor(colorName)) {
        const color = new __SColor(colorName);
        if (finalParams.variant) {
            color.apply(finalParams.variant);
        }
        return color.toString();
    } else {
        const colorVar = `--s-theme-color-${colorName}`;

        let colorVariantNameVar = `s-theme-color-${colorName}`;
        if (colorStateName) {
            colorVariantNameVar += `-${colorStateName}`;
        }
        if (finalParams.variant && !finalParams.variant.match(/^--/)) {
            colorVariantNameVar += `-${colorVariantName}`;
        }

        colorVariantNameVar =
            '--' + colorVariantNameVar.replace(/-{2,999}/gm, '-');

        let finalValue = colorVar;

        let saturationOffset = modifierParams.saturate
            ? modifierParams.saturate
            : modifierParams.desaturate
            ? modifierParams.desaturate * -1
            : undefined;
        if (saturationOffset === undefined) {
            saturationOffset = `var(${colorVariantNameVar}-saturation-offset, 0)`;
        }

        let lightnessOffset = modifierParams.lighten
            ? modifierParams.lighten
            : modifierParams.darken
            ? modifierParams.darken * -1
            : undefined;
        if (lightnessOffset === undefined)
            lightnessOffset = `var(${colorVariantNameVar}-lightness-offset, 0)`;

        let alpha =
            modifierParams.alpha !== undefined ? modifierParams.alpha : 1;

        finalValue = `hsla(
      calc(
        var(${colorVar}-h, 0)
        +
        var(${colorVariantNameVar}-spin ,${modifierParams.spin ?? 0})
      ),
      calc(
        (
          var(${colorVar}-s, 0)
          +
          ${saturationOffset}
        )
        * 1%
      ),
      calc(
        (
          var(${colorVar}-l, 0)
          +
          ${lightnessOffset}
        )
        * 1%
      ),
      ${
          modifierParams.alpha !== undefined
              ? modifierParams.alpha
              : `var(${colorVariantNameVar}-a, 1)`
      }
    )`;

        finalValue = finalValue
            .replace(/(\n|\s{2,99999999})/gm, '')
            .replace(/\t/gm, ' ')
            .replace(/\s?\+\s?/gm, ' + ')
            .replace(/\)\-\s?/gm, ') - ')
            .replace(/\s?\*\s?/gm, ' * ')
            .replace(/\s?\/\s?/gm, ' / ');

        return finalValue;
    }
}
