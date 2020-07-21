


<!-- @namespace    sugar.node.blessed.panel -->
<!-- @name    SSidePanel -->

# ```js SSidePanel ```


This class gives you the ability to create a side panel (left, right, tom, bottom) that can contain any other content
simply by calling the "append" method on it. It can also be hided and displayed using a simple "key" mapping that you can specify in the settings.

## Parameters

- **settings** ([object Object]) Object: A settings object to configure your side panel using these properties:
- id (null) {String}: Specify an id for your panel to you can use the static methods like ```SSidePanel.open(panelId)```
- side (left) {String}: Specify the side on which you want the panel to be displayed. Can be "left", "right", "top" or "bottom"




## Example (js)

```js
const SSidePanel = require('@coffeekraken/sugar/node/blessed/panel/SSidePanel');
const panel = new SSidePanel({
   id: 'myCoolPanel',
   side: 'right'
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    update -->

# ```js update ```


Update the component display




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables


