// @ts-nocheck
// @TODO            check how to override private static methods

import __SComponent from '../shared/SComponent';

import __STheme from '@coffeekraken/s-theme';

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __adoptStyleInShadowRoot } from '@coffeekraken/sugar/dom';

import { __debounce } from '@coffeekraken/sugar/function';
import { __isPath } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';

export interface ISComponentDispatchSettings {
    bubbles: boolean;
    cancelable: boolean;
    detail: any;
}

export default class SComponent extends __SComponent {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(name: string, settings?: Partial<ISComponentSettings>) {
        super(name, __deepMerge(settings ?? {}));
    }

    /**
     * Check if some <responsive> tags are defined in the component, or if a "responsive" prop exists
     * to adapt properties depending on the viewport size.
     */
    makePropsResponsive(props: any) {
        // ensure we have a responsive object
        props.responsive = __deepMerge(
            {
                // original: Object.assign({}, props),
            },
            props.responsive ?? {},
        );

        Object.defineProperty(props, 'toResetResponsiveProps', {
            enumerable: false,
            writable: true,
            value: {},
        });

        if (
            Object.keys(props.responsive).length === 1 &&
            props.responsive.original
        ) {
            return;
        }

        // apply on resize
        window.addEventListener(
            'resize',
            __debounce(() => {
                this._applyResponsiveProps(props);
            }, 100),
        );

        // first apply
        this._applyResponsiveProps(props);
    }
    _mediaQueries = {};
    _applyResponsiveProps(props: any = {}) {
        let matchedMedia = [],
            newProps = {};

        const responsiveObj = Object.assign({}, props.responsive);

        // search for the good media
        for (let [media, responsiveProps] of Object.entries(props.responsive)) {
            // media query name
            const queries = __STheme.get(`media.queries`),
                nudeMedia = media.replace(/(<|>|=|\|)/gm, '');

            if (media === 'toResetResponsiveProps') {
                continue;
            }

            function applyProps() {
                for (let [key, value] of Object.entries(responsiveProps)) {
                    // save the props to reset later
                    props.toResetResponsiveProps[key] = props[key];
                    // assign new value
                    props[key] = value;
                }
            }

            if (media.match(/[a-zA-Z0-9<>=]/) && queries[media]) {
                let mediaQuery = this._mediaQueries[media];
                if (!mediaQuery) {
                    this._mediaQueries[media] = __STheme.buildMediaQuery(media);
                    mediaQuery = this._mediaQueries[media];
                }
                if (
                    window.matchMedia(mediaQuery.replace(/^@media\s/, ''))
                        .matches
                ) {
                    applyProps();
                    matchedMedia.push(media);
                }
            } else {
                if (window.matchMedia(media).matches) {
                    applyProps();
                    matchedMedia.push(media);
                }
            }
        }

        // reset props if needed
        if (!matchedMedia.length) {
            // console.log(props, props.responsive?.original);
            for (let [key, value] of Object.entries(
                props.toResetResponsiveProps ?? {},
            )) {
                props[key] = value;
                delete props.toResetResponsiveProps[key];
            }
        }

        // ensure we keep the responsive object intact
        props.responsive = responsiveObj;
    }

