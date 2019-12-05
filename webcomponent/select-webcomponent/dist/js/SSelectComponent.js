"use strict";

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _next = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/next"));

var _previous = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/previous"));

var _offset = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/offset"));

var _offsetParent = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/offsetParent"));

var _scrollTop = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/scrollTop"));

var _insertAfter = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/insertAfter"));

var _dispatchEvent = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/dispatchEvent"));

var _SEvent = _interopRequireDefault(require("@coffeekraken/sugar/js/classes/SEvent"));

var _style = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/style"));

var _sNativeWebComponent = _interopRequireDefault(require("@coffeekraken/sugar/js/core/sNativeWebComponent"));

var _mutationObservable = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/mutationObservable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("@coffeekraken/sugar/js/polyfills/queryselector-scope");

require("@coffeekraken/sugar/js/utils/rxjs/operators/groupByTimeout");
/**
 * @name 		SSelectComponent
 * @extends  	SWebComponent
 * Provide a nice and fully customizable select webcomponent that use a real select as source of truth
 * ### Features
 * - Fully based on standard select
 * - Optional internal search
 * - Custom option element through the "s-select-option-elm" attribute
 * - Fully customizable
 * - Support multiple selected options through "tags" display
 * - Any more...
 *
 * @example 	html
 * <select is="s-select" name="my-cool-select">
 * 	<option value="value1">Hello</option>
 * 	<option value="value2">World</option>
 * 	<optgroup label="My Cool Group">
 *  	<option value="value3">My Cool Option</option>
 * 	</optgroup>
 * </select>
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */


class SSelectComponent extends (0, _sNativeWebComponent.default)(HTMLSelectElement) {
  /**
   * Default css
   * @definition 		SWebComponent.defaultCss
   * @protected
   */
  static defaultCss(componentName, componentNameDash) {
    return `
			select[is="${componentNameDash}"] {
				position: absolute !important;
				width: 0 !important;
				height: 0 !important;
				padding: 0 !important;
				opacity: 0.001 !important;
				pointer-events: none !important;
				z-index: -1 !important;
			}
			.${componentNameDash} {
				display: inline-block;
				position:relative;
				cursor: pointer;
				width:100%;
			}
			.${componentNameDash}__option-source {
				display:none;
			}
			.${componentNameDash}__dropdown .${componentNameDash}__option-source {
				display:block;
			}
			select[is="${componentNameDash}"]:disabled + .${componentNameDash} {
				pointer-events:none;
				user-select:none;
			}
			.${componentNameDash},
			.${componentNameDash} * {
				box-sizing:border-box;
			}
			.${componentNameDash}__selection-container {

			}
			.${componentNameDash}__dropdown {
				opacity:0;
				pointer-events:none;
				position:absolute;
				top:100%; left:0;
				z-index: 1;
				width:100%;
				height:0;
				overflow-y: hidden;
			}
			.${componentNameDash}__selection {
				vertical-align:middle;
			}
			.${componentNameDash}__selection > * {
				display:inline-block;
				vertical-align: middle;
			}
			.${componentNameDash}--dropup .${componentNameDash}__dropdown {
				top:auto; bottom:calc(100% + 10px);
			}
			.${componentNameDash}--opened .${componentNameDash}__dropdown {
				opacity:1;
				pointer-events:all;
				height:auto;
			}
			.${componentNameDash}__options {
				overflow-y: auto;
				overflow-x: hidden;
				height: 100%;
				max-height: 100vh;
			}
			.${componentNameDash}__option {
				list-style: none;
				cursor: pointer;
			}
			.${componentNameDash}__option--disabled {
				pointer-events: none;
			}
			.${componentNameDash}__option--hidden {
				display:none;
			}
			.${componentNameDash}__selection {
			}
			.${componentNameDash}__selection-tag {
			}
			.${componentNameDash}__reset {
				visibility:hidden;
				pointer-events:none;
			}
			:hover > .${componentNameDash}__reset {
				visibility:visible;
				pointer-events:all;
			}
			.${componentNameDash}__selection-tag-close {
			}
		`;
  }
  /**
   * Default props
   * @definition 		SWebComponent.defaultProps
   * @protected
   */


