var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SActivateFeatureInterface from './interface/SActivateFeatureInterface';
export default class SActivateFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            componentUtils: {
                interface: __SActivateFeatureInterface,
            },
            feature: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        // expose the api on node
        this.componentUtils.exposeApi({
            activate: this.activate,
            unactivate: this.unactivate,
            isActive: this.isActive,
        }, this);
    }
    mount() {
        // save state
        if (this.props.saveState) {
            // @ts-ignore
            if (!this.props.id)
                throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
            // @ts-ignore
            if (localStorage.getItem(`s-activate-state-${this.saveStateId}`) ===
                this.props.id) {
                this.props.active = true;
            }
            else {
                this.props.active = false;
            }
        }
        if (this.props.href) {
            this._hrefSelector = this.props.href;
        }
        let targets;
        if (this._hrefSelector)
            targets = Array.from(document.querySelectorAll(this._hrefSelector));
        if (targets === null || targets === void 0 ? void 0 : targets.length)
            this._$targets = targets;
        if (this.props.group) {
            this._$groupElements = Array.from(document.querySelectorAll(`[${this.name}][group="${this.props.group}"]`));
        }
        this.props.trigger.forEach((trigger) => {
            switch (trigger) {
                case 'click':
                    this.node.addEventListener('click', (e) => {
                        if (this.isActive() && this.props.toggle) {
                            this.unactivate();
                        }
                        else {
                            this.activate();
                        }
                    });
                    break;
                case 'mousenter':
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
    get saveStateId() {
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
    activate(force = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // clear the unactivate timeout
            clearTimeout(this._unactivateTimeout);
            // protect from activating multiple times
            if (!force && this.isActive())
                return;
            setTimeout(() => {
                // save state
                if (this.props.saveState) {
                    // @ts-ignore
                    if (!this.props.id)
                        throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
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
                    this._$groupElements.forEach(($element) => {
                        var _a;
                        if ($element === this.node)
                            return;
                        try {
                            // @ts-ignore
                            (_a = $element.unactivate) === null || _a === void 0 ? void 0 : _a.call($element);
                        }
                        catch (e) { }
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
        });
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
    unactivate() {
        return __awaiter(this, void 0, void 0, function* () {
            // protect from unactivating multiple times
            if (!this.isActive())
                return;
            this._unactivateTimeout = setTimeout(() => {
                // save state
                if (this.props.saveState) {
                    if (!this.props.id)
                        throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
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
        });
    }
}
export function define(props = {}, name = 's-activate') {
    __SFeature.defineFeature(name, SActivateFeature, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlRmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBY3RpdmF0ZUZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTywyQkFBMkIsTUFBTSx1Q0FBdUMsQ0FBQztBQWFoRixNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLFVBQVU7SUFNcEQsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLFdBQVcsQ0FDUDtZQUNJLGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsMkJBQTJCO2FBQ3pDO1lBQ0QsT0FBTyxFQUFFLEVBQUU7U0FDZCxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUN6QjtZQUNJLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQzFCLEVBQ0QsSUFBSSxDQUNQLENBQUM7SUFDTixDQUFDO0lBQ0QsS0FBSztRQUNELGFBQWE7UUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3RCLGFBQWE7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNkLE1BQU0sSUFBSSxLQUFLLENBQ1gsdUpBQXVKLENBQzFKLENBQUM7WUFDTixhQUFhO1lBQ2IsSUFDSSxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFvQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUNmO2dCQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUM1QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDN0I7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUN4QztRQUVELElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxJQUFJLENBQUMsYUFBYTtZQUNsQixPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTTtZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBRTlDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUM3QixRQUFRLENBQUMsZ0JBQWdCLENBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUNoRCxDQUNKLENBQUM7U0FDTDtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25DLFFBQVEsT0FBTyxFQUFFO2dCQUNiLEtBQUssT0FBTztvQkFDUixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUN0QyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTs0QkFDdEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO3lCQUNyQjs2QkFBTTs0QkFDSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7eUJBQ25CO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU07Z0JBQ1YsS0FBSyxXQUFXLENBQUM7Z0JBQ2pCLEtBQUssV0FBVztvQkFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUMxQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU07Z0JBQ1YsS0FBSyxVQUFVLENBQUM7Z0JBQ2hCLEtBQUssWUFBWTtvQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3RCLENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU07Z0JBQ1YsS0FBSyxRQUFRO29CQUNULElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTt3QkFDL0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUNuQjtvQkFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQ3hDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTs0QkFDL0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3lCQUNuQjtvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFFSCxNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILHlDQUF5QztRQUN6QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBQ0QsSUFBSSxXQUFXO1FBQ1gsYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSzs7WUFDeEIsK0JBQStCO1lBQy9CLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUV0Qyx5Q0FBeUM7WUFDekMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUFFLE9BQU87WUFFdEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixhQUFhO2dCQUNiLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7b0JBQ3RCLGFBQWE7b0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDZCxNQUFNLElBQUksS0FBSyxDQUNYLHVKQUF1SixDQUMxSixDQUFDO29CQUNOLGFBQWE7b0JBQ2IsWUFBWSxDQUFDLE9BQU8sQ0FDaEIsb0JBQW9CLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQ2hCLENBQUM7aUJBQ0w7Z0JBRUQsVUFBVTtnQkFDVixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQzFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQy9DO2dCQUVELDhDQUE4QztnQkFDOUMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUN0QixhQUFhO29CQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBcUIsRUFBRSxFQUFFOzt3QkFDbkQsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLElBQUk7NEJBQUUsT0FBTzt3QkFDbkMsSUFBSTs0QkFDQSxhQUFhOzRCQUNiLE1BQUEsUUFBUSxDQUFDLFVBQVUsK0NBQW5CLFFBQVEsQ0FBZSxDQUFDO3lCQUMzQjt3QkFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO29CQUNsQixDQUFDLENBQUMsQ0FBQztpQkFDTjtnQkFFRCw4Q0FBOEM7Z0JBQzlDLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUV6QixtQ0FBbUM7Z0JBQ25DLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDaEIsYUFBYTtvQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFOzRCQUN4QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lCQUNqRDt3QkFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFOzRCQUM1QixPQUFPLENBQUMsWUFBWSxDQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFDMUIsTUFBTSxDQUNULENBQUM7eUJBQ0w7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047WUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDRyxVQUFVOztZQUNaLDJDQUEyQztZQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFBRSxPQUFPO1lBRTdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxhQUFhO2dCQUNiLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FDWCx1SkFBdUosQ0FDMUosQ0FBQztvQkFDTixZQUFZLENBQUMsVUFBVSxDQUFDLG9CQUFvQixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ2hFO2dCQUVELGlEQUFpRDtnQkFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXBDLHFDQUFxQztnQkFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNoQixhQUFhO29CQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7NEJBQ3hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7eUJBQ3BEO3dCQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7NEJBQzVCLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQzt5QkFDdkQ7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047WUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FBQTtDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FDbEIsUUFBeUMsRUFBRSxFQUMzQyxJQUFJLEdBQUcsWUFBWTtJQUVuQixVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1RCxDQUFDIn0=