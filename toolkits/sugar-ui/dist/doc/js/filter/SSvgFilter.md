


<!-- @namespace    sugar.js.filter -->
<!-- @name    SGooeySvgFilter -->

# ```js SGooeySvgFilter ```


This class allows you to create with ease some complexe SVG filters and to apply it on any HTMLElement that you want
by extending this class like so



## Example (js)

```js
class MyBlurFilter extends SSvgFilter {

		constructor(amount = 8) {
			super(`
				<feGaussianBlur in="SourceGraphic" stdDeviation="${amount}" result="blur" />
			`);
		}
}

// using your filter
const myFilter = new MyBlurFilter(10);
myFilter.applyTo(myCoolHTMLElement);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Constructor

## Parameters

- **filter**  String: The SVG filter string representation




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    applyTo -->

# ```js applyTo ```


Apply the filter to an element

## Parameters

- **elm**  HTMLElement: The element on which to apply the filter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    unapplyFrom -->

# ```js unapplyFrom ```


Unapply from

## Parameters

- **elm**  HTMLElement: The element from which to remove the filter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _insertFilter -->

# ```js _insertFilter ```


Insert the filter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    destroy -->

# ```js destroy ```


Destroy the filter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _injectFiltersContainer -->

# Static ```js _injectFiltersContainer ```


Inject the svg that will contains all the filters created through this class




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables


