# filter-map

<!-- @namespace: sugar.scss.core.function.filter-map -->

Type : **{ function }**


Take a filter as parameter and parse it to return the {Map} corresponding
The $filter parameter can be either a registered filter name or a filter formated like `filterName(filterValue)`



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$filter  |  **{ List<String> }**  |  The registered filter name or the filter string to transform into map  |  required  |

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** The corresponding filter map properties

### Example
```scss
	// register a filter
@include sugar.setup((
		filters : (
			myCoolFilter : box-shadow(#000 0 0 10px) blur(30px),
			// other filters...
		)
));

// registered filter
sugar.filter-map(myCoolFilter);
// {
// 	box-shadow : #000 0 0 10px,
// 	blur : 30px
// }

// custom filter
sugar.filter-map(blur(10px));
// {
// 	blur : 10px
// }
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)