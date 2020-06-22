# DialogWebcomponent

Extends **SWebComponent**

Provide a simple to use dialog component that support:
- Modal
- HTMLElement as content
- Url to load by ajax as content
- HTML string as content


### Example
```html
	<!-- simple modal -->
<ck-dialog id="my-cool-dialog">
	<!-- dialog content here... -->
</ck-dialog>
<a href="#my-cool-dialog" title="open my cool dialog">Open dialog</a>

<!-- wrap an "<a>" tag with a dialog -->
<ck-dialog>
	<a href="/content/my-cool-dialog.html" title="open my dialog">
 	Open my dialog
 </a>
</ck-dialog>
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Attributes

Here's the list of available attribute(s).

### for

Specify the element that will trigger the dialog

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### content

Specify the content to use for the dialog
Can be an html id selector like "#myCoolContent"
an url to load by through ajax|iframe like "myCoolContent.html"
a mix like "myCoolContent.html#myCoolContent"
or nothing. In this case, the element itself will be the dialog content

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### iframe

If the content is a url to load, specify if it has to be loaded in an iframe instead of the
ajax default behavior

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### iframeScrolling

If the iframe property is true, specify if the iframe can be scrolled or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### id

The dialog id that can be used to open the dialog through the url hash

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### type

Type of the dialog. This will basically be set as a class on the dialog container like "ck-dialog--{type}"

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **default**


### modal

Specify if the dialog is a modal or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### onOpen

Callback when the modal opens

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### onClose

Callback when the modal closes

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### onOk

Callback when the modal is has been validated with an "ok" status

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### onDismiss

Callback when the modal has been dismissed

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### opened

Specify if the modal is opened or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### openOn

Set when to open the dialog
This can be 'click'|'hover'|'init'

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **click**


### openTimeout

Set an open timeout to use in conjunction with the openOn="init"

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0**



## Properties


### close

<!-- @namespace: dialog-webcomponent.close -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Close



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
force  |  **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**  |  Bypass the modal property or not  |  required  |

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### ok

<!-- @namespace: dialog-webcomponent.ok -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Validate the modal



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
value  |  **{ Mixed }**  |  The value to pass the the promise  |  required  |

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### dismiss

<!-- @namespace: dialog-webcomponent.dismiss -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Dismiss the modal by rejecting the promise



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
value  |  **{ Mixed }**  |  The value to pass the the promise  |  required  |

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


## Methods


### open

Open the dialog


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
content  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) , [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The content for the modal. Can be an HTMLElement, an url to load by ajax or an HTML string  |  optional  |  null