import SWebComponent from '@coffeekraken/sugar/js/core/SWebComponent'
import SAjax from '@coffeekraken/sugar/js/class/SAjax'
import __strToHtml from '@coffeekraken/sugar/js/string/strToHtml'
import __insertAfter from '@coffeekraken/sugar/js/dom/insertAfter'
import __style from '@coffeekraken/sugar/js/dom/style'
import __getAnimationProperties from '@coffeekraken/sugar/js/dom/getAnimationProperties'
import __sendForm from '@coffeekraken/sugar/js/dom/sendForm'

/**
 * @name 		DialogWebcomponent
 * @extends 	SWebComponent
 * Provide a simple to use dialog component that support:
 * - Modal
 * - HTMLElement as content
 * - Url to load by ajax as content
 * - HTML string as content
 *
 * @example 	html
 * <!-- simple modal -->
 * <ck-dialog id="my-cool-dialog">
 * 	<!-- dialog content here... -->
 * </ck-dialog>
 * <a href="#my-cool-dialog" title="open my cool dialog">Open dialog</a>
 *
 * <!-- wrap an "<a>" tag with a dialog -->
 * <ck-dialog>
 * 	<a href="/content/my-cool-dialog.html" title="open my dialog">
 *  	Open my dialog
 *  </a>
 * </ck-dialog>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
export default class DialogWebcomponent extends SWebComponent {

	/**
	 * Store the number of dialogs opened in the page
	 * @type 	{Integer}
	 * @protected
	 */
	static counter = 0;

	/**
   * @name      open
   * @namespace       dialog-webcomponent
   * @type        Function
   * @static
   *
	 * Open a dialog fully programatically
   *
	 * @param    {Mixed}    content    The content of the dialog
	 * @param    {Object}    props    The properties for this dialog
   *
	 * @return    {DialogWebcomponent}    An instance of the dialog HTMLElement
	 */
	static open(content, props = {}) {
		// create an ck-dialog element
		const elm = document.createElement('ck-dialog')
		document.body.appendChild(elm)
		elm.setProps({
			content,
			...props,
			opened: true
		})
		return elm
	}

	/**
	 * Default props
	 * @definition 		SWebComponent.defaultProps
	 * @protected
   * @static
	 */
	static get defaultProps() {
		return {
			/**
			 * Specify the element that will trigger the dialog
			 * @prop
			 * @type 		{String}
			 */
			for : null,

			/**
			 * Specify the content to use for the dialog
			 * Can be an html id selector like "#myCoolContent"
			 * an url to load by through ajax|iframe like "myCoolContent.html"
			 * a mix like "myCoolContent.html#myCoolContent"
			 * or nothing. In this case, the element itself will be the dialog content
			 * @prop
			 * @type 	{String}
			 */
			content : null,

			/**
			 * If the content is a url to load, specify if it has to be loaded in an iframe instead of the
			 * ajax default behavior
			 * @prop
			 * @type 	{Boolean}
			 */
			iframe : false,

			/**
			 * If the iframe property is true, specify if the iframe can be scrolled or not
			 * @prop
			 * @type 	{Boolean}
			 */
			iframeScrolling : true,

			/**
			 * The dialog id that can be used to open the dialog through the url hash
			 * @prop
			 * @type 		{String}
			 */
			id : null,

			/**
			 * Type of the dialog. This will basically be set as a class on the dialog container like "ck-dialog--{type}"
			 * @prop
			 * @type 	{String}
			 */
			type : 'default',

			/**
			 * Specify if the dialog is a modal or not
			 * @prop
			 * @type 	{Boolean}
			 */
			modal : false,

			/**
			 * Callback when the modal opens
			 * @prop
			 * @type 	{Function}
			 */
			onOpen : null,

			/**
			 * Callback when the modal closes
			 * @prop
			 * @type 	{Function}
			 */
			onClose : null,

			/**
			 * Callback when the modal is has been validated with an "ok" status
			 * @prop
			 * @type 	{Function}
			 */
			onOk : null,

			/**
			 * Callback when the modal has been dismissed
			 * @prop
			 * @type 	{Function}
			 */
			onDismiss : null,

			/**
			 * Specify if the modal is opened or not
			 * @prop
			 * @physicalProps
			 * @type 	{Boolean}
			 */
			opened : false,

			/**
			 * Set when to open the dialog
			 * This can be 'click'|'hover'|'init'
			 * @prop
			 * @type 	{String}
			 */
			openOn : 'click',

			/**
			 * Set an open timeout to use in conjunction with the openOn="init"
			 * @prop
			 * @type 	{Number}
			 */
			openTimeout : 0
		};
	}

	/**
	 * Physical props
	 * @definition 		SWebComponent.physicalProps
	 * @protected
   * @static
	 */
	static get physicalProps() {
		return ['opened'];
	}

	/**
	 * Css
	 * @protected
   * @static
	 */
	static defaultCss(componentName, componentNameDash) {
		return `
			body.${componentNameDash}--opened {
				overflow: hidden;
			}
			.${componentNameDash} {
				display : block;
				position : fixed;
				top : 0; left: 0;
				width : 100%; height : 100%;
				overflow : auto;
				text-align : center;
				white-space : nowrap;
				z-index:9999;
			}
			.${componentNameDash}__overlay {
				position:fixed;
				top:0;
				left:0;
				width:100%;
				height:100%;
			}
			.${componentNameDash}__aligner {
				width:0px; height:100%; display:inline-block; vertical-align:middle;
			}
			.${componentNameDash}__content {
				display: inline-block; text-align: left; margin: 0px auto; position: relative; vertical-align: middle; white-space: normal;
			}
		`;
	}

	/**
	 * Component will mount
 	 * @definition 		SWebComponent.componentWillMount
	 * @protected
	 */
	componentWillMount() {
		super.componentWillMount();

	}

	/**
	 * Mount component
	 * @definition 		SWebComponent.componentMount
	 * @protected
	 */
	componentMount() {

		super.componentMount();

		// variables
		this._cachedContent = null;
		this._html = null;
		this._allowModalClose = false;

		// get the triggerer
		if (this.props.for) {
			this._triggerer = document.querySelector(`[name="${this.props.for}"],#${this.props.for}`);
		} else if (this.props.id) {
			this._triggerer = document.querySelector(`[href="#${this.props.id}"]`);
		} else if (this.children && this.children.length === 1 && this.children[0] && this.children[0].tagName.toLowerCase() === 'a') {
			this._triggerer = this.children[0];
		} else {
			this._triggerer = this;
		}

		// check hash change
		if (this.props.id) {
			this._processHashChange();
			window.addEventListener('hashchange', (e) => {
		 		this._processHashChange();
			});
			window.addEventListener('popstate', (e) => {
				this._processHashChange();
			});
		}

		// check the triggerer if a form, mean that we need to open the
		// dialog on submit
		if (this._triggerer.tagName.toLowerCase() === 'form') {
			this._triggerer.addEventListener('submit', (e) => {
				// check validity first
				if ( ! e.target.checkValidity()) return;
				// prevent default form behavior
				e.preventDefault();
				// send form
				__sendForm(e.target).then((response) => {
					// remove the cached content
					this._cachedContent = null;
					// open the dialog
					this.open(__strToHtml(response));
				});
			});
		} else {
			// handle openOn
			switch(this.props.openOn) {
				case 'click':
					this._triggerer.addEventListener('click', (e) => {
						e.preventDefault();
						this.open();
					});
				break;
				case 'hover':
					this._triggerer.addEventListener('mouseover', (e) => {
						e.preventDefault();
						this.open();
					});
				break;
				case 'init':
					this._triggerer.addEventListener('click', (e) => {
						e.preventDefault();
					});
					this.open();
				break;
			}
		}

		// if the opened property is true, open the dialog directly
		if (this.props.opened) {
			setTimeout(() => {
				this.open();
				this._open();
			}, this.props.openTimeout);
		}
	}

	/**
	 * Component will receive prop
	 * @definition 		SWebComponent.componentWillReceiveProp
	 * @protected
	 */
	componentWillReceiveProp(name, newVal, oldVal) {
		switch(name) {
			case 'opened':
				if (newVal) {
					setTimeout(() => { this._open(); }, this.props.openTimeout);
				} else this._close();
			break;
		}
	}

	/**
	 * Process hash change
	 */
	_processHashChange() {
		clearTimeout(this._processHashChangeTimeout);
		this._processHashChangeTimeout = setTimeout(() => {
			const hash = document.location.hash;
			if (hash && hash.substr(1) === this.props.id) {
				this.open();
			} else if (this.isOpened()){
				this.close();
			}
		});
	}

	/**
	 * Open the dialog
	 * @param 		{String|HTMLElement} 		[content=null] 		The content for the modal. Can be an HTMLElement, an url to load by ajax or an HTML string
	 */
	open(content = null) {

		// id has an id, set it as hash
		if (this.props.id
			&& (! document.location.hash
				|| document.location.hash.substr(1) !== this.props.id
			)
		) {
			window.history.pushState({},null,`${document.location.pathname || ''}${document.location.search || ''}#${this.props.id}`);
		}

		// return a new promise
		return new Promise((resolve, reject) => {

			// save the resolve and reject promise callbacks to use them later
			this._resolve = resolve;
			this._reject = reject;

			// get content from passed parameter or settings
			if ( ! content) {
				if (this.props.content) content = this.props.content
				else if (this._triggerer) content = this._triggerer.getAttribute('href')
			}

			// try to load the content only if not already loaded
			if ( ! this._cachedContent) {

				// try to get the content of the dialog
				if ( ! content) {
					// the content of the dialog is the element itself
					// we check if it contains only 1 HTMLElement, in that case we take it
					// as the content, otherwise, we take the entire content in string format...

					if (this.children.length === 1) {
						this._cachedContent = this._grabTemplateContent(this)
						if ( ! this._cachedContent) {
							this._cachedContent = this.children[0]
						}
					} else {
						this._cachedContent = this.innerHTML;
					}
					// open
					this.setProp('opened', true);
				} else if (content.tagName && content.tagName.toLowerCase() === 'template') {
					// the content is a template tag
					this._cachedContent = content.innerHTML;
					// open
					this.setProp('opened', true);
				} else if (content.tagName) {
					// the content is an HTMLElement
					this._cachedContent = this._grabTemplateContent(content)
					if ( ! this._cachedContent) {
						this._cachedContent = content;
					}
					// open
					this.setProp('opened', true);
				} else if (content.substr(0,1) === '#') {
					// the content of the dialog is an element in the page
					const $dom = document.querySelector(content);
					// check if the $dom element is a template or not
					this._cachedContent = this._grabTemplateContent($dom)
					if ( ! this._cachedContent) {
						if ($dom && $dom.tagName.toLowerCase() === 'template') {
							this._cachedContent = $dom.innerHTML
						} else {
							this._cachedContent = $dom
						}
					}
					// open
					this.setProp('opened', true);
				} else if (this.props.iframe) {
					// the content is an iframe with the content url as src
					const iframe = document.createElement('iframe')
					iframe.src = content
					iframe.setAttribute('frameborder', '0');
					iframe.setAttribute('scrolling', (this.props.iframeScrolling) ? 'yes' : 'no');
					iframe.setAttribute('width', '100%');
					iframe.setAttribute('height', '100%');
					iframe.setAttribute('allowfullscreen', 'true');
					iframe.setAttribute('allowpaymentrequest', 'true');
					this._cachedContent = iframe;
					// open
					this.setProp('opened', true);
				} else {
					// the content of the dialog is an ajax resource
					const ajx = new SAjax({
						url : content,
						method : 'GET'
					});
					ajx.send().then((response) => {
						// set the content
						this._cachedContent = response;
						// open
						this.setProp('opened', true);
					});
				}
			} else {
				// the content has already been loaded once
				this.setProp('opened', true);
			}

			// listen for escape key
			document.addEventListener('keyup', this._onKeyup.bind(this));

		});
	}

	/**
	 * Real open method that create the DOM content
	 */
	_open() {

		// add the body class
		document.body.classList.add(`${this._componentNameDash}--opened`);

		// open counter
		DialogWebcomponent.counter++;

		// create the DOM structure
		if ( ! this._template) {

			this._html = __strToHtml(`
				<div class="${this._componentNameDash} ${this._componentNameDash}--${this.props.type}">
					<div name="overlay" class="${this._componentNameDash}__overlay"></div>
					<div class="${this._componentNameDash}__aligner"></div>
					<div name="content" class="${this._componentNameDash}__content">
						<!-- content will be here... -->
					</div>
					<div name="close" class="${this._componentNameDash}__close"></div>
				</div>
			`);

			this.refs = {
				elm : this._html,
				overlay : this._html.querySelector('[name="overlay"]'),
				content : this._html.querySelector('[name="content"]'),
				close : this._html.querySelector('[name="close"]')
			}

			// listen for click on the overlay
			// to close the dialog
			this.refs.overlay.addEventListener('click', (e) => {
				this.close(false);
				e.stopPropagation();
			});
			this.refs.close.addEventListener('click', (e) => {
				this.close(false);
				e.stopPropagation();
			});
			// if not a modal, make the cursor pointer on the overlay
			if ( ! this.props.modal) {
				__style(this.refs.overlay, {
					cursor : 'pointer'
				});
			}

			// listen for close event
			this.refs.content.addEventListener(`${this._componentNameDash}:close`, (e) => {
				// close the dialog
				this.close();
			});
			this.refs.content.addEventListener(`${this._componentNameDash}:dismiss`, (e, data = null) => {
				// close the dialog
				this.dismiss(data);
			});
			this.refs.content.addEventListener(`${this._componentNameDash}:ok`, (e, data = null) => {
				// close the dialog
				this.ok(data);
			});
		}

		// set the content into the content of the template
		if (typeof(this._cachedContent) === 'string') {
			this.refs.content.innerHTML = this._cachedContent;
		} else if (this._cachedContent.nodeName !== undefined) {
			// try to save the position into dom to restore it on close
			if (this._cachedContent.parentNode && ! this._domRestorePlaceholder) {
				this._domRestorePlaceholder = document.createElement('div');
				this._domRestorePlaceholder.setAttribute('ck-dialog-restore-placeholder',true);
				__insertAfter(this._domRestorePlaceholder, this._cachedContent);
			}

			// append the content into the dialog
			this.refs.content.appendChild(this._cachedContent);
		}

		// try to find the ck-dialog-ok and the ck-dialog-dismiss elements
		const okElms = this.refs.content.querySelectorAll(`[${this._componentNameDash}-ok]`);
		if (okElms.length) {
			[].forEach.call(okElms, (elm) => {
				if ( ! elm._SDialogDismissClickListener) {
					const value = elm.getAttribute(`${this._componentNameDash}-ok`);
					elm._SDialogDismissClickListener = true;
					elm.addEventListener('click', (e) => {
						this.ok(value);
						e.stopPropagation();
					});
				}
			});
		}
		const dismissElms = this.refs.content.querySelectorAll(`[${this._componentNameDash}-dismiss]`);
		if (dismissElms.length) {
			[].forEach.call(dismissElms, (elm) => {
				if ( ! elm._SDialogOkClickListener) {
					const value = elm.getAttribute(`${this._componentNameDash}-dismiss`);
					elm._SDialogOkClickListener = true;
					elm.addEventListener('click', (e) => {
						this.dismiss(value);
						e.stopPropagation();
					});
				}
			});
		}

		// add the dialog to the body
		document.body.appendChild(this._html);

		this.props.onOpen && this.props.onOpen(this);

	}

	/**
	 * Get the template content if the template is the first and only child
	 * of the passed $dom element
	 * @param    (HTMLElement)    $dom    The HTMLElement in which to check for a template tag
	 * @return    {String}    THe template content or null of nothing's found
	 */
	_grabTemplateContent($dom) {
		if ($dom.children.length === 1 && $dom.children[0].tagName.toLowerCase() === 'template') {
			return $dom.children[0].innerHTML
		}
		return null
	}

	/**
	 * onKeyup
	 */
	_onKeyup(e) {
		e.preventDefault();
		// check if is escape key
		switch(e.keyCode) {
			case 27: // escape
				if (this.props.modal) {
					this.close(false);
				} else {
					this.dismiss(null);
				}
			break;
		}
	}

	/**
   * @name      close
   * @namespace     dialog-webcomponent
   * @type      Function
   *
	 * Close
   *
	 * @param 		{Boolean} 		force 			Bypass the modal property or not
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	close(force = true) {
		// check if is a modal
		if (this.props.modal
			&& ! this._allowModalClose
			&& ! force) return;
		// close
		this.setProp('opened', false);
	}

	/**
	 * Close
	 */
	_close() {
		// reset the hash
		if (this.props.id) {
			window.history.pushState(null, document.title, `${document.location.pathname || ''}${document.location.search || ''}#`);
		}

		// add the out class to the dialog
		this.addComponentClass(this.refs.elm, null, null, 'out');

		// let enough time to apply the new animations
		// in order to get right values from the getAnimationProperties
		this.mutate(() => {

			let longestAnimationTime = 0;
			// longest animation
			[
				this.refs.content,
				this.refs.overlay,
				this.refs.elm
			].forEach((elm) => {
				// get animation properties
				const animationProperties = __getAnimationProperties(elm);
				// check if totalDuration is longest that the previous one
				if (animationProperties.totalDuration > longestAnimationTime) {
					longestAnimationTime = animationProperties.totalDuration;
				}
			});

			// do not listen for keyup anymore
			document.removeEventListener('keyup', this._onKeyup);

			// wait end animation to remove the dialog
			setTimeout(() => {

				// restore the place of the content if is a placeholder
				if (this._domRestorePlaceholder
					&& this._cachedContent.nodeName) {
					__insertAfter(this._cachedContent, this._domRestorePlaceholder);
					this._domRestorePlaceholder.parentNode.removeChild(this._domRestorePlaceholder);
					this._domRestorePlaceholder = null;
				}

				// remove the out class
				this.removeComponentClass(this.refs.elm, null, null, 'out');

				// remove the container from the dom
				if (this._html) {
					this._html.parentNode.removeChild(this._html);
				}

				// update counter
				if ( DialogWebcomponent.counter > 0) {
					DialogWebcomponent.counter--;
				}
				// if no more dialog opened, remove the body class
				if (DialogWebcomponent.counter <= 0) {
					document.body.classList.remove(`${this._componentNameDash}--opened`);
				}

			}, longestAnimationTime);
		});

		// callback
		this.props.onClose && this.props.onClose();
	}

	/**
   * @name        ok
   * @namespace       dialog-webcomponent
   * @type      Function
   *
	 * Validate the modal
   *
	 * @param 		{Mixed} 		value 		The value to pass the the promise
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	ok(value = null) {
		if ( ! this.isOpened()) return;
		// resolve the promise if exist
		try {
			if (this._resolve && value) {
				this._resolve(value);
			}
		} catch(e) {}
		// events and callback
		this.dispatchComponentEvent('ok', value);
		this.props.onOk && this.props.onOk(value);
		// close the dialog
		this.close(true);
	}

	/**
   * @name        dismiss
   * @namespace       dialog-webcomponent
   * @type      Function
   *
	 * Dismiss the modal by rejecting the promise
   *
	 * @param 		{Mixed} 		value 		The value to pass the the promise
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	dismiss(value = null) {
		if ( ! this.isOpened()) return;
		try {
			// reject the promise if exist
			if (this._reject && value) {
				this._reject(value);
			}
		} catch(e) {}
		// events and callback
		this.dispatchComponentEvent('dismiss', value);
		this.props.onDismiss && this.props.onDismiss(value);
		// close the dialog
		this.close(true);
	}

	/**
   * @name      isOpened
   * @namespace     dialog-webcomponent
   * @type      Function
   *
	 * Check if is opened
   *
	 * @return 	{Boolean} 	If is opened or not
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	isOpened() {
		return this.props.opened;
	}
}
