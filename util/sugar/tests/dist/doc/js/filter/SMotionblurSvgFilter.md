


<!-- @namespace    sugar.js.filter -->

# ```js SMotionblurSvgFilter ```


This class represent a motion blur svg filter that will blur your
element depending on his movements, direction and speed



## Example (js)

```js
const filter = new SMotionblurSvgFilter();
filter.applyTo(myCoolHTMLElement);
// now when your element will move, it will be blured accordingly
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor

## Parameters

- **amount** (0.5) Number: The motion blur amount




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





# ```js _onMotionStart ```


When the animation, transition or draging start




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _onMotionStop ```


Transition / animation end




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _handleFilter ```


Handle filter

## Parameters

- **recusrive**  Boolean: If the function need to be called again at the end of it's execution




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _setMotionBlur ```


Set motion blur




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js destroy ```


Destroy the filter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js amount ```


Store the amount of motion blur to apply



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _isMoving ```


Store the status of the animation



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _startMoveTimeout ```


Store the starting moment when the element move



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

