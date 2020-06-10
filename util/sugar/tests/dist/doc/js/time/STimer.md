


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




# ```js constructor ```


Constructor

## Parameters

- **duration** (1000) Number: The duration of the timer. Can be a number of milliseconds of a string time like '1s', '2m', etc...

- **settings**  Object: The settings for the timer



## Example (js)

```js
import STimer from '@coffeekraken/sugar/js/time/STimer';
const timer = new STimer('2m');
timer.onTick(() => {
   // do something...
});
timer.start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _tick ```


Internal tick function




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js reset ```


Reset the timer

## Parameters

- **start**  Boolean: If the timer has to start after reseting or not




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js start ```


Start the timer

## Parameters

- **duration**  Number: An optional duration for the timer session




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js pause ```


Pause the timer




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js stop ```


Stop the timer




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js destroy ```


Destroy the timer




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js isStarted ```


Check if the timer is started




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _duration ```


Store the timer duration wanted



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _remaining ```


Store the remaining time



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _tickCount ```


How many ticks wanted during the timeout



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _tickInterval ```


Computed value depending on the settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _tickSetTimeout ```


Store the setInterval instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _startTime ```


Store the time when the timer is started



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _tickTime ```


Store the last tick time



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _pauseTime ```


Store the pause time



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js remaing ```


Get the remaining time in ms



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get set ```js duration ```


Set or get the duration. Can be a number in milliseconds, or a time string like '1m', '2s', etc...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get set ```js tickCount ```


Set of get the tickCount



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js percentage ```


Get the current timer advancement percentage



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

