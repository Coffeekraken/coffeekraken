
# Class


## ```js SPromise ```


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


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods



# Variables


