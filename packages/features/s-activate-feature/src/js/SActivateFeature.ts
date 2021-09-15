import __SFeature from '@coffeekraken/s-feature';
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
}

export default class SActivateFeature extends __SFeature {
    _hrefSelector?: string;
    _$targets?: HTMLElement[];
    _$groupElements?: HTMLElement[];
    _unactivateTimeout;

    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    componentUtils: {
                        interface: __SActivateFeatureInterface,
                    },
                    feature: {},
                },
                settings ?? {},
            ),
        );

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
        // save state
        if (this.props.saveState) {
            // @ts-ignore
            if (!this.props.id)
                throw new Error(
                    `<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`,
                );
            // @ts-ignore
            if (localStorage.getItem(`s-activate-state-${this.saveStateId}`) === this.props.id) {
                this.props.active = true;
            } else {
                this.props.active = false;
            }
        }

        if (this.props.href) {
            this._hrefSelector = this.props.href;
        }

        let targets;
        if (this._hrefSelector) targets = Array.from(document.querySelectorAll(this._hrefSelector));
        if (targets?.length) this._$targets = targets;

        if (this.props.group) {
            this._$groupElements = Array.from(document.querySelectorAll(`[${this.name}][group="${this.props.group}"]`));
        }

        this.props.trigger.forEach((trigger) => {
            switch (trigger) {
                case 'click':
                    this.node.addEventListener('click', (e) => {
                        if (this.isActive() && this.props.toggle) {
                            this.unactivate();
                        } else {
                            this.activate();
                        }
                    });
                    break;
                case 'mouseover':
                    this.node.addEventListener('mouseover', (e) => {
                        this.activate();
                    });
                    break;
                case 'mouseout':
                case 'mouseleave':
                    this.node.addEventListener('mouseleave', (e) => {
                        this.unactivate();
                    });
                    break;
                case 'anchor':
                    if (document.location.hash === this._hrefSelector) {
                        this.activate();
                    }
                    window.addEventListener('hashchange', (e) => {
                        if (document.location.hash === this._hrefSelector) {
                            this.activate();
                        }
                    });

                    break;
            }
        });

        // activate if has the "active" attribute
        if (this.props.active) {
            this.activate(true);
        }
    }
    get saveStateId(): string {
        // @ts-ignore
        return this.props.group ? `group-${this.props.group}` : this.props.id;
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
        return this.node.hasAttribute('active');
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
    async activate(force = false) {
        // clear the unactivate timeout
        clearTimeout(this._unactivateTimeout);

        // protect from activating multiple times
        if (!force && this.isActive()) return;

        setTimeout(() => {
            // save state
            if (this.props.saveState) {
                // @ts-ignore
                if (!this.props.id)
                    throw new Error(
                        `<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`,
                    );
                // @ts-ignore
                localStorage.setItem(`s-activate-state-${this.saveStateId}`, this.props.id);
            }

            // history
            if (this.props.history && this._hrefSelector) {
                document.location.hash = this._hrefSelector;
            }

            // check if we have some elements in the group
            if (this._$groupElements) {
                // @ts-ignore
                this._$groupElements.forEach(($element: HTMLElement) => {
                    if ($element === this.node) return;
                    try {
                        // @ts-ignore
                        $element.unactivate?.();
                    } catch (e) {}
                });
            }

            // add the "active" attribute to the component
            // @ts-ignore
            this.props.active = true;

            // loop on targets to activate them
            if (this._$targets) {
                // @ts-ignore
                this._$targets.forEach(($target) => {
                    if (this.props.activeClass) {
                        $target.classList.add(this.props.activeClass);
                    }
                    if (this.props.activeAttribute) {
                        $target.setAttribute(this.props.activeAttribute, 'true');
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
    async unactivate() {
        // protect from unactivating multiple times
        if (!this.isActive()) return;

        this._unactivateTimeout = setTimeout(() => {
            // save state
            if (this.props.saveState) {
                if (!this.props.id)
                    throw new Error(
                        `<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`,
                    );
                localStorage.removeItem(`s-activate-state-${this.props.id}`);
            }

            // remove the "active" attribute to the component
            this.node.removeAttribute('active');

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

export function register(props: Partial<ISActivateFeatureProps> = {}, name = 's-activate') {
    __SFeature.registerFeature(name, SActivateFeature, props);
}
