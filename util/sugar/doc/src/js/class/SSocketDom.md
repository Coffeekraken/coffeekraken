# syncDom

<!-- @namespace: sugar.js.socket.syncDom -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Simply connect to a backend socket.io server and listen for specifics messages from it to refresh automatically the DOM.
The messages that are listened are:
- 'SSocketDom.html': Used to send some html to "inject/replace" in the current page HTML
- 'SSocketDom.script': Used to add a script tag to the page
- 'SSocketDom.style': Used to add a style tag to the page


## Constructor


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
serverUrl  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The url to connect to the socket.io server  |  required  |
settings  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  The settings to configure your SSocketDom instance  |  optional  |  {}

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Settings

Here's the list of available setting(s).

### settings.rootNode

<!-- @namespace: sugar.js.class.settings.rootNode -->

Type : **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**


The root node where the html contents will be injected if no node is passed with the event


Default : **document.body**


### settings.action

<!-- @namespace: sugar.js class.settings.action -->

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


Specify which action will be executed if no one is passed with the event.
It can be one of these:
- 'append': Will append the HTML content to the existing one
- 'replace': Will replace the HTML content with the new one
- 'prepend': Will inject the HTML content before the existing one


Default : **'replace'**


### settings.events

<!-- @namespace: sugar.js.class.settings.events -->

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**


Save the events scoped settings objects


Default : **{}**



## Methods


### init

Init the Socket connection


Return **{ [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise) }** A promise that will be resolved when the connection is inited

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)