  static get defaultProps() {
    return {
      /**
       * Callback function when the select dropdown opens
       * @prop
       * @type 	{Function}
       */
      onOpen: null,

      /**
       * Callback function when the select dropdown close
       * @prop
       * @type 	{Function}
       */
      onClose: null,

      /**
       * Display or not the search field in the dropdown
       * @prop
       * @type 	{Boolean}
       */
      searchField: true,

      /**
       * Specify the placeholder to display in the search field if the search is activated
       * @prop
       * @type 	{String}
       */
      searchPlaceholder: "Search...",

      /**
       * Specify if the internal search is activated or not. If so, when the user make a search, the select will
       * automatically filter itself depending on the entered keywords and the options values.
       * @prop
       * @type  	{Boolean}
       */
      internalSearch: true,

      /**
       * Specify how many characters has to be entered in the search field before triggering an actial search or search callback
       * @prop
       * @type  	{Integer}
       */
      minCharactersForSearch: 1,

      /**
       * Function to call when the user is making a search in the search field.
       * - parameter 1 : The searched text is passed to this function, then you can handle the search as you want.
       * - parameter 2 : The component that has triggered the search
       * @prop
       * @type 	{Function}
       */
      onSearch: null,

      /**
       * Specify if the user can reset the select by clicking on the reset button or not
       * @prop
       * @type 	{Boolean}
       */
      resetAllowed: true,

      /**
       * Specify the margin in pixels to keep between the select dropdown and the window top corner
       * @prop
       * @type 	{Integer}
       */
      screenMarginTop: 50,

      /**
       * Specify the margin in pixels to keep between the select dropdown and the window bottom corner
       * @prop
       * @type 	{Integer}
       */
      screenMarginBottom: 50,

      /**
       * Specify the limit height under which to set the select as a dropup
       * @prop
       * @type 		{Number}
       */
      dropupLimit: 200
    };
  }
  /**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */


  componentMount() {
    super.componentMount(); // utils variables

    this._openOnFocus = false;
    this._currentActiveOption = null; // save the current keyboard selected item
    // build html structure

    this._buildHTML(); // display or not the search


    if (!this.props.searchField) {
      this._searchContainerElm.style.position = "absolute";
      this._searchContainerElm.style.left = "-120vw";
    } // make sure when we click that we focus on the search field


    this._containerElm.addEventListener("click", e => {
      if (this.props.searchField) {
        this._searchFieldElm.focus();
      }
    }); // prevent default behavior on click in options container


    this.optionsContainerElm.addEventListener("click", e => {
      e.preventDefault();
    }); // open on click

    this._containerElm.addEventListener("click", e => {
      // do not open when the click is on an option
      if (this.hasComponentClass(e.target, "option")) return; // open

      if (!this.isOpened()) {
        this.open();
      }
    }); // prevent scroll into the options


    this.optionsContainerElm.addEventListener("mousewheel", ev => {
      let _this = ev.currentTarget;
      let scrollTop = _this.scrollTop;
      let scrollHeight = _this.scrollHeight;
      let height = _this.offsetHeight;
      let delta = ev.wheelDelta;

      if (ev.type == "DOMMouseScroll") {
        delta = ev.originalEvent.details * -40;
      }

      let up = delta > 0;

      let prevent = () => {
        ev.stopPropagation();
        ev.preventDefault();
        ev.returnValue = false;
        return false;
      };

      if (!up && -delta > scrollHeight - height - scrollTop) {
        // Scrolling down, but this will take us past the bottom.
        _this.scrollTop = scrollHeight;
        prevent();
      } else if (up && delta > scrollTop) {
        // Scrolling up, but this will take us past the top.
        _this.scrollTop = 0;
        prevent();
      }
    }); // manage the mouse and keyboard events

    this._handlers = {
      onKeyDown: e => {
        this._onKeyDown(e);
      },
      onDocumentClick: e => {
        this._onDocumentClick(e);
      },
      onScrollResize: e => {
        this._onScrollResize(e);
      },
      onKeyUp: e => {
        this._onKeyUp(e);
      },
      onMouseMove: e => {
        this._onMouseMove(e);
      }
    };
    this.addEventListener("open", e => {
      document.addEventListener("keydown", this._handlers.onKeyDown);
      document.addEventListener("click", this._handlers.onDocumentClick);
      window.addEventListener("scroll", this._handlers.onScrollResize);
      window.addEventListener("resize", this._handlers.onScrollResize);
      document.addEventListener("mousemove", this._handlers.onMouseMove);
    });
    this.addEventListener("close", e => {
      document.removeEventListener("keydown", this._handlers.onKeyDown);
      document.removeEventListener("click", this._handlers.onDocumentClick);
      window.removeEventListener("scroll", this._handlers.onScrollResize);
      window.removeEventListener("resize", this._handlers.onScrollResize);
      document.removeEventListener("mousemove", this._handlers.onMouseMove);
    }); // listen for keyup

    document.addEventListener("keyup", this._handlers.onKeyUp); // listen for change on base select
    // to set the selected items

    this.addEventListener("change", e => {
      console.log("CHANGE", e.target.value);

      this._setSelected();
    }); // listen for focus in search field to activate the field

    this._searchFieldElm.addEventListener("focus", e => {
      this._openOnFocus = true;
      this.open();
      setTimeout(() => {
        this._openOnFocus = false;
      }, 200);
    }); // listen for keyup on search field


    let internalSearch = this.props.internalSearch;
    let search = this.props.searchField;

    const searchFieldFn = e => {
      // check if the key is up or down to avoid searching again
      if (e.keyCode === 38 || // up
      e.keyCode === 40 || // down
      e.keyCode === 13 || // enter
      e.keyCode === 27 // escape
      ) return; // trigger custom event

      let event = new _SEvent.default("search");
      this.dispatchEvent(event); // on search callback

      if (e.target.value && e.target.value.length >= this.props.minCharactersForSearch) {
        this.props.onSearch && this.props.onSearch(e.target.value, this);
      } // check if internal search


      this._internalSearch();
    };

    if (internalSearch && search) {
      this._searchFieldElm.addEventListener("keyup", searchFieldFn);

      this._searchFieldElm.addEventListener("search", searchFieldFn);
    } // observe all changes into the select
    // to refresh our custom one


    (0, _mutationObservable.default)(this, {
      childList: true
    }).groupByTimeout().subscribe(mutation => {
      this.refresh();
    }); // first refresh

    this.refresh(); // hide the select

    this._hideRealSelect(); // append the element right after the real select


    (0, _insertAfter.default)(this._containerElm, this);
  }
  /**
   * Component unmount
   * @definition 		SWebComponent.componentUnmount
   * @protected
   */


