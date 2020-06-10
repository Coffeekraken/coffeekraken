


<!-- @namespace    sugar.js.promise -->

# ```js SPromise ```


This class works the same as the default Promise one. The difference is that you have more control on this one like
the possibility to resolve it multiple times. Here's a list of the "differences" and the "features" that this class provide:

- Pass the normal "resolve" and "reject" function to the passed executor
- Pass a new function to the passed executor called "trigger" that let you launch your registered callbacks like "then", "catch", etc... but without resolving the master promise. Here's some examples:
- new SPromise((resolve, reject, trigger, cancel) => { trigger('then', 'myCoolValue'); }).then(value => { ... });
- new SPromise((resolve, reject, trigger, cancel) => { trigger('then,catch', 'myCoolValue') }).then(value => { ... });
- Pass a new function to the passed executor called "cancel" that let you stop/cancel the promise execution without triggering your registered callbacks unless the "cancel" once...
- Expose the normal "then" and "catch" methods to register your callbacks
- Expose some new callbacks registration functions described here:
- Expose a method called "resolved" that let you register callbacks called only when the "resolve" function has been called
- Expose a method called "rejected" that let you register callbacks called only when the "reject" function has been called
- Expose a method called "finally" that let you register callbacks called when the "resolve" or "reject" function has been called
- Expose a method called "canceled" that let you register callbacks called only when the "cancel" function has been called
- Every callbacks registration methods accept as first argument the number of time that your callback will be called at max. Here's some examples:
- new SPromise((...)).then(value => { // do something... }).catch(error => { // do something... }).start();
- new SPromise((...)).then(1, value => { // do something... }).catch(3, error => { // do something... }).start();
- Expose a method called "on" that can be used to register callbacks the same as the "then", "catch", etc... methods but you can register a same callback function to multiple callbacks type at once:
- new SPromise((...)).on('then', value => { ... }).on('then,catch', value => { ... }).start();
- Specify the max number of time to call your callback function like so: new SPromise((...)).on('then:2', value => { ... }).on('then:1,catch', value => { ... }).start();
- A new method called "start" is exposed. This method is useful when you absolutely need that your executor function is launched right after the callbacks registrations.
- If you don't call the "start" method, the executor function passed to the SPromise constructor will be called on the next javascript execution loop
- Support the Promises chaining through the callbacks like to:
```js
const result = await new SPromise((resolve, reject, trigger, cancel) => {
resolve('hello');
}).then(value => {
return new Promise((resolve) => {
setTimeout(() => {
resolve(value + 'World');
}, 1000);
});
}).then(value => {
return value + 'Promise';
}).start();
console.log(result); // => helloWorldPromise
```



## Example (js)

```js
import SPromise from '@coffeekraken/sugar/js/promise/SPromise';
function myCoolFunction() {
   return new SPromise((resolve, reject, trigger, cancel) => {
       // do something...
       setInterval(() => {
           // resolve the promise
           resolve('something'); 
       }, 1000);
   });
}

// calling the function and get back the SPromise instance
myCoolFunction().then(value => {
   // do something here...
}).then(1, value => {
   // do something just once...
}).catch(error => {
   // do something with the returned reason of failure...
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js _executorFn ```


Store the executor function passed to the constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# Static ```js pipe ```


This static function allows you to redirect some SPromise "events" to another SPromise instance
with the ability to process the linked value before triggering it on the destination SPromise.

## Parameters

- **sourceSPromise**  SPromise: The source SPromise instance on which to listen for "events"

- **destSPromise**  SPromise: The destination SPromise instance on which to trigger the listened "events"

- **settings** ([object Object]) Object: An object of settings to configure your pipe process
- stacks () {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
- processor (null) {Function}: Specify a function to apply on the triggered value before triggering it on the dest SPromise. Take as arguments the value itself and the stack name. Need to return a new value




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js constructor ```


Constructor

## Parameters

- **executor**  Function: The executor function that will receive the resolve and reject ones...

- **settings** ([object Object]) Object: An object of settings for this particular SPromise instance. Here's the available settings:
- safeReject (true) {Boolean}: Specify if you prefere that your promise is "resolved" with an "Error" instance when rejected, or if you prefere the normal throw that does not resolve your promise and block the "await" statusment...
- cancelDefaultReturn (null) {Mixed}: Specify what you want to return by default if you cancel your promise without any value



## Example (js)

```js
const promise = new SPromise((resolve, reject, trigger, cancel) => {
   // do something...
}).then(value => {
   // do something...
}).finally(value => {
   // do something...
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js is ```


Check is the promise is on one of the passed status

## Parameters

- **status**  String: A comma separated list of status to check




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js isPending ```


Return back true or false depending on the promise status




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js isResolved ```


Return back true or false depending on the promise status




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js isRejected ```


Return back true or false depending on the promise status




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js isCanceled ```


Return back true or false depending on the promise status




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js isDestroyed ```


Return back true or false depending on the promise status




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js start ```


This method is useful when you want the executor function passed to the constructor to be called directly and not
as usual during the next javascript execution loop.



## Example (js)

```js
new SPromise((resolve, reject, trigger, cancel) => {
   // do something
}).then(value => {
   // do something
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js resolve ```


This is the "resolve" method exposed on the promise itself for convinience

## Parameters

- **arg**  Mixed: The value that you want to return back from the promise

- **stacksOrder** (then,resolve,finally) Array,String: This specify in which order have to be called the stacks




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _resolve ```


This is the method that will be called by the promise executor passed resolve function

## Parameters

- **arg**  Mixed: The argument that the promise user is sendind through the resolve function

- **stacksOrder** (then,resolve,finally) Array,String: This specify in which order have to be called the stacks




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js reject ```


This is the "reject" method exposed on the promise itself for convinience

## Parameters

- **arg**  Mixed: The value that you want to return back from the promise

- **stacksOrder** (then,reject,finally) Array,String: This specify in which order have to be called the stacks




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _reject ```


This is the method that will be called by the promise executor passed reject function

## Parameters

- **arg**  Mixed: The argument that the promise user is sendind through the reject function




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js cancel ```


This is the "cancel" method exposed on the promise itself for convinience

## Parameters

- **arg**  Mixed: The value that you want to return back from the promise

- **stacksOrder** (cancel) Array,String: This specify in which order have to be called the stacks




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _cancel ```


Cancel the promise execution, destroy the Promise and resolve it with the passed value without calling any callbacks

## Parameters

- **arg**  Mixed: The argument you want to pass to the cancel callbacks




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js trigger ```


This is the method that allows you to trigger the callbacks like "then", "catch", "finally", etc... without actually resolving the Promise itself

## Parameters

- **what**  String,Array: The callbacks that you want to trigger. Can be "then", "catch", "finally" or "cancel". You can trigger multiple stacks by passing an Array like ['then','finally'], or a string like "then,finally"

- **arg**  Mixed: The argument you want to pass to the callback



## Example (js)

```js
new SPromise((resolve, reject, trigger, cancel) => {
   trigger('then', 'hello world');
   setTimeout(() => {
     resolve('something');
   }, 2000);
}).then(value => {
   // do something with one time "hello world", and one time "something"...
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _registerNewStacks ```


This methods allows you to register new stacks.
A new stack can be called then using the "on('stackName', ...)" method,
or directly on the SPromise instance like so "myPromise.stackName(...)".

## Parameters

- **stacks**  String,Array: The stack(s) name(s) you want to register. Can be an Array or a comma separated string




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _registerCallbackInStack ```


This function take as argument a stack array and register into it the passed callback function




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _triggerStack ```


This function take an Array Stack as parameter and execute it to return the result

## Parameters

- **stack**  Array,String: The stack to execute. Can be the stack array directly, or just the stack name like "then", "catch", etc.stack.stack.

- **initialValue**  Mixed: The initial value to pass to the first stack callback

- **as**  String: This parameter is useful when you want to trigger a stack as another one like when you trigger the stack "*"




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _triggerStacks ```


This function take as parameters a list of stacks to trigger like an Array ['then','finnaly'], or a string like so "then,finally", and as second parameter,
the initial value to pass to the first callback of the joined stacks...

## Parameters

- **stacks**  Array,String: The stacks to trigger

- **initialValue**  Mixed: The initial value to pass to the first stack callback




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js on ```


This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "on", etc using
the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".

## Parameters

- **stacks**  String,Array: The stacks in which you want register your callback. Either an Array like ['then','finally'], or a String like "then,finally"

- **callback**  Function: The callback function to register



## Example (js)

```js
new SPromise((resolve, reject, trigger, cancel) => {
   // do something...
   resolve('hello world');
}).on('then', value => {
   // do something with the value that is "hello world"
}).on('catch:1', error => {
   // do something that will be called only once
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js then ```


This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".

## Parameters

- **callNumber** (-1) Number: (Optional) How many times you want this callback to be called at max. -1 means unlimited

- **callback**  Function: The callback function to register



## Example (js)

```js
new SPromise((resolve, reject, trigger, cancel) => {
   // do something...
   resolve('hello world');
}).then(value => {
   // do something with the value that is "hello world"
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve('hola'), 1000);
   });
}).then(2, value => {
   // do something that will be executed only twice
   // do something with the value passed "hola"
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js catch ```


This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".

## Parameters

- **callNumber** (-1) Number: (Optional) How many times you want this callback to be called at max. -1 means unlimited

- **callback**  Function: The callback function to register



## Example (js)

```js
new SPromise((resolve, reject, trigger, cancel) => {
   // do something...
   reject('hello world');
}).catch(value => {
   // do something with the value that is "hello world"
}).catch(1, value => {
   // do something that will be executed only once
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js finally ```


This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".

## Parameters

- **callback**  Function: The callback function to register



## Example (js)

```js
new SPromise((resolve, reject, trigger, cancel) => {
   // do something...
   resolve('hello world');
}).finally(value => {
   // do something with the value that is "hello world"
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js resolved ```


This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".

## Parameters

- **callback**  Function: The callback function to register



## Example (js)

```js
new SPromise((resolve, reject, trigger, cancel) => {
   // do something...
   resolve('hello world');
}).resolved(value => {
   // do something with the value that is "hello world"
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js rejected ```


This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".

## Parameters

- **callback**  Function: The callback function to register



## Example (js)

```js
new SPromise((resolve, reject, trigger, cancel) => {
   // do something...
   resolve('hello world');
}).rejected(value => {
   // do something with the value that is "hello world"
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js canceled ```


This method allows the SPromise user to register a function that will be called once when the "revoke" function has been called
The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".

## Parameters

- **callback**  Function: The callback function to register



## Example (js)

```js
new SPromise((resolve, reject, trigger, cancel) => {
   // do something...
   cancel('hello world');
}).canceled(value => {
   // do something with the value that is "hello world"
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js cancel ```


This method allows the user to cancel the promise execution.
This mean that the promise will be resolved but not trigger any
other stacks like "resolve,reject,etc..."

## Parameters

- **value**  Mixed: A value that you want to pass to the resolve promise



## Example (js)

```js
new SPromise((resolve, reject, trigger, cancel) => {
   // do something...
   cancel('hello world');
}).canceled(value => {
   // do something with the value that is "hello world"
}).start();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _destroy ```


Destroying the SPromise instance by unregister all the callbacks, etc...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _masterPromiseResolveFn ```


Store the master promise resolve function



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _masterPromiseRejectFn ```


Store the master promise reject function



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _isExecutorStarted ```


Store the status of the executor function. true if it has been executed, false if not...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _settings ```


Store the settings of this SPromise instance. Here's the available settings:
- stacks (null) {Array|String}: An array or comma separated string of additional stacks you want for this instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _status ```


Store the promise status. Can be:
- pending: When the promise is waiting for resolution or rejection
- resolved: When the promise has been resolved
- rejected: When the promise has been rejected
- canceled: When the promise has been canceled
- destroyed: When the promise has been destroyed



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _stacks ```


Store the stacks callbacks



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js status ```


Access the promise status. Can be one of these:
- pending: When the promise is waiting for resolution or rejection
- resolved: When the promise has been resolved
- rejected: When the promise has been rejected
- canceled: When the promise has been canceled
- destroyed: When the promise has been destroyed



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

