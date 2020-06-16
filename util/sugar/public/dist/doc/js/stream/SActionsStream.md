


<!-- @namespace    sugar.js.stream -->
<!-- @name    SActionStream -->

# ```js SActionStream ```
### Since: 2.0.0

This class represent the base of a actions stream.
An action stream if simply some functions that are called one after the other
and that pass to each other some value(s) on which to work.
Here's all the "events" that you can subscribe on the SActionStream instance, or on the returned SPromise when calling the "start" method:
- start: Triggered when an action starts
- {actionName}.start: Triggered when the specified action starts
- step: Triggered when an action is just finished
- {actionName}.step: Triggered when the specified action is just finished
- error: Triggered when something wrong has happened in any action
- {actionName}.error: Triggered when something wrong has happened in the specified action
- complete: Triggered when the stream has been completed successfully
- cancel: Triggered when the stream has been canceled using the "cancel" method of the returned SPromise when calling the "start" method

## Parameters

- **actions**  Object: An object of actions to execute one after the other. The object has to be formatted like ```{ actionName: actionFunction }```

- **settings** ([object Object]) Object: A settings object to configure your instance:
- name (null) {String}: A simple name for your stream that will be used in the logs
- order (null) {Array}: An array of action names that specify the order you want to execute them. If not specified, take the actions object properties order.
- actions ({}) {Object}: An object formated like ```{ actionName: settings }``` that contain specific settings for each actions and that will be passed as a second parameter to each actions.




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    start -->

# ```js start ```


This method launch the action stream and return an SPromise instance for this particular stream "process"

## Parameters

- **streamObj** ([object Object]) Object: An object that will be passed along all the actions and that can be updated at every steps. Make sure that your current action return what the next one need to work correctly...

- **settings** ([object Object]) Object: An object of settings to override the instance level one if wanted



## Example (js)

```js
const streamPromise = myStream.start();
streamPromise.on('step', (streamObj) => {
   // do something
}).on('resolve', (resultObj) => {
   // do something
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _actionsObj -->

# ```js _actionsObj ```


Store the actions object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

