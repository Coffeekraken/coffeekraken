import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           export
 * @namespace      node.mixin.export
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to mark some css to be exported as separated file.
 * You can specify the name of your export
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * @sugar.export(css/general.css) {
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
            export: {
                type: 'String',
            },
        };
    }
}

export interface IPostcssSugarPluginCacheParams {
    export: string;
}

export { postcssSugarPluginCacheInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    pluginHash,
    themeHash,
    exportDir,
    nodesToString,
    settings,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginCacheParams>;
    atRule: any;
    CssVars: any;
    pluginHash: string;
    themeHash: string;
    exportDir: string;
    nodesToString: Function;
    settings: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginCacheParams = {
        export: '',
        ...params,
    };

    if (!finalParams.export || finalParams.export === '') {
        throw new Error(
            `The "@sugar.export" mixin MUST specify an export path or id...`,
        );
    }

    if (!settings.exports) {
        return nodesToString(atRule.nodes);
    }

    const vars = new CssVars();

    // prepare content to be exportd using the export postprocessor
    console.log(
        `<yellow>[export]</yellow> Found "<cyan>${finalParams.export}</cyan>" export statement`,
    );

    vars.code(`
    /*! SEXPORT:${finalParams.export} */
    ${nodesToString(atRule.nodes)}
    /*! SENDEXPORT:${finalParams.export} */
    `);

    return vars;
}
