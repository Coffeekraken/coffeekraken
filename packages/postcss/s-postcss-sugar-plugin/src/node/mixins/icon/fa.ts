import __SInterface from '@coffeekraken/s-interface';
import { __parseHtml } from '@coffeekraken/sugar/console';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import { __upperFirst } from '@coffeekraken/sugar/string';
import __fab from './fa/brands';
import __fas from './fa/solid';

class postcssSugarPluginIconFaInterface extends __SInterface {
    static get _definition() {
        return {
            icon: {
                type: 'String',
                required: true,
            },
            style: {
                type: 'String',
                values: ['fa', 'fas', 'far', 'fab', 'fal', 'fad'],
                default: 'fas',
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
        style: 'fas',
        ...params,
    };

    if (finalParams.style === 'fa') finalParams.style = 'fas';

    let availableIcons = {
        fas: __fas,
        fab: __fab,
    };
    const faId = __camelCase(`fa-${finalParams.icon}`);

    if (!availableIcons[finalParams.style]?.[faId]) {
        console.log(
            __parseHtml(
                `<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`,
            ),
        );
        return;
    }

    sharedData.isFontawesomeNeeded = true;

    let iconObj = availableIcons[finalParams.style][faId];

    const vars: string[] = [];

    const fontNames = {
            fas: 'Free',
            far: 'Free',
            fal: 'Free',
            fad: 'Free',
            fab: 'Brands',
        },
        fontWeight = {
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
    font-family: "Font Awesome 6 ${__upperFirst(fontNames[finalParams.style])}";
    font-weight: ${fontWeight[finalParams.style]};
    
    &:before {
      content: "\\${iconObj.icon[3]}";
      display: inline-block;
    }
  `);

    return vars;
}
