


<!-- @namespace    sugar.node.blessed.list -->
<!-- @name    SSummaryList -->

# ```js SSummaryList ```


This class gives you the ability to display an editable list of informations.
This is very useful to display for example a summary of a command to launch, or whatever...

## Parameters

- **items**  Array: An array of items object constitued of these properties:
- id (null) {String}: The item id
- text (null) {String}: The item text to display before the value
- default (null) {String}: The item default value
- **settings** ([object Object]) Object: A settings object to configure your this. Here's the available settings:



## Example (js)

```js
const SSummaryList = require('@coffeekraken/sugar/node/blessed/list/SSummaryList');
const list = new SSummaryList({});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _initHotkeys -->

# ```js _initHotkeys ```


This method init the hotkeys




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    getLongestListItemName -->

# ```js getLongestListItemName ```


This method return the longest list item name




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _terminate -->

# ```js _terminate ```


This method simply "kill" the component




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _buildBlessedListItemsArray -->

# ```js _buildBlessedListItemsArray ```


This method build the blessed list items array to pass to the blessed list component




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _rebuildList -->

# ```js _rebuildList ```


This method simply rebuild the blessed list




### Author
- 


## Variables



<!-- @name    _editingItemIdx -->

# ```js _editingItemIdx ```


Store the editing list item index



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _selectedItemIdx -->

# ```js _selectedItemIdx ```


Store the selected item index



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _isEditing -->

# ```js _isEditing ```


Store if the list is in editing mode or not



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    $list -->

# ```js $list ```


Store the blessed list component



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _items -->

# ```js _items ```


Store the items list



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