  componentUnmount() {
    document.removeEventListener("keyup", this._handlers.onKeyUp);
    document.removeEventListener("keydown", this._handlers.onKeyDown);
    document.removeEventListener("click", this._handlers.onDocumentClick);
    window.removeEventListener("scroll", this._handlers.onScrollResize);
    window.removeEventListener("resize", this._handlers.onScrollResize);
    document.removeEventListener("mousemove", this._handlers.onMouseMove);

    this._destroy();
  }
  /**
   * Destroy
   */


  _destroy() {
    if (this._refreshObserver) {
      this._refreshObserver.unsubscribe();
    }
  }
  /**
   * On mouse move on document
   */


  _onMouseMove(e) {
    // let the mouse events flows inside the optionsContainerElm
    this.optionsContainerElm.style.pointerEvents = "all";
  }
  /**
   * Process to internal search
   */


  _internalSearch() {
    // reset the scroll position of the options
    this.optionsContainerElm.scrollTop = 0; // loop on each options

    [].forEach.call(this.optionsContainerElm.querySelectorAll(this.componentSelector("option")), option => {
      this.removeComponentClass(option, "option", null, "active");
      option.classList.remove("active"); // check if is a value in the search field

      if (this._searchFieldElm.value && this._searchFieldElm.value.length >= this.props.minCharactersForSearch) {
        // check if we find the text in the option
        let regexp = new RegExp("(" + this._searchFieldElm.value + ")(?!([^<]+)?>)", "gi"); // search the tokens in html

        let replace = option._s_innerHTML.replace(regexp, `<span class="${this.componentClassName("search-result")}">$1</span>`);

        if (option._s_innerHTML.match(regexp)) {
          this.removeComponentClass(option, "option", null, "hidden");
          option.innerHTML = replace;
        } else {
          // reset the activate item if need to be hided
          if (option == this._currentActiveOption) {
            this._currentActiveOption = null;
          }

          this.addComponentClass(option, "option", null, "hidden");
        }
      } else {
        option.innerHTML = option._s_innerHTML;
        this.removeComponentClass(option, "option", null, "hidden");
      }
    }); // activate the first option in the list

    this.mutate(() => {
      this._activateFirst();
    }); // set position

    this._setPosition();
  }
  /**
   * On scroll or resize
   */


  _onScrollResize(e) {
    this._setPosition();
  }
  /**
   * When the user click outside of the select
   */


  _onDocumentClick(e) {
    if (!this._containerElm.contains(e.target)) {
      this.close();
    }
  }
  /**
   * Check the keyboard actions
   */


  _onKeyUp(e) {
    if ((e.keyCode === 40 || e.keyCode === 38) && !this.isOpened() && document.activeElement === this._searchFieldElm) {
      this.open();
    } else if ((e.keyCode === 9 || // tab
    e.keyCode === 27) && // escape
    this.isOpened()) {
      if (!this._openOnFocus) {
        this.close();
      }
    }
  }
  /**
   * On key down
   */


  _onKeyDown(e) {
    // prevent the mouse interactions to avoid conflict between mouse and keyboard
    this.optionsContainerElm.style.pointerEvents = "none"; // check which key has been pressed

    switch (e.keyCode) {
      case 40:
        // down
        this._activateNext();

        e.preventDefault();
        break;

      case 38:
        // up
        this._activatePrevious();

        e.preventDefault();
        break;

      case 13:
        // enter
        this._selectActivated();

        e.preventDefault();
        break;

      case 8:
        // backspace
        if (this._searchFieldElm.focus && this._searchFieldElm.value == "") {
          // remove the last item
          this.unselectLast();
        }

        break;
    }
  }
  /**
   * Select the first option available
   */


  _activateFirst() {
    // remove active class if exist
    if (this._currentActiveOption) {
      this.removeComponentClass(this._currentActiveOption, "option", null, "active");

      this._currentActiveOption.classList.remove("active");
    } // set the current active option to the first available one


    const findedOpts = this.optionsContainerElm.querySelectorAll(`${this.componentSelector("option")}:not(${this.componentSelector("option", "disabled")}):not(${this.componentSelector("option", "hidden")})`);

    if (findedOpts.length) {
      this._currentActiveOption = findedOpts[0];
    } // activate the element


    if (this._currentActiveOption) {
      this.addComponentClass(this._currentActiveOption, "option", null, "active");

      this._currentActiveOption.classList.add("active");
    }
  }
  /**
   * Select next with keyboard
   */


  _activateNext() {
    // if no option already selected by keyboard, activate the first.
    // this will make the second item to be selected as expected
    if (!this._currentActiveOption) {
      this._activateFirst();
    } // remove active class if exist


    if (this._currentActiveOption) {
      this.removeComponentClass(this._currentActiveOption, "option", null, "active");

      this._currentActiveOption.classList.remove("active");
    } // check if already an item is selected


    if (!this._currentActiveOption) {
      const findedOpts = this.optionsContainerElm.querySelectorAll(`${this.componentSelector("option")}:not(${this.componentSelector("option", "disabled")}):not(${this.componentSelector("option", "hidden")})`);

      if (findedOpts.length) {
        this._currentActiveOption = findedOpts[0];
      }
    } else {
      // try to get the next sibling
      const next = (0, _next.default)(this._currentActiveOption, `${this.componentSelector("option")}:not(${this.componentSelector("option", "disabled")}):not(${this.componentSelector("option", "hidden")})`);
      if (next) this._currentActiveOption = next;
    } // activate the element


    if (this._currentActiveOption) {
      this.addComponentClass(this._currentActiveOption, "option", null, "active");

      this._currentActiveOption.classList.add("active"); // scroll view


      const optionHeight = this._currentActiveOption.offsetHeight;
      const optionOffest = (0, _offsetParent.default)(this._currentActiveOption); // if need to scroll the view

      if (optionOffest.top > this.optionsContainerElm.offsetHeight - optionHeight) {
        this._currentActiveOption.parentNode.scrollTop += optionHeight;
      } else if (optionOffest.top < 0) {
        this.optionsContainerElm.scrollTop = optionOffest.top;
      }
    }
  }
  /**
   * Select previous with keyboard
   */


  _activatePrevious() {
    // do not allow to activate a previous item if their's no active one already
    if (!this._currentActiveOption) return; // remove active class if exist

    if (this._currentActiveOption) {
      this.removeComponentClass(this._currentActiveOption, "option", null, "active");

      this._currentActiveOption.classList.remove("active");
    } // check if already an item is selected


    if (!this._currentActiveOption) {
      const findedOpts = this.optionsContainerElm.querySelectorAll(`${this.componentSelector("option")}:not(${this.componentSelector("option", "disabled")}):not(${this.componentSelector("option", "hidden")})`);

      if (findedOpts.length) {
        this._currentActiveOption = findedOpts[findedOpts.length - 1];
      }
    } else {
      // try to get the next sibling
      const previous = (0, _previous.default)(this._currentActiveOption, `${this.componentSelector("option")}:not(${this.componentSelector("option", "disabled")}):not(${this.componentSelector("option", "hidden")})`);
      if (previous) this._currentActiveOption = previous;
    } // activate the element


    if (this._currentActiveOption) {
      this.addComponentClass(this._currentActiveOption, "option", null, "active");

      this._currentActiveOption.classList.add("active"); // scroll to item


      const optionHeight = this._currentActiveOption.offsetHeight;
      const optionOffest = (0, _offsetParent.default)(this._currentActiveOption);

      if (optionOffest.top < 0) {
        this._currentActiveOption.parentNode.scrollTop -= optionHeight;
      } else if (optionOffest.top > this.optionsContainerElm.offsetHeight) {
        const ot = optionOffest.top + this.optionsContainerElm.scrollTop;
        this.optionsContainerElm.scrollTop = ot - optionHeight;
      }
    }
  }
  /**
   * Select activated item
   */


  _selectActivated() {
    // check if an activated element exist
    if (this._currentActiveOption) {
      this.select(this._currentActiveOption._s_select_source_option);
    }
  }
  /**
   * Create html structure
   */


  _buildHTML() {
    let container = document.createElement("div");
    container.setAttribute("class", this.getAttribute("class") || "");
    this.className = "";
    this.addComponentClass(container); // multiple class

    if (this.getAttribute("multiple") != null) {
      this.addComponentClass(container, null, "multiple");
    }

    let selection_container = document.createElement("div");
    this.addComponentClass(selection_container, "selection-container");
    let selection_aligner = document.createElement("div");
    this.addComponentClass(selection_aligner, "selection-aligner");
    let dropdown = document.createElement("div");
    this.addComponentClass(dropdown, "dropdown");
    dropdown.style.fontSize = "1rem"; // search

    let search_container = document.createElement("div");
    this.addComponentClass(search_container, "search-container"); // search field

    let search_field = document.createElement("input");
    search_field.setAttribute("type", "search");

    if (search_field.type != "search") {
      search_field.type = "text";
    }

    search_field.setAttribute("placeholder", this.props.searchPlaceholder);
    this.addComponentClass(search_field, "search-field"); // reset

    let resetElm = null;

    if (this.props.resetAllowed) {
      resetElm = document.createElement("button");
      resetElm.setAttribute("type", "button");
      resetElm.addEventListener("click", e => {
        e.preventDefault();
        this.reset();
      });
      this.addComponentClass(resetElm, "reset");
    } // options


    let options_container = document.createElement("div");
    this.addComponentClass(options_container, "options"); // append to document

    search_container.appendChild(search_field);
    dropdown.appendChild(search_container);
    dropdown.appendChild(options_container); // container.appendChild(open_checkbox);

    container.appendChild(selection_container);

    if (resetElm) {
      container.appendChild(resetElm);
    }

    container.appendChild(dropdown); // hide the real select

    this._hideRealSelect(); // save into object


    this._containerElm = container;
    this._dropdownElm = dropdown;
    this._searchContainerElm = search_container;
    this.selectionContainerElm = selection_container;
    this._searchFieldElm = search_field;
    this.optionsContainerElm = options_container;
  }
  /**
   * Hide the select
   */


  _hideRealSelect() {
    // keep it in the viewport to avoid issues
    // when trying to get the select that is in the viewport,
    // etc...
    // __style(this, {
    // 	position: "absolute",
    // 	width: 0,
    // 	height: 0,
    // 	padding: 0,
    // 	opacity: 0.01,
    // 	pointerEvents: "none",
    // 	zIndex: -1
    // });
    this.tabIndex = -1;
  }
  /**
   * Handle click on option
   */


  _handleOptionClick(_s_option, e) {
    // check if is a multiple
    if (!this.isMultiple()) {
      // select the element in the source select
      _s_option._s_select_source_option.selected = true; // close

      this.mutate(() => {
        this.close();
      });
    } else {
      _s_option._s_select_source_option.selected = !_s_option._s_select_source_option.selected; // // check if the alt key is pressed
      // if (e.metaKey) {
      // 	// toggle selection
      // 	_s_option._s_select_source_option.selected = ! _s_option._s_select_source_option.selected;
      // } else if (e.shiftKey) {
      // 	// get the index of the last selected option
      // 	if (this.options.selectedIndex) {
      // 		// find the current option position
      // 		let current_option_idx = 0,
      // 			found = false;
      // 		[].forEach.call(this.options, (opt) => {
      // 			if ( ! found && opt != _s_option._s_select_source_option) {
      // 				current_option_idx++;
      // 			} else {
      // 				found = true;
      // 			}
      // 		});
      // 		// select all the options inbetween
      // 		let first = this.options.selectedIndex;
      // 		let last = current_option_idx;
      // 		if (first > last) {
      // 			let _last = last;
      // 			last = first;
      // 			first = _last;
      // 		}
      // 		for (let i = first; i <= last; i++) {
      // 			if ( ! this.options[i].disabled) {
      // 				this.options[i].selected = true;
      // 			}
      // 		}
      // 	} else {
      // 		// telection
      // 		_s_option._s_select_source_option.selected = ! _s_option._s_select_source_option.selected;
      // 	}
      // } else {
      // 	// unactive all the options
      // 	[].forEach.call(this.options, (opt) => {
      // 		opt.selected = false;
      // 	});
      // 	// activate the item
      // 	_s_option._s_select_source_option.selected = true;
      // }
    } // trigger change event


    (0, _dispatchEvent.default)(this, "change");
  }
  /**
   * Set selected elements
   */


  _setSelected() {
    // loop on selected option to activate them
    let areSomeSelectedItems = false;
    [].forEach.call(this.options, option => {
      // apply the active class
      if (option._s_select_option) {
        if (option.selected) {
          if (option.innerHTML != "") {
            areSomeSelectedItems = true;
          }

          this.addComponentClass(option._s_select_option, "option", null, "selected");
        } else {
          this.removeComponentClass(option._s_select_option, "option", null, "selected");
        }
      }
    }); // set the selection

    this.selectionContainerElm.innerHTML = "";

    if (this.isMultiple()) {
      // loop on each selected items
      [].forEach.call(this.options, option => {
        if (option.selected) {
          // get the content
          let content = option.innerHTML; // create the tag

          let tag = document.createElement("div");
          this.addComponentClass(tag, "selection-tag");
          tag.innerHTML = content;
          let close = document.createElement("span");
          this.addComponentClass(close, "selection-tag-close");
          close.addEventListener("click", e => {
            option.selected = false; // trigger change event

            let event = new _SEvent.default("change");
            this.dispatchEvent(event);
          });
          tag.addEventListener("dblclick", e => {
            option.selected = false; // trigger change event

            let event = new _SEvent.default("change");
            this.dispatchEvent(event);
          });
          tag.appendChild(close);
          this.selectionContainerElm.appendChild(tag);
        }
      });
    } else {
      // get the selected one
      let selected_idx = this.options.selectedIndex;

      if (selected_idx != -1) {
        // set the selected
        let selection = document.createElement("div");
        this.addComponentClass(selection, "selection");
        selection.innerHTML = this.options[selected_idx].innerHTML;
        this.selectionContainerElm.appendChild(selection);
      }
    }

    if (!areSomeSelectedItems) {
      let placeholder = this.getAttribute("placeholder");

      if (!placeholder && this.isMultiple()) {
        placeholder = "&nbsp;";
      }

      if (placeholder) {
        let selection = document.createElement("div");
        this.addComponentClass(selection, "selection");
        selection.classList.add("input--placeholder");
        selection.innerHTML = placeholder;
        this.addComponentClass(this._containerElm, null, "placeholder");
        this.selectionContainerElm.appendChild(selection);
      }
    } else {
      this.removeComponentClass(this._containerElm, null, "placeholder");
    }
  }
  /**
   * Set position
   */


