# SelectWebcomponent

<!-- @namespace: select-webcomponent.SelectWebcomponent -->

Type : **{ Class }**

Extends **SWebComponent**


Provide a nice and fully customizable select webcomponent that use a real select as source of truth
### Features
- Fully based on standard select
- Optional internal search
- Custom option element through the "ck-select-option-elm" attribute
- Fully customizable
- Support multiple selected options through "tags" display
- Any more...


### Example
```html
	<select is="ck-select" name="my-cool-select">
	<option value="value1">Hello</option>
	<option value="value2">World</option>
	<optgroup label="My Cool Group">
 	<option value="value3">My Cool Option</option>
	</optgroup>
</select>
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Attributes

Here's the list of available attribute(s).

### onOpen

Callback function when the select dropdown opens

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### onClose

Callback function when the select dropdown close

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### searchField

Display or not the search field in the dropdown

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### searchPlaceholder

Specify the placeholder to display in the search field if the search is activated

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **Search...**


### internalSearch

Specify if the internal search is activated or not. If so, when the user make a search, the select will
automatically filter itself depending on the entered keywords and the options values.

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### minCharactersForSearch

Specify how many characters has to be entered in the search field before triggering an actial search or search callback

Type : **{ Integer }**

Default : **1**


### onSearch

Function to call when the user is making a search in the search field.
- parameter 1 : The searched text is passed to this function, then you can handle the search as you want.
- parameter 2 : The component that has triggered the search

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### resetAllowed

Specify if the user can reset the select by clicking on the reset button or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### screenMarginTop

Specify the margin in pixels to keep between the select dropdown and the window top corner

Type : **{ Integer }**

Default : **50**


### screenMarginBottom

Specify the margin in pixels to keep between the select dropdown and the window bottom corner

Type : **{ Integer }**

Default : **50**


### dropupLimit

Specify the limit height under which to set the select as a dropup

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **200**