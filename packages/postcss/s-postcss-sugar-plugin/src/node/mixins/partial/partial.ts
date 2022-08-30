import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           partial
 * @namespace      node.mixin.export
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to mark some css to be exported as separated file.
 * You can specify the name of your partial
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * @sugar.partial(general) {
 *   body {
 *      background: red;
 *   }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginCacheInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                type: 'String',
            },
        };
    }
}

export interface IPostcssSugarPluginCacheParams {
    id: string;
}

export { postcssSugarPluginCacheInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    nodesToString,
    postcss,
    postcssApi,
    settings,
}: {
    params: Partial<IPostcssSugarPluginCacheParams>;
    atRule: any;
    CssVars: any;
    nodesToString: Function;
    postcss: any;
    postcssApi: any;
    settings: any;
}) {
    const finalParams: IPostcssSugarPluginCacheParams = {
        id: '',
        ...params,
    };

    if (!finalParams.id || finalParams.id === '') {
        throw new Error(
            `The "@sugar.export" mixin MUST specify an export path or id...`,
        );
    }

    if (!settings.partials) {
        return nodesToString(atRule.nodes);
    }

    // prepare content to be exportd using the export postprocessor
    console.log(
        `<yellow>[postcss]</yellow> Found "<cyan>${finalParams.id}</cyan>" css partial`,
    );

    atRule.parent.insertBefore(
        atRule,
        postcss.parse(`/*! SPARTIAL:${finalParams.id} */`),
    );
    atRule.parent.insertAfter(
        atRule,
        postcss.parse(`/*! SENDPARTIAL:${finalParams.id} */`),
    );

    let refNode = atRule;
    atRule.nodes.forEach((node) => {
        atRule.parent.insertAfter(refNode, node);
        refNode = node;
    });

    atRule.remove();
}
