


<!-- @namespace    sugar.js.filter -->

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




# ```js constructor ```


Constructor

## Parameters

- **filter**  String: The SVG filter string representation




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js applyTo ```


Apply the filter to an element

## Parameters

- **elm**  HTMLElement: The element on which to apply the filter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js unapplyFrom ```


Unapply from

## Parameters

- **elm**  HTMLElement: The element from which to remove the filter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _insertFilter ```


Insert the filter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js destroy ```


Destroy the filter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# Static ```js _injectFiltersContainer ```


Inject the svg that will contains all the filters created through this class




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables


