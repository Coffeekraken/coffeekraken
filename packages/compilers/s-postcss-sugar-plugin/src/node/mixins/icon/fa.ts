import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import * as __fa from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

class postcssSugarPluginIconFaInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                icon: {
                    type: 'String',
                    required: true,
                },
                style: {
                    type: 'String',
                    values: ['solid', 'regular', 'light', 'duotone', 'brands'],
                    default: 'solid',
                },
            })
        );
    }
}

export interface IPostcssSugarPluginIconFaParams {
    icon: string;
    style: string;
}

export { postcssSugarPluginIconFaInterface as interface };

let _isFaInitialised = false;

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginIconFaParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginIconFaParams = {
        icon: '',
        style: 'solid',
        ...params,
    };

    if (finalParams.style === 'fa') finalParams.style = 'fas';

    const prefixes = {
        solid: 'fas',
        regular: 'far',
        light: 'fal',
        duotone: 'fad',
        brand: 'fab',
    };

    const fontNames = {
        fas: 'Free',
        far: 'Free',
        fal: 'Free',
        fad: 'Free',
        fab: 'Brands',
    };

    // register icons if first call
    if (!_isFaInitialised) {
        __fa.library.add(fas, fab);
        atRule.root().append(`
      @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
    `);
        _isFaInitialised = true;
    }

    const prefix = prefixes[finalParams.style] ?? finalParams.style;

    const iconDef = __fa.findIconDefinition({
        prefix,
        // @ts-ignore
        iconName: finalParams.icon,
    });

    if (!iconDef) {
        console.log(
            __parseHtml(
                `<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`,
            ),
        );
        return;
    }

    if (finalParams.style === 'solid' || finalParams.style === 'fas')
        finalParams.style = 'free';

    const vars: string[] = [];

    const fontWeight = {
        fas: 900,
        far: 400,
        fal: 300,
        fad: 900,
        fab: 400,
    };

    vars.push(`
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    font-family: "Font Awesome 5 ${__upperFirst(fontNames[prefix])}";
    font-weight: ${fontWeight[prefix]};
    
    &:before {
      content: "\\${iconDef.icon[3]}";
      display: inline-block;
    }
  `);

    return vars;
}
