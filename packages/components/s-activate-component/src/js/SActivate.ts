import {LitElement, html, property, css, unsafeCSS, query, queryAssignedNodes} from 'lit-element';
import __SActivateComponentInterface from './interface/SActivateComponentInterface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __copy from '@coffeekraken/sugar/js/clipboard/copy';
import __wait from '@coffeekraken/sugar/shared/time/wait';

export default class SActivate extends LitElement {

    _component = undefined;
    _hrefSelector = undefined;
    _$targets = undefined;
    _$groupElements = undefined;

    @property()
    _state = 'pending';

    static get styles() {
        return css`${unsafeCSS(`
            :host {
                display: inline-block;
                cursor: pointer;
            }
        `)}`;
    }

    constructor() {
        super();
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SActivateComponentInterface,
            defaultProps: {}
        });
    }
    firstUpdated() {
        // save state
        if (this._component.props.saveState) {
          if (!this.id) throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
          this._component.props.active = localStorage.getItem(`s-activate-state-${this.id}`) !== null;
        }

        if (this._component.props.href) {
            this._hrefSelector = this._component.props.href;
        }

        const targets = Array.from(document.querySelectorAll(this._hrefSelector));
        if (targets.length) this._$targets = targets;

        if (this._component.props.group) {
          this._$groupElements = Array.from(document.querySelectorAll(`s-activate[group="${this._component.props.group}"]`));
        }

        this._component.props.trigger.forEach(trigger => {
          switch(trigger) {
            case 'click':
              this.addEventListener('click', (e) => {
                if (this.isActive() && this._component.props.toggle) {
                  this.unactivate();
                } else {
                  this.activate();
                }
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

        // expose API
        // this.activate = this.activate.bind(this);
        // this.unactivate = this.unactivate.bind(this);
        // this.isActive = this.isActive.bind(this);

        // activate if has the "active" attribute
        if (this._component.props.active) {
          this.activate(true);
        }

    }
    isActive() {
        return this.hasAttribute('active');
    }
    activate(force = false) {

        // protect from activating multiple times
        if (!force && this.isActive()) return;

        // save state
        if (this._component.props.saveState) {
          if (!this.id) throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
          localStorage.setItem(`s-activate-state-${this.id}`, true);
        }

        // history
        if (this._component.props.history) {
          document.location.hash = this._hrefSelector;
        }

        // check if we have some elements in the group
        if (this._$groupElements) {
          this._$groupElements.forEach($element => {
            if ($element === this) return;
            try {
              $element.unactivate();
            } catch(e) {}
          });
        }

        // add the "active" attribute to the component
        this.setAttribute('active', true);

        // loop on targets to activate them
        if (this._$targets) {
          this._$targets.forEach($target => {
            $target.classList.add('active');
            $target.setAttribute('active', true);
          });
        }

    }
    unactivate() {

        // protect from unactivating multiple times
        if (!this.isActive()) return;

        // save state
        if (this._component.props.saveState) {
            if (!this.id) throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
            localStorage.removeItem(`s-activate-state-${this.id}`);
        }

        // remove the "active" attribute to the component
        this.removeAttribute('active');

        // loop on targets to unactivate them
        if (this._$targets) {
            this._$targets.forEach($target => {
                $target.classList.remove('active');
                $target.removeAttribute('active');
            });
        }
    }
    render() {
        return html`<slot></slot>`;
    }
}

export function webcomponent(tagName = 's-activate', settings = {}) {
    customElements.define(tagName, SActivate, settings);
}