import __deepMerge from '@coffeekraken/sugar/js/object/deepMerge';
import __on from '@coffeekraken/sugar/js/event/on';
import __docMap from '../data/docMap.json';
import '../scss/index.scss';
import {
  define,
  SLitHtmlWebComponent
} from '@coffeekraken/sugar/js/webcomponent/register';
import __clone from '@coffeekraken/sugar/js/object/clone';
import __throttle from '@coffeekraken/sugar/js/function/throttle';

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

  static template = (props, component, settings, lit) => {
    return lit.html`
      ${component.$node}
      <ul class="${component.dashName}__list">
        ${props.items.value.map(
          (item) =>
            lit.html`
              <li class="${component.dashName}__list-item">
                ${lit.unsafeHTML(
                  settings.template.item(
                    item,
                    component,
                    settings,
                    lit,
                    component.instance.highlightFilter.bind(component.instance)
                  )
                )}
              </li>
            `
        )}
      </ul>
    `;
  };

  /**
   * @name          _originalItems
   * @type          Array
   * @private
   *
   * This store the original items before the filter process
   * to be able to restore them after that
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _originalItems = null;

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
    super(
      __deepMerge(
        {
          filter: {
            throttleTimeout: 1000,
            function: null
          },
          template: {
            item: (itemObj, component, settings, lit, highlightFilter) => `
              ${highlightFilter(itemObj.name)}

            `
          }
        },
        settings
      )
    );
    if (!this._settings.filter.function)
      this._settings.filter.function = this.filterItems.bind(this);

    this.on('ready', () => {
      const $list = this.$('.list');

      let filterTimeout;
      this.addEventListener('input', (e) => {
        clearTimeout(filterTimeout);
        if (this.prop('loading')) return;
        filterTimeout = setTimeout(async () => {
          this.prop('loading', true);
          this._filterString = e.srcElement.value;
          const newItemsArray = await this._settings.filter.function(
            this._filterString
          );
          this.prop('loading', false);
          this.prop('items', newItemsArray);
        }, 100);
      });

      document.addEventListener('scroll', (e) => {
        var element = this.$container;
        var topPos = element.getBoundingClientRect().top;

        if (document.documentElement.clientHeight / 2 < topPos) {
          this.$container.classList.add(this.className('--ontop'));
          $list.style.maxHeight = `${topPos - 20}px`;
        } else {
          this.$container.classList.remove(this.className('--ontop'));
          $list.style.maxHeight = `${
            document.documentElement.clientHeight -
            topPos -
            this.$container.clientHeight -
            20
          }px`;
        }
      });

      setTimeout(() => {
        this._props.items.value.push({
          name: 'Hello world'
        });
      }, 2000);
      setTimeout(() => {
        this._props.items.value.pop();
      }, 4000);
    });
  }

  /**
   * @name              filterItems
   * @type              Function
   *
   * This method take a string and filter the items using the "settings.filterProps" array
   *
   * @param       {String}          filterString        The string to search in the items
   *
   * @since       1.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  filterItems(filterString) {
    return new Promise((resolve) => {
      // save the items if needed
      if (!this._originalItems) {
        this._originalItems = __clone(this._props.items.value, true);
      }
      // search in original items
      const newItems = this._originalItems.filter((item) => {
        if (!item.name.includes(filterString)) return false;
        return true;
      });

      // return the new items
      resolve(newItems);
    });
  }

  /**
   * @name            highlightFilter
   * @type            Function
   *
   * This method has to be used in your items template to highlight the words
   * that correspond to the search
   *
   * @param       {String}          string          The string to highlight the search string
   * @return      {String}                          The highlighted string
   *
   * @since       1.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  highlightFilter(string) {
    if (!this._filterString) return string;
    return string
      .split(this._filterString)
      .join(
        `<span class="${this.className(
          'list-item__highlighted'
        )}">___@@@___</span>`
      )
      .split('___@@@___')
      .join(this._filterString);
  }
}

define('SFiltrableInput', SFiltrableInputWebComponent, {});
