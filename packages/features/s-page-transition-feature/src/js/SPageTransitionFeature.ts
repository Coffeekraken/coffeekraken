import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPageTransitionFeatureInterface from './interface/SPageTransitionFeatureInterface';
import __SRequest from '@coffeekraken/s-request';
import __querySelectorUp from '@coffeekraken/sugar/js/dom/query/querySelectorUp';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';

// @ts-ignore
import __css from '../../../../src/css/s-page-transition.css'; // relative to /dist/pkg/esm/js

export interface ISPageTransitionFeatureProps {
    patchBody: boolean;
    scrollTop: boolean;
    before: Function;
    after: Function;
    onError: Function;
    autoStyle: boolean;
    injectErrorIcon: boolean;
    brokenLinkIcon: string;
}

/**
 * @name            SPageTransitionFeature
 * @as              Page transition
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SPageTransitionFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-page-transition-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to add page transition to your size by using ajax requests and configurable
 * transition effects.
 *
 * @event           s-page-transition.start             Dispatched when a transition starts
 * @event           s-page-transition.end               Dispatch when a transition ends
 * @event           s-page-transition.error             Dispatch when an error occurs
 * 
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Simple click activation
 * <div s-page-transition></div>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPageTransitionFeature extends __SFeature {
    
    /**
     * Store the current page url
     */
    _currentUrl: string;

    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    interface: __SPageTransitionFeatureInterface,
                    style: __css,
                },
                settings ?? {},
            ),
        );

        // store the current url
        this._currentUrl = `${document.location.pathname}${document.location.search}`;

        // save arrival state
        window.history.pushState(
            {
                html: this.node.innerHTML,
            },
            document.title,
            document.location.href,
        );

        // handle popstate
        window.addEventListener('popstate', (e) => {
            if (!e.state?.html) return;
            if (e.state.containerId) {
                const $elm = document.querySelector(
                    `[s-page-transition-container="${e.state.containerId}"]`,
                );
                if (!$elm) return;
                $elm.innerHTML = e.state.html;
                __scrollTo(<HTMLElement>$elm);
            } else {
                this.node.innerHTML = e.state.html;
                __scrollTo(this.node);
            }
        });

        // listen for "location.href" event
        document.addEventListener('location.href', (e) => {
            this.transitionTo(
                (<CustomEvent>e).detail,
                e.target,
            ).catch((e) => {});
        });

        // listen for clicks to prevent default behaviors
        document.addEventListener('click', (e) => {
            const $target = <HTMLElement>e.target;

            // @ts-ignore
            if (
               this._isEligibleLink($target)
            ) {
                e.preventDefault();
                this.transitionTo(
                    <string>$target.getAttribute('href'),
                    $target,
                ).catch((e) => {});
            } else {
                const $upHrefElm = __querySelectorUp($target, 'a[href]');
                if ($upHrefElm && this._isEligibleLink($upHrefElm)) {
                    e.preventDefault();
                    this.transitionTo(
                        <string>$upHrefElm.getAttribute('href'),
                        $upHrefElm,
                    ).catch((e) => {});
                }
            }
        });
    }
    mount() {}
    _isEligibleLink($link: HTMLElement): boolean {
        return ($link.tagName === 'A' && $link.hasAttribute('href') &&
                // @ts-ignore
            !$link.getAttribute('href').match(/^https?:\/\//) &&
            // @ts-ignore
            !$link.getAttribute('href').match(/^#/) &&
            !$link.hasAttribute('target'));
    }
    transitionTo(url: string, $source): Promise<void> {
        return new Promise(async (resolve, reject) => {

            // dispatch an event
            $source.dispatchEvent(
                new CustomEvent('s-page-transition.start', {
                    detail: {
                        url,
                    },
                    bubbles: true,
                }),
            );

            // add classes
            document.body.classList.add('s-page-transition');
            document.body.classList.add('loading');
            document.body.setAttribute('loading', 'true');
            $source.classList.add('s-page-transition-source');
            $source.classList.add('loading');
            $source.setAttribute('loading', true);

            // before callback
            // @ts-ignore
            this.props.before?.({
                url,
                $source,
            });

            const request = new __SRequest({
                url,
            });
            let response;
            try {
                response = await request.send();
            } catch (e) {
                response = e;
            }

            // handle error
            if (!response || response.status !== 200) {
                // after process with success
                this._onAfter($source, response.status, url);
                // stop here and reject
                return reject(response);
            }

            const domParser = new DOMParser();
            const dom = domParser.parseFromString(
                response.data ?? '',
                'text/html',
            );

            // get the main containers in each "pages"
            const $inPageContainer = document.querySelector(
                '[s-page-transition]',
            );
            const $container = dom.querySelector('[s-page-transition]');

            // get the scoped containers in each "pages"
            const $inPageScopedContainer = document.querySelector(
                '[s-page-transition-container]',
            );
            const $scopedContainer = dom.querySelector(
                '[s-page-transition-container]',
            );

            // if no container in one of the page, reject
            if (!$container || !$inPageContainer) {
                // after process with success
                this._onAfter($source, 500, url);
                // reject and stop here
                return reject();
            }

            // patching the body tag if requested
            if (this.props.patchBody) {
                const $inPageBody = document.querySelector('body');
                const $newBody = dom.querySelector('body');
                if ($inPageBody && $newBody) {
                    const newAttrNames: string[] = [];
                    // @ts-ignore
                    for (let attr of $newBody.attributes) {
                        $inPageBody.setAttribute(attr.name, attr.value);
                        newAttrNames.push(attr.name);
                    }
                    // @ts-ignore
                    for (let attr of $inPageBody.attributes) {
                        if (!newAttrNames.includes(attr.name)) {
                            $inPageBody.removeAttribute(attr.name);
                        }
                    }
                }
            }

            let newState: any = {};

            // if we have scoped containers in each "pages" and they match each other
            // we remplace only this content
            if (
                $inPageScopedContainer &&
                $scopedContainer &&
                $inPageScopedContainer?.getAttribute(
                    's-page-transition-container',
                ) ===
                    $scopedContainer.getAttribute('s-page-transition-container')
            ) {
                $inPageScopedContainer.innerHTML = $scopedContainer.innerHTML;
                newState.html = $scopedContainer.innerHTML;
                newState.containerId = $scopedContainer.getAttribute(
                    's-page-transition-container',
                );
            } else {
                // otherwise, we replace the main container
                $inPageContainer.innerHTML = $container.innerHTML;
                newState.html = $container.innerHTML;
            }

            // scrolltop if needed
            if (this.props.scrollTop) {
                // @ts-ignore
                __scrollTo($inPageScopedContainer ?? $inPageContainer);
            }

            // after process with success
            this._onAfter($source, 200, url, newState);

            // resolve transition
            resolve();
        });
    }
    /**
     * This function take care of handling the after transition process.
     * The code passed allows to know if the transition was a success (200) or an error (404|500)
     */
    _onAfter($source: HTMLElement, code: number, url?:string; newState?: any) {
        // remove class on body
        document.body.classList.remove('s-page-transition');
        document.body.classList.remove('loading');
        document.body.removeAttribute('loading');
        $source.classList.remove('s-page-transition-source');
        $source.classList.remove('loading');
        $source.removeAttribute('loading');

        // before callback
        this.props.after?.({
            $source,
        });

        if (code !== 200) {
            // restore previous state
            history.replaceState('', '', this._currentUrl);
            // add the error class
            $source.classList.add('s-page-transition-source');
            $source.classList.add('error');
            $source.setAttribute('error', '');
            if (this.props.autoStyle) {
                $source.classList.add('s-tc:error');
            }
            // broken link icon
            // @ts-ignore
            if (this.props.injectBrokenLinkIcon && !$source.querySelector('[s-page-transition-broken-link-icon]')) {
                $source.innerHTML = `${$source.innerHTML}${this.props.brokenLinkIcon.replace(/^\<([a-z]+)/, '<$1 s-page-transition-broken-link-icon')}`;
            }
            // dispatch an error event
            $source.dispatchEvent(
                new CustomEvent('s-page-transition.error', {
                    detail: {
                        code,
                        $source,
                    },
                    bubbles: true,
                }),
            );
            // before callback
            this.props.onError?.({
                $source,
            });
        }

        // push a new state
        if (code === 200 && newState && url) {
            window.history.pushState(newState, document.title, url);
            this._currentUrl = url;
        }

        // dispatch an event
        $source.dispatchEvent(
            new CustomEvent('s-page-transition.end', {
                detail: {
                    code,
                    $source,
                },
                bubbles: true,
            }),
        );
    }
}

export function define(
    props: Partial<ISPageTransitionFeatureProps> = {},
    name = 's-page-transition',
) {
    __SFeature.defineFeature(name, SPageTransitionFeature, props);
}