  _setPosition() {
    // get the position of the container
    let dropdownOffset = (0, _offset.default)(this._dropdownElm);
    let dropdownTop = dropdownOffset.top - (0, _scrollTop.default)();
    let containerTop = (0, _offset.default)(this._containerElm).top - (0, _scrollTop.default)();
    let dropdownFullHeight = this.optionsContainerElm.scrollHeight + this._searchContainerElm.offsetHeight;
    let optionsFullHeight = this.optionsContainerElm.scrollHeight;
    let optionsHeight = this.optionsContainerElm.offsetHeight;
    let screenMarginTop = this.props.screenMarginTop;
    let screenMarginBottom = this.props.screenMarginBottom;
    let optionsMinHeight = parseInt(window.getComputedStyle(this.optionsContainerElm).getPropertyValue("min-height")); // check if the min-height has been reached

    if (containerTop + this._containerElm.offsetHeight + this._searchContainerElm.offsetHeight + optionsMinHeight + screenMarginBottom + this.props.dropupLimit > window.innerHeight) {
      // if (optionsHeight < optionsFullHeight && optionsHeight <= optionsMinHeight ) {
      this.addComponentClass(this._containerElm, null, "dropup"); // console.log(top + h, window.innerHeight);

      if (containerTop - dropdownFullHeight - screenMarginTop < 0) {
        this.optionsContainerElm.style.height = window.innerHeight - (window.innerHeight - containerTop) - this._searchContainerElm.offsetHeight - screenMarginTop + "px";
      } else {
        this.optionsContainerElm.style.height = "auto";
      }
    } else {
      this.removeComponentClass(this._containerElm, null, "dropup"); // console.log(top + h, window.innerHeight);

      if (dropdownTop + dropdownFullHeight + screenMarginBottom > window.innerHeight) {
        this.optionsContainerElm.style.height = window.innerHeight - dropdownTop - this._searchContainerElm.offsetHeight - screenMarginBottom + "px";
      } else {
        this.optionsContainerElm.style.height = "auto";
      }
    }
  }
  /**
   * Handle optgroup
   * @param 		{HTMLElement} 		_optgroup 		The optgroup to handle
   */


  _handleOptgroup(_optgroup) {
    // create the choice
    let option = document.createElement("div");
    this.addComponentClass(option, "optgroup"); // get the content

    let content = _optgroup.getAttribute("label"); // get the content


    let source = _optgroup.getAttribute(`${this.componentNameDash}-option-elm`);

    if (source) {
      // try to get into document
      source = document.querySelector(source);

      if (source) {
        option.appendChild(source);
        this.addComponentClass(option, "optgroup", "custom");
      } else {
        option.innerHTML = content;
      }
    } else {
      option.innerHTML = content;
    } // append new choice


    this.optionsContainerElm.appendChild(option);
  }
  /**
   * Handle option
   */


  _handleOption(_option, in_optgroup = false) {
    // check if is an optiongroup
    if (_option.nodeName.toLowerCase() == "optgroup") {
      this._handleOptgroup(_option);

      [].forEach.call(_option.querySelectorAll(":scope > option"), option => {
        this._handleOption(option, true);
      });
      return;
    } // create the choice


    let option = document.createElement("div");
    this.addComponentClass(option, "option"); // check if in optgroup

    if (in_optgroup) {
      this.addComponentClass(option, "option", "in-optgroup");
    } // check if disabled


    if (_option.disabled) {
      this.addComponentClass(option, "option", null, "disabled");
    } // save the option reference into html element
    // to be able to activate it in the base select


    option._s_select_source_option = _option; // save the s_option into the base option
    // to be able to activate the s_option later

    _option._s_select_option = option; // get the content

    let content = _option.innerHTML; // get the content

    let source = _option.getAttribute(`${this.componentNameDash}-option-elm`);

    if (source) {
      // try to get into document
      source = document.querySelector(source);
      this.addComponentClass(source, "option-source");

      if (source) {
        option.innerHTML = source.outerHTML;
        this.addComponentClass(option, "option", "custom");
      } else {
        option.innerHTML = content;
      }
    } else {
      if (!content) return;
      option.innerHTML = content;
    } // save the html to restore later on search


    option._s_innerHTML = option.innerHTML; // add a click event on the option

    option.addEventListener("click", e => {
      this._handleOptionClick(e.currentTarget, e);
    }); // add the listener for the hover

    option.addEventListener("mouseover", e => {
      if (this._currentActiveOption) {
        this.removeComponentClass(this._currentActiveOption, "option", null, "active");

        this._currentActiveOption.classList.remove("active");
      }

      this._currentActiveOption = option;
    }); // append new choice

    this.optionsContainerElm.appendChild(option);
  }
  /**
   * Sync the custom select with his source or truth.
   * This is in most cases called automatically but if you need it, it's here...
   * @return 	{SSelectComponent} 		Return the component to maintain chainability
   */