    /**
     * @name           saveState
     * @type            Function
     * @async
     *
     * This method allows you to save the passed component state into the localStorage
     *
     * @param           {Object}            state       The state object to save
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    saveState(state: any): void {
        if (this.settings.id) {
            window.localStorage.setItem(
                `${this.settings.id}-state`,
                JSON.stringify(state),
            );
        }
    }

    /**
     * @name           restoreState
     * @type            Function
     * @async
     *
     * This method allows you to save the passed component state into the localStorage
     *
     * @param           {Object}            state       The state object to save
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    restoreState(): void {
        if (!this.settings.id) {
            return {};
        }
        return JSON.parse(
            window.localStorage.getItem(`${this.settings.id}-state`) ?? '{}',
        );
    }

    /**
     * @name           dispatchEvent
     * @type            Function
     * @async
     *
     * This method allows you to dispatch some CustomEvents from your component node itself.
     * 1. An event called "%componentName.%eventName"
     * 2. An event called "%componentName" with in the detail object a "eventType" property set to the event name
     * 3. An event called "%eventName" with in the detail object a "eventComponent" property set to the component name
     *
     * @param           {String}            eventName     The event name to dispatch
     * @param           {ISComponentDispatchSettings}          [settings={}]     The settings to use for the dispatch
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    dispatchEvent(
        $elm: HTMLElement,
        eventName: string,
        settings?: Partial<ISComponentDispatchSettings>,
    ): void {
        const finalSettings: ISComponentDispatchSettings = {
            bubbles: true,
            cancelable: true,
            detail: {},
            ...(settings ?? {}),
        };

        const componentName = this.name;

        // %eventName
        $elm.dispatchEvent(
            new CustomEvent(eventName, {
                ...finalSettings,
                detail: {
                    ...finalSettings.detail,
                    eventComponent: componentName,
                },
            }),
        );

        // %componentName
        $elm.dispatchEvent(
            new CustomEvent(componentName, {
                ...finalSettings,
                detail: {
                    ...finalSettings.detail,
                    eventType: eventName,
                },
            }),
        );
    }

    /**
     * @name        adoptStyleInShadowRoot
     * @type        Function
     * @async
     *
     * This method allows you to make the passed shadowRoot element adopt
     * the style of the passed context who's by default the document itself
     *
     * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
     * @param      {HTMLElement}                   [$context=document]     The context from which you want to adopt the styles
     * @return      {Promise}                                               Return a promise fullfilled when the styles have been adopted
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    adoptStyleInShadowRoot(
        $shadowRoot: HTMLElement,
        $context: HTMLElement | typeof document,
    ): Promise<any> {
        return __adoptStyleInShadowRoot($shadowRoot, $context);
    }

    /**
     * @name        injectStyleInShadowRoot
     * @type        Function
     * @async
     *
     * This method allows you to specify some css urls you want to be loaded inside the shadowRoot
     *
     * @param       {String|String[]}               cssDeps                The css urls you want to load inside the shadowRoot
     * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    injectStyleInShadowRoot(
        cssDeps: string | string[],
        $shadowRoot: HTMLElement,
    ): Promise<any> {
        if (!Array.isArray(cssDeps)) {
            cssDeps = [cssDeps];
        }

        cssDeps.forEach((dep) => {
            let $styleOrLink;

            try {
                $styleOrLink = document
                    .querySelector(`link#${dep}`)
                    ?.cloneNode(true);
            } catch (e) {}

            if (dep.match(/^[a-zA-Z0-9_-]+$/)) {
                $styleOrLink = document.createElement('link');
                $styleOrLink.rel = 'stylesheet';
                $styleOrLink.href = `${__SSugarConfig.get(
                    'serve.css.path',
                )}/partials/${dep}.css`;
            }

            if (__isPath(dep) && !$styleOrLink) {
                $styleOrLink = document.createElement('link');
                $styleOrLink.rel = 'stylesheet';
                $styleOrLink.href = dep;
            }

            if (!$styleOrLink) {
                $styleOrLink = document.createElement('style');
                $styleOrLink.type = 'text/css';
                $styleOrLink.appendChild(document.createTextNode(dep));
            }

            $shadowRoot.appendChild($styleOrLink);
        });
    }

    /**
     * @name            exposeApi
     * @type            Function
     *
     * This method allows you to pass a simple key value object
     * that tells binding of some methods on the actual dom node.
     *
     * @param       {Any}           apiObj          The simple key value pairs api object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    exposeApi($on: HTMLElement, apiObj: any, ctx: any): void {
        setTimeout(() => {
            Object.keys(apiObj).forEach((apiFnName) => {
                const apiFn = apiObj[apiFnName].bind(ctx);
                $on[apiFnName] = apiFn;
            });
        });
    }
}
