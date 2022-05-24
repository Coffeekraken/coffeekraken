import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __fab from './fa/brands';
import __fas from './fa/solid';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';

class postcssSugarPluginIconFaInterface extends __SInterface {
    static get _definition() {
        return {
            icon: {
                type: 'String',
                required: true,
            },
            style: {
                type: 'String',
                values: ['solid', 'regular', 'light', 'duotone', 'brands'],
                default: 'solid',
            },
        };
    }
}

export interface IPostcssSugarPluginIconFaParams {
    icon: string;
    style: string;
}

export { postcssSugarPluginIconFaInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
    sharedData,
}: {
    params: Partial<IPostcssSugarPluginIconFaParams>;
    atRule: any;
    replaceWith: Function;
    sharedData: any;
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

    sharedData.isFontawesomeNeeded = true;

    const faId = __camelCase(`fa-${finalParams.icon}`);
    let iconObj = {
        ...__fas,
        ...__fab,
    }[faId];

    if (!iconObj) {
        console.log(
            __parseHtml(
                `<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`,
            ),
        );
        return;
    }

    const prefix = iconObj.prefix;

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
    font-family: "Font Awesome 6 ${__upperFirst(fontNames[prefix])}";
    font-weight: ${fontWeight[prefix]};
    
    &:before {
      content: "\\${iconObj.icon[3]}";
      display: inline-block;
    }
  `);

    return vars;
}
