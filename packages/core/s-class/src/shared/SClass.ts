import type { ISInterface } from '@coffeekraken/s-interface';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __toJson from '@coffeekraken/sugar/shared/object/toJson';

/**
 * @name            SClass
 * @namespace       sugar.js.class
 * @type            Class
 * @status              beta
 *
 * This class is a simple and effective one that manage the ```settings``` property
 * and some others features that will be documented asap
 *
 * @param       {Object}           [settings={}]               An object of settings that will be available as the property ```settings```
 *
 * @example         js
 * import SClass from '@coffeekraken/sugar/js/class/SClass';
 * class MyCoolClass extends SClass {
 *      constructor(settings = {}) {
 *          super(settings);
 *      }
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISClassMetas {
    id: string;
    name: string;
    formattedName: string;
    color: string;
}
export interface ISClassSettings {
    metas?: ISClassMetas;
    defaults?: boolean;
    [key: string]: any;
}
export interface ISClassCtor {
    new (settings?: Partial<ISClassSettings>);
    extends(cls: any): any;
    interface?: ISInterface;
    settingsInterface?: ISInterface;
    _sClassAsName?: string;
}

export interface ISClassInterfaceObj {
    class: ISInterface;
    apply: boolean;
    on: string;
}

export interface ISClassExposeSettings {
    as?: string;
    props?: string[];
}

export interface ISClass {
    settings: ISClassSettings;
    metas: ISClassMetas;
}

export default class SClass {
    /**
     * @name            settings
     * @type            ISClassSettings
     * @private
     *
     * Store the class settings
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public settings: ISClassSettings = {};

    /**
     * @name            metas
     * @type            String
     * @get
     *
     * Access the metas in the ```settings.metas```
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    metas: ISClassMetas;

    static extends(Cls: any) {
        class SClass extends Cls {
            protected settings: ISClassSettings = {};
            constructor(settings: any, ...args) {
                super(...args);
                // set settings
                setSettings(this, settings);
                // define metas enumarable
                this.metas = getMetas(this);
                Object.defineProperty(this, 'metas', {
                    enumerable: true,
                    value: getMetas(this),
                });
            }
            expose(instance: any, settings: ISClassExposeSettings) {
                return expose(this, instance, settings);
            }
            toPlainObject(): any {
                return toPlainObject(this);
            }
        }
        return SClass;
    }

    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings: ISClassSettings = {}) {
        // set settings
        setSettings(this, settings);
        // define metas enumarable
        this.metas = getMetas(this);
        Object.defineProperty(this, 'metas', {
            enumerable: true,
            value: getMetas(this),
        });
    }
    expose(instance: any, settings: ISClassExposeSettings) {
        return expose(this, instance, settings);
    }
    toPlainObject(): any {
        return toPlainObject(this);
    }
}

function getMetas(ctx: any): ISClassMetas {
    let name = `<yellow>${ctx.settings.metas?.name || ''}</yellow>`;
    if (ctx.settings.metas?.id) {
        name += ` <cyan>${ctx.settings.metas.id}</cyan>`;
    }
    const metasObj = {
        id: ctx.settings.metas?.id ?? ctx.constructor.name,
        name: ctx.settings.metas?.name ?? ctx.constructor.name,
        formattedName: name,
        color: ctx.settings.metas?.color ?? 'yellow',
    };

    return metasObj;
}

function expose(ctx: any, instance: any, settings: ISClassExposeSettings) {
    settings = __deepMerge(
        {
            as: undefined,
            props: [],
        },
        settings,
    );

    if (settings.as && typeof settings.as === 'string') {
        ctx[settings.as] = instance;
    }

    settings?.props?.forEach((prop) => {
        if (instance[prop].bind && typeof instance[prop].bind === 'function') {
            ctx[prop] = instance[prop].bind(instance);
        } else {
            ctx[prop] = instance[prop];
        }
    });
}

function toPlainObject(ctx: any): any {
    return __toJson(ctx);
}

function setSettings(ctx: any, settings: any = {}) {
    // saving the settings
    ctx.settings = settings;
    // make sure a "metas" property is available
    if (!ctx.settings.metas) ctx.settings.metas = {};
    // make sure we have an id
    if (!ctx.settings.metas?.id) ctx.settings.metas.id = ctx.constructor.name;
    if (!ctx.constructor.name.match(/^SConfig/)) {
        if (!ctx.settings.metas.color)
            ctx.settings.metas.color = __getColorFor(ctx.constructor.name, {
                scope: 'class',
            });
    } else if (!ctx.settings.metas.color) ctx.settings.metas.color = 'yellow';
}
