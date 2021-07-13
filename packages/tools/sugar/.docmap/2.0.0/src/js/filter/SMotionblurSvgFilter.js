/**
*
* @name 		SMotionblurSvgFilter
* @namespace            js.filter
* @type      Class
* @platform          js
* @platform          ts
* @status      beta
*
* This class represent a motion blur svg filter that will blur your
* element depending on his movements, direction and speed
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 		js
* const filter = new SMotionblurSvgFilter();
* filter.applyTo(myCoolHTMLElement);
* // now when your element will move, it will be blured accordingly
*
* @since         1.0.0
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          constructor
* @type          Function
*
* Constructor
*
* @param 		{Number} 		[amount=0.5] 			The motion blur amount
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name        amount
* @type        Number
* @default     0.5
*
* Store the amount of motion blur to apply
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name        _isMoving
* @type        Boolean
*
* Store the status of the animation
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name        _startMoveTimeout
* @type        Number
*
* Store the starting moment when the element move
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name      applyTo
* @type      Function
* @override
*
* Apply the filter to element
*
* @param 		{HTMLElement} 		elm 		The element on which to apply the filter
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name            unapplyFrom
* @type            Function
* @override
*
* Remove the filter from element
*
* @param 	{HTMLElement} 	elm 	The element to unapply the filter from
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          _onMotionStart
* @type          Function
* @private
*
* When the animation, transition or draging start
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          _onMotionStop
* @type          Function
* @private
*
* Transition / animation end
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          _handleFilter
* @type          Function
* @private
*
* Handle filter
*
* @param 		{Boolean} 		recusrive 			If the function need to be called again at the end of it's execution
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name            _setMotionBlur
* @type            Function
* @private
*
* Set motion blur
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name        destroy
* @type        Function
* @override
*
* Destroy the filter
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/