
# Class


## ```js SActionStreamAction ```
### Since: 2.0.0

This class represent the base of a actions stream action.
An action stream action represent an action that you can register in the SActionsStream instance and
prodive you some usefull features like "trigger" some events, set/get data from the streamObj, defining some required streamObj properties
to work with, etc...

## Parameters

- **actions**  Object: An object of actions to execute one after the other. The object has to be formatted like ```{ actionName: actionFunction }```

- **settings** ([object Object]) Object: A settings object to configure your instance:
- name (null) {String}: A simple name for your stream that will be used in the logs
- order (null) {Array}: An array of action names that specify the order you want to execute them. If not specified, take the actions object properties order.
- actions ({}) {Object}: An object formated like ```{ actionName: settings }``` that contain specific settings for each actions and that will be passed as a second parameter to each actions.




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods



# Variables


