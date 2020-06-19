# NotificationWebcomponent

<!-- @namespace: notification-webcomponent.NotificationWebcomponent -->

Type : **{ Class }**

Extends **SWebComponent**


Display nice and fully customizable toast like notification.
Features :
- Align on the side you want
- Quick title, body and icon options
- Actions management
- Dismissable option allow to dismiss notification by click on it


### Example
```html
	<ck-notification title="Hello World" body="Pellentesque fringilla velit at tempor eleifend. Vestibulum finibus lacus et."></ck-notification>
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Attributes

Here's the list of available attribute(s).

### title

Specify the notification title

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### body

Specify the body of the notification

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### value

Specify the value that will be passed with the dismiss event when the notification is dismissed by clicking on it
or when clicking an action that has no value assigned.

Type : **{ Mixed }**

Default : **null**


### actionsProps

Specify the default action object

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **{}**


### actions

Specify some actions
Action object:
```
{
	label : 'Ok',
	dismiss : true,
	href : null,
	target : '_blank'
}
```

Type : **{ Array<Object> }**

Default : **[]**


### dismissable

Set if is dismissable by clicking on it or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### type

Specify the notification type for styling purpose

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### timeout

Specify the life time of the notification

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **null**


### side

Specify the side where the notification has to appear

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Values : **tl,t,tr,bl,b,br**

Default : **tr**


### onDismiss

Callback on dismiss

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**



## Properties


### dismiss

<!-- @namespace: notification-webcomponent.dismiss -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Dismiss the notification



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
data  |  **{ Mixed }**  |  The data passed to the dismiss  |  optional  |  null

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)