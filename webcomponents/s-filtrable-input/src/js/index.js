import __on from '@coffeekraken/sugar/js/event/on';
import __docMap from '../data/docMap.json';
import '../scss/index.scss';
import {
  define,
  SLitHtmlWebComponent
} from '@coffeekraken/sugar/js/webcomponent/register';

__on('s-filtrable-input.attach', (comp) => {
  // rework the items
  const itemsArray = __docMap.map((item) => {
    return {
      name: item.path
    };
  });
  comp.prop('items', itemsArray);
});

class SFiltrableInputWebComponent extends SLitHtmlWebComponent(
  HTMLInputElement
) {
  static props = {
    items: {
      type: 'Array<Object>',
      required: true,
      physical: false,
      default: [],
      watch: true
    },
    loading: {
      type: 'Boolean',
      required: false,
      physical: true,
      default: false,
      watch: true
    }
  };

  static template = (props, component, html) => {
    return html`
      ${component.$node}
      <ul class="${component.dashName}__list">
        ${props.items.value.map(
          (item) =>
            html`
              <li class="${component.dashName}__list-item">${item.name}</li>
            `
        )}
      </ul>
    `;
  };

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(settings);

    // this.addEventListener('input', (e) => {
    //   console.log('event', e);
    // });

    setTimeout(() => {
      this._props.items.value.push({
        name: 'Hello world'
      });
    }, 2000);
    setTimeout(() => {
      this._props.items.value.pop();
    }, 4000);
  }
}

define('SFiltrableInput', SFiltrableInputWebComponent, {});
