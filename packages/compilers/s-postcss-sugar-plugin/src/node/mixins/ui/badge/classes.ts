import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiBadgeClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            values: ['solid', 'outline'],
            default: ['solid', 'outline'],
        },
        defaultStyle: {
            type: 'String',
            values: ['solid', 'outline'],
            default: __theme().config('ui.badge.defaultStyle') ?? 'solid',
        },
    };
}

export interface IPostcssSugarPluginUiBadgeClassesParams {
    styles: ('solid' | 'outline')[];
    defaultStyle: 'solid' | 'outline';
}

export { postcssSugarPluginUiBadgeClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBadgeClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBadgeClassesParams = {
        styles: ['solid', 'outline'],
        defaultStyle: 'solid',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Badges
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/badges
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a badge
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-badge${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} badge style`;
            })
            .join('\n')}
        * 
        * @cssClass         s-badge:square       Display your badge with squared corners
        * @cssClass         s-badge:pill         Display your badge with rounded corners
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-font:40 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:20">${style} style</h3>
            *   <a class="s-badge:${style} s-mie:20">Say hello!</a>
            *   <a class="s-badge:${style} s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge:${style} s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge:${style} s-color:error">Say hello!</a>
            * </div>
            * `;
            })
            .join('\n')}
        *
        * <!-- shapes -->
        * <div class="s-font:40 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:20">Shapes</h3>
        *   <a class="s-badge:square s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge:pill s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge:outline:square s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge:outline:pill s-mie:20 s-mbe:20">Say hello!</a>
        * </div>
        * 
        * <!-- scales -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:20">Scales</h3>
        *   <a class="s-badge s-scale:05 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:1 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:12 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:15 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:20 s-mbe:20">Say hello!</a>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    vars.push(`/**
        * @name           s-badge
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">default</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-badge {
            @sugar.ui.badge($scope: bare);
        }
    `);

    finalParams.styles.forEach((style) => {
        vars.push(`/**
        * @name           s-badge:${style}
        * @namespace      sugar.css.ui.badge
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">outline</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge:${style}">I'm a cool ${style} badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
        vars.push(`
        .s-badge${style === finalParams.defaultStyle ? '' : `--${style}`} {
            @sugar.ui.badge($style: ${style}, $scope: 'lnf,shape');
        }
    `);
    });

    vars.push(`/**
        * @name           s-badge:square
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">squared</s-color>" badge
        * 
        * 
        * 
        * @example        html
        * <a class="s-badge:square">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        .s-badge--square {
            @sugar.ui.badge($shape: square, $scope: shape);
        }
    `);

    vars.push(`/**
        * @name           s-badge:pill
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">pill</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge:pill">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        .s-badge--pill {
            @sugar.ui.badge($shape: pill, $scope: shape);
        }
    `);

    replaceWith(vars);
}
