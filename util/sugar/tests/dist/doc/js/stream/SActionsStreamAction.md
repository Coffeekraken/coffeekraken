


<!-- @namespace    sugar.js.stream -->

# ```js SActionStreamAction ```
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




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js checkStreamObject ```


This method take the streamObj object passed to the "run" method and check it depending on the definitionObj
specified in the static definitionObj property.

## Parameters

- **streamObj**  Object: The streamObj to check




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js run ```


This method is the one that has to be overrided.
It will be called to run the actions on want on the streamObj passed as parameter
and MUST return a Promise instance that you need to resolve at the end of your processed
and pass it the updated streamObject.

## Parameters

- **streamObj**  Object: The streamObj to work with

- **settings** (this._settings) Object: A settings object specific to this action. It will be equal to the passed instance settings and deeply merged with the settings object you have setted in the "actions.{actionName}" oject of the SActionsStream instance




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables


