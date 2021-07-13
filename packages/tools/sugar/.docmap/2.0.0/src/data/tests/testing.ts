/**
*
* @name 		DrawerWebcomponent
* @namespace       drawer-webcomponent
* @type      Class
* @extends 	SWebComponent
*
* Simple webcomponent to create fully customizable drawers.
* Features:
* 1. Fully customizable
* 2. Support all sides (top, right, bottom and left)
* 3. Support 3 animation types (push, slide and reveal)
*
* @example 	scss
* \@use 'node_modules/@coffeekraken/drawer-webcomponent/index' as drawer-webcomponent;
* \@include drawer-webcomponent.classes(
* 	$name : menu,
* 	$side : right
* );
* \@include drawer-webcomponent.element(drawer) {
* 	background-color: black;
* 	padding: 20px;
* }
* \@include drawer-webcomponent.element(overlay) {
* 	background-color: rgba(0,0,0,.5);
* }
*
* @author         Olivier Bossel <olivier.bossel@gmail.com>

*/
/**
*
* Default props
* @definition 		SWebComponent.defaultProps
* @protected
* @static

*/
/**
*
* Specify the name of the drawer to be able to access it later through the API
* @prop
* @type 		{String}

*/
/**
*
* Close the drawer when click on a link inside it
* @prop
* @type 		{Boolean}

*/
/**
*
* Specify is the `escape` key is activated and close the drawer if is opened
* @prop
* @type    {Boolean}

*/
/**
*
* Specify if need to check the hash to automatically open the drawer if match with the name
* @prop
* @type 		{Boolean}

*/
/**
*
* Prevent the content from scrolling when the drawer is opened.
* This will override your transitions on the content so be aware of that...
* @prop
* @type 	{Boolean}

*/
/**
*
* Return an array of required props to init the component
* @definition      SWebComponent.requiredProps
* @protected
* @static
* @return 		{Array}

*/
/**
*
* Physical props
* @definition 		SWebComponent.physicalProps
* @protected
* @static

*/
/**
*
* Css
* @protected
* @static

*/
/**
*
* Mount component
* @definition 		SWebComponent.componentMount
* @protected

*/
/**
*
* @name        open
* @namespace     drawer-webcomponent
* @type      Function
*
* Open the drawer
*
* @author         Olivier Bossel <olivier.bossel@gmail.com>

*/
/**
*
* @name      close
* @namespace     drawer-webcomponent
* @type      Function
*
* Close the drawer
*
* @author         Olivier Bossel <olivier.bossel@gmail.com>

*/
/**
*
* @name        isOpen
* @namespace     drawer-webcomponent
* @type        Function
*
* Check if is opened
*
* @return 		{Boolean} 		true if opened, false if not
*
* @author         Olivier Bossel <olivier.bossel@gmail.com>

*/