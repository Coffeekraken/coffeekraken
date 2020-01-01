# ShapeWebcomponent

<!-- @namespace: drawer-webcomponent.ShapeWebcomponent -->

Type : **{ Class }**

Extends **SWebComponent**


Easily create custom shaped sections.
Features:
1. Fully customizable
2. Support shapes on every sides (top, right, bottom and left)
3. Support different shapes by screen sizes
4. Pre-registered shapes: waves1, waves2, waves3, waves4, waves5, waves6, rects2, rects3, rects4, rects5, rects6, triangles1, triangles2, triangles3, triangles4, triangles5, triangles6


### Example
```html
	<ck-shape bottom="waves3">
   <!-- your content here... -->
</ck-shape>
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Attributes

Here's the list of available attribute(s).

### top

Specify the shape to apply to the top side.
Can be either a registered shape name, or an SVG path code


Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### right

Specify the shape to apply to the right side.
Can be either a registered shape name, or an SVG path code


Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### bottom

Specify the shape to apply to the bottom side.
Can be either a registered shape name, or an SVG path code


Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### left

Specify the shape to apply to the left side.
Can be either a registered shape name, or an SVG path code


Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**



## Properties


### registeredShapes

Registered shapes

**Static**

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **{**


## Methods


### registerShape

Register a custom shape
You can go to [getwaves.io](https://getwaves.io/) to generate some cool shapes



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The wanted shape name  |  required  |
code  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The SVG shape path code  |  required  |
viewBox  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The viewBox SVG string like '0 0 1440 320'  |  required  |

**Static**