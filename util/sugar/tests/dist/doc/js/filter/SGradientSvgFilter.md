


<!-- @namespace    sugar.js.filter -->

# ```js SGradientSvgFilter ```


This SVG filter class apply either a linear or a radial gradient of your choice
on an HTMLElement.
This is useful cause the gradient will only be applied on part of the elements that is really visible and will respect the opacity
of each parts



## Example (js)

```js
const filter = new SGradientSvgFilter();
filter.linear(['red','blue','green']);
filter.applyTo(myCoolHTMLElement);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js linear ```


Linear gradient

## Parameters

- **colors**  Array: An array of colors for your gradient

- **settings**  Object: The settings of your gradient that consist of an object like : ```{width: 512, height: 512, x0: 0, x1: 512, y0: 0, y1: 1}```




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js radial ```


Radial gradient

## Parameters

- **colors**  Array: An array of colors for your gradient

- **settings**  Object: The settings of your gradient that consist of an object like : ```{width: 512, height: 512, x0: 256, x1: 256, y0: 256, y1: 256, r0: 0, r1: 512}```



## Example (js)

```js
myFilter.radial(['#ff0000', '#00ffff], {
   width: 300,
   height: 300
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js applyTo ```


Apply the filter to element

## Parameters

- **elm**  HTMLElement: The element on which to apply the filter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js unapplyFrom ```


Remove the filter from element

## Parameters

- **elm**  HTMLElement: The element to unapply the filter from




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _onWindowResize ```


When the window is resizing

## Parameters

- **e**  Event: The resize event




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _setImageSize ```


Set image width




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables


