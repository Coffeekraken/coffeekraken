


<!-- @namespace    sugar.js.core -->
<!-- @name    SWebComponent -->

# ```js SWebComponent ```


Base class that abstract a lot of dirty work in order to create nice and clean webcomponents.
Features:
- Listen for attributes changes
- Mount the component at a certain point in time (inViewport, visible, etc...)
- *Automatically cast the attributes** to their proper js variable types (Array, Object, String, etc...)
- *Physical props** : Specify some props that will ALWAYS be present as attribute on the component for styling purpose
- Define some *default CSS** that will be injected in the head automatically
- Specify some *required props**
- *Full lifecycle management**:
- componentCreated
- componentWillMount
- componentMount
- componentWillReceiveProp
- componentWillReceiveProps
- render
- componentUnmount
- *Mount dependencies** : This will allows you to set some promises that have to be resolved before mounting the component



## Example (js)

```js
import SWebComponent from '@coffeekraken/sugar/js/core/SWebComponent'
class MyCoolComponent extends SWebComponent {

	\
	  Default props
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



## Variables


