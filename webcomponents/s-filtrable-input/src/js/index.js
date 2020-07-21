import __deepMerge from '@coffeekraken/sugar/js/object/deepMerge';
import __on from '@coffeekraken/sugar/js/event/on';
import __docMap from '../data/docMap.json';
import '../scss/_bare.scss';
import {
  define,
  SLitHtmlWebComponent
} from '@coffeekraken/sugar/js/webcomponent/register';
import __clone from '@coffeekraken/sugar/js/object/clone';
import __throttle from '@coffeekraken/sugar/js/function/throttle';
import __nodeIndex from '@coffeekraken/sugar/js/dom/nodeIndex';

// __on('s-filtrable-input.attach', (comp) => {
//   // rework the items
//   const itemsArray = __docMap.map((item) => {
//     return {
//       title: item.namespace,
//       description: item.path
//     };
//   });
//   comp.prop('items', itemsArray);
// });
// __on('s-filtrable-input.validate', (selectedItem) => {
//   console.log('SELET', selectedItem);
// });

export default class SFiltrableInputWebComponent extends SLitHtmlWebComponent(
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
    inputThrottle: {
      type: 'Number',
      default: 0,
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
      <ul class="${component.dashName}__list" tabindex="1">
        ${props.items.value.map((item, i) =>
          i < component.instance._maxDisplayItems
            ? lit.html`
                <li class="${component.dashName}__list-item ${
                component.instance._selectedItemIdx === i
                  ? component.instance.className('list-item--selected')
                  : ''
              }">
                  ${settings.template.item(
                    item,
                    component,
                    settings,
                    lit,
                    component.instance.highlightFilter.bind(component.instance)
                  )}
                </li>
              `
            : ''
        )}
      </ul>
    `;
  };

  /**
   * name         _selectedItemIdx
   * @type        Number
   * @private
   *
   * Track which is the selected item index
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _selectedItemIdx = -1;

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
          maxDisplayItems: 50,
          filter: {
            throttleTimeout: 100,
            properties: ['title', 'description'],
            function: null
          },
          template: {
            item: (
              itemObj,
              component,
              settings,
              lit,
              highlightFilter
            ) => lit.html`
              ${
                itemObj.title
                  ? lit.html`
                <div class="${component.instance.className(
                  'list-item__title'
                )}">
                    ${highlightFilter(itemObj.title)}
                </div>
              `
                  : ''
              }
              ${
                itemObj.description
                  ? lit.html`
                <div class="${component.instance.className(
                  'list-item__description'
                )}">
                  ${highlightFilter(itemObj.description)}
                </div>
              `
                  : ''
              }
            `
          }
        },
        settings
      )
    );
    if (!this._settings.filter.function)
      this._settings.filter.function = this.filterItems.bind(this);

    this._maxDisplayItems = this._settings.maxDisplayItems;

    this.on('ready', () => {
      this._$list = this.$('.list');

      let inputThrottleTimeout;
      this.addEventListener('input', (e) => {
        clearTimeout(inputThrottleTimeout);
        inputThrottleTimeout = setTimeout(() => {
          this.dispatch('input', this.value);
        }, this.prop('inputThrottle'));
      });

      let filterTimeout;
      this.addEventListener('input', (e) => {
        clearTimeout(filterTimeout);
        if (this.prop('loading')) return;
        filterTimeout = setTimeout(async () => {
          this.prop('loading', true);
          this._maxDisplayItems = this._settings.maxDisplayItems;
          this._selectedItemIdx = -1;
          this._filterString = e.srcElement.value;
          const newItemsArray = await this._settings.filter.function(
            this._filterString
          );
          this.prop('loading', false);
          this.prop('items', newItemsArray);
          this._$list.scrollTop = 0;
        }, this._settings.filter.throttleTimeout);
      });

      this._$list.addEventListener('click', (e) => {
        // get the node index in the list
        const nodeIndex = __nodeIndex(e.srcElement);
        // select the clicked item
        this.select(nodeIndex);
      });

      this._$list.addEventListener('scroll', (e) => {
        if (
          e.srcElement.scrollHeight - e.srcElement.scrollTop <=
          e.srcElement.clientHeight + 50
        ) {
          if (this._maxDisplayItems < this._props.items.value.length) {
            this._maxDisplayItems += this._settings.maxDisplayItems;
            this.render();
          }
        }
      });

      document.addEventListener('keydown', (e) => {
        // interact with the component only if it is active
        if (!this.isActive()) return;

        switch (e.keyCode) {
          case 38: // up
            this.up();
            break;
          case 40: // down
            this.down();
            break;
          case 13: // enter
            this.validate();
            break;
          case 27: // escape
            this.escape();
            break;
        }
      });

      document.addEventListener('scroll', (e) => {
        var element = this.$container;
        var topPos = element.getBoundingClientRect().top;

        if (document.documentElement.clientHeight / 2 < topPos) {
          this.$container.classList.add(this.className('--ontop'));
          this._$list.style.maxHeight = `${topPos - 20}px`;
        } else {
          this.$container.classList.remove(this.className('--ontop'));
          this._$list.style.maxHeight = `${
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
   * @name              isActive
   * @type              Function
   *
   * This method return you if the component is active or not. Active mean that the user is
   * interacting with it
   *
   * @return      {Boolean}               true if the component is active, false if not
   *
   * @since     1.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isActive() {
    if (this === document.activeElement) return true;
    if (this._$list === document.activeElement) return true;
    return false;
  }

  /**
   * @name              select
   * @type              Function
   *
   * This method can be called to select an item in the list
   *
   * @param       {Number}        idx         The index of the element you want to select
   * @return      {Boolean}                   true if the select process has been successfull, false if not
   *
   * @since       1.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  select(idx) {
    if (typeof idx !== 'number') return false;
    // check that we have an item with this idx
    if (idx < 0 || idx >= this._props.items.value.length) return false;
    // set the idx to the selectedItemIndex variable
    this._selectedItemIdx = idx;
    // render the component
    this.render();
    // make a clone of the selected item
    const selectedItem = __clone(
      this._props.items.value[this._selectedItemIdx]
    );
    // dispatch a select event
    this.dispatch('select', selectedItem);
  }

  /**
   * @name              escape
   * @type              Function
   *
   * This method can be called to "exit" the filtrable input
   *
   * @since       1.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  escape() {}

  /**
   * @name              validate
   * @type              Function
   *
   * This method can be called to validate a choice in the filtrable input
   *
   * @since       1.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  validate() {
    // check that we have an item selected
    if (this._selectedItemIdx === -1) return;
    // make sure the selected item exist in the stack
    if (!this._props.items.value[this._selectedItemIdx]) return;
    // clone the selected item
    const selectedItem = __clone(
      this._props.items.value[this._selectedItemIdx]
    );
    // dispatch an event with the selected item
    this.dispatch('validate', selectedItem);
    // return the selected item
    return selectedItem;
  }

  /**
   * @name              up
   * @type              Function
   *
   * This method can be called to select the previous item in the list
   *
   * @since       1.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  up() {
    // update the selected index
    if (this._selectedItemIdx <= 0) return;
    this._selectedItemIdx--;
    // render the component
    this.render();

    // get the selected item in the DOM
    const $selectedItem = this.$(this.className('.list-item--selected'));
    if ($selectedItem.offsetTop <= this._$list.scrollTop) {
      this._$list.scrollTop = $selectedItem.offsetTop;
    }

    // dispatch an event
    this.dispatch('up', this);
  }

  /**
   * @name              down
   * @type              Function
   *
   * This method can be called to select the next item in the list
   *
   * @since       1.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  down() {
    // update the selected index
    if (this._selectedItemIdx === this._props.items.value.length - 1) return;
    this._selectedItemIdx++;
    // render the component
    this.render();

    // get the selected item in the DOM
    const $selectedItem = this.$(this.className('.list-item--selected'));
    if (
      $selectedItem.offsetTop >
      this._$list.scrollTop +
        this._$list.clientHeight -
        $selectedItem.clientHeight
    ) {
      this._$list.scrollTop =
        $selectedItem.offsetTop -
        this._$list.clientHeight +
        $selectedItem.clientHeight;
    }

    // dispatch an event
    this.dispatch('down', this);
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
        for (const idx in this._settings.filter.properties) {
          const prop = this._settings.filter.properties[idx];
          if (!item[prop] || typeof item[prop] !== 'string') continue;
          if (item[prop].includes(filterString)) return true;
        }
        return false;
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
    return this.lit.html`
      ${this.lit.unsafeHTML(
        string
          .split(this._filterString)
          .join(
            `<span class="${this.className(
              'list-item__highlighted'
            )}">___@@@___</span>`
          )
          .split('___@@@___')
          .join(this._filterString)
      )}`;
  }
}

define('SFiltrableInput', SFiltrableInputWebComponent, {});
