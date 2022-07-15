import __SClass from '@coffeekraken/s-class';
import SDocblock, {
    ISDocblock,
    ISDocblockBlock,
} from '@coffeekraken/s-docblock';
import __SPromise from '@coffeekraken/s-promise';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __handlebars from 'handlebars/dist/handlebars';
import __promisedHandlebars from 'promised-handlebars';
import classBlock from './default/blocks/class';
import defaultBlock from './default/blocks/default';
import functionBlock from './default/blocks/function';
import concatHelper from './default/helpers/concat';
import classLayout from './default/layouts/class';
import defaultLayout from './default/layouts/default';
import functionLayout from './default/layouts/function';
import __SDocblockRendererSettingsInterface from './interface/SDocblockRendererSettingsInterface';

/**
 * @name            SDocblockRenderer
 * @namespace       node
 * @type            Class
 * @extents         SClass
 * @status              wip
 *
 * This class represent an SDocblock output like "markdown", "html", etc...
 *
 * @param       {SDocblock}         docblockInstance        The docblock instance you want to output using this class
 * @param       {Object}            [settings={}]           Some settings to configure your output class:
 * - ...
 *
 * @todo        interface
 * @todo        doc
 * @todo      Javascript support
 *
 * @example         js
 * import SDocblock from '@coffeekraken/sugar/js/docblock/SDocblock';
 * import SDocblockRenderer from '@coffeekraken/sugar/js/docblock/SDocblockRenderer';
 * class MyCoolRenderer extends SDocblockRenderer {
 *    constructor(docblockInstance, settings = {}) {
 *      super(docblockInstance, settings);
 *    }
 * }
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISDocblockRendererSettings {}
export interface ISDocblockRendererCtorSettings {
    docblockRenderer?: Partial<ISDocblockRendererSettings>;
}

export interface ISDocblockRendererRegisteredEntries {
    [key: string]: string;
}
export interface ISDocblockRendererRegisteredStacks {
    templates: ISDocblockRendererRegisteredEntries;
    blocks: ISDocblockRendererRegisteredEntries;
    partials: ISDocblockRendererRegisteredEntries;
}

export interface ISDocblockRendererPartialsTemplateObj {
    [key: string]: ISDocblockRendererTemplateObj;
}
export interface ISDocblockRendererTemplateObj {
    path: string;
    content: string;
    stats: any;
}

export interface ISDocblockRendererHelper {
    id: string;
    args: Record<string, any>;
    process: Function;
}

export interface ISDocblockRendererLayout {
    id: string;
    template: string;
}

export interface ISDocblockRendererPartial {
    id: string;
    template: string;
}

export interface ISDocblockRendererBlock {
    id: string;
    template: string;
}

export interface ISDocblockRendererTag {
    id: string;
    template: string;
}

export interface ISDocblockRenderer {
    _docblockInstance: ISDocblock;
}

// @ts-ignore
class SDocblockRenderer extends __SClass implements ISDocblockRenderer {
    /**
     * @name      _docblockInstance
     * @type      SDocblock
     * @private
     *
     * Store the SDocblock instance to render
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _docblockInstance: ISDocblock;

    /**
     * @name        _handlebars
     * @type        any
     * @private
     *
     * Store the handlebar instance used to render most of the templates
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _handlebars: any;

    /**
     * @name        _registeredLayouts
     * @type        Record<string, string>
     * @private
     * @static
     *
     * Store the registered layouts
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _registeredLayouts: Record<string, ISDocblockRendererLayout> = {};

    /**
     * @name        _registeredPartials
     * @type        Record<string, string>
     * @private
     * @static
     *
     * Store the registered partials
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _registeredPartials: Record<string, ISDocblockRendererPartial> = {};

    /**
     * @name        _registeredHelpers
     * @type        Record<string, string>
     * @private
     * @static
     *
     * Store the registered helpers
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _registeredHelpers: Record<string, ISDocblockRendererHelper> = {};

    /**
     * @name        _registeredTags
     * @type        Record<string, string>
     * @private
     * @static
     *
     * Store the registered tags
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _registeredTags: Record<string, ISDocblockRendererPartial> = {};

    /**
     * @name        _registeredBlocks
     * @type        Record<string, string>
     * @private
     * @static
     *
     * Store the registered blocks
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _registeredBlocks: Record<string, ISDocblockRendererBlock> = {};

    /**
     * @name        docblockRendererSettings
     * @type        ISDocblockRendererSettings
     * @get
     *
     * Access the docblock renderer settings
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get docblockRendererSettings(): ISDocblockRendererSettings {
        return (<any>this).settings.docblockRenderer;
    }

    /**
     * @name          _renderedBlocks
     * @type          Array<SDocblockBlock>
     * @private
     *
     * Store the rendered blocks to avoid rendering them twice
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _renderedBlocks: ISDocblockBlock[] = [];

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        docblockInstance: ISDocblock,
        settings?: ISDocblockRendererCtorSettings,
    ) {
        // save the settings
        super(
            __deepMerge(
                {
                    docblockRenderer: {
                        ...__SDocblockRendererSettingsInterface.defaults(),
                    },
                },
                settings,
            ),
        );

        // @ts-ignore
        if (window && !window.global) window.global = {};

        // save the docblock instance
        this._docblockInstance = docblockInstance;

        this._registerHandlerbarsHelpers();
    }

    /**
     * @name      registerHelper
     * @type      Function
     * @static
     *
     * Register an helper
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerHelper(helperObj: ISDocblockRendererHelper): void {
        this._registeredHelpers[helperObj.id] = helperObj;
    }

    /**
     * @name        registerLayout
     * @type        Function
     * @static
     *
     * Allows you to register a new layout for this particular renderer instance
     *
     * @todo      doc
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerLayout(layoutObj: ISDocblockRendererLayout): void {
        this._registeredLayouts[layoutObj.id] = layoutObj;
    }

    /**
     * @name        registerPartial
     * @type        Function
     * @static
     *
     * Allows you to register a new layout for this particular renderer instance
     *
     * @todo      doc
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerPartial(partialObj: ISDocblockRendererPartial): void {
        this._registeredPartials[partialObj.id] = partialObj;
    }

    /**
     * @name        registerTag
     * @type        Function
     * @static
     *
     * Allows you to register a new layout for this particular renderer instance
     *
     * @todo      doc
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerTag(tagObj: ISDocblockRendererTag): void {
        this._registeredTags[tagObj.id] = tagObj;
    }

    /**
     * @name        registerBlock
     * @type        Function
     * @static
     *
     * Allows you to register a new layout for this particular renderer instance
     *
     * @todo      doc
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerBlock(blockObj: ISDocblockRendererBlock): void {
        this._registeredBlocks[blockObj.id] = blockObj;
    }

    /**
     * @name        _registerHelpers
     * @type        Function
     * @private
     *
     * Register all the helpers inside the "helpers" folders
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _registerHelpers() {
        // @ts-ignore
        Object.keys(this.constructor._registeredHelpers).forEach((helperId) => {
            // @ts-ignore
            const helperObj = this.constructor._registeredHelpers[helperId];

            this._handlebars.registerHelper(helperObj.id, (...args) => {
                const api = {
                    settings: this.docblockRendererSettings,
                    renderer: this,
                    hbs: this._handlebars,
                    render: (string, data = {}) => {
                        const tpl = this._handlebars.compile(string);
                        return tpl(data);
                    },
                };
                if (!helperObj.args) {
                    throw new Error(
                        `You try to make use of the "<yellow>${helperObj.id}</yellow>" SDocblockRenderer helper but it does not have the required "<cyan>args</cyan>" property.`,
                    );
                }
                Object.keys(helperObj.args).forEach((key, i) => {
                    const value = args[i];
                    if (value !== undefined) {
                        api[key] = value;
                    } else {
                        api[key] = helperObj[key];
                    }
                });
                return helperObj.process(api);
            });
        });
    }

    /**
     * @name          _registerHandlerbarsHelpers
     * @type          Function
     * @private
     *
     * This method init the handlebar instance that will be used during the rendering process
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _registerHandlerbarsHelpers() {
        this._handlebars = __promisedHandlebars(__handlebars, {
            Promise: Promise,
        });
        // this._handlebars = __handlebars;

        let currentBlock;
        const blocksByHash: Record<string, any> = {};

        this._handlebars.registerHelper('block', (type) => {
            return new Promise(async (resolve, reject) => {
                if (
                    !this._docblockInstance.blocks ||
                    !this._docblockInstance.blocks.length
                )
                    return '';

                // filter blocks
                const blocks = this._docblockInstance.blocks.filter(
                    (block, i) => {
                        const blockObj = block.toObject();

                        if (i > 0) return false;

                        if (type !== '...') {
                            if (!blockObj.type) return false;
                            if (
                                blockObj.type.toLowerCase() !==
                                type.toLowerCase()
                            )
                                return false;
                        }

                        const blockHash = __md5.encrypt(blockObj);
                        if (blocksByHash[blockHash]) return false;

                        // add the block in the rendered blocks stack
                        blocksByHash[blockHash] = block;
                        return true;
                    },
                );

                const renderedBlocks: string[] = [];
                for (let i = 0; i < blocks.length; i++) {
                    const blockObj = blocks[i].toObject();
                    currentBlock = blocks[i];
                    const result = await this.renderBlock(blocks[i]);
                    renderedBlocks.push(<string>result);
                }

                resolve(renderedBlocks.join('\n\n'));
            });
        });

        this._handlebars.registerHelper('tag', async (tagName) => {
            if (!currentBlock) return '';
            return await this.renderTag(currentBlock, tagName);
        });

        // @ts-ignore
        Object.keys(this.constructor._registeredPartials).forEach(
            (partialId) => {
                // @ts-ignore
                const partialObj = this.constructor._registeredPartials[
                    partialId
                ];
                this._handlebars.registerPartial(
                    partialObj.id,
                    partialObj.template.trim(),
                );
            },
        );

        this._registerHelpers();
    }

    /**
     * @name          renderBlock
     * @type          Function
     * @async
     *
     * This method is the one take will render a block using the correct block template
     * and the passed block object data
     *
     * @param       {Object}          blockObj          The object representing the block to render
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
     * @return      {String}                            The rendered block
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    async renderBlock(blockObj, settings = {}) {
        return new Promise((resolve, reject) => {
            if (blockObj.toObject && typeof blockObj.toObject === 'function')
                blockObj = blockObj.toObject();
            const type =
                typeof blockObj.type === 'string'
                    ? blockObj.type.toLowerCase()
                    : 'default';

            const template =
                // @ts-ignore
                this.constructor._registeredBlocks[type] ||
                // @ts-ignore
                this.constructor._registeredBlocks.default;
            let compiledTemplateFn;

            compiledTemplateFn = this._handlebars.compile(template.template, {
                noEscape: true,
            });
            const renderedTemplate = compiledTemplateFn(blockObj);

            // return the rendered template
            resolve(renderedTemplate);
        });
    }

    /**
     * @name          renderTag
     * @type          Function
     * @async
     *
     * This method is the one take will render a tag using the correct block template
     * and the passed block object data
     *
     * @param       {Object}          blockObj          The object representing the block to render
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
     * @return      {String}                            The rendered block
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    async renderTag(blockObj, tagName = 'default', settings = {}) {
        return new Promise((resolve, reject) => {
            if (blockObj.toObject && typeof blockObj.toObject === 'function')
                blockObj = blockObj.toObject();

            const template =
                // @ts-ignore
                this.constructor._registeredTags[tagName] ||
                // @ts-ignore
                this.constructor._registeredTags.default;
            let compiledTemplateFn;

            compiledTemplateFn = this._handlebars.compile(
                template.template.trim(),
                {
                    noEscape: true,
                },
            );

            let renderedTemplate = '';
            renderedTemplate = compiledTemplateFn({
                [tagName]: blockObj[tagName],
            });
            // return the rendered template
            resolve(renderedTemplate);
        });
    }

    /**
     * @name          render
     * @type          Function
     * @async
     *
     * This method is the main one that will take each blocks in the docblock instance
     * and render them by passing each tags to the ```renderTag``` method.
     *
     * @return      {SPromise}                          An SPromise instance that will be resolved with the rendered string once it has been fully rendered
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    render() {
        return new __SPromise(
            async ({ resolve, reject }) => {
                // get the block in object format
                const blocksArray = this._docblockInstance.toObject();

                if (!blocksArray.length) return resolve();

                // get the first block
                const firstBlock = blocksArray[0];
                // get the layout to render
                const type =
                    typeof firstBlock.type === 'string'
                        ? firstBlock.type.toLowerCase()
                        : 'default';
                const layout =
                    // @ts-ignore
                    this.constructor._registeredLayouts[type] ||
                    // @ts-ignore
                    this.constructor._registeredLayouts.default;

                if (!layout.template) {
                    return reject();
                }

                // render the template
                const compiledTemplateFn = this._handlebars.compile(
                    layout.template,
                    {
                        noEscape: true,
                    },
                );

                const renderedLayout = compiledTemplateFn();

                // resolve the rendering process with the rendered stack
                resolve(renderedLayout);
            },
            {
                id: 'SDocblockRendererRender',
            },
        );
    }
}

SDocblockRenderer.registerBlock(classBlock);
SDocblockRenderer.registerBlock(defaultBlock);
SDocblockRenderer.registerBlock(functionBlock);

SDocblockRenderer.registerHelper(concatHelper);

SDocblockRenderer.registerLayout(classLayout);
SDocblockRenderer.registerLayout(defaultLayout);
SDocblockRenderer.registerLayout(functionLayout);

export default SDocblockRenderer;
