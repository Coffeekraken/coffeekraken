import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __theme from './theme';
import __minifyVar from '../utils/minifyVar';
import minifyVar from '../utils/minifyVar';

export default function (from: string, to: string): string[] {
    let vars: string[] = [];

    let fromVariable = `--s-theme-color-${from}`,
        toVariable = `--s-theme-color-${to}-origin`;

    // const baseColors = __theme().baseColors();

    // Object.keys(baseColors).forEach((colorName) => {
    //     const colorObj = baseColors[colorName];
    //     if (colorName === from && !fromVariable) {
    //         fromVariable = colorObj.variable;
    //     } else if (colorName === to && !toVariable) {
    //         // toVariable = colorObj.variable;
    //         toVariable = `--s-theme-color-${to}-origin`;
    //     }
    //     // if (fromVariable && toVariable) return -1;
    // });

    vars.push(
        [
            `${fromVariable}-h: var(${toVariable}-h);`,
            `${fromVariable}-s: var(${toVariable}-s);`,
            `${fromVariable}-l: var(${toVariable}-l);`,
            // `${fromVariable}-a: var(${toVariable}-a);`,
            // `${fromVariable}-saturation-offset: var(${toVariable}-saturation-offset, 0);`,
            // `${fromVariable}-lightness-offset: var(${toVariable}-lightness-offset, 0);`,
        ].join('\n'),
    );

    return vars;
}
