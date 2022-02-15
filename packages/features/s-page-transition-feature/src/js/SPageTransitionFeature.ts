import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPageTransitionFeatureInterface from './interface/SPageTransitionFeatureInterface';
import __SRequest from '@coffeekraken/s-request';
import __querySelectorUp from '@coffeekraken/sugar/js/dom/query/querySelectorUp';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';

export interface ISPageTransitionFeatureProps {
    patchBody: boolean;
    scrollTop: boolean;
}

/**
 * @name            SPageTransitionFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SPageTransitionFeatureInterface.js
 * @menu            Styleguide / Features               /styleguide/feature/s-page-transition-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to add page transition to your size by using ajax requests and configurable
 * transition effects.
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SPageTransitionFeature extends __SFeature {

    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    componentUtils: {
                        interface: __SPageTransitionFeatureInterface,
                    },
                    feature: {},
                },
                settings ?? {},
            ),
        );

        // save arrival state
        window.history.pushState({
            html: this.node.innerHTML
        }, document.title, document.location.href);

        // handle popstate
        window.addEventListener('popstate', (e) => {
            if (!e.state?.html) return;
            if (e.state.containerId) {
                const $elm = document.querySelector(`[s-page-transition-container="${e.state.containerId}"]`);
                $elm.innerHTML = e.state.html;
                __scrollTo($elm);
            } else {
                this.node.innerHTML = e.state.html;
                __scrollTo($elm);
            }
        });

        // listen for "location.href" event
        window.addEventListener('location.href', (e) => {
            this.transitionTo(e.detail);
        }); 

        // listen for clicks to prevent default behaviors
        window.addEventListener('click', (e) => {   
            const $target = <HTMLElement>e.target;            
            if ($target.hasAttribute('href')) {
                e.preventDefault();
                this.transitionTo(<string>$target.getAttribute('href'));
            } else {
                const $upHrefElm = __querySelectorUp($target, '[href]');
                if ($upHrefElm) {
                    e.preventDefault();
                    this.transitionTo(<string>$upHrefElm.getAttribute('href'));
                }
            }
        });

    }
    mount() {}
    transitionTo(url: string): Promise<void> {
        return new Promise(async (resolve, reject) => {

            document.body.classList.add('s-page-transition');

            const request = new __SRequest({
                url
            });
            const response = await request.send();
            const domParser = new DOMParser();
            const dom = domParser.parseFromString(response.data ?? '', 'text/html');
            
            // get the main containers in each "pages"
            const $inPageContainer = document.querySelector('[s-page-transition]');
            const $container = dom.querySelector('[s-page-transition]');
            
            // get the scoped containers in each "pages"
            const $inPageScopedContainer = document.querySelector('[s-page-transition-container]');
            const $scopedContainer = dom.querySelector('[s-page-transition-container]');
            
            // if no container in one of the page, reject
            if (!$container || !$inPageContainer) {
                return reject();
            }

            // patching the body tag if requested
            if (this.props.patchBody) {
                const $inPageBody = document.querySelector('body');
                const $newBody = dom.querySelector('body');
                if ($inPageBody && $newBody) {
                    const newAttrNames: string[] = [];
                    for (let attr of $newBody.attributes) {
                        $inPageBody.setAttribute(attr.name, attr.value);
                        newAttrNames.push(attr.name);
                    }
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
            if ($inPageScopedContainer && $scopedContainer && $inPageScopedContainer?.getAttribute('s-page-transition-container') === $scopedContainer.getAttribute('s-page-transition-container')) {
                $inPageScopedContainer.innerHTML = $scopedContainer.innerHTML;
                newState.html = $scopedContainer.innerHTML;
                newState.containerId = $scopedContainer.getAttribute('s-page-transition-container');
            } else {
                // otherwise, we replace the main container
                $inPageContainer.innerHTML = $container.innerHTML;
                newState.html = $container.innerHTML;
            }

            // push a new state
            window.history.pushState(newState,document.title, url);
            
            // scrolltop if needed
            if (this.props.scrollTop) {
                __scrollTo($inPageScopedContainer ?? $inPageContainer);
            }

            document.body.classList.remove('s-page-transition');

        });
    }
}

export function define(
    props: Partial<ISPageTransitionFeatureProps> = {},
    name = 's-page-transition',
) {
    __SFeature.defineFeature(name, SPageTransitionFeature, props);
}
