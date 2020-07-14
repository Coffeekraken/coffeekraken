


<!-- @namespace    sugar.node.transition -->
<!-- @name    objectProperties -->

# ```js objectProperties ```
### Since: 2.0.0

This function take a start object and a target object and proceed to the transition of all properties
depending on the passed settings object that is documented bellow.

## Parameters

- **startObj**  Object: The start object

- **targetObj**  Object: The target object

- **settings** ([object Object]) Object: An object of settings to configure your transition:
- duration (1s) {Number|String}: Specify the transition duration. Can be a number which will be treated as miliseconds, or a string like "1s", "10ms", "1m", etc...
- easing (easeInOutQuint) {String}: Specify the easing that you want to apply to your transition
- stepsCount (null) {Number}: Specify the number of steps that you want during your transition
- stepsInterval (null) {Number}: Specify the interval that you want between each steps in miliseconds
- round (true) {Boolean}: Specify if you want the returned transition object values to be rounded or not




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



