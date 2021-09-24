import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __theme from './theme';
import __minifyVar from '../utils/minifyVar';
import minifyVar from '../utils/minifyVar';

export default function (from: string, to: string): string[] {
    let vars: string[] = [];

    let fromVariable = `--s-theme-color-${from}`,
        toVariable = `--s-theme-color-${to}`;

    __theme().loopOnColors((colorObj) => {
        if (colorObj.name === to) {
            if (!colorObj.state && !colorObj.variant && colorObj.value.color) {
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
    });

    return vars;
}
