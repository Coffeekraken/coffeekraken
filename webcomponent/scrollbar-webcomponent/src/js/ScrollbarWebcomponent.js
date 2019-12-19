import SWebComponent from '@coffeekraken/sugar/js/core/SWebComponent'
import Simplebar from 'simplebar'
import __getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'

/**
 * @name 		ScrollbarWebcomponent
 * @extends 	SWebComponent
 * @namespace       scrollbar-webcomponent
 * @type        Class
 *
 * Provide a simple webcomponent to create nice custom scrollbars. It will use the native scrollbar behavior and just hide the native scrollbars. Perfect for integration on mobile devices, etc...
 *
 * @example 	html
 * <ck-scrollbar style="height:300px;">
 * 	<p>Duis volutpat vehicula aliquam. Praesent aliquet ac orci et vehicula. Fusce pharetra eleifend orci, vulputate consectetur risus vehicula vitae. Pellentesque sed mauris id elit semper interdum. Pellentesque dictum sollicitudin risus tincidunt consectetur. Fusce imperdiet nec purus eu eleifend. Ut feugiat ultricies finibus. In eu enim eget libero aliquet venenatis. Praesent gravida ligula id mauris cursus mollis. Aenean lacinia ullamcorper tincidunt. Sed posuere ultrices tortor, sit amet convallis leo rutrum non.</p>
 * 	<p>Duis volutpat vehicula aliquam. Praesent aliquet ac orci et vehicula. Fusce pharetra eleifend orci, vulputate consectetur risus vehicula vitae. Pellentesque sed mauris id elit semper interdum. Pellentesque dictum sollicitudin risus tincidunt consectetur. Fusce imperdiet nec purus eu eleifend. Ut feugiat ultricies finibus. In eu enim eget libero aliquet venenatis. Praesent gravida ligula id mauris cursus mollis. Aenean lacinia ullamcorper tincidunt. Sed posuere ultrices tortor, sit amet convallis leo rutrum non.</p>
 * 	<p>Duis volutpat vehicula aliquam. Praesent aliquet ac orci et vehicula. Fusce pharetra eleifend orci, vulputate consectetur risus vehicula vitae. Pellentesque sed mauris id elit semper interdum. Pellentesque dictum sollicitudin risus tincidunt consectetur. Fusce imperdiet nec purus eu eleifend. Ut feugiat ultricies finibus. In eu enim eget libero aliquet venenatis. Praesent gravida ligula id mauris cursus mollis. Aenean lacinia ullamcorper tincidunt. Sed posuere ultrices tortor, sit amet convallis leo rutrum non.</p>
 * 	<p>Duis volutpat vehicula aliquam. Praesent aliquet ac orci et vehicula. Fusce pharetra eleifend orci, vulputate consectetur risus vehicula vitae. Pellentesque sed mauris id elit semper interdum. Pellentesque dictum sollicitudin risus tincidunt consectetur. Fusce imperdiet nec purus eu eleifend. Ut feugiat ultricies finibus. In eu enim eget libero aliquet venenatis. Praesent gravida ligula id mauris cursus mollis. Aenean lacinia ullamcorper tincidunt. Sed posuere ultrices tortor, sit amet convallis leo rutrum non.</p>
 * 	<p>Duis volutpat vehicula aliquam. Praesent aliquet ac orci et vehicula. Fusce pharetra eleifend orci, vulputate consectetur risus vehicula vitae. Pellentesque sed mauris id elit semper interdum. Pellentesque dictum sollicitudin risus tincidunt consectetur. Fusce imperdiet nec purus eu eleifend. Ut feugiat ultricies finibus. In eu enim eget libero aliquet venenatis. Praesent gravida ligula id mauris cursus mollis. Aenean lacinia ullamcorper tincidunt. Sed posuere ultrices tortor, sit amet convallis leo rutrum non.</p>
 * 	<p>Duis volutpat vehicula aliquam. Praesent aliquet ac orci et vehicula. Fusce pharetra eleifend orci, vulputate consectetur risus vehicula vitae. Pellentesque sed mauris id elit semper interdum. Pellentesque dictum sollicitudin risus tincidunt consectetur. Fusce imperdiet nec purus eu eleifend. Ut feugiat ultricies finibus. In eu enim eget libero aliquet venenatis. Praesent gravida ligula id mauris cursus mollis. Aenean lacinia ullamcorper tincidunt. Sed posuere ultrices tortor, sit amet convallis leo rutrum non.</p>
 * </ck-scrollbar>
 *
 * @see 		https://github.com/Grsmto/simplebar
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */

export default class ScrollbarWebcomponent extends SWebComponent {

	/**
	 * Css
	 * @protected
	 */
	static defaultCss(componentName, componentNameDash) {
		return `
			${componentNameDash}[data-simplebar] {
				overflow-x: hidden;
				display: block;
				position: relative;
				flex-direction: column;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-content: flex-start;
				align-items: flex-start;
				width: inherit;
				height: inherit;
				max-width: inherit;
				max-height: inherit;
			}

			${componentNameDash} .simplebar-wrapper {
				overflow: hidden;
				width: inherit;
				height: inherit;
				max-width: inherit;
				max-height: inherit;
			}

			${componentNameDash} .simplebar-mask {
				direction: inherit;
				position: absolute;
				overflow: hidden;
				padding: 0;
				margin: 0;
				left: 0;
				top: 0;
				bottom: 0;
				right: 0;
				width: auto !important;
				height: auto !important;
				z-index: 0;
			}

			${componentNameDash} .simplebar-offset {
				direction: inherit !important;
				box-sizing: inherit !important;
				resize: none !important;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				padding: 0;
				margin: 0;
				-webkit-overflow-scrolling: touch;
			}

			${componentNameDash} .simplebar-content {
				direction: inherit;
				box-sizing: border-box !important;
				position: relative;
				display: block;
				height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */
				width: auto;
				visibility: visible;
				overflow: scroll; /* Scroll on this element otherwise element can't have a padding applied properly */
				max-width: 100%; /* Not required for horizontal scroll to trigger */
				max-height: 100%; /* Needed for vertical scroll to trigger */
			}

			${componentNameDash} .simplebar-placeholder {
				max-height: 100%;
				max-width: 100%;
				width: 100%;
				pointer-events: none;
			}

			${componentNameDash} .simplebar-height-auto-observer-wrapper {
				box-sizing: inherit !important;
				height: 100%;
				width: inherit;
				max-width: 1px;
				position: relative;
				float: left;
				max-height: 1px;
				overflow: hidden;
				z-index: -1;
				padding: 0;
				margin: 0;
				pointer-events: none;
				flex-grow: inherit;
				flex-shrink: 0;
				flex-basis: 0;
			}

			${componentNameDash} .simplebar-height-auto-observer {
				box-sizing: inherit;
				display: block;
				opacity: 0;
				position: absolute;
				top: 0;
				left: 0;
				height: 1000%;
				width: 1000%;
				min-height: 1px;
				min-width: 1px;
				overflow: hidden;
				pointer-events: none;
				z-index: -1;
			}

			${componentNameDash} .simplebar-track {
				z-index: 1;
				position: absolute;
				right: 0;
				bottom: 0;
				pointer-events: none;
			}

			${componentNameDash} .simplebar-scrollbar {
				position: absolute;
			}

			${componentNameDash} .simplebar-track.simplebar-vertical {
				top: 0;
			}

			${componentNameDash} .simplebar-track.simplebar-horizontal {
				display: none;
			}
		`;
	}

	/**
	 * Mount component
	 * @definition 		SWebComponent.componentMount
	 * @protected
	 */
	componentMount() {
		super.componentMount();

		// init the simplebar
		this._simplebar = new Simplebar(this, {
			scrollbarMinSize : 0
		});
	}
}