  refresh() {
    // empty the options
    let options_parent = this.optionsContainerElm.parentNode;
    options_parent.removeChild(this.optionsContainerElm);
    this.optionsContainerElm.innerHTML = ""; // create the options tree

    [].forEach.call(this.querySelectorAll(":scope > option, :scope > optgroup"), elm => {
      // handle option
      this._handleOption(elm);
    }, this); // set selected the first time

    this._setSelected(); // append again in dom the options


    options_parent.appendChild(this.optionsContainerElm); // set position

    if (this.isOpened()) {
      setTimeout(() => {
        this._setPosition();
      });
    }

    return this;
  }
  /**
   * Select an option in source select
   * @param 		{HTMLOptionElement} 		option 		The option element to select
   * @return 	{SSelectComponent} 		Return the component to maintain chainability
   */


  select(option) {
    // check if we have the s-select option targer
    if (option._s_select_option) {
      this._handleOptionClick(option._s_select_option);
    } else if (option._s_select_source_option) {
      this._handleOptionClick(option);
    }

    return this;
  }
  /**
   * Reset the select. This will deselect all selected items, etc...
   * @return 	{SSelectComponent} 		Return the component to maintain chainability
   */


  reset() {
    this.selectedIndex = -1;
    this.refresh();
    (0, _dispatchEvent.default)(this, "change");
    (0, _dispatchEvent.default)(this, "reset");
    return this;
  }
  /**
   * Unselect the last selected option
   * @return 		{HTMLOptionElement} 			The deselected option, null if none
   */


  unselectLast() {
    let last = null;
    [].forEach.call(this.options, option => {
      if (option.selected) {
        last = option;
      }
    }); // unselect the last

    if (last) {
      last.selected = false; // trigger change event

      let event = new _SEvent.default("change");
      this.dispatchEvent(event);
    } // return the deselected option


    return last;
  }
  /**
   * Check if the select is a multiple one
   * @return 		{Boolean} 			True is select is a multiple one, false if not
   */


  isMultiple() {
    return this.hasAttribute("multiple");
  }
  /**
   * Check if the select is a disabled
   * @return 		{Boolean} 			True is select is disabled, false if not
   */


  isDisabled() {
    return this.hasAttribute("disabled");
  }
  /**
   * Is opened
   * @return 		{Boolean} 			True if select is opened, false if not
   */


  isOpened() {
    return this.hasComponentClass(this._containerElm, null, null, "opened");
  }
  /**
   * Close the select dropdown
   * @return 	{SSelectComponent} 		Return the component to maintain chainability
   */


  close() {
    if (!this._isOpened) return this;
    this._isOpened = false;
    this.removeComponentClass(this._containerElm, null, null, "opened"); // unactivate the option if one exist
    // if (this._currentActiveOption) {
    // 	this.removeComponentClass(this._currentActiveOption, 'option', null, 'active');
    // 	this._currentActiveOption.classList.remove('active');
    // 	this._currentActiveOption = null;
    // }
    // remove the dropup class

    this._clearDropupTimeout = setTimeout(() => {
      this.removeComponentClass(this._containerElm, null, "dropup");
    }, 500); // dispatch close event

    let event = new _SEvent.default("close");
    this.dispatchEvent(event); // handle onClose callback

    let onClose = this.props.onClose;

    if (onClose) {
      onClose();
    }

    return this;
  }
  /**
   * Open the select dropdown
   * @return 	{SSelectComponent} 		Return the component to maintain chainability
   */


  open() {
    if (this.isDisabled()) return this;
    if (this._isOpened) return this;
    this._isOpened = true;
    this.addComponentClass(this._containerElm, null, null, "opened"); // set position

    clearTimeout(this._clearDropupTimeout);

    this._setPosition(); // dispatch open event


    let event = new _SEvent.default("open");
    this.dispatchEvent(event); // manage onOpen callback

    let onOpen = this.props.onOpen;

    if (onOpen) {
      onOpen();
    }

    return this;
  }
  /**
   * Set focus
   * @return 	{SSelectComponent} 		Return the component to maintain chainability
   */


  focus() {
    this._searchFieldElm.focus();

    return this;
  }

}

exports.default = SSelectComponent;
module.exports = exports.default;