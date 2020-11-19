import __deepMerge from '@coffeekraken/sugar/js/object/deepMerge';
import __on from '@coffeekraken/sugar/js/event/on';

import __clone from '@coffeekraken/sugar/js/object/clone';
import __throttle from '@coffeekraken/sugar/js/function/throttle';
import __nodeIndex from '@coffeekraken/sugar/js/dom/nodeIndex';

import __SRequest from '@coffeekraken/sugar/js/http/SRequest';
import __SLitHtmlWebComponent from '@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent';
import __SWebComponent from '@coffeekraken/sugar/js/webcomponent/SWebComponent';

import '../scss/_bare.scss';

class SFiltrableInputWebComponent extends __SLitHtmlWebComponent({
  extends: HTMLInputElement,
  name: 'SFiltrableInput'
}) {
  static props = {};

  static customEvents = {
    select: {}
  };

  static cssName = 'SFiltrableInput';

  static template = function (props, settings, lit) {
    return lit.html`
      ${this}
      <ul class="${this.selector('list')}" tabindex="1">
        ${
          props.loading
            ? lit.html`
              ${settings.template.loading(settings, lit)}
            `
            : props.items.length === 0
            ? lit.html`
                ${settings.template.noItem(settings, lit)}
            `
            : lit.html`
            ${props.items.map((item, i) =>
              i < this._maxDisplayItems
                ? lit.html`
                <li class="${this.selector('list-item')} ${
                    item.type !== undefined
                      ? this.selector(`list-item--${item.type.toLowerCase()}`)
                      : ''
                  } ${
                    this._preselectedItemIdx === i
                      ? this.selector('list-item--preselected')
                      : ''
                  } ${
                    this._selectedItemIdx === i
                      ? this.selector('list-item--selected')
                      : ''
                  }">
                  ${settings.template.item.bind(this)(item, settings, lit)}
                </li>
              `
                : ''
            )}`
        }
      </ul>
    `;
  };

  /**
   * name         _preselectedItemIdx
   * @type        Number
   * @private
   *
   * Track which is the selected item index
   *
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _preselectedItemIdx = -1;

  /**
   * @name          _originalItems
   * @type          Array
   * @private
   *
   * This store the original items before the filter process
   * to be able to restore them after that
   *
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _originalItems = null;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          filter: {
            throttleTimeout: 100,
            properties: ['title', 'description'],
            function: null
          },
          template: {
            noItem: (settings, lit) => lit.html`
              <li class="${this.selector('list-no-item')}"></li>
                <div class="${this.selector('list-no-item-text')}">
                  ${this.props.noItemText}
                </div>
              </li>
            `,
            loading: (settings, lit) => lit.html`
              <div class="${this.selector('list-loading')}">
                <span class="${this.selector('list-loading-icon')}"></span>
                <span class="${this.selector('list-loading-text')}">${
              this.props.loadingText
            }</span>
              </div>
            `,
            item: (itemObj, settings, lit) => lit.html`
              ${
                itemObj.title
                  ? lit.html`
                <div class="${this.selector('list-item-title')}">
                    ${this.highlightFilter(itemObj.title)}
                </div>
              `
                  : ''
              }
              ${
                itemObj.description
                  ? lit.html`
                <div class="${this.selector('list-item-description')}">
                  ${this.highlightFilter(itemObj.description)}
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

    this._maxDisplayItems = this.props.maxDisplayItems;

    this.promise.on('props.items.*', (e) => {
      this.unselect();
      this.update();
    });

    this.on('ready', () => {
      this._$list = this.$('.list');

      // let inputThrottleTimeout;
      // this.addEventListener('input', (e) => {
      //   console.log('IN');
      //   clearTimeout(inputThrottleTimeout);
      //   inputThrottleTimeout = setTimeout(() => {
      //     this.dispatch('input', this.value);
      //   }, this.props.inputThrottle);
      // });

      let filterTimeout;
      this.addEventListener('input', (e) => {
        clearTimeout(filterTimeout);
        if (this.props.loading) return;
        filterTimeout = setTimeout(async () => {
          this.props.loading = true;
          this._maxDisplayItems = this.props.maxDisplayItems;
          if (this.props.preselectFirst) {
            this._preselectedItemIdx = 0;
          } else {
            this._preselectedItemIdx = -1;
          }
          this._selectedItemIdx = -1;
          this._filterString = e.srcElement.value;
          const newItemsArray = await this._settings.filter.function(
            this._filterString
          );
          this.props.loading = false;
          this.props.items = newItemsArray;
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
          if (this._maxDisplayItems < this.props.items.length) {
            this._maxDisplayItems += this.props.maxDisplayItems;
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
            if (this.props.closeOnEscape) {
              this.escape();
            }
            break;
        }
      });

      this.addEventListener('focus', () => {
        document.dispatchEvent(new Event('scroll'));
      });

      document.addEventListener('scroll', (e) => {
        var element = this.$container;
        var topPos = element.getBoundingClientRect().top;

        if (document.documentElement.clientHeight / 2 < topPos) {
          this.addClass('--ontop', this.$container);
          this._$list.style.maxHeight = `${topPos - 20}px`;
        } else {
          this.removeClass('--ontop', this.$container);
          this._$list.style.maxHeight = `${
            document.documentElement.clientHeight -
            topPos -
            this.$container.clientHeight -
            20
          }px`;
        }
      });
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
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isActive() {
    if (this === document.activeElement) return true;
    if (this._$list === document.activeElement) return true;
    return false;
  }

  /**
   * @name              unselect
   * @type              Function
   *
   * This method can be called to unselect either an item in particular, or all the
   * items if no parameter is specified
   *
   * @param       {Number}        idx         The index of the element you want to select
   *
   * @since       2.0.0
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  unselect() {
    this._selectedItemIdx = -1;
    // this._preselectedItemIdx = -1;
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
   * @setting     {Boolean}       [append=false]        Specify if you want to append this item to the current selection or replace the current one
   *
   * @since       1.0.0
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  select(idx, settings = {}) {
    settings = __deepMerge(
      {
        append: false
      },
      settings
    );
    if (typeof idx !== 'number') return false;
    // check that we have an item with this idx
    if (idx < 0 || idx >= this.props.items.length) return false;
    // make sure the focus stay in the input
    this.focus();
    // set the idx to the selectedItemIndex variable
    this._selectedItemIdx = idx;
    this._preselectedItemIdx = idx;
    // render the component
    this.render();
    // make a clone of the selected item
    const selectedItem = __clone(this.props.items[this._selectedItemIdx]);
    // set the value into the actual input
    let inputValue;
    if (
      selectedItem.inputValue &&
      typeof selectedItem.inputValue === 'string'
    ) {
      inputValue = selectedItem.inputValue;
    } else {
      const inputValueProp = this.props.inputValueProp;
      if (typeof inputValueProp === 'string')
        inputValue = selectedItem[inputValueProp];
      else if (typeof inputValueProp === 'function')
        inputValue = inputValueProp(selectedItem);
    }
    if (inputValue) this.setAttribute('value', inputValue);
    // "onSelect" item prop
    if (selectedItem.onSelect && typeof selectedItem.onSelect === 'function') {
      const onSelectFn = selectedItem.onSelect.bind(this);
      onSelectFn(selectedItem);
    } else if (
      this.props[':onSelect'] &&
      typeof this.props[':onSelect'] === 'function'
    ) {
      const onSelectFn = this.props[':onSelect'].bind(this);
      onSelectFn(selectedItem);
    } else if (selectedItem.href) {
      window.location = selectedItem.href;
    }
    // clear the input
    this.value = '';
    // reset filter string
    this._filterString = null;
    // dispatch a select event
    this.dispatch('select', selectedItem);
    // close if needed
    if (this.props.closeOnSelect || selectedItem.close) {
      setTimeout(() => {
        this.escape();
      }, this.props.closeOnSelectTimeout);
    }
    // return the selected item
    return selectedItem;
  }

  /**
   * @name              escape
   * @type              Function
   *
   * This method can be called to "exit" the filtrable input
   *
   * @since       1.0.0
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  escape() {
    this.blur();
    this._$list.blur();
  }

  /**
   * @name              validate
   * @type              Function
   *
   * This method can be called to validate a choice in the filtrable input
   *
   * @since       1.0.0
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  validate() {
    // check that we have an item selected
    if (this._preselectedItemIdx === -1) return;
    // make sure the selected item exist in the stack
    if (!this.props.items[this._preselectedItemIdx]) return;
    // select the item
    return this.select(this._preselectedItemIdx);
  }

  /**
   * @name              up
   * @type              Function
   *
   * This method can be called to select the previous item in the list
   *
   * @since       1.0.0
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  up() {
    // update the selected index
    if (this._preselectedItemIdx <= 0) return;
    this._preselectedItemIdx--;
    // render the component
    this.render();

    // get the selected item in the DOM
    const $preselectedItem = this.$('.list-item--preselected');
    if ($preselectedItem.offsetTop <= this._$list.scrollTop) {
      this._$list.scrollTop = $preselectedItem.offsetTop;
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
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  down() {
    // update the selected index
    if (this._preselectedItemIdx === this.props.items.length - 1) return;
    this._preselectedItemIdx++;
    // render the component
    this.render();

    // get the selected item in the DOM
    const $preselectedItem = this.$('.list-item--preselected');
    if (
      $preselectedItem.offsetTop >
      this._$list.scrollTop +
        this._$list.clientHeight -
        $preselectedItem.clientHeight
    ) {
      this._$list.scrollTop =
        $preselectedItem.offsetTop -
        this._$list.clientHeight +
        $preselectedItem.clientHeight;
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
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  filterItems(filterString) {
    return new Promise((resolve) => {
      // save the items if needed
      if (!this._originalItems) {
        this._originalItems = __clone(this.props.items, true);
      }
      // search in original items
      const newItems = this._originalItems.filter((item) => {
        for (const idx in this._settings.filter.properties) {
          const prop = this._settings.filter.properties[idx];
          console.log(prop, item);
          if (!item[prop] || typeof item[prop] !== 'string') continue;
          const reg = new RegExp(filterString, 'gi');
          if (item[prop].match(reg)) return true;
          // if (item[prop].includes(filterString)) return true;
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
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  highlightFilter(string) {
    if (!this._filterString) return string;
    const reg = new RegExp(this._filterString, 'gi');
    const finalString = string.replace(reg, (str) => {
      return `<span class="${this.selector(
        'list-item-highlight'
      )}">${str}</span>`;
    });
    return this.lit.unsafeHTML(finalString);
  }
}

export default SFiltrableInputWebComponent;
