


<!-- @namespace    sugar.js.time -->

# ```js STimer ```
### Since: 2.0.0

Class that let you create and handle timer with ease.
With this class you can set some callback function that will be
called each x ms or tell that you want your callbacks to be called
a certain number of time during the timer time.
This class extends the SPromise one, meaning that you can subscribe to differents "events" triggered by the timer instance. Here's the list:
- complete: Triggered when the timer is completed
- tick: Triggered at each ticks depending on your settings
- duration: Triggered when the duration has been changed
- tickCount: Triggered when the tickCount has been changed
- reset: Triggered when the timer has been reseted
- start: Triggered when the timer starts
- pause: Triggered when the timer has been paused
- stop: Triggered when the timer has been stoped
- destroy: Triggered when the timer has been destroyed

## Parameters

- **duration**  Number,String: The duration of the timer. Can be a Number that will be treated as miliseconds, or a string like "1s", "2m", etc...

- **settings** ([object Object]) Object: A settings object to configure your timer more deeply:
- tickInterval (1000) {Number}: Specify the interval wanted between each ticks in miliseconds
- tickCount (null) {Number}: Specify how many ticks you want during the timer process
- loop (false) {Boolean}: Specify if you want the timer to loop or not.



## Example (js)

```js
const STimer = require('@coffeekraken/sugar/js/time/STimer');
const myTimer = new STimer(2000, {
		tickCount : 5
})
myTimer.on('tick', myTimer => {
		// do something here...
})
myTimer.start()
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



## Variables


