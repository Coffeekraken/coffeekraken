


<!-- @namespace    sugar.js.event -->

# ```js SEvent ```


Proxy class to create custom events that can be dispatched
through the standard dispatch method on any HTMLElement



## Example (js)

```js
let myEvent = new SEvent('myCoolEvent', {
		cancelable : true,
		bubbles : false,
		detail : {
			// some datas to send with the event
		}
});
// dispatch the event from an HTMLElement
myHTMLElement.dispatch(myEvent);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Construct the event

## Parameters

- **name**  String: The event name

- **settings**  Object: The event settings




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js settings.cancelable ```


Set if the event is cancelable or not



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js settings.bubbles ```


Set if the event will bubble or not



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js settings.detail ```


Pass an object that will be sent with the event



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

