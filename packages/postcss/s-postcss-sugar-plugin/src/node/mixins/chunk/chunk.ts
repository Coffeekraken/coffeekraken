import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           chunk
 * @namespace      node.mixin.chunk
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin allows you to mark some css to be exported as separated file.
 * You can specify the name of your chunk
 * Note that this mixin can only be used at root level
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@s.chunk(general) {
 *   body {
 *      background: red;
 *   }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginChhunkInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                type: 'String',
            },
        };
    }
}

export interface IPostcssSugarPluginChunkParams {
    id: string;
}

export { postcssSugarPluginChhunkInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    nodesToString,
    frontData,
    postcss,
    postcssApi,
    settings,
}: {
    params: Partial<IPostcssSugarPluginChunkParams>;
    atRule: any;
    CssVars: any;
    nodesToString: Function;
    frontData: any;
    postcss: any;
    postcssApi: any;
    settings: any;
}) {
    const finalParams: IPostcssSugarPluginChunkParams = {
        id: '',
        ...params,
    };

    if (!finalParams.id || finalParams.id === '') {
        throw new Error(`The "@s.chunk" mixin MUST specify a chunk id...`);
    }

    if (!settings.chunks) {
        return atRule.nodes;
    }

    // store in the shared data to print it inside the css settings (body:before content)
    if (!frontData.chunks) {
        frontData.chunks = [];
    }
    if (!frontData.chunks.includes(finalParams.id)) {
        frontData.chunks.push(finalParams.id);
    }

    // prepare content to be exportd using the export postprocessor
    console.verbose?.(
        `<yellow>[postcss]</yellow> Found "<cyan>${finalParams.id}</cyan>" css chunk`,
    );

    atRule.parent.insertBefore(
        atRule,
        postcss.parse(`/*! SCHUNK:${finalParams.id} */`),
    );
    atRule.parent.insertAfter(
        atRule,
        postcss.parse(`/*! SENDCHUNK:${finalParams.id} */`),
    );

    let refNode = atRule;
    atRule.nodes.forEach((node) => {
        atRule.parent.insertAfter(refNode, node);
        refNode = node;
    });

    atRule.remove();
}
