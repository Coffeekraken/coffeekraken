import __SFeature from '@coffeekraken/s-feature';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SActivateFeatureInterface from './interface/SActivateFeatureInterface';

export interface ISActivateFeatureProps {
    href: string;
    group: string;
    toggle: boolean;
    history: boolean;
    active: boolean;
    activeClass: string;
    saveState: boolean;
    trigger: string[];
    unactivateOn: string[];
}

export interface ISActivateActivateParams {
    force: boolean;
    preventSave: boolean;
}

/**
 * @name            SActivateFeature
 * @as              Activate feature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SActivateFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-activate-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to activate some elements depending on triggers like `click`, `mouseover`, `mouseout`, `anchor`, etc...
 * To be explicit, you can apply this feature on a link tag with the href attribute `#something`, and on click,
 * the DOM element that has the id "something" will get the "active" class applied.
 *
 * @feature          Take the `href` attribute as target
 * @feature          Allows to `group` some element for tabs behavior, etc...
 * @feature         Support the `toggle` mode
 * @feature          Support the `history` mode
 * @feature         Allows you to `save state` to `restore them` on page load
 * @feature         Available trigger: `click`, `mouseover`, `mouseout`, `anchor` and more to come
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Simple click activation
 * <a class="s-btn s-color:accent" href="#my-element" s-activate>Click me!</a>
 * <div id="my-element">I will be activated on click</div>
 * <style>
 *    #my-element.active { background: green; }
 * </style>
 *
 * @example         html              Grouping
 * <a href="#my-grouped-element-1" class="s-btn s-color:accent" s-activate group="my-tabs">Tab 1</a>
 * <a href="#my-grouped-element-2" class="s-btn s-color:accent" s-activate group="my-tabs">Tab 1</a>
 * <a href="#my-grouped-element-3" class="s-btn s-color:accent" s-activate group="my-tabs">Tab 1</a>
 * <div id="my-grouped-element-1">Content #1</div>
 * <div id="my-grouped-element-2">Content #2</div>
 * <div id="my-grouped-element-3">Content #3</div>
 * <style>
 *    [id^="my-grouped-element-"].active { background: green; }
 * </style>
 *
 * @example         html            Toggle mode
 * <a class="s-btn s-color:accent" href="#my-element-toggle" s-activate toggle>Click me!</a>
 * <div id="my-element-toggle">I will be toggled on click</div>
 * <style>
 *    #my-element-toggle.active { background: green; }
 * </style>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SActivateFeature extends __SFeature {
    _hrefSelector?: string;
    _$targets?: HTMLElement[];
    _$triggerers: HTMLElement[];
    _$groupElements?: HTMLElement[] = [];
    _unactivateTimeout;

    state = {
        active: undefined,
    };
    groupState = {
        activeId: undefined,
    };

    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    interface: __SActivateFeatureInterface,
                },
                settings ?? {},
            ),
        );
        this.componentUtils.handleState(this.state, {
            save: this.props.saveState,
        });
        if (this.props.group) {
            this.componentUtils.handleState(this.groupState, {
                save: this.props.saveState,
                id: `s-activate-feature-group-${this.props.group}`,
            });
        }

        if (this.props.triggerer) {
            this._$triggerers = Array.from(
                document.querySelectorAll(this.props.triggerer),
            );
        } else {
            this._$triggerers = [this.node];
        }

        // expose the api on node
        this.componentUtils.exposeApi(
            {
                activate: this.activate,
                unactivate: this.unactivate,
                isActive: this.isActive,
            },
            this,
        );
    }
    mount() {
        if (this.props.href) {
            this._hrefSelector = this.props.href;
        }
        let targets;
        if (this._hrefSelector)
            targets = Array.from(document.querySelectorAll(this._hrefSelector));
        if (targets?.length) this._$targets = targets;
        else this._$targets = [this.node];

        if (this.props.group) {
            __querySelectorLive(
                `[${this.name}][group="${this.props.group}"]`,
                ($elm) => {
                    if (this._$groupElements?.includes($elm)) return;
                    this._$groupElements?.push($elm);
                },
                {},
            );
        }

        this._$triggerers.forEach(($triggerer) => {
            // @ts-ignore
            const triggererTriggers = $triggerer.hasAttribute('trigger')
                ? $triggerer
                      .getAttribute('trigger')
                      .split(',')
                      .map((l) => l.trim())
                : [];
            const triggers = __unique([
                ...this.props.trigger,
                ...triggererTriggers,
            ]);

            triggers.forEach((trigger) => {
                if (trigger.match(/^event:/)) {
                    this.node.addEventListener('actual', (e) => {
                        this.activate({
                            preventSave: true,
                        });
                    });
                } else {
                    switch (trigger) {
                        case 'click':
                            $triggerer.addEventListener('click', (e) => {
                                // only direct child(s) of the triggerer can trigger the activation
                                if (e.target !== $triggerer) {
                                    // @ts-ignore
                                    if (e.target.parentElement !== $triggerer)
                                        return;
                                    if (e.currentTarget !== $triggerer) return;
                                }
                                e.preventDefault();
                                e.stopPropagation();
                                if (this.isActive() && this.props.toggle) {
                                    this.unactivate();
                                } else {
                                    this.activate();
                                }
                            });
                            break;
                        case 'mousenter':
                        case 'mouseover':
                            $triggerer.addEventListener('mouseover', (e) => {
                                this.activate();
                            });
                            break;
                        case 'mouseout':
                        case 'mouseleave':
                            $triggerer.addEventListener('mouseleave', (e) => {
                                this.unactivate();
                            });
                            break;
                        case 'anchor':
                            if (document.location.hash === this._hrefSelector) {
                                this.activate();
                            }
                            window.addEventListener('hashchange', (e) => {
                                if (
                                    document.location.hash ===
                                    this._hrefSelector
                                ) {
                                    this.activate();
                                }
                            });

                            break;
                    }
                }
            });
        });

        // handle `unactivateOn` events
        if (this.props.unactivateOn) {
            this.props.unactivateOn.forEach((event) => {
                document.body.addEventListener(event, (e) => {
                    this.unactivate();
                });
            });
        }

        // restore the state
        if (this.props.saveState) {
            this._restoreState();
        } else if (this.props.active) {
            this.activate();
        }
    }

    /**
     * @name        isActive
     * @type        Function
     *
     * This method allows you to know if this particular s-activate node is active or not
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isActive() {
        return this.state.active;
    }

    _restoreState() {
        if (
            this.groupState.activeId &&
            this.groupState.activeId === this.node.id
        ) {
            return this.activate({
                force: true,
            });
        }

        if (
            this.groupState.activeId &&
            this.groupState.activeId !== this.node.id
        ) {
            return this.unactivate({
                force: true,
            });
        }

        if (this.state.active) {
            return this.activate({
                force: true,
            });
        }

        return this.unactivate({
            force: true,
        });
    }

    /**
     * @name            activate
     * @type            Function
     * @async
     *
     * This async method allows you to activate this particular s-activate node
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    async activate(params?: Partial<ISActivateActivateParams>) {
        const finalParams: ISActivateActivateParams = {
            force: false,
            preventSave: false,
            ...(params ?? {}),
        };

        // clear the unactivate timeout
        clearTimeout(this._unactivateTimeout);

        // protect from activating multiple times
        if (!finalParams.force && this.isActive()) return;

        setTimeout(() => {
            // history
            if (this.props.history && this._hrefSelector) {
                document.location.hash = this._hrefSelector;
            }

            // check if we have some elements in the group
            if (this._$groupElements) {
                // update the group state
                this.groupState.activeId = this.node.id;
                // @ts-ignore
                this._$groupElements.forEach(($element: HTMLElement) => {
                    if ($element === this.node) {
                        return;
                    }
                    // @ts-ignore
                    $element.unactivate?.();
                });
            }

            // prevent save
            if (finalParams.preventSave) {
                // @ts-ignore
                this.state.preventSave();
            }

            // add the "active" attribute to the component
            // @ts-ignore
            this.state.active = true;
            this.props.active = true;

            // loop on targets to activate them
            if (this._$targets) {
                // @ts-ignore
                this._$targets.forEach(($target) => {
                    if (this.props.activeClass) {
                        $target.classList.add(this.props.activeClass);
                    }
                    if (this.props.activeAttribute) {
                        $target.setAttribute(
                            this.props.activeAttribute,
                            'true',
                        );
                    }
                });
            }
        }, this.props.activateTimeout);
    }

    /**
     * @name            unactivate
     * @type            Function
     * @async
     *
     * This async method allows you to unactivate this particular s-activate node
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    async unactivate(params?: Partial<ISActivateUnactivateParams>) {
        const finalParams: ISActivateActivateParams = {
            force: false,
            preventSave: false,
            ...(params ?? {}),
        };

        // protect from unactivating multiple times
        if (!finalParams.force && !this.isActive()) return;

        this._unactivateTimeout = setTimeout(() => {
            this.state.active = false;
            this.props.active = false;

            // loop on targets to unactivate them
            if (this._$targets) {
                // @ts-ignore
                this._$targets.forEach(($target) => {
                    if (this.props.activeClass) {
                        $target.classList.remove(this.props.activeClass);
                    }
                    if (this.props.activeAttribute) {
                        $target.removeAttribute(this.props.activeAttribute);
                    }
                });
            }
        }, this.props.unactivateTimeout);
    }
}

export function define(
    props: Partial<ISActivateFeatureProps> = {},
    name = 's-activate',
) {
    __SFeature.defineFeature(name, SActivateFeature, props);
}
