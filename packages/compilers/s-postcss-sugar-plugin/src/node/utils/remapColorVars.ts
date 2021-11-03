import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __theme from './theme';
import __minifyVar from '../utils/minifyVar';
import minifyVar from '../utils/minifyVar';

export default function (from: string, to: string): string[] {
    let vars: string[] = [];

    const toColorName = to.split('-').slice(0, 1)[0],
        fromColorName = from.split('-').slice(0, 1)[0];
    let toColorVariant = to.split('-').pop(),
        fromColorVariant = from.split('-').pop();
    if (toColorName === toColorVariant) toColorVariant = undefined;
    if (fromColorName === fromColorVariant) fromColorVariant = undefined;

    let fromVariable = `--s-theme-color-${fromColorName}`,
        toVariable = `--s-theme-color-${toColorName}`;

    __theme().loopOnColors((colorObj) => {
        if (colorObj.name === toColorName) {
            if (toColorVariant) {
                if (colorObj.variant === toColorVariant) {
                    console.log(colorObj);
                    vars.push(
                        `${fromVariable}-saturation-offset: var(${toVariable}-${colorObj.variant}-saturation-offset, 0);`,
                    );
                    vars.push(
                        `${fromVariable}-lightness-offset: var(${toVariable}-${colorObj.variant}-lightness-offset, 0);`,
                    );
                    vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
                }
            } else {
                if (
                    !colorObj.state &&
                    !colorObj.variant &&
                    colorObj.value.color
                ) {
                    vars.push(`${fromVariable}-h: ${colorObj.value.h};`);
                    vars.push(`${fromVariable}-s: ${colorObj.value.s};`);
                    vars.push(`${fromVariable}-l: ${colorObj.value.l};`);
                } else if (!colorObj.value.color) {
                    vars.push(
                        `${fromVariable}-${colorObj.variant}-saturation-offset: var(${toVariable}-${colorObj.variant}-saturation-offset, 0);`,
                    );
                    vars.push(
                        `${fromVariable}-${colorObj.variant}-lightness-offset: var(${toVariable}-${colorObj.variant}-lightness-offset, 0);`,
                    );
                    vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
                }
            }
        }
    });

    return vars;
}
