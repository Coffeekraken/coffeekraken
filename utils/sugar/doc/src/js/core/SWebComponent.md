# SWebComponent

<!-- @namespace: sugar.js.core.SWebComponent -->

Type : **{ Class }**

Extends **HTMLElement**


Base class that abstract a lot of dirty work in order to create nice and clean webcomponents.
Features:
- Listen for attributes changes
- Mount the component at a certain point in time (inViewport, visible, etc...)
- **Automatically cast the attributes** to their proper js variable types (Array, Object, String, etc...)
- **Physical props** : Specify some props that will ALWAYS be present as attribute on the component for styling purpose
- Define some **default CSS** that will be injected in the head automatically
- Specify some **required props**
- **Full lifecycle management**:
	- componentCreated
	- componentWillMount
	- componentMount
	- componentWillReceiveProp
	- componentWillReceiveProps
	- render
	- componentUnmount
- **Mount dependencies** : This will allows you to set some promises that have to be resolved before mounting the component


### Example
```js
	import SWebComponent from '@coffeekraken/sugar/js/core/SWebComponent'
class MyCoolComponent extends SWebComponent {

/**
	 * Default props
	 * @definition 		SWebComponent.defaultProps
	 * @protected
	 */
	static get defaultProps() {
		return {
		};
	}

	/**
	 * Css
	 * @protected
	 */
	static defaultCss(componentName, componentNameDash) {
		return `
			${componentNameDash} {
				display : block;
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
	}

	/**
	 * Component unmount
	 * @definition 		SWebComponent.componentUnmount
	 * @protected
	 */
	componentUnmount() {
		super.componentUnmount();
	}

	/**
	 * Component will receive prop
	 * @definition 		SWebComponent.componentWillReceiveProp
	 * @protected
	 */
	componentWillReceiveProp(name, newVal, oldVal) {
		switch(name) {
		}
	}
}

// define your component
MyCoolComponent.define('my-cool-component', MyCoolComponent);
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)