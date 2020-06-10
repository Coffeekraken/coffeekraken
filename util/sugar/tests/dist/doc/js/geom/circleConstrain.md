


<!-- @namespace    sugar.js.geom.2d -->

# ```js circleConstrain ```


Take as parameter a central point, a radius and a points to constrain inside the circle defined by the radius

## Parameters

- **center**  Vector2: The center point of the circle

- **radius**  Number: The radius to constrain the point in

- **point**  Vector2: The point to constrain



## Example (js)

```js
import circleConstrain from '@coffeekraken/sugar/js/geom/2d/circleConstrain'
circleConstrain({
	x: 10, y: 10
}, 10, {
	x: 10, y: 5
})
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



